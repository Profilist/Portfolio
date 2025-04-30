'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const carouselItems = [
  { image: '/about/osu.png', alt: 'I play osu!mania' },
  { image: '/about/devpost.svg', alt: 'Check out my hackathons!' },
  { image: '/about/hawaii.png', alt: 'Traveling to Hawaii' },
  { image: '/about/huangshan.jpg', alt: 'Traveling to Huangshan' },
  { image: '/about/wuzhen.jpg', alt: 'Traveling to Wuzhen' },
  { image: '/about/nanjing.jpg', alt: 'Traveling to Nanjing' },
  { image: '/about/shanghai.jpg', alt: 'Traveling to Shanghai' },
  { image: '/about/xian.jpg', alt: 'Traveling to Xian' },
  { image: '/about/xian.jpg', alt: 'Traveling to Xian' },
  { image: '/about/xian.jpg', alt: 'Traveling to Xian' },
  { image: '/about/xian.jpg', alt: 'Traveling to Xian' },
  { image: '/about/xian.jpg', alt: 'Traveling to Xian' },
];

const CONFIG = {
  debug: false,
  backface: false,
  animate: true,
  scroll: false,
  dark: false,
  masklower: 0.9,
  maskupper: 1.8,
  perspective: 320,
  vertical: false,
  infinite: true,
  items: carouselItems.length,
  gap: 0.1,
  rotatex: 0,
  rotatez: 0,
  buff: 2,
};

export default function MoreAboutMe() {
  const mainRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  
  useEffect(() => {
    if (!mainRef.current) return;

    // Auto-scroll functionality with GSAP
    const startAutoScroll = () => {
      if (!scrollerRef.current) return;

      // Kill any existing animations and triggers
      gsap.killTweensOf(scrollerRef.current);
      ScrollTrigger.getAll().forEach(t => t.kill());

      // Reset to start
      scrollerRef.current.scrollLeft = 0;

      // Calculate the scroll width
      const scrollWidth = scrollerRef.current.scrollWidth;
      const clientWidth = scrollerRef.current.clientWidth;
      const scrollDistance = scrollWidth - clientWidth;

      // Create the scroll animation
      gsap.to(scrollerRef.current, {
        scrollLeft: scrollDistance,
        duration: 60, // 30 seconds per rotation
        ease: 'none',
        repeat: -1,
        repeatDelay: 0,
        immediateRender: true,
        onRepeat: () => {
          gsap.set(scrollerRef.current, { scrollLeft: 0 });
        }
      });
    };

    const generateItems = () => {
      const items = [];
      const controllers = [];

      for (let i = 0; i < CONFIG.items + 1; i++) {
        if (i !== CONFIG.items) {
          const item = carouselItems[i % carouselItems.length];
          items.push(`
            <li style="--index: ${i};">
              <img src="${item.image}" alt="${item.alt}" />
            </li>
          `);
        }
        controllers.push('<li></li>');
      }

      return {
        items: items.join(''),
        controllers: controllers.join(''),
      };
    };

    const handleScroll = () => {
      if (!CONFIG.infinite || !scrollerRef.current) return false;
      if (CONFIG.vertical) {
        if (scrollerRef.current.scrollTop + window.innerHeight > scrollerRef.current.scrollHeight - 2) {
          scrollerRef.current.scrollTop = 2;
        }
        if (scrollerRef.current.scrollTop < 2) {
          scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight - 2;
        }
      } else {
        if (scrollerRef.current.scrollLeft + window.innerWidth > scrollerRef.current.scrollWidth - 2) {
          scrollerRef.current.scrollLeft = 2;
        }
        if (scrollerRef.current.scrollLeft < 2) {
          scrollerRef.current.scrollLeft = scrollerRef.current.scrollWidth - 2;
        }
      }
    };

    const render = () => {
      const { controllers, items } = generateItems();
      mainRef.current!.innerHTML = `
        <div class="container" style="--total: ${CONFIG.items};">
          <div class="carousel-container">
            <ul class="carousel">
              ${items}
            </ul>
          </div>
          <ul class="controller">
            ${controllers}
          </ul>
        </div>
      `;
      scrollerRef.current = mainRef.current!.querySelector('.controller');
      scrollerRef.current?.addEventListener('scroll', handleScroll);
    };

    let tween: gsap.core.Tween;

    const update = () => {
      document.documentElement.dataset.debug = CONFIG.debug.toString();
      document.documentElement.dataset.animate = CONFIG.animate.toString();
      document.documentElement.dataset.backface = CONFIG.backface.toString();
      document.documentElement.dataset.scroll = CONFIG.scroll.toString();
      document.documentElement.dataset.dark = CONFIG.dark.toString();
      document.documentElement.dataset.vertical = CONFIG.vertical.toString();
      document.documentElement.dataset.infinite = CONFIG.infinite.toString();
      document.documentElement.style.setProperty('--gap-efficient', CONFIG.gap.toString());
      document.documentElement.style.setProperty('--rotate-x', CONFIG.rotatex.toString());
      document.documentElement.style.setProperty('--rotate-z', CONFIG.rotatez.toString());
      document.documentElement.style.setProperty('--mask-lower', CONFIG.masklower.toString());
      document.documentElement.style.setProperty('--mask-upper', CONFIG.maskupper.toString());
      document.documentElement.style.setProperty('--scroll-ratio', CONFIG.buff.toString());
      document.documentElement.style.setProperty('--perspective', CONFIG.perspective.toString());

      if (!CSS.supports('animation-timeline: scroll()') && CONFIG.scroll && CONFIG.animate) {
        if (scrollerRef.current) scrollerRef.current[CONFIG.vertical ? 'scrollTop' : 'scrollLeft'] = 0;
        document.documentElement.dataset.gsap = 'true';
        gsap.registerPlugin(ScrollTrigger);
        gsap.set(['.carousel'], { animation: 'none', '--rotate': 0 });
        tween = gsap.to('.carousel', {
          rotateY: -360,
          '--rotate': 360,
          ease: 'none',
          scrollTrigger: {
            horizontal: !CONFIG.vertical,
            scroller: '.controller',
            scrub: true,
          },
        });
      } else {
        document.documentElement.dataset.gsap = 'false';
        gsap.set('.carousel', { clearProps: true });
        if (tween) tween.kill();
        ScrollTrigger.killAll();
        document.querySelector('.carousel')?.removeAttribute('style');
      }
    };

    render();
    update();
    
    // Start auto-scroll after a short delay to ensure everything is rendered
    const autoScrollTimeout = setTimeout(startAutoScroll, 100);

    return () => {
      clearTimeout(autoScrollTimeout);
      gsap.killTweensOf(scrollerRef.current);
      scrollerRef.current?.removeEventListener('scroll', handleScroll);
      if (tween) tween.kill();
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <div className="relative w-full">
      <h2 className="text-3xl md:text-4xl text-center font-medium">More about me!</h2>
      <div className="max-w-[1400px] mx-auto">
        <main ref={mainRef} className="w-full"></main>
      </div>
    </div>
  );
}