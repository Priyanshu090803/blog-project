"use client";

import { api } from "@/trpc/client";
import { PostCard } from "@/components/PostCard";
import { Navbar } from "@/components/Navbar";
import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { RecentPosts } from "@/components/RecentPosts";

const POSTS_PER_PAGE = 6;

type PostCardPost = {
  id: number;
  title: string;
  slug: string;
  content: string;
  imageUrl?: string | null;
  createdAt: Date | string;
  postsToCategories?: Array<{
    category: {
      id: number;
      name: string;
    };
  }>;
};

export default function BlogListingPage() {
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: categories } = api.category.getAll.useQuery();
  const { data: posts, isLoading } = api.post.getAll.useQuery({
    categoryId: selectedCategory,
  });

  const handleCategoryChange = (categoryId: number | undefined) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const normalizedPosts = useMemo(() => {
    if (!posts) return [];

    if (posts.length > 0 && 'post' in posts[0]) {
      const postMap = new Map<number, PostCardPost>();
      (posts as unknown as Array<{
        post: {
          id: number;
          title: string;
          slug: string;
          content: string;
          imageUrl: string | null;
          createdAt: Date;
        };
        category: {
          id: number;
          name: string;
        };
      }>).forEach((item) => {
        const postId = item.post.id;
        if (!postMap.has(postId)) {
          postMap.set(postId, {
            ...item.post,
            postsToCategories: [],
          });
        }
        postMap.get(postId)!.postsToCategories!.push({
          category: item.category,
        });
      });
      return Array.from(postMap.values());
    }
    return posts as PostCardPost[];
  }, [posts]);

  const totalPages = Math.max(1, Math.ceil((normalizedPosts?.length || 0) / POSTS_PER_PAGE));
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const paginatedPosts = normalizedPosts?.slice(startIndex, endIndex) || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 font-[family-name:var(--font-geist-sans)]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
         <RecentPosts />
        <h1 className="text-3xl font-bold mb-12">All blog posts</h1>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
          <button
            
            onClick={() => handleCategoryChange(undefined)}
            className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
              !selectedCategory
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-zinc-900 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800"
            }`}
          >
            All
          </button>
          {categories?.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={` cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                selectedCategory === cat.id
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-zinc-900 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-64 rounded-xl bg-gray-200 dark:bg-zinc-800 animate-pulse"
              ></div>
            ))}
          </div>
        ) : normalizedPosts?.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">No posts found.</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {paginatedPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {/* Pagination - Always show if there are posts */}
            {normalizedPosts?.length > 0 && (
              <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-800 pt-8 mt-12">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === page
                            ? "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-300"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}