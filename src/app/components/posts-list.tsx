"use client";

import { Fragment, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSelectedPost } from "../use-post";
import { IFeedPost } from "@/types/post.types";
import { useInView } from "react-intersection-observer";
import { Skeleton } from "@/components/ui/skeleton";
import CreatePost from "@/components/ui/create-post";
import { useGetPostsQuery } from "@/utils/queries/posts.queries";

export function PostsList() {
  const [selectedPost, setSelectedPost] = useSelectedPost();
  const [ref, inView] = useInView({ triggerOnce: true });
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useGetPostsQuery();
  console.log({ hasNextPage, isFetching, isFetchingNextPage, status });
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  if (status === "pending")
    return (
      <ScrollArea className="h-screen">
        <Skeleton className="h-[60px] rounded-lg mx-4 my-3" />
        <Skeleton className="h-[36px] rounded-lg mx-4 my-3" />

        {Array.from({ length: 12 }).map((_, index) => (
          <Skeleton key={index} className="h-[100px] rounded-lg mx-4 my-2" />
        ))}
      </ScrollArea>
    );
  if (status === "error") return <p>Error: {error.message}</p>;
  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2 p-4 pt-0">
        <CreatePost />
      </div>
      <div className="flex flex-col gap-2 p-4 pt-0">
        {data.pages.map((group, i) => (
          <Fragment key={i}>
            {group.data.posts.map((post) => (
              <button
                key={post._id.toString()}
                className={cn(
                  "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                  selectedPost.selected === post._id && "bg-muted"
                )}
                onClick={() =>
                  setSelectedPost({
                    ...selectedPost,
                    selected: post._id,
                  })
                }
              >
                <div className="flex w-full flex-col gap-1">
                  <div className="flex items-center">
                    <div className="flex items-center gap-2">
                      <div className="font-semibold">
                        {post.user.firstName} {post.user.lastName}
                      </div>
                      {/* {!item.read && (
                    <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                  )} */}
                    </div>
                    <div
                      className={cn(
                        "ml-auto text-xs",
                        selectedPost.selected === post._id
                          ? "text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {formatDistanceToNow(new Date(post.createdAt), {
                        addSuffix: true,
                      })}
                    </div>
                  </div>
                  <div className="text-xs font-medium">
                    Community
                    {/* {item.subject} */}
                  </div>
                </div>
                <div className="line-clamp-2 text-xs text-muted-foreground">
                  {post.content.substring(0, 300)}
                </div>
                {/* {item.labels.length ? (
              <div className="flex items-center gap-2">
                {item.labels.map((label) => (
                  <Badge key={label} variant={getBadgeVariantFromLabel(label)}>
                    {label}
                  </Badge>
                ))}
              </div>
            ) : null} */}
              </button>
            ))}
          </Fragment>
        ))}
      </div>
      <span ref={ref}></span>
      {isFetching ||
        (isFetchingNextPage && (
          <div>
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-[100px] rounded-xl m-4" />
            ))}
          </div>
        ))}
      <div className="w-full flex justify-center py-24">
        {!hasNextPage && (
          <h2 className="text-2xl text-center font-semibold">
            Here, take this tropy for your thumb, It runs too much on social
            media. <br /> <br /> 🏆
          </h2>
        )}
      </div>
    </ScrollArea>
  );
}
