import { cn } from "@/lib/utils";

interface PostPhotoProps {
  children?: React.ReactNode;
  className?: string;
}

export const PostPhoto = ({ children, className }: PostPhotoProps) => {
  return (
    <div
      className={cn(
        "bg-blog-gray relative mt-5 w-full rounded-[24px]",
        className,
      )}
    >
      {children}
    </div>
  );
};
