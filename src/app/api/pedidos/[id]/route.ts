import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { error: "ID do pedido não fornecido" },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.order.findUnique({
      where: { id },
      include: {
        product: true,
        user: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "pedido não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar pedido" },
      { status: 500 }
    );
  }
}

// export async function PUT(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const { id } = params;
//   if (!id) {
//     return NextResponse.json(
//       { error: "ID do pedido não fornecido" },
//       { status: 400 }
//     );
//   }
//   const body = await req.json();
//   if (!body) {
//     return NextResponse.json(
//       { error: "Corpo da requisição é obrigatório" },
//       { status: 400 }
//     );
//   }

//   try {
//     const order = await prisma.order.findUniqueOrThrow({ where: { id } });
//     const edited_order = {

//     };
//     await prisma.order.update({
//       where: {
//         id,
//       },
//       data: edited_order,
//     });

//     return NextResponse.json({
//       status: 201,
//       data: edited_order,
//     });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Erro ao buscar pedido" },
//       { status: 500 }
//     );
//   }
// }
