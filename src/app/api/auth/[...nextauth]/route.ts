import { authOptions } from "@/auth";
import NextAuth from "next-auth/next";

const handlers = NextAuth(authOptions);

export { handlers as GET, handlers as POST };
