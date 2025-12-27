import { cn } from "@/lib/utils";

interface GlowCircleProps {
  className?: string;
}

export const GlowCircle = ({ className }: GlowCircleProps) => {
  return (
    <div
      className={cn(
        "bg-light-green absolute rounded-full",
        className,
      )}
    ></div>
  );
};
