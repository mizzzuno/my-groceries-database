import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";

interface BasicDatePickerProps {
  value?: Dayjs | null;
  onChange?: (date: Dayjs | null) => void;
}

export default function BasicDatePicker({
  value,
  onChange,
}: BasicDatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label="購入日"
          value={value}
          onChange={onChange}
          sx={{ "& > :not(style)": { m: 1, width: "28.3ch" } }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
