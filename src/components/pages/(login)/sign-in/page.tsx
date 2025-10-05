import { Suspense } from "react";
import Login from "@/components/pages/(login)/components/Login";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Suspense>
        <Login mode="signin" />
      </Suspense>
    </div>
  );
}
