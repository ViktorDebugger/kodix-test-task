"use client";

import Image from "next/image";
import { NavLink } from "./nav-link";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Menu } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const routes = [
  {
    id: 1,
    label: "Home",
    href: "/home",
  },
  {
    id: 2,
    label: "Feature",
    href: "/feature",
  },
  {
    id: 3,
    label: "Blog",
    href: "/blog",
  },
  {
    id: 4,
    label: "Testimonials",
    href: "/testimonials",
  },
];

export const Header = () => {
  const router = useRouter();
  const [token, setToken] = useLocalStorage<string | null>("token", null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setIsAuthenticated(token !== null && token !== "");
  }, [token]);

  const handleLogout = () => {
    setToken(null);
    router.push("/blog");
    router.refresh();
  };

  if (!isMounted) {
    return null;
  }

  return (
    <header className="border-b border-black/10 pt-8 pb-6">
      <div className="mx-auto w-full max-w-[1340px]">
        <div className="flex items-center justify-between">
          <nav className="hidden p-1 md:block">
            <ul className="flex items-center">
              {routes.map(({ id, label, href }) => (
                <NavLink key={id} label={label} href={href} />
              ))}
            </ul>
          </nav>

          <Drawer direction="left">
            <DrawerTrigger className="ml-4 block md:hidden" asChild>
              <Button
                size={"icon"}
                className="border-muted-foreground border bg-transparent hover:bg-transparent flex justify-center items-center"
              >
                <Menu className="size-6 text-black" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle></DrawerTitle>
              </DrawerHeader>
              <ul className="flex flex-col text-2xl">
                {routes.map(({ id, label, href }) => (
                  <NavLink key={id} label={label} href={href} />
                ))}
              </ul>
              <div className="mt-8 flex gap-2">
                {isAuthenticated ? (
                  <DrawerClose asChild>
                    <Button
                      onClick={handleLogout}
                      className="border-dark-green bg-dark-green/90 hover:bg-dark-green h-auto w-28 cursor-pointer rounded-full border py-2.5 text-sm font-semibold tracking-[-0.05em] text-white transition-colors duration-300"
                    >
                      Logout
                    </Button>
                  </DrawerClose>
                ) : (
                  <>
                    <DrawerClose asChild>
                      <Button
                        className="h-auto w-28 rounded-full border border-black/10 bg-transparent py-2.5 text-sm font-medium tracking-[-0.05em] text-black transition-colors duration-300 hover:bg-black/10"
                        asChild
                      >
                        <Link href="/sign-in">Log In</Link>
                      </Button>
                    </DrawerClose>
                    <DrawerClose asChild>
                      <Button
                        className="border-dark-green bg-dark-green/90 hover:bg-dark-green h-auto w-28 rounded-full border py-2.5 text-sm font-semibold tracking-[-0.05em] text-white transition-colors duration-300"
                        asChild
                      >
                        <Link href="/sign-up">Sign Up</Link>
                      </Button>
                    </DrawerClose>
                  </>
                )}
              </div>
            </DrawerContent>
          </Drawer>

          <Link href="/" className="mr-4 md:mr-0">
            <Image
              src="/logo.png"
              width={600}
              height={250}
              alt="Logo"
              className="h-7 w-40"
            />
          </Link>

          <div className="hidden w-[310px] shrink-0 items-center justify-end gap-2 pr-4 md:flex">
            {isAuthenticated ? (
              <Button
                onClick={handleLogout}
                className="border-dark-green bg-dark-green/90 hover:bg-dark-green h-auto w-24 cursor-pointer rounded-full border py-2.5 text-sm font-semibold tracking-[-0.05em] text-white transition-colors duration-300 lg:w-28"
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  className="h-auto w-24 rounded-full border border-black/10 bg-transparent py-2.5 text-sm font-medium tracking-[-0.05em] text-black transition-colors duration-300 hover:bg-black/10 lg:w-28"
                  asChild
                >
                  <Link href="/sign-in">Log In</Link>
                </Button>
                <Button
                  className="border-dark-green bg-dark-green/90 hover:bg-dark-green h-auto w-24 rounded-full border py-2.5 text-sm font-semibold tracking-[-0.05em] text-white transition-colors duration-300 lg:w-28"
                  asChild
                >
                  <Link href="/sign-up">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
