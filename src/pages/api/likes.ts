import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import prisma from "@/db";
import { authOptions } from "./auth/[...nextauth]";
import Like from "@/components/Like";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user) {
    return res.status(401);
  }

  if (req.method === "POST") {
    // 찜 로직 처리
    const { storeId }: { storeId: number } = req.body;
    // like 가 있는지 확인
    let like = await prisma.like.findFirst({
      where: { storeId, userId: session?.user?.id }
    });
    //만약 이미 찜을 한경우, 해당 like 데이터 삭제! 아니라면 생성

    if (like) {
      //이미 찜을 한 상황
      like = await prisma.like.delete({
        where: {
          id: like.id
        }
      });
      return res.status(204).json(like);
    } else {
      //찜 x
      like = await prisma.like.create({
        data: {
          storeId,
          userId: session.user.id
        }
      });
      return res.status(201).json(like);
    }
  }
}
