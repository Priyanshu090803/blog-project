
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Navbar } from "@/components/Navbar";
import { ArrowRight, BookOpen, Zap, Shield, Sparkles } from "lucide-react";
const fadeIn = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const blobAnimation = {
  initial: { translate: "0% 0%" },
  animate: {
    translate: ["0% 0%", "5% -5%", "-5% 5%", "0% 0%"],
  },
  transition: {
    duration: 10,
    ease: "easeInOut",
    repeat: Infinity,
    repeatType: "reverse" as const
  }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-gray-900 dark:text-zinc-100 font-[family-name:var(--font-geist-sans)] selection:bg-indigo-100 dark:selection:bg-indigo-900/30 overflow-x-hidden">
      <Navbar />

      <main>
        {/* --- Hero Section --- */}
        <section className="relative pt-40 pb-32">
          {/* Animated Ambient Glow */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none opacity-60 dark:opacity-40">
            <motion.div
              variants={blobAnimation}
              initial="initial"
              animate="animate"
              transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
              className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-orange-200/40 dark:bg-orange-900/20 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-normal"
            />
            <motion.div
              variants={blobAnimation}
              initial="initial"
              animate="animate"
              transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", delay: 2 }}
              className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[60%] bg-indigo-200/40 dark:bg-indigo-900/20 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-normal"
            />
            <motion.div
              variants={blobAnimation}
              initial="initial"
              animate="animate"
              transition={{ duration: 18, repeat: Infinity, repeatType: "reverse", delay: 1 }}
              className="absolute top-[20%] right-[20%] w-[30%] h-[40%] bg-pink-200/40 dark:bg-pink-900/20 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-normal"
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              <motion.div variants={fadeIn} className="flex justify-center mb-8">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md text-gray-600 dark:text-zinc-400 text-sm font-medium border border-gray-200/50 dark:border-zinc-800/50 shadow-sm">
                  <Sparkles size={14} className="text-orange-500" />
                  Introducing BlogApp 2.0
                </span>
              </motion.div>

              <motion.h1
                variants={fadeIn}
                className="text-6xl md:text-8xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-gray-900 via-gray-800 to-gray-500 dark:from-white dark:via-gray-200 dark:to-zinc-500 leading-[1.1]"
              >
                Write. Share. <br />
                <span className="italic font-serif">Stay Cozy.</span>
              </motion.h1>

              <motion.p
                variants={fadeIn}
                className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-zinc-400 mb-12 leading-relaxed"
              >
                A minimal space for your thoughts. Built with speed in mind and designed
                to make your readers feel right at home from day one.
              </motion.p>

              <motion.div
                variants={fadeIn}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Link href="/blog">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 cursor-pointer rounded-full bg-gray-900 dark:bg-white text-white dark:text-black font-semibold text-base flex items-center gap-2 shadow-xl shadow-gray-200 dark:shadow-zinc-900/20 hover:shadow-2xl transition-shadow"
                  >
                    Start Writing <ArrowRight size={18} />
                  </motion.button>
                </Link>
                <Link href="/admin">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 cursor-pointer rounded-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors font-medium"
                  >
                    Dashboard
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* --- Features Section --- */}
        <section className="py-32 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="text-sm font-bold tracking-widest text-gray-500 dark:text-zinc-500 uppercase mb-3">Why Choose Us</h2>
              <h3 className="text-3xl md:text-4xl font-bold">Everything you need, nothing you don't.</h3>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              className="grid md:grid-cols-3 gap-8"
            >
              <FeatureCardWrapper
                icon={<Zap size={24} className="text-yellow-500" />}
                title="Blazing Fast"
                description="Optimized with Next.js 15 for a seamless reading experience that engages your audience instantly."
              />
              <FeatureCardWrapper
                icon={<BookOpen size={24} className="text-blue-500" />}
                title="Mindful Reading"
                description="Beautiful typography and a focus on distraction-free content to let your stories shine."
              />
              <FeatureCardWrapper
                icon={<Shield size={24} className="text-green-500" />}
                title="Safe Space"
                description="Secure authentication and encrypted data storage so you can write with complete peace of mind."
              />
            </motion.div>
          </div>
        </section>


      </main>

      <footer className="py-20 border-t border-gray-100 dark:border-zinc-900 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 dark:text-zinc-500">
          <div className="mb-8 flex justify-center gap-8 font-medium">
            {['Twitter', 'GitHub', 'Privacy', 'Contact'].map((item) => (
              <a key={item} href="#" className="hover:text-gray-900 dark:hover:text-zinc-300 transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gray-900 dark:bg-zinc-300 transition-all group-hover:w-full" />
              </a>
            ))}
          </div>
          <p>© 2024 BlogApp. Crafted with <span className="text-red-500">♥</span> for storytellers.</p>
        </div>
      </footer>
    </div>
  );
}

// Internal Wrapper for Animated Feature Cards
function FeatureCardWrapper({ icon, title, description }: any) {
  return (
    <motion.div
      variants={fadeIn}
      whileHover={{ y: -5 }}
      className="group p-8 rounded-3xl bg-gray-50/50 dark:bg-zinc-900/50 hover:bg-white dark:hover:bg-zinc-900 border border-transparent hover:border-gray-100 dark:hover:border-zinc-800 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-black/50"
    >
      <div className="w-14 h-14 rounded-2xl bg-white dark:bg-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-sm border border-gray-100 dark:border-zinc-700/50">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{title}</h3>
      <p className="text-gray-600 dark:text-zinc-400 leading-relaxed group-hover:text-gray-900 dark:group-hover:text-zinc-300 transition-colors">
        {description}
      </p>
    </motion.div>
  );
}