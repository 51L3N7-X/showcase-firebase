import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    accessToken?: string;
    role?: string;
  }

  interface Session {
    user: User;
    accessToken?: string;
  }

  interface JwT {
    id: string;
    accessToken?: string;
  }
}
