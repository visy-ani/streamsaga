import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import { PrismaAdapter, baseprisma } from '@/lib/prisma'
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(baseprisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "email@example.com"},
                password: { label: "Password", type: "password"},
            },
            async authorize(credentials){
                if(!credentials?.email || !credentials?.password){
                    throw new Error("Email and password are required");
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if(!user){
                    throw new Error("No user found with this email");
                }

                const isValid = await bcrypt.compare(credentials.password, user.password!);
                if(!isValid){
                    throw new Error("Invalid Password");
                }

                return user;
            },
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID!,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
        })

    ],
    debug: true,
    pages: {
        signIn: "/auth/login",
    },
    session: {
        strategy: "jwt" as const,
    },
    callbacks: {
        async signIn({ user, account}) {
            if (account?.provider === "google" || account?.provider === "github") {
                const existingUser = await prisma.user.findUnique({
                  where: { email: user.email! },
                  include: { accounts: true },
                });
        
                if (existingUser) {
                  const accountExists = existingUser.accounts.some(
                    (acc) => acc.provider === account.provider
                  );
        
                  if (!accountExists) {
                    await prisma.account.create({
                      data: {
                        userId: existingUser.id,
                        provider: account.provider,
                        providerAccountId: account.providerAccountId,
                        type: account.type,
                        access_token: account.access_token,
                        expires_at: account.expires_at,
                        token_type: account.token_type,
                      },
                    });
                  }
                }
              }
              return true;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);