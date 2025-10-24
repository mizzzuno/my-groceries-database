import * as React from "react";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";

export default function LogoutIconButton() {
  const handleLogout = async () => {
    try {
      // try to inform server (if a logout endpoint exists). ignore errors.
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (error) {
      // Log error for debugging purposes
      console.error("Logout request failed:", error);
    }

    try {
      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedIn");
    } catch (error) {
      // Log localStorage error for debugging purposes
      console.error("localStorage error during logout:", error);
    }

    // force a reload so the top-level Home component re-checks auth state
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  };

  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: "center", ml: 3 }}>
      <IconButton
        aria-label="logout"
        size="small"
        onClick={handleLogout}
        title="ログアウト"
      >
        <LogoutIcon fontSize="inherit" />
      </IconButton>
    </Stack>
  );
}
