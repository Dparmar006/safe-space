import { useInfiniteQuery } from "@tanstack/react-query";
import { getPostRequest } from "../requests/posts.requests";
import { useAtom } from "jotai";
import { uiAtom } from "@/store/ui.store";

export const useGetPostsQuery = (username?: string) => {
  const [uiState, setUiState] = useAtom(uiAtom);

  return useInfiniteQuery({
    queryKey: ["posts", username],
    queryFn: async (x) => {
      const response = await getPostRequest(x, username);
      setUiState({ ...uiState, postsCount: response.data.totalCount });
      return response;
    },
    initialPageParam: 1,
    refetchInterval: 60000,
    getNextPageParam: (lastPage) => lastPage.data.nextPage,
  });
};
