
"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
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
}

const categoryColors = [
  "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
  "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
  "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300",
  "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300",
];
export function PostCard({ post }: PostCardProps) {
const router=useRouter();

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="group flex flex-col h-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900 hover:shadow-lg transition-shadow duration-300">
      {/* Image Section */}
      {post.imageUrl && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={post.imageUrl}
            alt={post.title || 'Blog post image'}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            width={400}
            height={250}
            priority={false}
          />
        </div>
      )}

      {/* Content Section */}
      <div className="p-6 flex-1 flex flex-col"
      onClick={()=>router.push(`/blog/${post.slug}`)}
      >
        {/* Author and Date */}
        <div className="flex justify-between items-start mb-3">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {post.author || 'Admin'} • {formatDate(post.createdAt)}
          </span>
          <Link 
            href={`/blog/${post.slug}`}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            aria-label="Read more"
          >
            <ArrowUpRight size={18} />
          </Link>
        </div>

        {/* Title */}
        <Link href={`/blog/${post.slug}`} className="group-hover:no-underline">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {post.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {post.content.replace(/[#*`]/g, "").substring(0, 120)}...
        </p>

        {/* Categories */}
        <div className="mt-auto pt-4">
          <div className="flex flex-wrap gap-2">
            {post.postsToCategories?.map((ptc, index) => (
              <span
                key={ptc.category.id}
                className={`text-xs font-medium px-3 py-1 rounded-full ${
                  categoryColors[index % categoryColors.length]
                }`}
              >
                {ptc.category.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}