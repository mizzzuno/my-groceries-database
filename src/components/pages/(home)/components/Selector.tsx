"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function BasicSelect() {
  const [groceries, setGroceries] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setGroceries(event.target.value as string);
  };

  return (
    <Box sx={{ maxWidth: 320, m: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          比較する商品を選択
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={groceries}
          label="比較する商品を選択"
          onChange={handleChange}
        >
          <MenuItem value="卵">卵</MenuItem>
          <MenuItem value="牛乳">牛乳</MenuItem>
          <MenuItem value="ハーゲンダッツ">ハーゲンダッツ</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
