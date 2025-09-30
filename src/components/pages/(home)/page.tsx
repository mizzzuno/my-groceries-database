"use client";

import dynamic from "next/dynamic";

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
      <ListView />
    </>
  );
}
