//これで完成
import { Suspense } from "react";
import Login from "@/app/(login)/components/Login";
import Footer from '@/components/Footer' //追加

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col">
    <Suspense>
      <Login mode="signin" />
    </Suspense>
    <Footer /> {/*追加*/}
    </div>
  );
}