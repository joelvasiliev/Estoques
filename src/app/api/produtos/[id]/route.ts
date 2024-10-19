import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { error: "ID do produto não fornecido" },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.product.findUnique({
      where: { id },
      include: {
        photos: true,
        videos: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Produto não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar produto" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  if (!id) {
    return NextResponse.json(
      { error: "ID do produto não fornecido" },
      { status: 400 }
    );
  }
  const body = await req.json();
  if (!body) {
    return NextResponse.json(
      { error: "Corpo da requisição é obrigatório" },
      { status: 400 }
    );
  }

  try {
    const product = await prisma.product.findUniqueOrThrow({ where: { id } });
    const edited_product = {
      name: product.name,
      description: product.description,
      amount_type: product.amount_type,
      amount: product.amount,
    };
    await prisma.product.update({
      where: {
        id,
      },
      data: edited_product,
    });

    return NextResponse.json({
      status: 201,
      data: edited_product,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar produto" },
      { status: 500 }
    );
  }
}
