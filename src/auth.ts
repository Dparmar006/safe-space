import NextAuth, { CredentialsSignin } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import User from "./models/user";
import { connectToDB } from "./utils/database";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials, request) => {
        await connectToDB();
        const { email, password } = credentials;
        if (!email || !password)
          throw new CredentialsSignin({
            cause: "Please provide email and password",
          });
        if (typeof email !== "string" || typeof password !== "string")
          throw new CredentialsSignin({
            cause: "Please provide valid email and password",
          });

        const user = await User.findOne({ email }, {}, { lean: true });
        if (!user)
          throw new CredentialsSignin({
            cause: "Please provide valid email and password",
          });

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid)
          throw new CredentialsSignin({
            cause: "Please provide valid email and password",
          });

        const { password: removed, ...userInfo } = user;
        return userInfo;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
});
