"use client";

import { Button } from "@/components/ui/button";
import { FeaturesBentoGrid } from "@/components/ui/feature-bento-grid";
import { UserButton, useUser } from "@clerk/nextjs";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative mx-auto my-10 flex max-w-7xl flex-col items-center justify-center">
      <Navbar />

      {/* Subtle vertical gradient lines */}
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/70 dark:bg-neutral-800/70">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/70 dark:bg-neutral-800/70">
        <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>

      {/* Horizontal line accent */}
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/70 dark:bg-neutral-800/70">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>

      <div className="px-4 py-10 md:py-20">
        {/* Headline */}
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-3xl font-extrabold tracking-tight text-slate-800 md:text-5xl lg:text-7xl dark:text-slate-200">
          {"Revolutionizing Healthcare with AI"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.08,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
        </h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="relative z-10 mx-auto max-w-2xl py-4 text-center text-lg font-medium leading-relaxed text-neutral-600 dark:text-neutral-400"
        >
          Delivering <span className="font-semibold text-blue-600 dark:text-blue-400">instant, accurate AI medical assistance</span> 
          through natural voice conversations. Empowering doctors with 
          <span className="font-semibold"> trained AI assistants</span> and ensuring 
          <span className="font-semibold"> 24/7 access to care</span>.
        </motion.p>
        <div className="flex items-center justify-center"> 
 <Image src={"/health.jpg"} alt="health" width={680} height={480}/>
 </div>
        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1 }}
          className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-4"
        >

         
          <Button className="w-60 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-lg font-semibold text-white shadow-md transition-all duration-300 hover:from-blue-700 hover:to-blue-800">
            <Link href={"/dashboard"}>Get Started</Link>
          </Button>
          <Button className="w-60 rounded-xl border border-gray-300 bg-white px-6 py-3 text-lg font-semibold text-gray-800 transition-all duration-300 hover:bg-gray-100 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900">
            Contact Support
          </Button>
        </motion.div>

        {/* Chat Assistant Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 1.2 }}
          className="relative z-10 mt-20 rounded-3xl border border-neutral-200 bg-neutral-50 p-6 shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div className="w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 shadow-md bg-white dark:bg-gray-900">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-blue-700">
              <h3 className="text-sm font-semibold text-white">AI Medical Assistant</h3>
              <span className="text-xs text-green-300">● Online</span>
            </div>

            {/* Chat messages */}
            <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto">
              {/* Patient */}
              <div className="flex items-start gap-2">
                <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700" />
                <div className="rounded-lg bg-gray-100 dark:bg-gray-800 px-4 py-2 max-w-[70%] text-sm text-gray-800 dark:text-gray-200 shadow">
                  I’ve been having headaches and dizziness lately. What could it mean?
                </div>
              </div>

              {/* AI */}
              <div className="flex items-start justify-end gap-2">
                <div className="rounded-lg bg-blue-600 px-4 py-2 max-w-[70%] text-sm text-white shadow">
                  I understand your concern. These symptoms can have multiple causes, 
                  from dehydration to high blood pressure. Would you like me to suggest 
                  simple self-checks or recommend consulting a specialist?
                </div>
                <div className="h-8 w-8 rounded-full bg-blue-500" />
              </div>

              {/* Patient */}
              <div className="flex items-start gap-2">
                <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700" />
                <div className="rounded-lg bg-gray-100 dark:bg-gray-800 px-4 py-2 max-w-[70%] text-sm text-gray-800 dark:text-gray-200 shadow">
                  Please give me some self-checks first.
                </div>
              </div>

              {/* AI */}
              <div className="flex items-start justify-end gap-2">
                <div className="rounded-lg bg-blue-600 px-4 py-2 max-w-[70%] text-sm text-white shadow">
                  Certainly ✅. Please track hydration, sleep quality, and blood pressure. 
                  If symptoms persist, I recommend consulting a doctor within 48 hours.
                </div>
                <div className="h-8 w-8 rounded-full bg-blue-500" />
              </div>
            </div>

            {/* Input bar */}
            <div className="flex items-center gap-2 p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <input
                type="text"
                placeholder="Type your symptoms..."
                className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 transition-all">
                Send
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <FeaturesBentoGrid />
    </div>
  );
}

const Navbar = () => {
  const user = useUser();
  return (
    <nav className="flex w-full items-center justify-between border-b border-neutral-200 px-6 py-4 dark:border-neutral-800 bg-white/70 backdrop-blur-lg dark:bg-black/40">
      <div className="flex items-center gap-3">
       
          <Image src={"/logo.svg"} alt="logo" width={32} height={32}/>
     
        <h1 className="text-lg font-bold tracking-tight md:text-2xl">OnlineMedics</h1>
      </div>
      {!user ? (
        <Button className="w-28 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800">
          <Link href={"/sign-in"}>Login</Link>
        </Button>
      ) : (
        <div className="flex gap-5 items-center">
          <UserButton />
          <Button className="rounded-xl bg-blue-600 text-white hover:bg-blue-700">
            <Link href={"/dashboard"}>Dashboard</Link>
          </Button>
        </div>
      )}
    </nav>
  );
};



