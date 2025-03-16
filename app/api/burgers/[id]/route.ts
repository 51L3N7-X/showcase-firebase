// import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { db } from "@/lib/firebaseAdmin";

const SECRET_KEY = process.env.NEXTAUTH_SECRET as string;

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const docRef = await db.collection("burgers").doc(id).get();
    const burger = docRef.data();

    if (!burger) {
      return NextResponse.json({ error: "Burger not found" }, { status: 404 });
    }

    return NextResponse.json(burger, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    jwt.verify(token, SECRET_KEY);

    const { id } = params;
    const updatedData = await request.json();

    const burgerRef = db.collection("burgers").doc(id);
    await burgerRef.update(updatedData);

    const updatedDoc = await burgerRef.get();
    if (!updatedDoc.exists) {
      return NextResponse.json(
        { message: "Burger not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { ...updatedDoc.data(), id: updatedDoc.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating burger:", error);
    return NextResponse.json(
      { message: "Invalid Token or Update Failed" },
      { status: 403 }
    );
  }
}
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    jwt.verify(token, SECRET_KEY);
    const id = params.id;
    await db.collection("burgers").doc(id).delete();

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Invalid Token" }, { status: 403 });
  }
}
