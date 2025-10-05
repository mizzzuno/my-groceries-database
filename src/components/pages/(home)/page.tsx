"use client";

import React from "react";
import dynamic from "next/dynamic";
import BasicModal from "@/components/pages/(home)/components/Modal";
import LogoutIconButton from "@/components/pages/(home)/components/LogoutIconButton";

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
        Smart Shopper
      </h1>
      <div className="flex justify-center items-center">
        <BasicSelect value={selectedGrocery} onChange={setSelectedGrocery} />
        <BasicModal />
        <LogoutIconButton />
      </div>
      <ListView selectedGrocery={selectedGrocery} />
    </>
  );
}
