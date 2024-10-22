import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    return NextResponse.json({
      status: 200,
      message: "Dados recebidos com sucesso",
      data: {},
    });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({
      status: 400,
      message: e.message || "Bad request",
    });
  }
}

export async function GET(req: NextRequest) {
  const orders = await prisma.order.findMany({
    include: {
      product: true,
      user: true,
    },
  });
  return NextResponse.json(orders);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await prisma.order.delete({
    where: { id },
  });
  return NextResponse.json({
    status: 200,
  });
}
