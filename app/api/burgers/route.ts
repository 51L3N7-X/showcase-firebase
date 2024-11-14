import db from "@/db/db";
import { Burger } from "@/types/Burger";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.NEXTAUTH_SECRET as string;

export async function GET() {
  await db.read();
  return NextResponse.json(db.data?.burgers || [], { status: 200 });
}

export async function POST(request: NextRequest) {
  const token = request.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    jwt.verify(token, SECRET_KEY);
    const newBurger: Omit<Burger, "id"> = await request.json();
    await db.read();
    const id = Date.now();
    const burger: Burger = { id, ...newBurger };
    db.data?.burgers.push(burger);
    await db.write();

    return NextResponse.json(burger, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Invalid Token" }, { status: 403 });
  }
}
