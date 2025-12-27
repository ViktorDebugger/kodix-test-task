"use client";

import { PostInfo } from "@/components/post-info";
import { PostsList } from "@/components/posts-list";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/hooks/use-auth";

const PostPage = () => {
  const { isAuthenticated } = useAuth(true);

  if (isAuthenticated === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isAuthenticated === false) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mx-auto mt-7 mb-40 max-w-[1150px]">
      <div className="flex w-full flex-col justify-between lg:flex-row">
        <PostInfo />
        <PostsList />
      </div>
    </div>
  );
};

export default PostPage;
