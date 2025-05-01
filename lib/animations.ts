import { Variants } from "framer-motion";

export const stickyNoteFlip: Variants = {
  enter: {
    rotateY: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.4, 0.2, 0.2, 1] }
  },
  exit: {
    rotateY: 180,
    opacity: 0,
    transition: { duration: 0.6, ease: [0.4, 0.2, 0.2, 1] }
  }
};

export const timelineAccent: Variants = {
  active: {
    backgroundColor: "#FFF8B8",
    transition: { duration: 0.3 }
  },
  inactive: {
    backgroundColor: "#EEEEEE",
    transition: { duration: 0.3 }
  }
};

export const stickyNoteStack: Variants = {
  enter: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { 
      duration: 0.5,
      ease: [0.4, 0.2, 0.2, 1]
    }
  },
  exit: {
    x: "-100%",
    opacity: 0,
    scale: 0.9,
    transition: { 
      duration: 0.5,
      ease: [0.4, 0.2, 0.2, 1]
    }
  }
};

export const pushpinAnimation: Variants = {
  enter: {
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  pin: {
    z: 20,
    scale: 1.1,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
};
