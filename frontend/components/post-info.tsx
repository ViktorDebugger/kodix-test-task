"use client";

import { Badge } from "@/components/ui/badge";
import { PostAuthor } from "./post/post-author";
import { PostDate } from "./post/post-date";
import { PostDescription } from "./post/post-description";
import { PostPhoto } from "./post/post-photo";
import { PostTitle } from "./post/post-title";
import { Socials } from "./socials";
import { transformPost, type PostData } from "@/lib/api/api-posts";
import { API_BASE_URL, API_ENDPOINTS } from "@/lib/api/api-config";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Spinner } from "./ui/spinner";

export const PostInfo = () => {
  const params = useParams();
  const postId = params.postId as string;
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;

      try {
        setLoading(true);
        setError(null);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const response = await fetch(
          `${API_BASE_URL}${API_ENDPOINTS.post(Number(postId))}`,
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Post not found");
          }
          throw new Error(`Failed to fetch post: ${response.statusText}`);
        }

        const data = await response.json();
        const transformedPost = transformPost(data);
        setPost(transformedPost);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) {
    return (
      <div className="relative z-40 mt-4 flex w-full max-w-full items-center justify-center py-12 lg:mt-0 lg:max-w-[470px]">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative z-40 max-w-full lg:max-w-[550px]">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="relative z-40 max-w-full lg:max-w-[550px]">
        <p>Post not found</p>
      </div>
    );
  }

  return (
    <div className="relative z-40 max-w-full lg:max-w-[550px]">
      <PostTitle className="text-2xl">{post.title}</PostTitle>
      <PostDescription>{post.description}</PostDescription>

      <div className="mt-5 flex items-center gap-5">
        <PostDate>{post.date}</PostDate>
        <PostAuthor name="John Doe" />
      </div>

      <PostPhoto className="h-60 w-full">
        <Badge className="absolute bottom-5 left-4 rounded-[2px] bg-black/40 px-2 py-1 text-white">
          Photo by Antara
        </Badge>
      </PostPhoto>

      <Socials className="mt-5" />
    </div>
  );
};
