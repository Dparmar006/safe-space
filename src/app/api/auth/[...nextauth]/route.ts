import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
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
        console.log("HEYYYYAAA");
        await connectToDB();
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        if (!email || !password)
          throw new Error("Please provide email and password");
        if (typeof email !== "string" || typeof password !== "string")
          throw new Error("Please provide valid email and password");

        const user = await User.findOne({ email }, {}, { lean: true });
        if (!user) throw new Error("Please provide valid email and password");

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid)
          throw new Error("Please provide valid email and password");

        const { password: removed, ...userInfo } = user;

        return { ...userInfo, id: String(userInfo._id) };
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
};

const handlers = NextAuth(authOptions);

export { handlers as GET, handlers as POST };
