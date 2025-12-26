"use client";
import { api } from "@/trpc/client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminPostForm } from "./AdminPostForm";
import { AdminPostList } from "./AdminPostList";

export function PostManager() {
    const router = useRouter();
    const utils = api.useUtils();

    const [postTitle, setPostTitle] = useState("");
    const [postContent, setPostContent] = useState("");
    const [selectedCats, setSelectedCats] = useState<number[]>([]);
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

    const deletePost = api.post.delete.useMutation({
        onSuccess: () => utils.post.getAll.invalidate(),
    });

    const { data: editingPost } = api.post.getById.useQuery(
        { id: editingPostId! },
        { enabled: editingPostId !== null }
    );

    // Load post data into form when editing
    useEffect(() => {
        if (editingPost && editingPostId !== null) {
            setPostTitle(editingPost.title);
            setPostContent(editingPost.content);
            setImageUrl(editingPost.imageUrl || "");
            setSelectedCats(
                editingPost.postsToCategories?.map(
                    (ptc: { categoryId: number }) => ptc.categoryId
                ) || []
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

    const handleSubmitPost = async (e: React.FormEvent) => {
        e.preventDefault();

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

    const handleDeletePost = (postId: number) => {
        deletePost.mutate({ id: postId });
    };

    const handleCancelEdit = () => {
        resetPostForm();
    };

    const handleViewPost = (slug: string) => {
        router.push(`/blog/${slug}`);
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
        <div className="grid lg:grid-cols-2 gap-12">
            <AdminPostForm
                onSubmit={handleSubmitPost}
                isEditing={editingPostId !== null}
                onCancel={handleCancelEdit}
                title={postTitle}
                setTitle={setPostTitle}
                setFile={setFile}
                imageUrl={imageUrl}
                categories={categories}
                selectedCats={selectedCats}
                toggleCat={toggleCat}
                content={postContent}
                setContent={setPostContent}
                isSubmitting={createPost.isPending || updatePost.isPending || uploading}
            />

            <AdminPostList
                posts={posts}
                onView={handleViewPost}
                onEdit={handleEditPost}
                onDelete={handleDeletePost}
            />
        </div>
    );
}
