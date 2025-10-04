"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useGroceries, Grocery } from "../hooks/useGroceries";

interface GroceryContextType {
  groceries: Grocery[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  addGrocery: (grocery: Omit<Grocery, "id">) => Promise<void>;
  updateGrocery: (id: string, grocery: Partial<Grocery>) => Promise<void>;
  deleteGrocery: (id: string) => Promise<void>;
}

const GroceryContext = createContext<GroceryContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const GroceryDataProvider: React.FC<Props> = ({ children }) => {
  const { groceries, loading, error, refetch } = useGroceries();

  const addGrocery = async (grocery: Omit<Grocery, "id">) => {
    await fetch("/api/groceries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(grocery),
    });
    refetch();
  };

  const updateGrocery = async (id: string, grocery: Partial<Grocery>) => {
    await fetch(`/api/groceries/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(grocery),
    });
    refetch();
  };

  const deleteGrocery = async (id: string) => {
    await fetch(`/api/groceries/${id}`, {
      method: "DELETE",
    });
    refetch();
  };

  return (
    <GroceryContext.Provider
      value={{
        groceries,
        loading,
        error,
        refetch,
        addGrocery,
        updateGrocery,
        deleteGrocery,
      }}
    >
      {children}
    </GroceryContext.Provider>
  );
};

export const useGroceryContext = () => {
  const context = useContext(GroceryContext);
  if (context === undefined) {
    throw new Error(
      "useGroceryContext must be used within a GroceryDataProvider"
    );
  }
  return context;
};
