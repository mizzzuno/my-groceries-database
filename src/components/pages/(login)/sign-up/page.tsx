import { Suspense } from "react";
import Login from "@/components/pages/(login)/components/Login";

export default function SignUpPage() {
  return (
    <>
      <Suspense>
        <Login mode="signup" />
      </Suspense>
    </>
  );
}
