import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    const { owner_id, name, description, amount_type, amount } = data;
    if (
      !owner_id ||
      !name ||
      !description ||
      !amount_type ||
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
        amount,
        owner_id: user.id,
      },
      include: {
        owner: true,
      },
    });

    return NextResponse.json({
      status: 201,
      message: "Produto criado com sucesso",
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
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}
