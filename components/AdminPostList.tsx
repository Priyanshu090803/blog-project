"use client";

interface Post {
    id: number;
    title: string;
    slug: string;
    createdAt: Date | string;
}

interface AdminPostListProps {
    posts: Array<{ post: Post } | Post> | undefined;
    onView: (slug: string) => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

export function AdminPostList({ posts, onView, onEdit, onDelete }: AdminPostListProps) {
    return (
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
                                    onClick={() => onView(postSlug)}
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    View
                                </button>
                                <button
                                    onClick={() => onEdit(postId)}
                                    className="text-sm text-green-600 hover:underline"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(postId)}
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
    );
}
