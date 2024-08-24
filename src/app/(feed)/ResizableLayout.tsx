"use client";
import type { Metadata } from "next";
import { DEFAULT_SITE_DESCRIPTION, navCollapsedSize } from "@/utils/constants";
import React from "react";
import {
  AlertCircle,
  Archive,
  File,
  Inbox,
  MessagesSquare,
  ShoppingCart,
  Users2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AccountSwitcher } from "@/components/account-switcher";
import { Nav } from "@/components/nav";
import { accounts } from "./data";
import { useAtom } from "jotai";
import { uiAtom } from "@/store/ui.store";
export const metadata: Metadata = {
  title: "Find your community, your way, with Untold.",
  description: DEFAULT_SITE_DESCRIPTION,
};
interface Props {
  children: React.ReactNode;
  defaultLayout: any;
  defaultCollapsed: any;
}
const ResizableLayout: React.FC<Props> = ({
  children,
  defaultLayout,
  defaultCollapsed,
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [uiState] = useAtom(uiAtom);

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`;
        }}
        className="h-full max-h-screen items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onCollapse={() => {
            setIsCollapsed(true);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              true
            )}`;
          }}
          onExpand={() => {
            setIsCollapsed(false);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              false
            )}`;
          }}
          className={cn(
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out",
            "hidden md:block"
          )}
        >
          <div
            className={cn(
              "flex h-[52px] items-center justify-center",
              isCollapsed ? "h-[52px]" : "px-2"
            )}
          >
            <AccountSwitcher isCollapsed={isCollapsed} accounts={accounts} />
          </div>
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Home",
                label: `${uiState.postsCount || 0}`,
                icon: Inbox,
                variant: "default",
              },
              {
                title: "Drafts",
                label: "0",
                icon: File,
                variant: "ghost",
              },
            ]}
          />
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Social",
                label: "0",
                icon: Users2,
                variant: "ghost",
              },
              {
                title: "Updates",
                label: "0",
                icon: AlertCircle,
                variant: "ghost",
              },
              {
                title: "Forums",
                label: "0",
                icon: MessagesSquare,
                variant: "ghost",
              },
              {
                title: "Shopping",
                label: "0",
                icon: ShoppingCart,
                variant: "ghost",
              },
              {
                title: "Promotions",
                label: "0",
                icon: Archive,
                variant: "ghost",
              },
            ]}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        {children}
      </ResizablePanelGroup>
    </TooltipProvider>
  );
};

export default ResizableLayout;
