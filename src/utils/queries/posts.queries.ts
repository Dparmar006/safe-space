import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { IGetPostPayload, getPostRequest } from "../requests/posts.requests";

export const useGetPostsQuery = () => {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: getPostRequest,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });
};
