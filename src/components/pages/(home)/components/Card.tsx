import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import RegisterButton from "./RegisterButton";
import Typography from "@mui/material/Typography";
import BasicTextFields from "./BasicTextFields";
import BasicDatePicker from "./DatePicker";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { Grocery } from "@/hooks/useGroceries";
import { useGroceryContext } from "@/providers/GroceryDataProvider";
import PriceInput from "./PriceInput";

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
  // 初期値（編集時に渡す）
  initialData?: {
    id?: string;
    name?: string;
    category?: string;
    price?: number;
    purchaseDate?: string; // YYYY-MM-DD
  };
  // 編集時に呼ばれる（存在すれば update 動作、なければ add 動作）
  onUpdate?: (id: string, data: Partial<Grocery>) => Promise<void>;
}

export default function BasicCard({
  onClose,
  initialData,
  onUpdate,
}: BasicCardProps) {
  const [purchaseDate, setPurchaseDate] = React.useState<Dayjs | null>(
    initialData?.purchaseDate ? dayjs(initialData.purchaseDate) : null
  );
  const [productName, setProductName] = React.useState(initialData?.name ?? "");
  const [storeName, setStoreName] = React.useState(initialData?.category ?? "");
  const [price, setPrice] = React.useState<number>(initialData?.price ?? 0);
  const { addGrocery } = useGroceryContext();

  const handleRegister = async () => {
    if (onUpdate && initialData?.id) {
      await onUpdate(initialData.id, {
        name: productName,
        category: storeName,
        price,
        purchaseDate: purchaseDate ? purchaseDate.format("YYYY-MM-DD") : "",
      });
    } else {
      await addGrocery({
        name: productName,
        category: storeName,
        price,
        purchaseDate: purchaseDate ? purchaseDate.format("YYYY-MM-DD") : "",
      });
    }
    if (typeof onClose === "function") {
      onClose();
    }
  };

  const handleProductNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProductName(event.target.value);
  };

  const handleStoreNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStoreName(event.target.value);
  };

  return (
    <Card sx={{ minWidth: 275, ...style }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {onUpdate ? "購入履歴を編集" : "購入履歴を登録"}
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
        <PriceInput value={price} onChange={setPrice} />
      </CardContent>
      <CardActions>
        <RegisterButton onClick={handleRegister} />
      </CardActions>
    </Card>
  );
}
