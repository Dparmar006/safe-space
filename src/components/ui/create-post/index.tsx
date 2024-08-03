"user client";
import { ChangeEvent, useState } from "react";
import { Button } from "../button";
import { Textarea } from "../textarea";
import { useCreatePostMutation } from "@/utils/mutations/posts.mutations";

function CreatePost() {
  const { mutateAsync: createPost, isPending: isCreatePostLoading } =
    useCreatePostMutation();
  const [content, setContent] = useState("");
  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleCreatePost = async () => {
    await createPost({
      content,
      authorId: "66ae8e47bdec180219c9435f",
    });
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
