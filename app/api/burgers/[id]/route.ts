import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);
  await db.read();
  const burger = db.data?.burgers.find((b) => b.id === id);

  if (!burger) {
    return NextResponse.json({ error: "Burger not found" }, { status: 404 });
  }

  return NextResponse.json(burger, { status: 200 });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);
  const updatedData = await request.json();
  await db.read();
  const index = db.data?.burgers.findIndex((b) => b.id === id);

  if (index === undefined || index === -1) {
    return NextResponse.json({ error: "Burger not found" }, { status: 404 });
  }

  db.data!.burgers[index] = { ...db.data!.burgers[index], ...updatedData };
  await db.write();

  return NextResponse.json(db.data!.burgers[index], { status: 200 });
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);
  await db.read();
  const index = db.data?.burgers.findIndex((b) => b.id === id);

  if (index === undefined || index === -1) {
    return NextResponse.json({ error: "Burger not found" }, { status: 404 });
  }

  const [deletedBurger] = db.data!.burgers.splice(index, 1);
  await db.write();

  return NextResponse.json(deletedBurger, { status: 200 });
}
