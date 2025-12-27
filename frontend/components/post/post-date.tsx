import { cn } from "@/lib/utils";

interface PostDateProps {
  children: React.ReactNode;
  className?: string;
}

export const PostDate = ({ children, className }: PostDateProps) => {
  return (
    <p
      className={cn(
        "text-muted-foreground text-[12px] font-medium tracking-[-0.05em] uppercase",
        className,
      )}
    >
      {children}
    </p>
  );
};
