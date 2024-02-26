import { StoreType } from "@/interface";
import axios from "axios";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { useQuery } from "react-query";

import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

interface LikeProps {
  storeId: number;
}

export default function Like({ storeId }: LikeProps) {
  const { data: session } = useSession();
  const fetchStore = async () => {
    const { data } = await axios(`/api/store?id=${storeId}`);
    return data as StoreType;
  };
  const { data: store, refetch } = useQuery(
    `like-store-${storeId}`,
    fetchStore,
    {
      enabled: !!storeId,
      refetchOnWindowFocus: false
    }
  );

  const toggleLike = async () => {
    if (session?.user && store) {
      try {
        const like = await axios.post("/api/likes", {
          storeId: store.id
        });
        console.log(like);
        if (like.status === 201) {
          toast.success("가게를 찜했습니다!");
        } else {
          toast.warn("취소 했습니다!");
        }
        refetch();
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <button type="button" onClick={() => toggleLike()} className="items-end">
      {/* 로그인된 사용자가 좋아요를 눌렀다면~ */}
      {store?.likes?.length ? (
        <IoMdHeart className="hover:text-red-600 focus:text-red-600 text-red-500" />
      ) : (
        <IoIosHeartEmpty className="hover:text-red-600 focus:text-red-600" />
      )}
    </button>
  );
}
