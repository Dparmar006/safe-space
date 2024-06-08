"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Avatar from "../user/Avatar";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { usePostCreateStatus } from "@/hooks/ui";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { extractTextFromLexicalEditor } from "@/utils";

const CreatePost = () => {
  const toggle = usePostCreateStatus((state) => state.toggle);
  const session = useSession();
  const router = useRouter();
  const loggedinUser = session?.data?.user;
  const [post, setPost] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const theme = {
    paragraph:
      "textarea-block textarea bg-transparent border-transparent min-h-fit",
  };

  // Editor updater
  function onError(error) {
    console.error(error);
  }

  const initialConfig = {
    namespace: "create-post",
    theme,
    onError,
    editorState:
      '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}',
  };

  const onChange = (event) => {
    const { root } = event.toJSON();
    const text = extractTextFromLexicalEditor(root);
    setPost(text);
  };

  const createPost = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          content: post,
          authorId: session.data?.user?.id,
        }),
      });
      setPost("");
      toggle();
      router.refresh();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex gap-4 items-center">
        <Avatar image={loggedinUser?.image} username={loggedinUser?.email} />
        <LexicalComposer initialConfig={initialConfig}>
          <PlainTextPlugin
            contentEditable={
              <ContentEditable
                style={{
                  outline: "none",
                  position: "relative",
                  width: "100%",
                }}
              />
            }
            placeholder={
              <div className="absolute p-3 ml-1 pl-16 text-zinc-500 select-none pointer-events-none"></div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <OnChangePlugin onChange={onChange} />
        </LexicalComposer>

        {/* <textarea
          onChange={handleChange}
          disabled={isLoading}
          value={post}
          className="textarea-block textarea bg-transparent border-transparent min-h-fit"
          placeholder="So, How are you feeling today?"
        /> */}
      </div>
      <div className="flex justify-end pt-4">
        <button
          onClick={createPost}
          disabled={isLoading || !post.trim()}
          className="btn btn-primary btn-sm"
        >
          {isLoading ? "Posting..." : "Post"}
        </button>
      </div>
      <div className="divider h-0"></div>
    </>
  );
};

export default CreatePost;
