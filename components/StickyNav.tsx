import Image from '@/components/OptimizedImage';
import Link from '@/components/Link';
import { useLocation } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StickyNavProps {
  isVisible?: boolean;
}

const StickyNav = ({ isVisible = true }: StickyNavProps) => {
  const pathname = useLocation({ select: (location) => location.pathname });
  
  // Hide nav on resume page
  if (pathname === '/resume' || pathname === '/resume/') return null;

  // The studio uses the Larris palette (and has a dark mode), so the nav follows it there.
  const onStudio = pathname === '/studio' || pathname.startsWith('/studio/');

  const navItems = [
    { href: '/', icon: '/about.svg', label: 'About' },
    { href: '/projects', icon: '/work.svg', label: 'Work' },
    { href: '/studio', icon: '/studio.svg', label: 'Studio' },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav 
          className={cn(
            "fixed left-1/2 bottom-8 -translate-x-1/2 backdrop-blur-sm rounded-full px-6 py-3 flex gap-8 border",
            onStudio ? "bg-paper/70 border-line-strong text-ink" : "bg-white/30 border-[#C4C4C4]",
          )}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              preload="render"
              className="flex flex-col gap-1 hover:scale-110 transition-transform"
            >
              <div className="w-6 h-6 relative">
                <Image
                  src={item.icon}
                  alt={`${item.label} icon`}
                  fill
                  className={cn("object-contain", onStudio && "dark:invert")}
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
