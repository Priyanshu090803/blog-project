
"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

interface PostCardProps {
  post: {
    id: number;
    title: string;
    slug: string;
    content: string;
    imageUrl?: string | null;
    author?: string;
    createdAt: Date | string;
    postsToCategories?: Array<{
      category: {
        id: number;
        name: string;
        color?: string;
      };
    }>;
  };
  orientation?: "vertical" | "horizontal";
}

const categoryColors = [
  "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
  "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
  "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/30 dark:text-fuchsia-300",
  "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
];

export function PostCard({ post, orientation = "vertical" }: PostCardProps) {
  const router = useRouter();
  const isHorizontal = orientation === "horizontal";

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -1 }}
      transition={{ duration: 0.3 }}
      className={`group flex ${isHorizontal ? "flex-col sm:flex-row h-full items-stretch" : "flex-col h-full"
        } rounded-2xl overflow-hidden bg-white dark:bg-zinc-900/50 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300 cursor-pointer`}
      onClick={() => router.push(`/blog/${post.slug}`)}
    >
      {/* Image Section */}
      <div
        className={`relative overflow-hidden ${isHorizontal
            ? "w-full sm:w-[240px] shrink-0 min-h-[200px] sm:min-h-full"
            : "w-full aspect-[4/3]"
          }`}
      >
        {post.imageUrl ? (
          <Image
            src={post.imageUrl}
            alt={post.title || "Blog post image"}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            width={800}
            height={600}
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-violet-100 to-fuchsia-100 dark:from-violet-900/20 dark:to-fuchsia-900/20 flex items-center justify-center">
            <span className="text-violet-300 text-4xl font-bold opacity-20">
              Blog
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className={`flex flex-col flex-1 ${isHorizontal ? "p-6 sm:py-6 sm:pr-6 sm:pl-8" : "p-6"}`}>
        {/* Author and Date */}
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-wide">
            {post.author || "Admin"} • {formatDate(post.createdAt)}
          </span>
          {!isHorizontal && (
            <motion.div
              whileHover={{ rotate: 45, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ArrowUpRight className="text-gray-400 group-hover:text-violet-300 dark:group-hover:text-violet-300 transition-colors" size={20} />
            </motion.div>
          )}
        </div>

        {/* Title */}
        <Link href={`/blog/${post.slug}`} className="block mb-2">
          <h3 className={`font-bold text-gray-900 dark:text-white leading-tight group-hover:text-neutral-800 dark:group-hover:text-violet-300 transition-colors ${isHorizontal ? "text-xl line-clamp-2" : "text-xl"
            }`}>
            {post.title}
          </h3>
        </Link>

        {/* Description */}
        <p className={`text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 ${isHorizontal ? "hidden sm:block" : ""
          }`}>
          {post.content.replace(/[#*`]/g, "").substring(0, 150)}...
        </p>

        {/* Categories */}
        <div className="mt-auto pt-2">
          <div className="flex flex-wrap gap-2">
            {post.postsToCategories?.map((ptc, index) => (
              <span
                key={ptc.category.id}
                className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${categoryColors[index % categoryColors.length]
                  }`}
              >
                {ptc.category.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}