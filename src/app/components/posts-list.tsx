"use client";

import { ComponentProps, Fragment, useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSelectedPost } from "../use-post";
import { IFeedPost } from "@/types/post.types";
import { useInView } from "react-intersection-observer";
import { DEFAULT_API_LIMIT } from "@/utils/constants";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import CreatePost from "@/components/ui/create-post";
import { useGetPostsQuery } from "@/utils/queries/posts.queries";
interface PostsListProps {
  initialPosts: IFeedPost[];
  initialTotalCount: number;
}

export function PostsList({
  initialPosts,
  initialTotalCount = 0,
}: PostsListProps) {
  const { toast } = useToast();
  const [selectedPost, setSelectedPost] = useSelectedPost();
  const [postsList, setPosts] = useState(initialPosts);
  const [totalCount, setTotalCount] = useState(initialTotalCount);
  const [page, setPage] = useState(1);
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

  async function getPosts(paginationPayload: Object) {
    try {
      const searchParams = new URLSearchParams(
        Object.entries(paginationPayload).map(([key, value]) => [
          key,
          String(value),
        ])
      );
      const res = await fetch(`/api/posts?${searchParams.toString()}`, {
        method: "GET",
      });
      if (!res.ok) {
        console.log(res);
        return { data: [], message: "Something went wrong" };
      }
      return await res.json();
    } catch (err) {
      console.log(err);
      const error = err as Error;
      toast({
        variant: "destructive",
        title: error.message,
        description: error?.message,
      });
      return [];
    }
  }

  useEffect(() => {
    debugger;
    async function loadMoreMovies(isReset = false) {
      const next = (isReset ? 0 : page) + 1;
      const { data } = await getPosts({
        page: next,
        limit: DEFAULT_API_LIMIT,
      });
      const { posts, totalCount } = data;
      setTotalCount(totalCount);
      if (posts?.length) {
        setPage(next);
        if (isReset) {
          setPosts(() => [...posts]);
        } else {
          setPosts((prev) => [...(prev?.length ? prev : []), ...posts]);
        }
      }
    }
    if (inView) {
      loadMoreMovies();
    }
    // if (isCreated) {
    //   loadMoreMovies(true);
    //   toggle();
    // }
  }, [inView, page]);

  if (status === "pending") return <p>Loading...</p>;
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
        {/* {postsList.map((post) => (
          
        ))} */}
      </div>

      <div className="w-full flex justify-center py-24">
        {postsList.length < totalCount ? (
          <div ref={ref}>
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-[100px] rounded-xl m-4" />
            ))}
          </div>
        ) : (
          <h2 className="text-2xl text-center font-semibold">
            Here, take this tropy for your thumb, It runs too much on social
            media. <br /> <br /> 🏆
          </h2>
        )}
      </div>
    </ScrollArea>
  );
}
