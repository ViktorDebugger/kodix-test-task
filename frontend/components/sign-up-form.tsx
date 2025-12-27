"use client";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { PasswordField } from "./password-field";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "@/schemas";
import { register } from "@/lib/api/api-auth";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const SignUpForm = () => {
  const router = useRouter();
  const [, setToken] = useLocalStorage<string | null>("token", null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = async (data: z.infer<typeof SignUpSchema>) => {
    try {
      setLoading(true);
      setError(null);
      const response = await register(data);

      if (response?.access_token) {
        setToken(response.access_token);

        await new Promise((resolve) => setTimeout(resolve, 100));

        window.location.href = "/blog";
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldSet className="gap-6">
          <Field className="gap-3">
            <FieldLabel
              htmlFor="email"
              className="text-label-gray text-sm font-medium"
            >
              Email address
            </FieldLabel>
            <Input
              id="email"
              {...registerField("email")}
              autoComplete="off"
              placeholder="Your email address"
              className="h-auto rounded-[4px] p-4 text-sm"
            />
            <FieldError errors={errors.email ? [errors.email] : []} />
          </Field>
          <FieldGroup className="flex flex-row gap-6">
            <Field className="gap-3">
              <FieldLabel
                htmlFor="first-name"
                className="text-label-gray text-sm font-medium"
              >
                First name
              </FieldLabel>
              <Input
                id="first-name"
                {...registerField("firstName")}
                autoComplete="off"
                placeholder="Your first name"
                className="h-auto rounded-[4px] p-4 text-sm"
              />
              <FieldError errors={errors.firstName ? [errors.firstName] : []} />
            </Field>
            <Field className="gap-3">
              <FieldLabel
                htmlFor="last-name"
                className="text-label-gray text-sm font-medium"
              >
                Last name
              </FieldLabel>
              <Input
                id="last-name"
                {...registerField("lastName")}
                autoComplete="off"
                placeholder="Your last name"
                className="h-auto rounded-[4px] p-4 text-sm"
              />
              <FieldError errors={errors.lastName ? [errors.lastName] : []} />
            </Field>
          </FieldGroup>

          <PasswordField register={registerField("password")} />
          {errors.password && <FieldError errors={[errors.password]} />}
        </FieldSet>
        {error && <FieldError className="mt-4">{error}</FieldError>}
      </form>
      <Link
        href="/forgot-password"
        className="text-dark-green hover:text-dark-green/80 mt-4 block text-sm transition-colors duration-300"
      >
        Forgot password?
      </Link>
      <Button
        type="submit"
        onClick={handleSubmit(onSubmit)}
        disabled={isSubmitting || loading}
        className="bg-dark-green hover:bg-dark-green/80 mt-6 h-auto w-full cursor-pointer justify-between rounded-[4px] p-4 pl-6 transition-colors duration-300"
      >
        <span className="bg-green text-sm font-semibold">Sign Up</span>
        <Image
          src="/icons/arrow-right.svg"
          width={16}
          height={16}
          alt="Arrow"
        />
      </Button>
      <p className="text-label-gray mt-6 text-sm">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="text-dark-green hover:text-dark-green/80"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
};
