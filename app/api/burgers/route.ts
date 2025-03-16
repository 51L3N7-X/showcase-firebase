// import db from "@/db/db";
import { db } from "@/lib/firebaseAdmin";
import { Burger } from "@/types/Burger";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.NEXTAUTH_SECRET as string;

export async function GET() {
  try {
    const snapshot = await db.collection("burgers").get();
    const burgers = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(burgers || [], { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    jwt.verify(token, SECRET_KEY);
    const newBurger: Omit<Burger, "id"> = await request.json();
    const burgerRef = await db.collection("burgers").add(newBurger);
    const burger = (await burgerRef.get()).data();
    return NextResponse.json({...burger , id: burgerRef.id}, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Invalid Token" }, { status: 403 });
  }
}
