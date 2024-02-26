import Map from "@/components/Map";
import Markers from "@/components/Markers";
import StoreBox from "@/components/StoreBox";

import { StoreType } from "@/interface";
import { useState } from "react";

import axios from "axios";
export default function Home({ stores }: { stores: StoreType[] }) {
  const [currentStore, setCurrentStore] = useState(null);

  return (
    <>
      <Map />
      <Markers stores={stores} />
      <StoreBox />
    </>
  );
}

export async function getServerSideProps() {
  const stores = await axios(`${process.env.NEXT_PUBLIC_API_URL}/api/store`);

  return {
    props: { stores: stores.data }
  };
}
