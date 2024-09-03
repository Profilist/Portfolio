import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const fileUrl = "https://github.com/Profilist/resume/raw/main/Resume.pdf";

  try {
    const response = await fetch(fileUrl);

    if (!response.ok) {
      throw new Error("Failed to download file");
    }

    const contentType = response.headers.get("content-type");
    const buffer = await response.arrayBuffer();

    res.setHeader("Content-Type", contentType || "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="resume.pdf"');
    res.status(200).send(Buffer.from(buffer));
  } catch (error) {
    res.status(500).json({ error: "Failed to download file" });
  }
}
