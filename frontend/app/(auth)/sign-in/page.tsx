"use client";

import { SignInForm } from "@/components/sign-in-form";
import { SignUpForm } from "@/components/sign-up-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SignInPage = () => {
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
        <Card className="m-2 flex h-full max-h-[485px] w-full max-w-[750px] flex-row justify-between overflow-hidden rounded-[24px] border-black p-0">
          <div className="flex-1 p-8 pr-8 md:pr-0">
            <CardHeader className="gap-6 p-0">
              <CardTitle className="text-label-gray text-2xl font-semibold">
                Sign in
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <SignInForm />
            </CardContent>
          </div>
          <div className="hidden w-full max-w-[290px] flex-col justify-center bg-black px-6 py-8 text-center text-white md:flex">
            <div className="flex items-center justify-center gap-2">
              <h1 className="font-roboto text-2xl font-bold">Kodix</h1>
              <div className="border-light-green rounded-[4px] border px-2 py-1">
                <p className="text-light-green h-[15px] text-[12px] font-medium">
                  PRO
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-[#484848]">
              Unlimited traffic, strategic <br />
              support, and AI-driven upsells
            </p>
            <Link
              className="text-light-green mt-6 block font-medium underline underline-offset-4"
              href="/learn-more"
            >
              Learn More
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignInPage;
