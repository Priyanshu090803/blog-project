"use client";
import { api } from "@/trpc/client";
import { useState } from "react";

export function CategoryManager() {
    const utils = api.useUtils();
    const [catName, setCatName] = useState("");
    const [catDesc, setCatDesc] = useState("");

    const { data: categories } = api.category.getAll.useQuery();

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

    const handleCreateCategory = (e: React.FormEvent) => {
        e.preventDefault();
        createCategory.mutate({
            name: catName,
            description: catDesc,
        });
    };

    return (
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
                        className="w-40 py-2 text-white rounded-lg font-medium hover:bg-[#4f46f2]/95 transition disabled:opacity-50 cursor-pointer bg-[#4f46f2]"
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
    );
}
