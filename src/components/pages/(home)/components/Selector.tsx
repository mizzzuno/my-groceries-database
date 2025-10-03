"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface BasicSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function BasicSelect({ value, onChange }: BasicSelectProps) {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as string);
  };

  return (
    <Box
      sx={{
        width: "auto", // 幅を自動調整
        minWidth: 120,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mr: 2,
        mt: 2,
        mb: 2,
      }}
      className="max-w-xs"
    >
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label" size="small">
          商品を選択
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="比較する商品を選択"
          onChange={handleChange}
          size="small"
          sx={{
            height: "36px",
            minWidth: 120,
            "& .MuiSelect-select": {
              padding: "6px 14px",
              display: "flex",
              alignItems: "center",
            },
          }}
        >
          <MenuItem value="all">全て表示</MenuItem>
          <MenuItem value="卵">卵</MenuItem>
          <MenuItem value="牛乳">牛乳</MenuItem>
          <MenuItem value="ハーゲンダッツ">ハーゲンダッツ</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
