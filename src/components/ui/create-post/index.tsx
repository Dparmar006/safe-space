"user client";
import { ChangeEvent, useState } from "react";
import { Button } from "../button";
import { Textarea } from "../textarea";
import { useCreatePostMutation } from "@/utils/mutations/posts.mutations";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
function CreatePost() {
  const router = useRouter();
  const { data: session } = useSession();
  const { mutateAsync: createPost, isPending: isCreatePostLoading } =
    useCreatePostMutation();
  const [content, setContent] = useState("");
  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };
  const handleCreatePost = async () => {
    if (!session) {
      toast.error("Please login to create a post");
      return router.replace("/signin");
    }
    await createPost({
      content,
      email: session?.user?.email as string,
    });
    setContent("");
  };
  return (
    <div className="grid w-full gap-2">
      <Textarea
        value={content}
        onChange={handleContentChange}
        placeholder="How are you feeling today?"
      />
      <Button
        onClick={handleCreatePost}
        disabled={isCreatePostLoading || !content.trim()}
      >
        {isCreatePostLoading ? "Posting..." : "Post"}
      </Button>
    </div>
  );
}

export default CreatePost;
