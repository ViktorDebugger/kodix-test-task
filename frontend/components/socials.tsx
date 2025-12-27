import { cn } from "@/lib/utils";
import Image from "next/image";

const socials = [
  {
    id: 1,
    image: "/socials/facebook.svg",
    href: "https://www.facebook.com",
    label: "Facebook",
  },
  {
    id: 2,
    image: "/socials/x.svg",
    href: "https://x.com",
    label: "X",
  },
  {
    id: 3,
    image: "/socials/youtube.svg",
    href: "https://www.youtube.com",
    label: "YouTube",
  },
];

interface SocialLinkProps {
  image: string;
  href: string;
  label: string;
}

const SocialLink = ({ image, href, label }: SocialLinkProps) => {
  return (
    <li>
      <a href={href}>
        <Image width={24} height={24} src={image} alt={label} />
      </a>
    </li>
  );
};

interface SocialsProps {
  className: string;
}

export const Socials = ({ className }: SocialsProps) => {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <p className="text-sm tracking-[-0.05em]">Share to</p>
      <ul className="flex items-center gap-2">
        {socials.map(({ id, image, href, label }) => (
          <SocialLink key={id} image={image} href={href} label={label} />
        ))}
      </ul>
    </div>
  );
};
