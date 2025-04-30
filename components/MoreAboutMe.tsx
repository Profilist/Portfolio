'use client';

import { useEffect, useRef } from 'react';

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
  animate: true,
  masklower: 0.9,
  maskupper: 1.8,
  perspective: 320,
  items: carouselItems.length,
  gap: 0.1,
  rotatex: 0,
  rotatez: 0,
  buff: 2,
};

export default function MoreAboutMe() {
  const mainRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!mainRef.current) return;

    const generateItems = () => {
      const items = [];
      const controllers = [];

      for (let i = 0; i < CONFIG.items; i++) {
        const item = carouselItems[i % carouselItems.length];
        items.push(`
          <li style="--index: ${i};">
            <img src="${item.image}" alt="${item.alt}" />
          </li>
        `);
        controllers.push('<li></li>');
      }

      return {
        items: items.join(''),
        controllers: controllers.join(''),
      };
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
    };

    const update = () => {
      document.documentElement.dataset.animate = CONFIG.animate.toString();
      document.documentElement.style.setProperty('--gap-efficient', CONFIG.gap.toString());
      document.documentElement.style.setProperty('--rotate-x', CONFIG.rotatex.toString());
      document.documentElement.style.setProperty('--rotate-z', CONFIG.rotatez.toString());
      document.documentElement.style.setProperty('--mask-lower', CONFIG.masklower.toString());
      document.documentElement.style.setProperty('--mask-upper', CONFIG.maskupper.toString());
      document.documentElement.style.setProperty('--scroll-ratio', CONFIG.buff.toString());
      document.documentElement.style.setProperty('--perspective', CONFIG.perspective.toString());
    };

    render();
    update();

    return () => {
      
    };
  }, []);

  return (
    <div className="relative w-full">
      <h2 className="text-3xl md:text-4xl text-center font-medium">More about me!</h2>
      <div className="mx-auto">
        <main ref={mainRef} className="w-full"></main>
      </div>
    </div>
  );
}