import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
        return NextResponse.json(
            { success: false, message: "Email and password are required." },
            { status: 400 }
        );
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        return NextResponse.json(
            { success: false, message: "User not found." },
            { status: 404 }
        );
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
        return NextResponse.json(
            { success: false, message: "Invalid password." },
            { status: 401 }
        );
    }

    return NextResponse.json({ success: true, message: "Login successful." });
};
