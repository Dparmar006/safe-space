import { IUser } from "@/types/user.types";
import { generateRandomBio } from "@/utils/user.utils";
import { Schema, model, models, Model } from "mongoose";

type IUserDocument = IUser & Document;

const UserSchema = new Schema<IUserDocument>(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "First name is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },
    username: {
      type: String,
      unique: true,
      required: [true, "Username is required"],
    },
    password: {
      type: String,
    },
    googleId: {
      type: String,
    },
    image: {
      type: String,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    bio: {
      type: String,
      default: generateRandomBio("This person", "non-binary"),
    },
  },
  {
    timestamps: true,
  }
);

const User =
  (models?.User as unknown as Model<IUserDocument>) ||
  model<IUserDocument>("User", UserSchema);

export default User;
