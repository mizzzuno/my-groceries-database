import * as React from "react";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { red } from "@mui/material/colors";
import { useGroceryContext } from "@/providers/GroceryDataProvider";

interface DeleteIconButtonProps {
  id: string;
}

export default function DeleteIconButton({ id }: DeleteIconButtonProps) {
  const { deleteGrocery } = useGroceryContext();
  const [loading, setLoading] = React.useState(false);

  const handleDelete = async () => {
    // 簡易確認ダイアログ
    if (!confirm("この行を削除しますか？")) return;
    setLoading(true);
    try {
      await deleteGrocery(id);
    } catch (err) {
      // 簡易エラーハンドリング
      alert(err instanceof Error ? err.message : "削除に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
      <IconButton
        aria-label="delete"
        size="small"
        sx={{ color: red[700] }}
        onClick={handleDelete}
        disabled={loading}
      >
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </Stack>
  );
}
