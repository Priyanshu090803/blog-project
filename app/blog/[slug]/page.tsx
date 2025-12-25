"use client";

import { api } from "@/trpc/client";
import { Navbar } from "@/components/Navbar";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { Calendar, User } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { data: post, isLoading } = api.post.getBySlug.useQuery(
    { slug },
    {
      enabled: !!slug,
    }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-32 animate-pulse">
          <div className="h-10 bg-gray-200 dark:bg-zinc-800 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-1/4 mb-12"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 font-[family-name:var(--font-geist-sans)]">
      <Navbar />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <header className="mb-12 text-center">
          {post.imageUrl && (
            <div className="mb-8">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover rounded-xl"
              />
            </div>
          )}
          <div className="flex justify-center gap-2 mb-6 flex-wrap">
            {post.postsToCategories?.map((ptc) => (
              <span
                key={ptc.category.id}
                className="text-sm font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
              >
                {ptc.category.name}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center justify-center text-gray-500 gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              {new Date(post.createdAt).toLocaleDateString(undefined, {
                dateStyle: "long",
              })}
            </div>
            {/* Placeholder for author if we had auth */}
            <div className="flex items-center gap-2">
              <User size={16} />
              Admin
            </div>
          </div>
        </header>

        <div className="prose prose-lg dark:prose-invert mx-auto break-words">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
