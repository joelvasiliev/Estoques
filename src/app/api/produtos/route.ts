import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log(data);
  try {
    const {
      owner_id,
      name,
      description,
      amount_type,
      amount,
      total_cost,
      price_per,
      price_per_unit,
    } = data;
    if (
      !owner_id ||
      !name ||
      !amount_type ||
      !total_cost ||
      !price_per ||
      !price_per_unit ||
      amount === undefined
    ) {
      throw new Error("Está faltando parâmetros");
    }

    const accepted_types = ["unit", "grams", "liters", "kilos"];
    if (!accepted_types.includes(amount_type))
      throw new Error("Tipo de quantidade não permitido");

    const user = await prisma.user.findUnique({
      where: {
        id: owner_id,
      },
    });
    if (!user) throw new Error("Usuário não encontrado");
    const product = await prisma.product.create({
      data: {
        name,
        description,
        amount_type,
        total_price: total_cost,
        amount,
        owner_id: user.id,
        price_per,
        price_per_unit,
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Dados recebidos com sucesso",
      data: product,
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
  const products = await prisma.product.findMany({
    include: {
      photos: true,
      videos: true,
      orders: true,
    },
  });
  return NextResponse.json(products);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await prisma.product.delete({
    where: { id },
  });
  return NextResponse.json({
    status: 200,
  });
}
