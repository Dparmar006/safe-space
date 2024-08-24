import { useSelectedPost } from "@/app/use-post";
import { IFeedPost } from "@/types/post.types";
import React from "react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import FeedAvatar from "./FeedAvatar";

interface Props {
  post: IFeedPost;
}
const FeedPost: React.FC<Props> = ({ post }) => {
  const [selectedPost, setSelectedPost] = useSelectedPost();
  return (
    <div
      key={post._id.toString()}
      className={cn(
        "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent cursor-pointer",
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
            <FeedAvatar user={post.user} />
            <div className="font-semibold">
              {post.user.firstName} {post.user.lastName}
            </div>
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
        {/* <div className="text-xs font-medium">Community</div> */}
      </div>
      <div className="line-clamp-2 text-xs text-muted-foreground">
        {post.content.substring(0, 300)}
      </div>
    </div>
  );
};

export default FeedPost;
