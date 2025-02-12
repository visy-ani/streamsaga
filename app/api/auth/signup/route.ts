import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request: Request){
    const body = await request.json();
    const { name, email, password } = body;

    // check for null fields
    if(!name || !email || !password ){
        return NextResponse.json(
            { message: "Name, email, and password are required."},
            { status: 400 }
        );
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: {email}});
    if( existingUser ){
        return NextResponse.json(
            { message: "User already exists." },
            { status: 400 }
        );
    }

    // Hash the password before storing it in database
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create the new User
    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        }
    });

    return NextResponse.json(
        { message: "User created successfully", user: newUser },
        { status: 201 }
    );
}