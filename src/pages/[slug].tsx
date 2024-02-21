import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  return (
    <div>
      <h2>{router.query.slug}</h2>
      <h1>Router</h1>
      <button
        style={{ backgroundColor: "red" }}
        type="button"
        onClick={() => {
          router.push({ pathname: "/[slug]", query: { slug: "push" } });
        }}
      >
        push
      </button>

      <button
        style={{ backgroundColor: "blue" }}
        type="button"
        onClick={() => {
          router.replace({ pathname: "/[slug]", query: { slug: "push" } });
        }}
      >
        replace
      </button>
    </div>
  );
}
