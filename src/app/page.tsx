"use client";

import React, { useEffect, useState } from "react";
import HomePage from "@/components/pages/(home)/page";
import Login from "@/components/pages/(login)/components/Login";

export default function Home() {
  // null = loading, true = logged in, false = not logged in
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    // ここでは簡易的に localStorage の token または isLoggedIn フラグを確認します。
    // 実運用では HttpOnly cookie やサーバー検証、NextAuth 等の導入を推奨します。
    try {
      const token = localStorage.getItem("token");
      const flag = localStorage.getItem("isLoggedIn");
      if (token || flag === "true") {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch {
      // localStorage にアクセスできない可能性を考慮
      setIsLoggedIn(false);
    }
  }, []);

  if (isLoggedIn === null) {
    // ローディング中は何も表示しないか、スケルトンを出す
    return null;
  }

  return <>{isLoggedIn ? <HomePage /> : <Login mode="signin" />}</>;
}
