---
title: A decision model that teaches itself
caption: A 0.8B model learning to read 1,000 documents at once with no labels
date: 2026-10-11
cover: figures/1_hero.png
coverAlt: Line chart of accuracy against context window, up to 256k tokens. Kev-0.8B falls from 80% to 11% by 32k; the self-taught model stays near 80% and ends at 75% at 256k. Everything past 64k is shaded as past Jev's and Clef's limits.
coverCaption: Accuracy as more complaints are packed into one read, well past the 64k window of today's decision models.
preview: figures/4_method.svg
links: [GitHub | https://github.com/Profilist/kev-selfteach, Model | https://huggingface.co/LarrisX/kev-0.8b-selfteach]
draft: false
---
## The problem
We've all seen decision models explode in popularity recently. They read text (and other inputs) like an LLM, but instead of writing a response, they answer typed questions with a probability for each option, at a fraction of the time and cost. TypeSafe's [Jev](https://typesafe.ai/), Cloudflare's [Clef](https://developers.cloudflare.com/workers-ai/models/clef/) and Jared Palmer's open-source [Kev](https://github.com/jaredpalmer/kev) all work this way.

A cool trick they use is branching every question off a single read of the input. Asking 200 questions costs a small fraction of asking them one at a time, since each question only adds its own few hundred tokens. That's perfect for bulk work: giving the model a collection of items and asking about every item at once.

I tested that with Kev against 1,980 real consumer complaints from the [US government's public CFPB database](https://huggingface.co/datasets/davidheineman/consumer-finance-complaints-large), none in Kev's training data. For each one, I asked Kev's own question: *"which kind of financial product is this complaint about?"* with nine options like mortgage, credit card, student loan, etc.

- **One complaint at a time,** Kev-0.8B gets **80%** right.
- **Pack 246 of them into one input** and ask about each one, and it drops to **12%**.

![Grid of 241 tiles, one per complaint in a 64k-token document. Complaint 1, a mortgage, is dark grey; complaint 208, a checking account, is green, with an arrow from a box asking which kind of financial product complaint 208 is about.](figures/2_test.png "241 complaints sit back to back in one input, and each question names one of them by its ID.")

The bigger models fall too (see below), including hosted models like Cloudflare's Clef-flash (9B). The only models that hold are Clef 27B, Jev and Kev-27B, which is also the only Kev trained on long documents. That points to a training problem, not a size one.

![Horizontal bars of accuracy at 64k tokens for each released Kev, each on a pale track running to that model's read-alone score: Kev-0.8B 12% (80% alone), Kev-4B 42% (84%), Kev-9B 51% (85%), Kev-27B 85% (86%).](figures/9_sizes.png "Every Kev at 64k (246 complaints in one read). The pale part of each bar runs to the same model reading each complaint alone. Only Kev-27B, trained on long documents, holds.")

### Why not ask about each complaint separately?

Sending the whole input 246 times (once per question) gives the same answers since each question already runs in its own branch, but costs 150× the compute. Of course, cutting it into complaints and asking about each one alone works, and it's what the teacher does below. But real long documents (contracts, transcripts, email threads) don't come with marked boundaries, and an answer often depends on something much earlier. 

The packed input measures one skill cleanly: **finding the right part of a long document**. Reasoning across parts is a good next test.

## What's actually going wrong

Complaint 6292578: *"I closed my account with PNC and instead of closing my account PNC allowed automatic payments to continue…"* is clearly about a checking account and Kev knows that too. When read alone, it returns "checking or savings account" with 99% confidence.

Put the same complaint 208th in a document of 241, and Kev says "mortgage" with 82% confidence. The **first** complaint in that document happens to be about a mortgage.

![Three bar charts of Kev's confidence across nine products for complaint 6292578. Alone: 99% checking or savings. Packed: 82% mortgage. Packed, after self-teaching: 100% checking or savings.](figures/3_example.png "Kev's answer for the same complaint in three settings. The middle panel shows the released Kev confidently answering about a different complaint when packed.")

This was a consistent failure, where at a 64k token packed input:

- Kev gives the same answer it gives alone only **13%** of the time.
- **56%** of its wrong answers name the product of the first or last complaint in the document.

So the knowledge is fine since **the model knows the answer, it just can't find the right complaint.** It reads the whole document as if it were one complaint, and that framing turned out to be the key idea.

## What I tried first

**Synthetic long documents.** I tried training Kev on long synthetic documents with facts hidden at different depths, chains of two facts, and look-alike distractors. On my own tests it worked, with accuracy at 128k going from 61% to 79%, but on the complaints test it reached only 33% at 64k, and accuracy on the real contracts data barely changed. The model overfitted to those tasks instead of generalizing how to read.

**Real labels.** Then I switched to [Kev's own benchmarks and real data](https://huggingface.co/datasets/jaredpalmer/kev-suites). The next model trained on long documents packed with real complaints from Kev's public training set, each with its true label, plus Kev's ordinary questions so it wouldn't forget them. That worked, going from 12% to 75% accuracy at 64k. But it needs a labelled dataset for every kind of input and most long documents don't come with one.

## The solution: let the model be its own teacher

Since the model already gives an accurate answer when it reads a complaint alone, that answer is a free training signal. No human labels needed and no bigger model needed.

![Top, the teacher: one complaint read alone, and its answer as nine bars. Bottom, the student: the same complaints packed in a grid, read one at a time. For each, the student's bars start leaning to the first complaint's product, a mortgage, then move to match the teacher's answer, which an arrow marks as the target.](figures/4_method.svg "The teacher and the student are the same 0.8B model.")

1. **Teacher.** Kev-0.8B reads each complaint by itself and gives a confidence for each of the nine options.
2. **Student.** The same model reads that complaint packed among up to 120 others and is trained to give the same confidences.

I used 5,219 complaints the model had never seen, with about a third of training examples left alone to ensure the model is able to still answer short inputs accurately. Similarly, other kinds of questions from Kev's public training data were also mixed in, also answered by the teacher, so it stays a general decision model. 

I used a small LoRA adapter, trained for 46 minutes on one rented H100, which cost about $2.

## Results

![Horizontal bars of accuracy at 64k tokens, each on a pale track running to that model's read-alone score of 80–86%: Kev-27B 85%, Jev 83%, Clef 27B 80%, self-taught Kev-0.8B 78%, Kev-0.8B with labels 75%, Clef-flash 9B 59%, Kev-9B 51%, Kev-0.8B 12%.](figures/5_at_64k.png "Accuracy with 246 complaints in one read (64k tokens). The pale part of each bar runs to the same model reading each complaint alone. *Jev's window is 32k, so it read each document as two halves. It's included because of its popularity, but its bar is effectively a 32k score.")

With 246 complaints in one read, the self-taught model scores **78%**, against **80%** reading them one at a time. Base Kev-0.8B scores 12% at the same length, which is almost as bad as randomly guessing.

Interestingly, **it beats training on the real labels.** The same model trained on the true answers scores 75%.

**It also beats models 11× its size**, including a 1.5× increase in accuracy over Kev-9B. It lands within 2 points of a 34× larger model in Clef 27B, and 7 behind Kev-27B, which was trained on long documents and is also better on complaints by themselves (86% vs 80%). And just as importantly, **nothing else broke.** On Kev's own public test suites of ordinary short questions, there's no measurable drop.

Packed answers now match the model's alone answers 89% of the time, up from 13%. This is also why a teacher that's wrong 20% of the time still works. The student isn't learning what a mortgage complaint looks like; it already knows that. It's learning to give the packed complaint the same answer it would give alone. The teacher's mistakes get copied but they were already counted in the 80% ceiling.

## Going past every hosted window

Packing 246 complaints together in a single 0.8B model request was cool, but decision models still have short context windows. Jev's limit is 32k, Clef's is 64k, and Kev's training code stops at 64k. Since LLMs easily pass 256k, I wanted to see how far Kev could be pushed.

Using the same teacher-student recipe but with longer documents:

| Round | Starts from | Training documents | Time on one H100 |
|---|---|---|---|
| 1 | base Kev | up to 32k tokens | 46 min |
| 2 | round 1 | up to 64k tokens | 42 min |
| 3 | round 2 | up to 128k tokens | 45 min |

![Line chart of accuracy against context window for three self-taught rounds and Kev-0.8B. Each round holds near 80% up to about twice the length it trained on, marked with a hollow diamond. At 256k, round 3 scores 75%, round 2 67%, round 1 47%, Kev-0.8B 11%.](figures/7_rounds.png "Each self-taught round on the test documents. Diamonds are the longest document that round trained on.")

After round 3, the model scores **79% with 490 complaints in one read (128k tokens)** and **75% with 990 (256k tokens)**. Base Kev-0.8B is no better than random at both lengths. 

There was also a consistent pattern where each round holds up to about twice the length it trained on. 

Getting there took two changes:

- **Scoring at 256k.** Kev's scorer runs out of GPU memory with 990 questions on one document. I patched only the scoring step to handle the questions in batches, then checked it against the original scorer at 64k. The probabilities differed by at most 0.0013, which is ordinary rounding noise between GPU calculations, and it agreed on the same top answer every time.
- **Training past 64k.** I had to lift Kev's 64k training limit in my copy of its code. The three rounds took 2.2 hours of GPU time in total.

## Limitations

Self-teaching moves what the model already knows from short inputs to long ones. It can't teach the model anything new.

![Bars of accuracy at 64k, each on a pale track running to the unpacked accuracy. Complaints, about 246 per input: Kev-0.8B 12%, self-taught 78%, against 80% alone. Contracts, about 14 per input: Kev-0.8B 62%, self-taught 67%, against 71% alone.](figures/8_ceiling.png "Accuracy with packed 64k inputs. The pale part of each bar is the same model reading each item alone.")

- **A better teacher doesn't raise the ceiling.** I tried swapping in Kev-27B as the teacher, which had 86% accuracy on the complaints by themselves. The student still landed at 81% alone and 78% at 64k packed inputs, the same as before. Self-teaching transfers how to find the right complaint, not the teacher's extra knowledge, at least at this size and training budget.
- **More items, bigger drop.** A 64k input of [contracts data](https://huggingface.co/datasets/theatticusproject/cuad) contains about 14 contracts vs 246 items with complaints. Packing them costs base Kev-0.8B only 9 points (71% → 62%), against 68 points on complaints (80% → 12%), so there's much less to win back. Self-teaching recovers about half of it (67%).
- **A weak teacher teaches nothing.** When I added new data (legal agreements) to training, accuracy on the tests didn't increase. The Kev-0.8B teacher was barely better than a guess on those NDA questions: 49% right with three options. You can't copy an answer the teacher doesn't have. Then even with Kev-27B as the teacher, which gets 83% of those NDA questions right alone, packed contracts accuracy at 64k increased only by about 3 points, again reinforcing the ceiling cap.

## Conclusions

The most useful teacher here wasn't a bigger model or a labelled dataset. It was the **same model on an easier version of the problem**.

I think this generalizes beyond decision models. A lot of long-context failures can be categorized as "knows the answer alone, can't find it when packed" failures. If a model does a task well on a short input and badly on a long one, that answer is free supervision for the long one.

The model training cost about $7 of rented GPU time on Runpod; total cost including evaluation and experimentation was about $100.

The code is on [GitHub](https://github.com/Profilist/kev-selfteach) and the self-taught Kev-0.8B model is on [Hugging Face](https://huggingface.co/LarrisX/kev-0.8b-selfteach).

Lastly, thank you Jared Palmer for building Kev open source!

---

## Notes

- **Model.** Kev-0.8B 1.0 (Qwen3.5-0.8B base, plus Kev's LoRA and answer head). All scores use Kev's own scoring code and test suites. My scoring of the base model reproduces Kev's published numbers exactly.
- **Tests.** 1,980 [CFPB complaints](https://huggingface.co/datasets/davidheineman/consumer-finance-complaints-large), balanced over nine products, scored alone and packed at 32k, 64k, 128k and 256k tokens (about 123, 246, 490 and 990 complaints per read). Each length uses random orders so neighbours change. 121 contracts from [CUAD](https://huggingface.co/datasets/theatticusproject/cuad) in [Kev's long-document layout](https://github.com/jaredpalmer/kev/tree/main/evals/longdoc-v1), 1,773 questions, packed about 3, 7 and 14 per 16k, 32k and 64k input. decision-v7 (1,468 questions) and transfer-v4 (764) from [Kev's eval suites](https://huggingface.co/datasets/jaredpalmer/kev-suites).