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
  enter: { // Initial state, pin is "pinned"
    y: 0,
    "--pin-shadow-scale": 1,
    "--pin-shadow-blur": "1.5px", 

    "--pin-head-shadow-offset-x": "23px",
    "--pin-head-shadow-offset-y": "20px",
    "--pin-head-shadow-blur": "3px",
    "--pin-head-shadow-color": "hsla(0,0%,0%,.15)",

    "--pin-stem-shadow-pos-x": "2px",
    "--pin-stem-shadow-pos-y": "5px",
    transition: { duration: 0.2 }
  },
  pin: { // Animation sequence: starts pinned, goes up, comes back down
    y: [0, -20, 0], 

    "--pin-shadow-scale": [1, 1, 1],       
    "--pin-shadow-blur": ["1.5px", "2.5px", "1.5px"], 

    "--pin-head-shadow-offset-x": ["23px", "30px", "23px"], 
    "--pin-head-shadow-offset-y": ["20px", "20px", "20px"], 
    "--pin-head-shadow-blur": ["3px", "6px", "3px"],        
    "--pin-head-shadow-color": ["hsla(0,0%,0%,.15)", "hsla(0,0%,0%,.10)", "hsla(0,0%,0%,.15)"], 

    "--pin-stem-shadow-pos-x": ["2px", "8px", "2px"],       
    "--pin-stem-shadow-pos-y": ["5px", "0px", "5px"],       

    transition: {
      duration: 0.7,
      ease: "easeInOut",
    }
  }
};