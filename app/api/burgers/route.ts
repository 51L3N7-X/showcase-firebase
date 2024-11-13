import db from "@/db/db";
import { Burger } from "@/types/Burger";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await db.read();
  return NextResponse.json(db.data?.burgers || [], { status: 200 });
}

export async function POST(request: NextRequest) {
  const newBurger: Omit<Burger, "id"> = await request.json();
  await db.read();
  const id = Date.now();
  const burger: Burger = { id, ...newBurger };
  db.data?.burgers.push(burger);
  await db.write();

  return NextResponse.json(burger, { status: 201 });
}


