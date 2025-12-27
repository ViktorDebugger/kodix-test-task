import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLocalStorage } from "./use-local-storage";

export const useAuth = (requireAuth = false) => {
  const router = useRouter();
  const pathname = usePathname();
  const [token] = useLocalStorage<string | null>("token", null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    const hasToken = token !== null && token !== "";
    setIsAuthenticated(hasToken);

    if (pathname === "/sign-up" || pathname === "/sign-in") {
      return;
    }

    if (requireAuth && !hasToken) {
      const returnUrl = encodeURIComponent(pathname);
      router.push(`/sign-in?returnUrl=${returnUrl}`);
    }
  }, [token, requireAuth, pathname, router, isMounted]);

  return { isAuthenticated, token };
};
