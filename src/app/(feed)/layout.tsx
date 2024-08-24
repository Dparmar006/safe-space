import type { Metadata } from "next";
import { DEFAULT_SITE_DESCRIPTION } from "@/utils/constants";
import React from "react";

import { cookies } from "next/headers";
import ResizableLayout from "./ResizableLayout";
export const metadata: Metadata = {
  title: "Find your community, your way, with Untold.",
  description: DEFAULT_SITE_DESCRIPTION,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const layout = cookies().get("react-resizable-panels:layout");
  console.log(layout);
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  return (
    <ResizableLayout
      defaultCollapsed={defaultCollapsed}
      defaultLayout={defaultLayout}
    >
      {children}
    </ResizableLayout>
  );
}
