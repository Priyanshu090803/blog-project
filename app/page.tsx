import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import { ArrowRight, BookOpen, Zap, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 font-[family-name:var(--font-geist-sans)]">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
          The{" "}
          <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            Ultimate
          </span>{" "}
          Blog
          <br />
          Platform for Developers
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
          Share your thoughts, tutorials, and insights with a community of
          like-minded individuals. Powered by the modern web.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/blog"
            className="px-8 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-blue-500/25 flex items-center gap-2"
          >
            Start Reading <ArrowRight size={20} />
          </Link>
          <Link
            href="/admin"
            className="px-8 py-3 rounded-full border border-gray-300 dark:border-gray-700 font-semibold hover:bg-gray-100 dark:hover:bg-zinc-900 transition"
          >
            Write a Post
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white dark:bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">
            Everything you need
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="text-yellow-500" />}
              title="Blazing Fast"
              description="Built on Next.js 15 for incredible performance and SEO."
            />
            <FeatureCard
              icon={<BookOpen className="text-blue-500" />}
              title="Rich Content"
              description="Support for Markdown and beautiful typography."
            />
            <FeatureCard
              icon={<Shield className="text-green-500" />}
              title="Secure & Scalable"
              description="Powered by PostgreSQL and tRPC for end-to-end type safety."
            />
          </div>
        </div>
      </section>

      <footer className="py-10 text-center text-gray-500 text-sm">
        © 2024 BlogApp. All rights reserved.
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-gray-800">
      <div className="mb-4 w-12 h-12 rounded-lg bg-white dark:bg-black flex items-center justify-center shadow-sm">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}
