"use client";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/Icons";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import GoogleAuthenticateButton from "../GoogleAuthenticateButton";
import { signIn } from "next-auth/react";

interface UserSignInFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserSignInForm({ className, ...props }: UserSignInFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form
        action={async (formData) => {
          setIsLoading(true);
          const toastId = toast.loading("Loggin in...");
          const error = await signIn("credentials");
          setIsLoading(false);
          if (!error) {
            toast.success("Login successful", {
              id: toastId,
            });
            router.refresh();
          } else {
            toast.error(String(error), {
              id: toastId,
            });
          }
        }}
      >
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              name="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              required
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              required
              id="password"
              placeholder="********"
              type="password"
              name="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <GoogleAuthenticateButton />
      <p className="text-sm text-muted-foreground">
        Dont have an account?
        <Link href="/signup" className="ml-2 underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
