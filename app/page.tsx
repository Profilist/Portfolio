import Image from "next/image";
import Link from "next/link";
import RecentProjects from "../components/RecentProjects";
import WhereIveBeen from "../components/WhereIveBeen";
import MoreAboutMe from "@/components/MoreAboutMe";

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12 md:py-20">
      {/* Header Section */}
      <header className="flex flex-col items-center mb-16">
        {/* Profile Image */}
        <div className="mb-4">
          <Image 
            src="/headshot.jpg" 
            alt="Larris profile photo" 
            width={100} 
            height={100} 
            className="rounded-full object-cover w-[100px] h-[100px]"
            priority
          />
        </div>
        
        {/* Greeting */}
        <h1 className="font-handwriting text-5xl mb-8 text-center">
          Hi, I'm Larris.
        </h1>
        
        {/* Intro Card */}
        <div className="relative w-full max-w-xl">
          {/* Main Card */}
          <div className="bg-card shadow-md rounded-lg p-6">
            <p className="text-2xl mb-4 leading-relaxed flex flex-wrap items-center gap-x-1">
              I'm a Software Engineer at
              <span className="inline-flex items-center">
                <Image src="/shopify.svg" alt="Shopify" width={20} height={20} className="mx-1" />
                Shopify,
              </span> studying CS at the
              <span className="inline-flex items-center">
                <Image src="/uwaterloo.svg" alt="University of Waterloo" width={20} height={20} className="mx-1 rounded-full" />
                University of Waterloo.
              </span>
            </p>
            
            {/* Status and Social Links */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Currently Building */}
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#94C040] mr-2"></div>
                <span className="text-sm">currently building pmo</span>
              </div>
              
              {/* Social Links */}
              <div className="flex items-center gap-4">
                <Link href="https://linkedin.com" aria-label="LinkedIn Profile">
                  <Image src="/linkedin.svg" alt="" width={24} height={24} aria-hidden="true" />
                </Link>
                <Link href="https://twitter.com" aria-label="Twitter Profile">
                  <Image src="/x.svg" alt="" width={20} height={20} aria-hidden="true" />
                </Link>
                <Link href="https://github.com" aria-label="GitHub Profile">
                  <Image src="/github.svg" alt="" width={24} height={24} aria-hidden="true" />
                </Link>
                <Link href="mailto:contact@example.com" aria-label="Email">
                  <Image src="/email.svg" alt="" width={24} height={24} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          {/* Purin Character */}
          <div className="absolute -right-4 -top-12 md:-right-8 md:-top-16 pointer-events-none">
            <Image 
              src="/pompompurin.svg" 
              alt="" 
              width={140} 
              height={140}
              aria-hidden="true"
            />
          </div>
        </div>
      </header>
      
      {/* Recent Projects Section */}
      <div className="px-8">
        <RecentProjects />
      </div>

      {/* Where I've Been Section */}
      <div className="px-8 mt-24">
        <WhereIveBeen />
      </div>

      {/* More About Me Section */}
      <div className="px-8">
        <MoreAboutMe />
      </div>
    </div>
  );
}
