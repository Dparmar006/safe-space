import { cookies } from "next/headers";
import Image from "next/image";

import { Feed } from "@/app/components/feed";
import { accounts } from "@/app/data";
import { getPostsAction } from "@/actions/posts.actions";
import { auth } from "@/auth";

export default async function MailPage() {
  const layout = cookies().get("react-resizable-panels:layout");
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  const { posts: initialPosts, totalCount } = await getPostsAction();

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
      <div className="flex-col md:flex">
        <Feed
          accounts={accounts}
          initialPosts={initialPosts}
          totalCount={totalCount}
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
          navCollapsedSize={4}
        />
      </div>
    </>
  );
}
