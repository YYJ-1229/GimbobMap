export default function FullPageLoader() {
  return (
    <div className="fixed w-full top-0 inset-x-0 h-screen flex flex-col justify-center bg-black/60 z-50">
      <div className="animate-spin w-10 h-10 text-green-400 rounded-full border-4 m-auto border-t-transparent border-current"></div>
    </div>
  );
}
