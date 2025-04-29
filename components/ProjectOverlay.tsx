import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import React from "react";

interface ProjectOverlayProps {
  open: boolean;
  onClose?: () => void;
  project: {
    name: string;
    image: string;
    alt: string;
  } | null;
}

export const ProjectOverlay: React.FC<ProjectOverlayProps> = ({ open, onClose, project }) => {
  if (!open || !project) return null;

  return (
    <AnimatePresence>
      {open && project && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center backdrop-blur-[6px] bg-black/15"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          {/* Overlay content, centered */}
          <div className="relative flex flex-col items-center pointer-events-none select-none" style={{minWidth: 320, minHeight: 360}}>
            {/* Project Icon, absolutely positioned to match card location */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 z-10 w-24 h-24 md:w-28 md:h-28 flex items-center justify-center">
              <Image
                src={project.image}
                alt={project.alt}
                width={96}
                height={96}
                className="object-contain w-24 h-24 md:w-28 md:h-28"
                priority
              />
            </div>
            <div className="pt-16 flex flex-col items-center">
              {/* Hero Images for PMO */}
              {project.name === "pmo" && (
                <div className="flex flex-row gap-0 md:gap-6 items-end justify-center mb-6 md:mb-8">
                  <Image
                    src="/pmo1.png"
                    alt="pmo app schedule view"
                    width={180}
                    height={250}
                    className="rounded-xl max-w-[40vw] max-h-[35vh] -rotate-2 z-10"
                    style={{ marginRight: '-1.2rem' }}
                    priority
                  />
                  <Image
                    src="/pmo2.png"
                    alt="pmo app timer view"
                    width={200}
                    height={140}
                    className="rounded-xl max-w-[40vw] max-h-[25vh] rotate-3 z-20"
                    style={{ marginLeft: '-1.2rem' }}
                    priority
                  />
                </div>
              )}
              {/* Project Name */}
              <span className="block text-4xl font-instrument text-black mt-2 mb-1 tracking-tight" style={{letterSpacing: 0}}>
                {project.name}
              </span>
              {/* Subheadline */}
              {project.name === "pmo" && (
                <span className="block text-xl md:text-2xl text-black font-geist mb-4 md:mb-6" style={{letterSpacing: '-0.06em'}}>
                  A minimal Pomodoro<br />timer desktop app
                </span>
              )}
              {/* Button */}
              <button
                className="pointer-events-auto mt-2 md:mt-4 px-8 py-3 rounded-full bg-[#F3F3F3] text-black text-xl font-geist shadow text-center transition hover:bg-[#ececec] focus:outline-none"
                style={{fontWeight: 400, letterSpacing: '-0.01em'}}
              >
                View {project.name}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
