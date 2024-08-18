"use client";

import { SessionProvider } from "next-auth/react";

import React from "react";
interface Props {
  children: React.ReactNode;
}
const NextSessionProvider: React.FC<Props> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextSessionProvider;
