"use client";

import { signInViaGoogle } from "@/actions/auth.actions";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const GoogleAuthenticateButton = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <form
      action={async () => {
        setIsLoading(true);

        const error = await signInViaGoogle();
        if (!error) {
          toast.success("Welcome abord", {});
          router.refresh();
        } else {
          toast.error(String(error), {});
        }
        setIsLoading(false);
      }}
    >
      <Button
        className="w-full"
        variant="outline"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </form>
  );
};

export default GoogleAuthenticateButton;
