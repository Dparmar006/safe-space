import { useQuery } from "react-query";
import { getPostsRequest } from "../requests/posts.requests";
import { IPagination } from "@/types/utils/pagination";

export const useGetPosts = (params?: IPagination) => {
  return useQuery(["posts"], async () => getPostsRequest(params));
};
