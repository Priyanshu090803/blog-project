"use client";

import { api } from "@/trpc/client";
import { PostCard } from "./PostCard";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" }
};

export function RecentPosts() {
    const { data: posts, isLoading } = api.post.getAll.useQuery({});

    const recentPosts = posts
        ? (posts as any[]).slice(0, 3).map((item) => {
            // Handle if item is { post, category } or just post
            if ('post' in item) {
                return {
                    ...item.post,
                    postsToCategories: [{ category: item.category }]
                }
            }
            return item;
        })
        : [];

    if (isLoading) {
        return (
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div className="h-8 w-48 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse"></div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-[400px] rounded-3xl bg-gray-200 dark:bg-zinc-800 animate-pulse"></div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (recentPosts.length === 0) return null;

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background blobs for this section */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-200/10 dark:bg-indigo-900/10 blur-[100px] rounded-full -z-10 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400 text-xs font-medium mb-4 border border-violet-100 dark:border-violet-900/50">
                            <Sparkles size={12} />
                            Fresh Content
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-zinc-100 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-zinc-500">
                            Latest from the blog
                        </h2>
                        <p className="text-gray-600 dark:text-zinc-400 max-w-xl text-lg">
                            Thoughts, tutorials, and insights about design, development, and everything in between.
                        </p>
                    </motion.div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 items-stretch">
                    {/* Left Column - Featured Post */}
                    {recentPosts[0] && (
                        <div className="lg:col-span-1 h-full">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="h-full"
                            >
                                <PostCard post={recentPosts[0]} orientation="vertical" />
                            </motion.div>
                        </div>
                    )}

                    {/* Right Column - Stacked Posts */}
                    <div className="lg:col-span-1 flex flex-col gap-6 h-full">
                        {recentPosts.slice(1, 3).map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.15 }}
                                className="flex-1"
                            >
                                <PostCard post={post} orientation="horizontal" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
