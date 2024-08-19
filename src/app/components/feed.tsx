"use client";

import React from "react";
import {
  AlertCircle,
  Archive,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useSelectedPost } from "../use-post";
import { AccountSwitcher } from "./account-switcher";
import { Nav } from "./nav";
import { PostsList } from "./posts-list";
import { PostDisplay } from "./post-display";
import { IFeedPost } from "@/types/post.types";
import { useAtom } from "jotai";
import { uiAtom } from "@/store/ui.store";

interface MailProps {
  accounts: {
    label: string;
    email: string;
    icon: React.ReactNode;
  }[];
  initialPosts: IFeedPost[];
  totalCount: number;
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export function Feed({
  accounts,
  initialPosts,
  defaultLayout = [265, 440, 655],
  defaultCollapsed = false,
  navCollapsedSize,
}: MailProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [mail] = useSelectedPost();

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
              "min-w-[50px] transition-all duration-300 ease-in-out"
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
              // {
              //   title: "Drafts",
              //   label: "9",
              //   icon: File,
              //   variant: "ghost",
              // },
              // {
              //   title: "Sent",
              //   label: "",
              //   icon: Send,
              //   variant: "ghost",
              // },
              // {
              //   title: "Junk",
              //   label: "23",
              //   icon: ArchiveX,
              //   variant: "ghost",
              // },
              // {
              //   title: "Trash",
              //   label: "",
              //   icon: Trash2,
              //   variant: "ghost",
              // },
              // {
              //   title: "Archive",
              //   label: "",
              //   icon: Archive,
              //   variant: "ghost",
              // },
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
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <Tabs defaultValue="all">
            <div className="flex items-center px-4 py-2">
              <h1 className="text-xl font-bold">{`Here's what's going on...`}</h1>
              <TabsList className="ml-auto">
                <TabsTrigger
                  value="all"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  All posts
                </TabsTrigger>
                {/* <TabsTrigger
                  value="unread"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  Unread
                </TabsTrigger> */}
              </TabsList>
            </div>
            <Separator />
            {/* <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search" className="pl-8" />
                </div>
              </form>
            </div> */}
            <TabsContent value="all" className="my-4">
              <PostsList />
            </TabsContent>
            <TabsContent value="unread" className="m-0">
              <PostsList />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle className="hidden md:flex" withHandle />
        <ResizablePanel
          className="hidden md:block"
          defaultSize={defaultLayout[2]}
        >
          <PostDisplay
            post={
              initialPosts.find((item) => item._id === mail.selected) || null
            }
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
