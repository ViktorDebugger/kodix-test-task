import { cn } from "@/lib/utils";
import Image from "next/image";

interface PostAuthorProps {
  image?: string;
  name: string;
  className?: string;
}

export const PostAuthor = ({ image, name, className }: PostAuthorProps) => {
  return (
    <div
      className={
        cn("border-muted-foreground bg-white flex items-center gap-2 rounded-full border p-1 pr-2",
        className)
      }
    >
      {image ? (
        <Image src={image} width={24} height={24} alt={name} />
      ) : (
        <div className="size-6 rounded-full bg-black/20"></div>
      )}
      <p className="text-sm font-medium tracking-[-0.05em]">{name}</p>
    </div>
  );
};
