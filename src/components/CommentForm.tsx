import axios from "axios";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface CommentFormProps {
  storeId: number;
  refetch: () => void;
}
export default function CommentForm({ storeId, refetch }: CommentFormProps) {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors }
  } = useForm();
  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        const result = await axios.post("/api/comments", {
          ...data,
          storeId
        });

        if (result.status === 200) {
          toast.success("댓글을 등록했습니다!");
          resetField("body");
          refetch?.();
        } else {
          toast.error("다시 시도해주세요!");
        }
      })}
      className="flex flex-col space-y-2"
    >
      {errors?.body?.type === "required" && (
        <div className="text-xs text-red-600">필수입력 사항입니다.</div>
      )}
      <textarea
        rows={3}
        placeholder="댓글을 작성해 주세요"
        {...register("body", { required: true })}
        className="block w-full min-h-[120px] resize-none border rounded-lg bg-transparent py-2.5 px-4 text-black placeholder:text-gray-400 text-sm leading-6"
      />
      <button
        type="submit"
        className=" bg-green-600 hover:bg-green-400 text-white px-4 py-2 text-sm font-semibold shadow-sm rounded-md mt-2"
      >
        작성하기
      </button>
    </form>
  );
}
