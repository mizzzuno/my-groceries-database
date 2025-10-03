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
      <BasicSelect value={selectedGrocery} onChange={setSelectedGrocery} />
      <BasicModal />
      <ListView selectedGrocery={selectedGrocery} />
    </>
  );
}
