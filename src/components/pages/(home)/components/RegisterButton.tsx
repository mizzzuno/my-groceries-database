import * as React from "react";
import Button from "@mui/material/Button";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

interface RegisterButtonProps {
  onClick?: () => void;
}

export default function RegisterButton({ onClick }: RegisterButtonProps) {
  return (
    <Button variant="outlined" startIcon={<ExitToAppIcon />} onClick={onClick}>
      登録
    </Button>
  );
}
