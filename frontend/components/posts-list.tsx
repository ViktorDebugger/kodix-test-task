"use client";

import { PostItem } from "@/components/post-item";
import { Button } from "@/components/ui/button";
import { transformPost, type PostData } from "@/lib/api/api-posts";
import { API_BASE_URL, API_ENDPOINTS } from "@/lib/api/api-config";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Spinner } from "./ui/spinner";
import Link from "next/link";

export const PostsList = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.posts}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch posts: ${response.statusText}`);
        }

        const data = await response.json();
        const transformedPosts = data.map(transformPost).splice(0, 10);
        setPosts(transformedPosts);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="relative z-40 mt-4 flex w-full max-w-full items-center justify-center py-12 lg:mt-0 lg:max-w-[470px]">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative z-40 mt-4 w-full max-w-full lg:mt-0 lg:max-w-[470px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/icons/file.svg" width={18} height={18} alt="File" />
            <h3 className="text-xl font-medium tracking-[-0.05em]">
              Related Articles
            </h3>
          </div>
        </div>
        <p className="mt-9.5 text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="relative z-40 mt-4 w-full max-w-full lg:mt-0 lg:max-w-[470px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/icons/file.svg" width={18} height={18} alt="File" />
          <h3 className="text-xl font-medium tracking-[-0.05em]">
            Related Articles
          </h3>
        </div>
        <Button
          className="h-auto w-28 cursor-pointer rounded-full border border-black/10 bg-white py-2.5 text-sm tracking-[-0.05em] text-black transition-colors duration-300 hover:bg-white/70"
          asChild
        >
          <Link href={"/blog"}>Read more</Link>
        </Button>
      </div>

      <ul className="mt-9.5 flex flex-col gap-7">
        {posts.map(({ ...data }) => (
          <PostItem key={data.id} data={data} orientation="row" />
        ))}
      </ul>
    </div>
  );
};
