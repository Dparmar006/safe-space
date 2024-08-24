"use client";

import Image from "next/image";

import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostsList } from "@/components/posts-list";
import { Separator } from "@/components/ui/separator";

export default function MailPage() {
  // const layout = cookies().get("react-resizable-panels:layout");

  // const defaultLayout = layout ? JSON.parse(layout.value) : undefined;

  return (
    <>
      <div className="hidden">
        <Image
          src="/examples/mail-dark.png"
          width={1280}
          height={727}
          alt="Mail"
          className="hidden dark:block"
        />
        <Image
          src="/examples/mail-light.png"
          width={1280}
          height={727}
          alt="Mail"
          className="block dark:hidden"
        />
      </div>
      <ResizablePanel defaultSize={440} minSize={30}>
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
            </TabsList>
          </div>
          <Separator />

          <TabsContent value="all" className="my-4">
            <PostsList />
          </TabsContent>
          <TabsContent value="unread" className="m-0">
            <PostsList />
          </TabsContent>
        </Tabs>
      </ResizablePanel>
      <ResizableHandle className="hidden md:flex" withHandle />
      <ResizablePanel className="hidden md:block" defaultSize={200}>
        {/* <PostDisplay
          post={initialPosts.find((item) => item._id === mail.selected) || null}
        /> */}
      </ResizablePanel>
    </>
  );
}
