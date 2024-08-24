"use client";

import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const SpotifyAuthenticateButton = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <form
      action={async () => {
        setIsLoading(true);
        const error = await signIn("spotify", {
          redirect: true,
          callbackUrl: "/",
        });
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
          <Icons.music className="mr-2 h-4 w-4" />
        )}{" "}
        Spotify
      </Button>
    </form>
  );
};

export default SpotifyAuthenticateButton;
