"use client";

import { Fragment, useEffect } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useInView } from "react-intersection-observer";
import { Skeleton } from "@/components/ui/skeleton";
import CreatePost from "@/components/ui/create-post";
import { useGetPostsQuery } from "@/utils/queries/posts.queries";
import FeedPost from "@/components/FeedPost";

interface Props {
  username?: string;
  shouldAllowCreatePost?: boolean;
}
export function PostsList({ username, shouldAllowCreatePost = false }: Props) {
  const [ref, inView] = useInView();
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useGetPostsQuery(username);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  if (status === "pending")
    return (
      <ScrollArea className="h-screen">
        {shouldAllowCreatePost && (
          <>
            <Skeleton className="h-[60px] rounded-lg my-3 mr-3" />
            <Skeleton className="h-[36px] rounded-lg my-3 mr-3" />
          </>
        )}

        {Array.from({ length: 12 }).map((_, index) => (
          <Skeleton key={index} className="h-[100px] rounded-lg my-2 mr-3" />
        ))}
      </ScrollArea>
    );
  if (status === "error") return <p>Error: {error.message}</p>;
  return (
    <>
      {shouldAllowCreatePost && (
        <div className="flex flex-col gap-2 pt-0">
          <CreatePost />
        </div>
      )}
      <ScrollArea className="h-screen mt-4 pr-3">
        <div className="flex flex-col gap-2 pt-0">
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
