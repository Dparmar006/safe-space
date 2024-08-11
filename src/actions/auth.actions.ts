"use server";

import { signIn } from "@/auth";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import bcrypt from "bcryptjs";
import { CredentialsSignin } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";

export const signInAction = async (formData: FormData) => {
  await connectToDB();
  const email = formData.get("email");
  const password = formData.get("password");

  // if (!email || !password) throw new Error("Please provide all valid fields");

  // if (typeof email !== "string" || typeof password !== "string")
  //   throw new Error("Please provide all valid fields");

  // const user = await User.findOne({ email });
  // if (!user) throw new Error("Email or Password is incorrect");

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: true,
      redirectTo: "/",
    });
  } catch (err) {
    console.log(err);
    const error = err as CredentialsSignin;
    return error.cause;
  }
};

export const signUpAction = async (formData: FormData) => {
  await connectToDB();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;

  // if (!email || !password || !firstName || !lastName)
  //   throw new Error("Please provide all valid fields");

  // if (
  //   typeof email !== "string" ||
  //   typeof password !== "string" ||
  //   typeof firstName !== "string" ||
  //   typeof lastName !== "string"
  // )
  //   throw new Error("Please provide all valid fields");

  try {
    const user = await User.findOne({ email });
    if (user) throw new Error("User already exists, Please signin.");
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
  } catch (err) {
    console.log(err);
    const error = err as CredentialsSignin;
    return error.cause;
  }
  return redirect("/signin");
};

export const signInViaGoogle = async () => {
  try {
    await signIn("google");
  } catch (err) {
    const error = err as CredentialsSignin;
    return error.cause;
  }
};
