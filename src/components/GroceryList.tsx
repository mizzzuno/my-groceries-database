import React from "react";
import { useGroceryContext } from "../providers/GroceryDataProvider";

const GroceryList: React.FC = () => {
  const { groceries, loading, error } = useGroceryContext();

  if (loading) return <div>読み込み中...</div>;
  if (error) return <div>エラー: {error}</div>;

  return (
    <ul>
      {groceries.map((grocery) => (
        <li key={grocery.id}>
          {grocery.name} - {grocery.category} - ¥{grocery.price}
        </li>
      ))}
    </ul>
  );
};

export default GroceryList;
