import { cn } from "@/lib/utils";

interface PostTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const PostTitle = ({ children, className }: PostTitleProps) => {
  return (
    <h1
      className={cn(
        "font-inter mt-5 leading-[1.3] font-semibold",
        className,
      )}
    >
      {children}
    </h1>
  );
};
