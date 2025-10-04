import * as React from "react";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import BasicCard from "./Card";
import { useGroceryContext } from "@/providers/GroceryDataProvider";
import BasicModal from "./Modal";
import { Grocery } from "@/hooks/useGroceries";

interface EditIconButtonProps {
  id: string;
  name?: string;
  category?: string;
  price?: number;
  purchaseDate?: string;
}

export default function EditIconButton({
  id,
  name,
  category,
  price,
  purchaseDate,
}: EditIconButtonProps) {
  const { updateGrocery } = useGroceryContext();

  const handleUpdate = async (updateId: string, data: Partial<Grocery>) => {
    await updateGrocery(updateId, data);
  };

  const trigger = (
    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
      <IconButton aria-label="edit" size="small">
        <EditIcon fontSize="inherit" />
      </IconButton>
    </Stack>
  );

  return (
    <BasicModal trigger={trigger}>
      <BasicCard
        onClose={() => {
          /* BasicModal が閉じるのは trigger 側で制御 */
        }}
        initialData={{ id, name, category, price, purchaseDate }}
        onUpdate={handleUpdate}
      />
    </BasicModal>
  );
}
