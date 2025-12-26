"use client";
import Image from "next/image";

interface Category {
    id: number;
    name: string;
}

interface AdminPostFormProps {
    onSubmit: (e: React.FormEvent) => Promise<void>;
    isEditing: boolean;
    onCancel: () => void;
    title: string;
    setTitle: (value: string) => void;
    setFile: (file: File | null) => void;
    imageUrl: string;
    categories: Category[] | undefined;
    selectedCats: number[];
    toggleCat: (id: number) => void;
    content: string;
    setContent: (value: string) => void;
    isSubmitting: boolean;
}

export function AdminPostForm({
    onSubmit,
    isEditing,
    onCancel,
    title,
    setTitle,
    setFile,
    imageUrl,
    categories,
    selectedCats,
    toggleCat,
    content,
    setContent,
    isSubmitting,
}: AdminPostFormProps) {
    return (
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 h-fit">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">
                    {isEditing ? "Edit Post" : "Create New Post"}
                </h2>
                {isEditing && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                        Cancel
                    </button>
                )}
            </div>
            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-zinc-800 border-none focus:ring-2 focus:ring-blue-600"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Cover Image</label>
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
                    <label className="block text-sm font-medium mb-1">Categories</label>
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
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full h-64 px-3 py-2 rounded-lg bg-gray-50 dark:bg-zinc-800 border-none focus:ring-2 focus:ring-blue-600 font-mono text-sm"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-40 py-2 bg-[#4f46f2] cursor-pointer text-white rounded-lg font-medium hover:bg-[#4f46f2]/95 transition disabled:opacity-50"
                >
                    {isSubmitting
                        ? "Processing..."
                        : isEditing
                            ? "Update Post"
                            : "Publish Post"}
                </button>
            </form>
        </div>
    );
}
