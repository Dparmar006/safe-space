"use client";

import { Fragment, useEffect } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useSelectedPost } from "../store/use-post";
import { useInView } from "react-intersection-observer";
import { Skeleton } from "@/components/ui/skeleton";
import CreatePost from "@/components/ui/create-post";
import { useGetPostsQuery } from "@/utils/queries/posts.queries";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import FeedPost from "@/components/FeedPost";

export function PostsList() {
  const [ref, inView] = useInView();
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useGetPostsQuery();

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
    <>
      <div className="flex flex-col gap-2 p-4 pt-0">
        <CreatePost />
      </div>
      <ScrollArea className="h-screen">
        <div className="flex flex-col gap-2 p-4 pt-0">
          {data.pages.map((group, i) => (
            <Fragment key={i}>
              {group.data.posts.map((post) => (
                <FeedPost post={post} key={post._id.toString()} />
              ))}
            </Fragment>
          ))}
        </div>
        <div className="block" ref={ref}></div>
        {(isFetching || isFetchingNextPage) && (
          <div>
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-[100px] rounded-xl m-4" />
            ))}
          </div>
        )}
        <div className="w-full flex justify-center py-24">
          {!hasNextPage && (
            <h2 className="text-2xl text-center font-semibold">
              Here, take this tropy for your thumb, It runs too much on social
              media. <br /> <br /> 🏆
            </h2>
          )}
        </div>
      </ScrollArea>
    </>
  );
}
