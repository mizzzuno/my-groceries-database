import * as React from "react";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";

export default function LogoutIconButton() {
  const handleLogout = async () => {
    try {
      // try to inform server (if a logout endpoint exists). ignore errors.
      await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    } catch (e) {
      // ignore
    }

    try {
      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedIn");
    } catch (e) {
      // ignore localStorage errors
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
