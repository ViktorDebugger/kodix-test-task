import { cn } from "@/lib/utils";

interface PostDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const PostDescription = ({
  children,
  className,
}: PostDescriptionProps) => {
  return (
    <p
      className={cn(
        "text-muted-foreground mt-2 text-sm tracking-[-0.05em]",
        className,
      )}
    >
      {children}
    </p>
  );
};
