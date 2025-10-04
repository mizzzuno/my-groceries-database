import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AddButton from "@/components/pages/(home)/components/AddButton";
import BasicCard from "@/components/pages/(home)/components/Card";

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

interface BasicModalProps {
  // トリガー要素を渡すとそれをクリックで開く
  trigger?: React.ReactElement | null;
  // モーダル内に表示する内容（省略時は登録フォーム）
  children?: React.ReactNode;
}

export default function BasicModal({ trigger, children }: BasicModalProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const renderTrigger = () => {
    if (trigger && React.isValidElement(trigger)) {
      // trigger 要素に onClick を注入して開く
      return React.cloneElement(trigger, { onClick: handleOpen } as any);
    }
    // デフォルトは AddButton
    return <AddButton onClick={handleOpen} />;
  };

  const content = children ? (
    React.isValidElement(children) ? (
      React.cloneElement(children, { onClose: handleClose } as any)
    ) : (
      children
    )
  ) : (
    <BasicCard onClose={handleClose} />
  );

  return (
    <div>
      {renderTrigger()}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>{content}</Box>
      </Modal>
    </div>
  );
}
