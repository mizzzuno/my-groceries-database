"use client";
import { useState, useEffect } from "react";

export interface Grocery {
  id: string;
  name: string;
  category: string;
  price: number;
  purchaseDate: string;
}

export const useGroceries = () => {
  const [groceries, setGroceries] = useState<Grocery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGroceries = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/groceries");
      if (!response.ok) throw new Error("データの取得に失敗しました");
      const data = await response.json();
      setGroceries(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroceries();
  }, []);

  return { groceries, loading, error, refetch: fetchGroceries };
};
