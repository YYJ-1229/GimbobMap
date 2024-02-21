import { GrGoogle } from "react-icons/gr";
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function LoginPage() {
  const { status, data } = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   if (status === "authenticated") {
  //     router.replace("/");
  //   }
  // }, [router, status]);

  return (
    <div className="flex flex-col justify-center px-6 lg:px-8 h-[60vh]">
      <div className="mx-auto w-full max-w-sm">
        <div className="text-green-800 text-center text-2xl font-bold italic">
          Gimbog
        </div>
        <div className="text-center mt-6 text-2xl font-bold text-gray-600">
          SNS 계정으로 로그인 해주세요
        </div>
        <p className="text-center mt-2 text-sm text-gray-600">
          계정이 없다면 자동으로 회원가입이 진행됩니다.
        </p>
      </div>
      <div className="mt-10 mx-auto w-full max-w-sm">
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="text-white gap-3 flex bg-[#4285F4] hover:bg-[#4285F4]/90 font-medium rounded-lg w-full px-5 py-4 text-center items-center justify-center"
          >
            <GrGoogle className="w-6 h-6" />
            Sign in with Google
          </button>
          <button
            type="button"
            onClick={() => signIn("naver", { callbackUrl: "/" })}
            className="text-white gap-3 flex bg-[#2db400] hover:bg-[#2db400]/90 font-medium rounded-lg w-full px-5 py-4 text-center items-center justify-center"
          >
            <SiNaver className="w-5 h-6" />
            Sign in with Naver
          </button>
          {/* <button
            type="button"
            onClick={() => signIn("kakao")}
            className="text-black gap-3 flex bg-[#f2f01b] hover:bg-[#f2f01b]/90 font-medium rounded-lg w-full px-5 py-4 text-center items-center justify-center"
          >
            <RiKakaoTalkFill className="w-6 h-6" />
            Sign in with KAKAO
          </button> */}
        </div>
      </div>
    </div>
  );
}
