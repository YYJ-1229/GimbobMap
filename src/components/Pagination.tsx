import Link from "next/link";
interface Pagination {
  total?: number;
  page: string;
  pathname: string;
}
export default function Pagination({ total = 0, page, pathname }: Pagination) {
  return (
    <div className="py-6 w-full px-10 flex justify-center gap-3 bg-white my-10 flex-wrap text-black">
      {total <= 10 ? (
        [...Array(total)].map((value, index) => {
          return (
            <Link
              href={{
                pathname: `/users/${pathname}`,
                query: { page: index + 1 }
              }}
              key={index}
            >
              <span
                className={`px-3 py-2 rounded border shadow-sm bg-white ${
                  parseInt(page) === index + 1
                    ? "text-green-600 font-bold"
                    : "text-gray=300"
                }`}
              >
                {index + 1}
              </span>
            </Link>
          );
        })
      ) : (
        <>
          {parseInt(page) > 1 && (
            <Link
              href={{
                pathname: `/users/${pathname}`,
                query: { page: parseInt(page) - 1 }
              }}
            >
              <span className="px-3 py-2 rounded border shadow-sm bg-white">
                이전
              </span>
            </Link>
          )}
          <Link href={{ pathname: "/stores", query: { page: page } }}>
            <span className="px-3 py-2 rounded border shadow-sm bg-white text-green">
              {page}
            </span>
          </Link>
          {total > parseInt(page) && (
            <Link
              href={{
                pathname: "/stores",
                query: { page: parseInt(page) + 1 }
              }}
            >
              <span className="px-3 py-2 rounded border shadow-sm bg-white">
                다음
              </span>
            </Link>
          )}
        </>
      )}
    </div>
  );
}
