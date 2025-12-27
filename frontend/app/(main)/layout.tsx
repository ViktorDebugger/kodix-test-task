import { GlowCircle } from "@/components/glow-circle";
import { Header } from "@/components/header";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <GlowCircle className="top-32 right-0 z-30 size-[350px] translate-x-1/2 blur-[50px] lg:size-[700px] lg:translate-x-1/3" />
      <Header />
      <main className="px-4">{children}</main>
      <GlowCircle className="bottom-0 left-0 z-30 size-[400px] -translate-x-1/2 blur-[50px] lg:-bottom-72 lg:size-[800px]" />
    </div>
  );
};

export default MainLayout;
