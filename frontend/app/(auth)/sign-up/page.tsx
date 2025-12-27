"use client";

import { Feature } from "@/components/feature";
import { SignUpForm } from "@/components/sign-up-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const features = [
  {
    id: 1,
    title: "Absolutely FREE",
    icon: "/sign-up/dollar-circle.svg",
    description: "No hidden charges, No credit card required",
  },
  {
    id: 2,
    title: "Fast & Easy",
    icon: "/sign-up/lightning-fast.svg",
    description: "Get access instantly, no downloads required",
  },
  {
    id: 3,
    title: "Your Own Data",
    icon: "/sign-up/user-data.svg",
    description: "Enjoy the Free Trial with your company data",
  },
  {
    id: 4,
    title: "Unlimited Features",
    icon: "/sign-up/star-circle.svg",
    description: "Access all features of the world's #1 buLinkss software!",
  },
];

const SignUpPage = () => {
  const router = useRouter();
  const [token] = useLocalStorage<string | null>("token", null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && token !== null && token !== "") {
      router.replace("/blog");
    }
  }, [token, isMounted, router]);

  if (!isMounted) {
    return null;
  }

  if (token !== null && token !== "") {
    return null;
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-0 md:gap-10">
      <Link href={"/"}>
        <Image src="/logo.png" width={240} height={50} alt="Logo" />
      </Link>
      <div className="flex w-full justify-center p-4">
        <Card className="flex h-full w-full max-w-[750px] flex-row justify-between overflow-hidden rounded-[24px] border-black p-0 sm:max-h-[586px]">
          <div className="flex-1 p-8 pr-8 md:pr-0">
            <CardHeader className="gap-6 p-0">
              <CardTitle className="text-label-gray text-2xl font-semibold">
                Sign up
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <SignUpForm />
            </CardContent>
          </div>
          <div className="hidden w-full max-w-[290px] bg-black px-6 py-8 text-white md:block">
            <h1 className="text-2xl font-semibold">
              Get Your FREE
              <br />
              30-Days Trial Now!
            </h1>
            <ul className="mt-6 flex flex-col gap-4">
              {features.map(({ id, ...data }) => (
                <Feature key={id} data={data} />
              ))}
            </ul>
            <p className="mt-18 text-sm font-semibold">
              Call us at{" "}
              <a href="tel:8001301448" className="text-light-green">
                800 1301 448
              </a>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignUpPage;
