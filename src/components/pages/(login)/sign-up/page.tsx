//これで完成
import { Suspense } from "react";
import Login from "../components/Login";
import Footer from '@/components/Footer' //追加

export default function SignUpPage() {
  return (
    <>
    <Suspense>
      <Login mode="signup" />
    </Suspense>
    <Footer /> {/*追加*/}
    </>
  );
}
