import * as React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

interface AddButtonProps {
  onClick?: () => void;
}

export default function AddButton({ onClick }: AddButtonProps) {
  return (
    <Button variant="outlined" startIcon={<AddIcon />} onClick={onClick}>
      Add Data
    </Button>
  );
}
