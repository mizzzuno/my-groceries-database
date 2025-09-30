"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function BasicSelect() {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Box sx={{ maxWidth: 200 }} className="m-4 max-w-xs">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          比較する商品を選択
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
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
