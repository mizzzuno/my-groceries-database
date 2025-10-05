"use client";
import { useState } from "react";
import Image from "next/image";

export default function Login({ mode = 'signin' }: { mode?: 'signin' | 'signup' }) {
  const [isSignup, setIsSignup] = useState(mode === 'signup');

  return (
    <div className="flex flex-col min-h-screen">
      {/* メインコンテンツ */}
      <div className="flex flex-1 items-center justify-center mt-[-50px]">
        <div className="container mx-auto px-4 md:flex md:space-x-8">
          {/* 左側ロゴとテキスト */}
          <div className="md:w-1/2 flex flex-col items-center justify-center mb-8 md:mb-0">
            <Image
              src="/images/Logo.jpg"
              alt="Logo"
              width={300}
              height={300}
              className="mb-4 object-contain"
            />
            <h1 className="text-4xl font-bold mb-2">Welcome to My Site</h1>
            <p className="text-lg text-gray-600">
              Join us and experience the best service.
            </p>
          </div>

          {/* 右側フォーム */}
          <div className="md:w-1/2">
            {!isSignup ? (
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">Login</h2>
                <form>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Username</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Password</label>
                    <input
                      type="password"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                  >
                    Login
                  </button>
                </form>
                <button
                  onClick={() => setIsSignup(true)}
                  className="w-full mt-3 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 transition"
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
                <form>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Username</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-300"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Password</label>
                    <input
                      type="password"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-300"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-300"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mb-2">
                    Your password must be at least 8 characters, not too common, and
                    not entirely numeric.
                  </p>
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                  >
                    Sign Up
                  </button>
                </form>
                <button
                  onClick={() => setIsSignup(false)}
                  className="w-full mt-3 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 transition"
                >
                  Back to Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

{ /* -----修正箇所----- */ }

      {/* フッター 
      <footer className="bg-gray-100 py-4 text-center mt-auto">
        <span className="text-gray-500">卒研：2025</span>
        <span className="text-gray-500 mx-2">|</span>
        <span>Created by</span>
        <span className="font-bold mx-2">0AAA2222</span>
        <span className="text-gray-500 mx-2">|</span>
        <span>ABCDE FGH IJKL (アイウエ オカ)</span>
      </footer>
      */}
{ /* -----ここまで-----*/ }
    </div>
  );
}




// //component
// //ここでログインページを作成し、sigh-inとupでそれぞれのモードでimportして使う
// //参考URL https://github.com/nextjs/saas-starter/blob/main/app/(login)/login.tsx
// export default function Login({ mode = 'signin' }: { mode?: 'signin' | 'signup' }) {
//   return (
//     <>
//       <h1>login</h1>
//     </>
//   );
// }
