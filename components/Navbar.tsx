"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "motion/react";
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
         <Link href="/" className="group flex items-center gap-1">
      <motion.div
        initial={{ opacity: 0, x: -5 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="relative flex items-center"
      >
        {/* The Text Logo */}
        <span className="font-space-grotesk text-2xl font-bold tracking-tighter text-zinc-900 dark:text-white transition-all duration-300 group-hover:tracking-normal">
          Blog
          <span className="text-zinc-400 dark:text-zinc-500 font-medium transition-colors duration-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100">
            App
          </span>
        </span>

        {/* The "Cozy Dot" - Animated breathing effect */}
        <motion.span
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5] 
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="ml-1 h-1.5 w-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100"
        />

        {/* Subtle Underline Animation */}
        <motion.div 
          className="absolute -bottom-1 left-0 h-[2px] w-0 bg-zinc-900 dark:bg-zinc-100 transition-all duration-300 group-hover:w-full"
        />
      </motion.div>
    </Link>

          <div className="hidden md:flex space-x-8">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/blog">Blog</NavLink>
            <NavLink href="/admin">Dashboard</NavLink>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-200"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink href="/" onClick={() => setIsOpen(false)}>
              Home
            </MobileNavLink>
            <MobileNavLink href="/blog" onClick={() => setIsOpen(false)}>
              Blog
            </MobileNavLink>
            <MobileNavLink href="/admin" onClick={() => setIsOpen(false)}>
              Dashboard
            </MobileNavLink>
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
    >
      {children}
    </Link>
  );
}
