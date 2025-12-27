"use client";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { UseFormRegisterReturn } from "react-hook-form";

interface PasswordFieldProps {
  id?: string;
  label?: string;
  placeholder?: string;
  className?: string;
  register?: UseFormRegisterReturn;
}

export const PasswordField = ({
  id = "password",
  label = "Password",
  placeholder = "Enter password",
  className,
  register,
}: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Field className={cn("gap-3", className)}>
      <FieldLabel htmlFor={id} className="text-label-gray text-sm font-medium">
        {label}
      </FieldLabel>
      <div className="relative">
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          {...register}
          autoComplete="off"
          placeholder={placeholder}
          className="h-auto rounded-[4px] p-4 text-sm"
        />
        <Button
          type="button"
          className="absolute top-1/2 right-1 -translate-y-1/2 cursor-pointer bg-transparent hover:bg-transparent"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="size-6 text-[#84818A]" />
          ) : (
            <Eye className="size-6 text-[#84818A]" />
          )}
        </Button>
      </div>
    </Field>
  );
};
