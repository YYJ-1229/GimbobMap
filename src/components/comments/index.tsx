/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import CommentForm from "../CommentForm";
import axios from "axios";
import { useRouter } from "next/router";
import { CommentApiResponse } from "@/interface";
import { useQuery } from "react-query";
import CommentList from "./CommentList";
import Pagination from "../Pagination";

interface CommentProps {
  storeId: number;
}
export default function Comments({ storeId }: CommentProps) {
  const { status } = useSession();
  const router = useRouter();
  const { page = "1" }: any = router.query;

  const fetchComments = async () => {
    const { data } = await axios(
      `/api/comments?storeId=${storeId}&limit=5&page=${page}`
    );
    return data as CommentApiResponse;
  };

  const { data: comments, refetch } = useQuery(
    `comment-${storeId}-${page}`,
    fetchComments
  );

  return (
    <div className="md:max-w-2xl py-8 px-2 mb-20 mx-auto">
      {status === "authenticated" && (
        <div className="">
          <CommentForm storeId={storeId} refetch={refetch} />
        </div>
      )}
      <CommentList comments={comments} />
      {/* pagenation */}

      <Pagination page={page} pathname={`/stores/${storeId}`} />
    </div>
  );
}
