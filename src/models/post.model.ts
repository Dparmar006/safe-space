import { Schema, model, Document, models, Model } from "mongoose";
import { IPost } from "@/types/post.types";

type IPostsSchema = IPost & Document;

// Define the schema itself
const PostsSchema = new Schema<IPostsSchema>(
  {
    content: {
      type: String,
    },
    images: {
      type: [String],
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Post =
  (models.Post as unknown as Model<IPostsSchema>) ||
  model<IPostsSchema>("Post", PostsSchema);

export default Post;
