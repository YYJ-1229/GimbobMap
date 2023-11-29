import { useRouter } from "next/router";

export default function StoreEditPage() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <h1>음식점 수정 페이지! : {id}</h1>
    </div>
  );
}
