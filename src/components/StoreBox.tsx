import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { FaRegHeart } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { GrMap } from "react-icons/gr";
import {
  AiOutlineInfoCircle,
  AiOutlineCheck,
  AiOutlinePhone
} from "react-icons/ai";
import { StoreType } from "@/interface";
import { useRouter } from "next/router";
import { currentStoreState } from "@/atom";
import { useRecoilState } from "recoil";
import Like from "./Like";

interface StoreBoxProps {
  store: StoreType | null;
  setStore: Dispatch<SetStateAction<any>>;
}

export default function StoreBox() {
  const router = useRouter();
  const [store, setStore] = useRecoilState(currentStoreState);
  return (
    <div className="fixed transition ease-in-out delay-150 inset-x-0 mx-auto bottom-20  rounded-lg shadow-lg max-w-sm md:max-w-xl z-10 w-fill bg-white">
      {store && (
        <>
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div className="flex gap-4 items-center">
                <Image
                  src={
                    store?.category
                      ? `/images/markers/${store?.category}.png`
                      : "images/markers/default.png"
                  }
                  alt="image"
                  width={40}
                  height={40}
                />

                <div>
                  <div className="font-semibold">{store?.name}</div>
                  <div className="text-sm">{store?.storeType}</div>
                </div>
              </div>
              <button type="button" onClick={() => setStore(null)}>
                <IoMdClose />
              </button>
            </div>
            <div className="mt-4 flex justify-between gap-4">
              <div className="flex gap-2 items-center text-sm col-span-3 ">
                <GrMap />
                {store?.address}
              </div>
              <Like storeId={store.id} />
            </div>

            <div className="mt-2 flex gap-2 items-center  ">
              <AiOutlinePhone />
              {store?.phone}
            </div>
            <div className="mt-2 flex gap-2 items-center ">
              <AiOutlineInfoCircle />
              {store?.foodCertifyName}
            </div>
            <div className="mt-2 flex gap-2 items-center ">
              <AiOutlineCheck />
              {store?.category}
            </div>
          </div>
          <button
            type="button"
            onClick={() => router.push(`/stores/${store.id}`)}
            className="w-full bg-green-700 hover:bg-green-500 focus:bg-green-500 py-3 text-white font-semibold rounded-b-lg"
          >
            상세보기
          </button>
        </>
      )}
    </div>
  );
}
