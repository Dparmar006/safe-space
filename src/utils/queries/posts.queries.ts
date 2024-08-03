import { useInfiniteQuery } from "@tanstack/react-query";
import { getPostRequest } from "../requests/posts.requests";
import { useAtom } from "jotai";
import { uiAtom } from "@/store/ui.store";

export const useGetPostsQuery = () => {
  const [uiState, setUiState] = useAtom(uiAtom);

  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: async (x) => {
      const response = await getPostRequest(x);
      setUiState({ ...uiState, postsCount: response.data.totalCount });
      return response;
    },
    initialPageParam: 0,
    refetchInterval: 10000,
    getNextPageParam: (lastPage, pages) => lastPage.data.nextPage,
  });
};
