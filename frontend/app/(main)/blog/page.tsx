"use client";

import { PostItem } from "@/components/post-item";
import { PostAuthor } from "@/components/post/post-author";
import { PostDate } from "@/components/post/post-date";
import { PostDescription } from "@/components/post/post-description";
import { PostPhoto } from "@/components/post/post-photo";
import { PostTitle } from "@/components/post/post-title";
import { Socials } from "@/components/socials";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { PostData, transformPost } from "@/lib/api/api-posts";
import { API_BASE_URL, API_ENDPOINTS } from "@/lib/api/api-config";
import Image from "next/image";
import { useEffect, useState } from "react";

const BlogPage = () => {
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
        const transformedPosts = data.map(transformPost).slice(0, 5);
        setPosts(transformedPosts);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="relative z-40 mt-8 mb-32 flex flex-col items-center text-center">
      <div className="flex items-center justify-center gap-2">
        <Image src="/icons/star.svg" width={18} height={18} alt="Star" />
        <p className="text-xl font-medium tracking-[-0.05em]">Featured</p>
      </div>
      <PostTitle className="text-2xl lg:text-[32px]">
        Global Climate Summit
        <br />
        Urges Immediate Action
      </PostTitle>
      <PostDescription className="max-w-[640px] lg:max-w-full">
        Leaders from around the world gathered for a global climate summit,
        emphasizing the urgent need for coordinated action to address climate
        change.
      </PostDescription>

      <div className="mt-5 flex items-center justify-center gap-5">
        <PostDate>wednesday 12, march 2024</PostDate>
        <PostAuthor name="John Doe" />
      </div>

      <PostPhoto className="relative z-10 h-[340px] max-w-[900px]">
        <Badge className="absolute bottom-5 left-4 rounded-[2px] bg-black/40 px-2 py-1 text-white">
          Photo by Antara
        </Badge>
      </PostPhoto>

      <Socials className="mt-5 justify-center" />

      <div className="border-outline-gray relative z-10 mt-12 w-full max-w-[1350px] rounded-[24px] border bg-white p-3 [box-shadow:0px_8px_17px_0px_rgba(194,194,194,0.1),0px_30px_30px_0px_rgba(194,194,194,0.09)] sm:p-5">
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Spinner />
          </div>
        )}
        {error && (
          <p className="py-4 text-center text-red-500">Error: {error}</p>
        )}
        {!loading && !error && (
          <ul className="flex flex-col items-center justify-between gap-3 overflow-x-auto text-left sm:justify-between sm:gap-1 md:flex-row">
            {posts.map(({ ...data }) => (
              <PostItem key={data.id} data={data} orientation="col" />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
