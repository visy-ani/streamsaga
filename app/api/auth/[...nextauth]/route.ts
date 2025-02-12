import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter, baseprisma } from '@/lib/prisma'
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

const handler = NextAuth({
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
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST};