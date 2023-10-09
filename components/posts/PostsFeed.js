import { fetchPosts } from "@/actions/posts.actions";
import { DEFAULT_API_LIMIT } from "@/utils/constants";
import InfiniteScrolling from "./InfiniteScrolling";

export default async function PostsFeed() {
  const { posts, totalCount } = JSON.parse(
    JSON.stringify(await fetchPosts({ limit: DEFAULT_API_LIMIT })),
  );
  return (
    <InfiniteScrolling initialPosts={posts} initialTotalCount={totalCount} />
  );
}
