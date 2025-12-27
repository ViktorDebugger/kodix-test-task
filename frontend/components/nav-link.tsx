"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  label: string;
  href: string;
}

export const NavLink = ({ label, href }: NavLinkProps) => {
  const pathname = usePathname();

  return (
    <li className="py-2 px-4">
      <Link
        href={href}
        className={cn(
          "font-medium text-sm tracking-[-0.05em]",
          pathname === href
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground/70"
        )}
      >
        {label}
      </Link>
    </li>
  );
};
