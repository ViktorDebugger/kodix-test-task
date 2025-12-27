import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GlowCircle } from "@/components/glow-circle";

export default function NotFound() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <GlowCircle className="top-32 right-0 z-30 hidden size-[350px] translate-x-1/2 blur-[50px] sm:block lg:size-[700px] lg:translate-x-1/3" />
      <div className="relative z-40 flex min-h-screen flex-col items-center justify-center gap-6">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-[#202020]">404</h1>
          <h2 className="mt-4 text-2xl font-semibold text-[#202020]">
            Page Not Found
          </h2>
          <p className="text-label-gray mt-2">
            The page you are looking for does not exist.
          </p>
        </div>
        <div className="flex gap-4">
          <Button
            asChild
            className="bg-dark-green hover:bg-dark-green/80 h-auto rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-300"
          >
            <Link href="/blog">View Blog</Link>
          </Button>
        </div>
      </div>
      <GlowCircle className="bottom-10 left-0 z-30 hidden size-[400px] -translate-x-1/2 blur-[50px] sm:block lg:-bottom-72 lg:size-[800px]" />
    </div>
  );
}
