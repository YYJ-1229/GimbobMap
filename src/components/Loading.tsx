export default function Loading() {
  return (
    <>
      <div className="w-full h-20 animate-pulse bg-gray-200 rounded-md" />
      {[...Array(10)].map((e, i) => {
        return (
          <div
            className="w-full h-20 animate-pulse bg-gray-200 rounded-md mt-3"
            key={i}
          />
        );
      })}
    </>
  );
}
