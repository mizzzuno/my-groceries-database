import * as React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";

interface AddButtonProps {
  onClick?: () => void;
}

export default function AddButton({ onClick }: AddButtonProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={onClick}
        sx={{ ml: 2, mt: 2, mb: 2 }}
      >
        履歴を追加
      </Button>
    </Box>
  );
}
