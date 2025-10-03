import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

interface BasicTextFieldsProps {
  id?: string;
  label?: string;
  variant?: "standard" | "outlined" | "filled";
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function BasicTextFields(props: BasicTextFieldsProps) {
  const {
    id = "standard-basic",
    label = "Standard",
    variant = "standard",
    value = "",
    onChange,
  } = props;

  return (
    <Box
      component="form"
      sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id={id}
        label={label}
        variant={variant}
        value={value}
        onChange={onChange}
      />
    </Box>
  );
}
