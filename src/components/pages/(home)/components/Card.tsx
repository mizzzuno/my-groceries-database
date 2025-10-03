import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import RegisterButton from "./RegisterButton";
import Typography from "@mui/material/Typography";
import BasicTextFields from "./BasicTextFields";
import BasicDatePicker from "./DatePicker";
import { Dayjs } from "dayjs";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface BasicCardProps {
  onClose?: () => void;
}

export default function BasicCard({ onClose }: BasicCardProps) {
  const [purchaseDate, setPurchaseDate] = React.useState<Dayjs | null>(null);
  const [productName, setProductName] = React.useState("");
  const [storeName, setStoreName] = React.useState("");

  const handleRegister = () => {
    // 入力された内容をconsole.logで表示
    console.log("購入データ:", {
      purchaseDate: purchaseDate?.format("YYYY-MM-DD"),
      productName,
      storeName,
    });

    // Modalを閉じる
    if (onClose) {
      onClose();
    }
  };

  const handleProductNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setProductName(event.target.value);
  };

  const handleStoreNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setStoreName(event.target.value);
  };

  return (
    <Card sx={{ minWidth: 275, ...style }}>
      <CardContent>
        <Typography variant="h5" component="div">
          購入履歴を登録
        </Typography>
        <BasicDatePicker value={purchaseDate} onChange={setPurchaseDate} />
        <BasicTextFields
          id="product-name"
          label="商品名"
          variant="outlined"
          value={productName}
          onChange={handleProductNameChange}
        />
        <BasicTextFields
          id="store-name"
          label="店舗名"
          variant="outlined"
          value={storeName}
          onChange={handleStoreNameChange}
        />
      </CardContent>
      <CardActions>
        <RegisterButton onClick={handleRegister} />
      </CardActions>
    </Card>
  );
}
