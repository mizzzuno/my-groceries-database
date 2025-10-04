import * as React from "react";
import { NumericFormat } from "react-number-format";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

interface PriceInputProps {
  value: number;
  onChange: (value: number) => void;
}

export default function PriceInput({ value, onChange }: PriceInputProps) {
  return (
    <Box
      component="form"
      sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
      noValidate
      autoComplete="off"
    >
      <NumericFormat
        value={value}
        onValueChange={(vals) => {
          // vals.floatValue is a number or undefined when empty; normalize to 0 when undefined
          onChange(vals.floatValue ?? 0);
        }}
        customInput={TextField}
        thousandSeparator
        prefix="￥"
        variant="outlined"
        label="購入価格"
      />
    </Box>
  );
}
