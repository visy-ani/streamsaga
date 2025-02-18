import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
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

                const isValid = await bcrypt.compare(credentials.password, user.password);
                if(!isValid){
                    throw new Error("Invalid Password");
                }

                return user;
            },
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
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
        async signIn({ user, account }) {
            if (account?.provider === "github") {
                user.password = null;  
            }
            return true;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);