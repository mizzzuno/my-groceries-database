"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";

// 表示したい列: 商品名, 購入日, 値段, 購入店舗
interface Data {
  id: number;
  productName: string; // 商品名
  purchaseDate: string; // ISO 形式 or 任意の文字列
  price: number; // 値段 (数値)
  store: string; // 購入店舗名
}

function createData(
  id: number,
  productName: string,
  purchaseDate: string,
  price: number,
  store: string,
): Data {
  return { id, productName, purchaseDate, price, store };
}

// ダミーデータ（必要に応じて API 連携に置き換える）
const rows: Data[] = [
  createData(1, "卵", "2024-06-01", 480, "スーパーA"),
  createData(2, "牛乳", "2024-06-02", 1280, "ドラッグストアB"),
  createData(3, "ハーゲンダッツ", "2024-06-02", 260, "コンビニC"),
  createData(4, "卵", "2024-06-03", 980, "スーパーA"),
  createData(5, "牛乳", "2024-06-04", 560, "ネットショップD"),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof Data>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "purchaseDate",
    numeric: false,
    disablePadding: false,
    label: "購入日",
  },
  {
    id: "price",
    numeric: false,
    disablePadding: false,
    label: "値段",
  },
  {
    id: "store",
    numeric: false,
    disablePadding: false,
    label: "購入店舗",
  },
  {
    id: "productName",
    numeric: false,
    disablePadding: false,
    label: "商品名",
  },
];

interface EnhancedTableHeadProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableHeadProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableProps {
  selectedGrocery?: string;
}

export default function EnhancedTable({
  selectedGrocery = "",
}: EnhancedTableProps) {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("price");

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const filteredRows = React.useMemo(() => {
    if (!selectedGrocery || selectedGrocery === "all") {
      return rows;
    }
    return rows.filter((row) => row.productName === selectedGrocery);
  }, [selectedGrocery]);

  const visibleRows = React.useMemo(
    () => [...filteredRows].sort(getComparator(order, orderBy)),
    [order, orderBy, filteredRows],
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2, overflowX: "auto" }}>
        {/* <EnhancedTableToolbar /> */}
        <TableContainer>
          <Table aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((row) => {
                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.id}
                    sx={{ cursor: "default" }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {row.purchaseDate}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        whiteSpace: "nowrap",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {row.price.toLocaleString("ja-JP")}円
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {row.store}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {row.productName}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
