import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
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
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      await connectToDB();
      const userExists = await User.findOne({ email: user.email });

      if (!userExists) {
        await User.create({
          firstName: profile?.name?.split(" ")[0],
          lastName: profile?.name?.split(" ")[1],
          email: profile?.email,
          image: profile?.image,
          googleId: account?.providerAccountId,
        });
      }
      return true;
    },
    async session({ session, token, user }) {
      await connectToDB();

      await User.findOneAndUpdate(
        { email: session.user?.email },
        {
          image: session.user?.image,
        }
      );
      return session;
    },
  },
};