import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email_verified?: boolean;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
