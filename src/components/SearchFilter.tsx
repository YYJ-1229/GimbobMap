import { FaSearch } from "react-icons/fa";
import { DISTRICT_ARR } from "@/data/store";
import { useRecoilState } from "recoil";
import { searchState } from "@/atom";

export default function SearchFilter() {
  const [search, setSearch] = useRecoilState(searchState);

  return (
    <div className="flex flex-col md:flex-row gap-2 my-4">
      <div className="flex items-center justify-center w-full gap-2">
        <FaSearch className="w-5 h-5" />
        <input
          type="search"
          onChange={(e) => setSearch({ ...search, q: e.target.value })}
          placeholder="음식점 검색"
          className="block w-full p-[12px] text-sm text-gray-800 border-gray-300 rounded-lg bg-gray-50 outline-none focus:border-2 focus:ring-green-500 focus:border-green-500"
        />
      </div>
      <select
        onChange={(e) => setSearch({ ...search, district: e.target.value })}
        className="block  w-full bg-gray-50 border-gray-300 text-gray-800 text-sm md:max-w-[200px] rounded-lg focus:border-green-500 focus:border-2 outline-none p-3"
      >
        <option value="">지역선택</option>
        {DISTRICT_ARR.map((data) => {
          return (
            <option value={data} key={data}>
              {data}
            </option>
          );
        })}
      </select>
    </div>
  );
}
