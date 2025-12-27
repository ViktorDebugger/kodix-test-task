import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface PostData {
  id: number;
  date: string;
  title: string;
  image: string;
  description: string;
}

interface PostItemProps {
  data: PostData;
  orientation: "row" | "col";
}

export const PostItem = ({ data, orientation }: PostItemProps) => {
  return (
    <li className="rounded-[24px] p-2 transition-colors duration-300 hover:bg-black/20">
      <Link
        href={`/blog/${data.id}`}
        className={cn(
          "flex gap-5",
          orientation === "col" ? "flex-col" : "flex-col md:flex-row",
        )}
      >
        <div className="shrink-0 overflow-hidden rounded-[24px]">
          {data.image ? (
            <Image
              src={data.image}
              width={230}
              height={136}
              alt={data.title}
              className="rounded-[24px]"
            />
          ) : (
            <div className="bg-blog-gray h-[136px] w-[242px] rounded-[24px]"></div>
          )}
        </div>

        <div>
          <p className="text-muted-foreground text-sm font-medium tracking-[-0.05em] uppercase">
            {data.date}
          </p>
          <h3 className="mt-5 line-clamp-1 text-[17px] leading-[1.3] font-semibold tracking-[-0.05em]">
            {data.title}
          </h3>
          <p className="text-muted-foreground mt-2 line-clamp-1 text-sm tracking-[-0.05em]">
            {data.description}
          </p>
        </div>
      </Link>
    </li>
  );
};
