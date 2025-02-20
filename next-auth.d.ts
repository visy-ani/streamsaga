import { User as PrismaUser } from "@prisma/client";

declare module "next-auth" {
  interface User extends PrismaUser {
    password?: string | null;
    remember?: boolean; 
  }

  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    remember?: boolean;
    exp?: number;
  }
}
