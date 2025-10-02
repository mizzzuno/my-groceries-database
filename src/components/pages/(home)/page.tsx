"use client";

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
  return (
    <>
      <BasicSelect />
      <BasicModal />
      <ListView />
    </>
  );
}
