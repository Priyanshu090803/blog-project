import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Hero(){
    return(
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

    )
}