'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface StickyNavProps {
  isVisible?: boolean;
}

const StickyNav = ({ isVisible = true }: StickyNavProps) => {
  const pathname = usePathname();
  
  // Hide nav on resume page
  if (pathname === '/resume') return null;

  const navItems = [
    { href: '/', icon: '/about.svg', label: 'About' },
    { href: '/projects', icon: '/work.svg', label: 'Work' },
    { href: '/studio', icon: '/studio.svg', label: 'Studio' },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav 
          className="fixed left-1/2 bottom-8 -translate-x-1/2 bg-white/30 backdrop-blur-sm rounded-full px-6 py-3 flex gap-8 border border-[#C4C4C4]"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex flex-col gap-1 hover:scale-110 transition-transform"
            >
              <div className="w-6 h-6 relative">
                <Image
                  src={item.icon}
                  alt={`${item.label} icon`}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-lg">{item.label}</span>
            </Link>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default StickyNav;
