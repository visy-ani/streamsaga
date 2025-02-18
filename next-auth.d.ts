import { User as PrismaUser } from "@prisma/client";

declare module "next-auth" {
  interface User extends PrismaUser {
    password?: string | null; 
  }

  interface Session {
    user: User;
  }
}
