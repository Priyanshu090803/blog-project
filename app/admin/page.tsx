"use client";

import { Navbar } from "@/components/Navbar";
import { useState } from "react";
import { PostManager } from "@/components/PostManager";
import { CategoryManager } from "@/components/CategoryManager";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"posts" | "categories">("posts");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        <div className="flex gap-4 mb-8 border-b border-gray-200 dark:border-gray-800">
          <button
            onClick={() => setActiveTab("posts")}
            className={`pb-4 px-2 cursor-pointer font-medium border-b-2 transition-colors ${activeTab === "posts"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
          >
            Posts
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className={`pb-4 px-2 cursor-pointer font-medium border-b-2 transition-colors ${activeTab === "categories"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
          >
            Categories
          </button>
        </div>

        {activeTab === "posts" && <PostManager />}
        {activeTab === "categories" && <CategoryManager />}
      </div>
    </div>
  );
}
