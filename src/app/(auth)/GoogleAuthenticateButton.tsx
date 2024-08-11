"use client";

import { signInViaGoogle } from "@/actions/auth.actions";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const GoogleAuthenticateButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <form
      action={async () => {
        setIsLoading(true);
        await signInViaGoogle();
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
