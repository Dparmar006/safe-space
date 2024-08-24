import { useSelectedPost } from "@/store/use-post";
import { IFeedPost } from "@/types/post.types";
import React from "react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import FeedAvatar from "./FeedAvatar";
import Link from "next/link";
import { Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import { deletePostAction } from "@/actions/posts.actions";
import { ObjectId } from "mongodb";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  post: IFeedPost;
}
const FeedPost: React.FC<Props> = ({ post }) => {
  const { data: session } = useSession();
  const [selectedPost, setSelectedPost] = useSelectedPost();
  const queryClient = useQueryClient();

  const handlePostDelete = async (_id: ObjectId) => {
    const id = toast.loading("Deleting...");
    try {
      await deletePostAction(post._id);
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      toast.success("Post deleted", {
        id,
      });
    } catch (error) {
      toast.error("Could not delete post, Please try again.", {
        id,
      });
    }
  };
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
            <Link href={`/${post.user.username}`} className="font-semibold">
              {post.user.firstName} {post.user.lastName}
            </Link>
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
        {selectedPost.selected === post._id
          ? post.content
          : post.content.substring(0, 300)}
      </div>
      {post.user._id === session?.user._id &&
        selectedPost.selected === post._id && (
          <div className="flex justify-end w-full">
            <Trash
              color="#dc2626"
              size={14}
              onClick={() => handlePostDelete(post._id)}
            />
          </div>
        )}
    </div>
  );
};

export default FeedPost;
