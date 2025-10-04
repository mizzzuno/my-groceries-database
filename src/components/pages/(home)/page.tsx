"use client";

import React from "react";
import dynamic from "next/dynamic";
import BasicModal from "@/components/pages/(home)/components/Modal";

const ListView = dynamic(
  () => import("@/components/pages/(home)/components/ListView"),
  { ssr: false },
);

const BasicSelect = dynamic(
  () => import("@/components/pages/(home)/components/Selector"),
  { ssr: false },
);

export default function HomePage() {
  const [selectedGrocery, setSelectedGrocery] = React.useState("all");

  return (
    <>
      <h1 className="m-4 text-2xl font-bold flex justify-center">
        購入履歴データベース
      </h1>
      <div className="flex justify-center items-center">
        <BasicSelect value={selectedGrocery} onChange={setSelectedGrocery} />
        <BasicModal />
      </div>
      <ListView selectedGrocery={selectedGrocery} />    
    </>
  );
}
