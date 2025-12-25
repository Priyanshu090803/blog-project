"use client";

import { api } from "@/trpc/client";
import { Navbar } from "@/components/Navbar";
import { useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dynamic from 'next/dynamic';
const SimpleMDE =  dynamic(()=>import('react-simplemde-editor'),{ssr:false})

export default function AdminDashboard() {
  const router = useRouter();
  const utils = api.useUtils();
  const [activeTab, setActiveTab] = useState<"posts" | "categories">("posts");

  // Forms State
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [selectedCats, setSelectedCats] = useState<number[]>([]);
  const [catName, setCatName] = useState("");
  const [catDesc, setCatDesc] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [editingPostId, setEditingPostId] = useState<number | null>(null);

  const { data: posts } = api.post.getAll.useQuery();
  const { data: categories } = api.category.getAll.useQuery();

  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      resetPostForm();
      utils.post.getAll.invalidate();
      alert("Post created!");
    },
  });

  const updatePost = api.post.update.useMutation({
    onSuccess: () => {
      resetPostForm();
      utils.post.getAll.invalidate();
      alert("Post updated!");
    },
  });

  const { data: editingPost } = api.post.getById.useQuery(
    { id: editingPostId! },
    { enabled: editingPostId !== null }
  );

  // Load post data into form when editing
  React.useEffect(() => {
    if (editingPost && editingPostId !== null) {
      setPostTitle(editingPost.title);
      setPostContent(editingPost.content);
      setImageUrl(editingPost.imageUrl || "");
      setSelectedCats(
        editingPost.postsToCategories?.map((ptc: { categoryId: number }) => ptc.categoryId) || []
      );
      setFile(null);
    }
  }, [editingPost, editingPostId]);

  const resetPostForm = () => {
    setPostTitle("");
    setPostContent("");
    setSelectedCats([]);
    setFile(null);
    setImageUrl("");
    setEditingPostId(null);
  };

  const deletePost = api.post.delete.useMutation({
    onSuccess: () => utils.post.getAll.invalidate(),
  });

  const createCategory = api.category.create.useMutation({
    onSuccess: () => {
      setCatName("");
      setCatDesc("");
      utils.category.getAll.invalidate();
      alert("Category created!");
    },
  });

  const deleteCategory = api.category.delete.useMutation({
    onSuccess: () => utils.category.getAll.invalidate(),
  });

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();

    // Default to undefined so we don't store an empty string when no image is provided.
    let finalImageUrl: string | undefined = imageUrl.trim() || undefined;

    if (file) {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();

        if (data.secure_url) {
          finalImageUrl = data.secure_url;
          setImageUrl(data.secure_url);
        } else if (data.url) {
          finalImageUrl = data.url;
          setImageUrl(data.url);
        }
      } catch (error) {
        alert("Image upload failed");
        setUploading(false);
        return;
      }
      setUploading(false);
    }


    if (editingPostId) {
      // Update existing post
      updatePost.mutate({
        id: editingPostId,
        title: postTitle,
        content: postContent,
        categoryIds: selectedCats,
        imageUrl: finalImageUrl,
        published: true,
      });
    } else {
      // Create new post
      createPost.mutate({
        title: postTitle,
        content: postContent,
        categoryIds: selectedCats,
        imageUrl: finalImageUrl,
        published: true,
      });
    }
  };

  const handleEditPost = (postId: number) => {
    setEditingPostId(postId);
  };

  const handleCancelEdit = () => {
    resetPostForm();
  };

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    createCategory.mutate({
      name: catName,
      description: catDesc,
    });
  };

  // Toggle category selection
  const toggleCat = (id: number) => {
    if (selectedCats.includes(id)) {
      setSelectedCats(selectedCats.filter((c) => c !== id));
    } else {
      setSelectedCats([...selectedCats, id]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        <div className="flex gap-4 mb-8 border-b border-gray-200 dark:border-gray-800">
          <button
            onClick={() => setActiveTab("posts")}
            className={`pb-4 px-2 font-medium border-b-2 transition-colors ${activeTab === "posts"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
          >
            Posts
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className={`pb-4 px-2 font-medium border-b-2 transition-colors ${activeTab === "categories"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
          >
            Categories
          </button>
        </div>

        {activeTab === "posts" && (
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Create/Edit Post Form */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 h-fit">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">
                  {editingPostId ? "Edit Post" : "Create New Post"}
                </h2>
                {editingPostId && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    Cancel
                  </button>
                )}
              </div>
              <form onSubmit={handleSubmitPost} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-zinc-800 border-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Cover Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-zinc-800 border-none focus:ring-2 focus:ring-blue-600"
                  />
                  {imageUrl && (
                    <div className="mt-3 space-y-1">
                      <p className="text-xs text-green-500">Image attached</p>
                      <div className="relative w-full h-40 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
                        <Image
                          src={imageUrl}
                          alt="Uploaded preview"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Categories
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categories?.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => toggleCat(cat.id)}
                        className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${selectedCats.includes(cat.id)
                          ? "bg-blue-600 border-blue-600 text-white"
                          : "bg-transparent border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400"
                          }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
                 <div>
                  <label className="block text-sm font-medium mb-1">
                    Content (Markdown supported)
                  </label>
                  <textarea
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    className="w-full h-64 px-3 py-2 rounded-lg bg-gray-50 dark:bg-zinc-800 border-none focus:ring-2 focus:ring-blue-600 font-mono text-sm"
                    required
                  />
                </div>  
               
                <button
                  type="submit"
                  disabled={createPost.isPending || updatePost.isPending || uploading}
                  className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {uploading
                    ? "Uploading..."
                    : editingPostId
                    ? updatePost.isPending
                      ? "Updating..."
                      : "Update Post"
                    : createPost.isPending
                    ? "Publishing..."
                    : "Publish Post"}
                </button>
              </form>
            </div>

            {/* Manage Posts */}
            <div>
              <h2 className="text-xl font-bold mb-6">Manage Posts</h2>
              <div className="space-y-4">
                {posts?.map((post) => {
                  // Handle different return types from getAll (filtered vs unfiltered)
                  const postData = "post" in post ? post.post : post;
                  const postId = postData.id;
                  const postTitle = postData.title;
                  const postSlug = postData.slug;
                  const postCreatedAt = postData.createdAt;

                  return (
                    <div
                      key={postId}
                      className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-gray-800"
                    >
                      <div>
                        <h3 className="font-semibold">{postTitle}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(postCreatedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => router.push(`/blog/${postSlug}`)}
                          className="text-sm text-blue-600 hover:underline"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleEditPost(postId)}
                          className="text-sm text-green-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deletePost.mutate({ id: postId })}
                          className="text-sm text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === "categories" && (
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Create Category Form */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 h-fit">
              <h2 className="text-xl font-bold mb-6">Create Category</h2>
              <form onSubmit={handleCreateCategory} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    value={catName}
                    onChange={(e) => setCatName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-zinc-800 border-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={catDesc}
                    onChange={(e) => setCatDesc(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-zinc-800 border-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <button
                  type="submit"
                  disabled={createCategory.isPending}
                  className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {createCategory.isPending ? "Creating..." : "Create Category"}
                </button>
              </form>
            </div>

            {/* Manage Categories */}
            <div>
              <h2 className="text-xl font-bold mb-6">Existing Categories</h2>
              <div className="space-y-2">
                {categories?.map((cat) => (
                  <div
                    key={cat.id}
                    className="flex items-center justify-between p-3 bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-gray-800"
                  >
                    <span className="font-medium">{cat.name}</span>
                    <button
                      onClick={() => deleteCategory.mutate({ id: cat.id })}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
