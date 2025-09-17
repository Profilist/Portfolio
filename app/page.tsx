"use client";

import Image from "next/image";
import Link from "next/link";
import RecentProjects from "../components/RecentProjects";
import WhereIveBeen from "../components/WhereIveBeen";
import MoreAboutMe from "@/components/MoreAboutMe";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div 
      className="max-w-2xl mx-auto px-4 py-12 md:py-20"
      initial="initial"
      animate="animate"
      variants={{
        initial: {},
        animate: {
          transition: { staggerChildren: 0.1 }
        }
      }}
    >
      {/* Header Section */}
      <motion.header 
        className="flex flex-col items-center mb-16"
        variants={{
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
        }}
      >
        {/* Profile Image */}
        <motion.div 
          className="mb-4"
          variants={{
            initial: { opacity: 0, scale: 0.8 },
            animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
          }}
        >
          <Image 
            src="/headshot.jpg" 
            alt="Larris profile photo" 
            width={512} 
            height={512} 
            className="rounded-full object-cover w-[100px] h-[100px]"
            priority
          />
        </motion.div>
        
        {/* Greeting */}
        <motion.h1 
          className="font-handwriting text-5xl mb-8 text-center"
          variants={{
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.2 } }
          }}
        >
          Hi, I&apos;m Larris.
        </motion.h1>
        
        {/* Intro Card */}
        <motion.div 
          className="relative w-full max-w-xl"
          variants={{
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.3 } }
          }}
        >
          {/* Main Card */}
          <div className="bg-card shadow-md rounded-lg p-6">
          <p className="text-xl sm:text-2xl mb-4 leading-relaxed flex flex-wrap items-center gap-x-1">
            I study CS at the
            <span className="inline-flex items-center gap-x-0.5 min-w-0">
              <Image src="/experience/uwaterloo.svg" alt="University of Waterloo" width={20} height={20} className="mx-1 rounded-full" />
              University of Waterloo
            </span>
            and previously interned at
            <span className="inline-flex items-center gap-x-0.5 min-w-0">
              <Image src="/experience/shopify.svg" alt="Shopify" width={20} height={20} className="mx-1" />
              Shopify.
            </span>
          </p>
            
            {/* Status and Social Links */}
            <div className="flex flex-col flex-row items-center justify-between gap-4">
              {/* Currently Building */}
              <div className="flex items-center">
                <motion.div 
                  className="w-3 h-3 rounded-full bg-[#94C040] mr-2"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [1, 0.8, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                ></motion.div>
                <span className="text-sm"><span className="hidden sm:inline">currently </span>building LifeOS</span>
              </div>
              
              {/* Social Links */}
              <div className="flex items-center gap-3 md:gap-4">
                <Link href="https://linkedin.com/in/larrisxie" aria-label="LinkedIn">
                  <Image src="/linkedin.svg" alt="" width={64} height={64} className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                </Link>
                <Link href="https://x.com/larrisx" aria-label="Twitter">
                  <Image src="/x.svg" alt="" width={64} height={64} className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                </Link>
                <Link href="https://github.com/Profilist" aria-label="GitHub">
                  <Image src="/github.svg" alt="" width={64} height={64} className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                </Link>
                <Link href="mailto:larris.xie@uwaterloo.ca" aria-label="Email">
                  <Image src="/email.svg" alt="" width={64} height={64} className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          {/* Purin Character */}
          <motion.div 
            className="hidden sm:block absolute -right-4 -top-12 md:-right-8 md:-top-16"
            variants={{
              initial: { opacity: 0, x: 20 },
              animate: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.6 } }
            }}
            whileHover={{
              scale: 1.1,
              rotate: -15,
              transition: { duration: 0.2 }
            }}
          >
            <Image 
              src="/pompompurin.svg" 
              alt="" 
              width={140} 
              height={140}
              aria-hidden="true"
            />
          </motion.div>
        </motion.div>
      </motion.header>
      
      {/* Recent Projects Section */}
      <motion.div 
        className="px-4 sm:px-8"
        variants={{
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
        }}
      >
        <RecentProjects />
      </motion.div>

      {/* Where I've Been Section */}
      <motion.div 
        className="px-4 sm:px-8 mt-16 sm:mt-24"
        variants={{
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
        }}
      >
        <WhereIveBeen />
      </motion.div>

      {/* More About Me Section */}
      <motion.div 
        className="px-8"
        variants={{
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
        }}
      >
        <MoreAboutMe />
      </motion.div>
    </motion.div>
  );
}
