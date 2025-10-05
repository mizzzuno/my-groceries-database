"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login({
  mode = "signin",
}: {
  mode?: "signin" | "signup";
}) {
  const router = useRouter();
  type AuthData = {
    access_token?: string;
    token?: string;
    accessToken?: string;
    idToken?: string;
    detail?: string;
    message?: string;
    [key: string]: unknown;
  };

  const getErrorMessage = (err: unknown, fallback: string) => {
    if (typeof err === "string") return err;
    if (err && typeof err === "object") {
      const maybe = err as { message?: unknown };
      if (typeof maybe.message === "string") return maybe.message;
    }
    return fallback;
  };
  const [isSignup, setIsSignup] = useState(mode === "signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // same-origin proxy endpoints (implemented as Next.js API routes)
  const PROXY_TOKEN = "/api/auth/token";
  const PROXY_LOGIN = "/api/auth/login";
  const PROXY_SIGNUP = "/api/auth/signup";

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let data: AuthData | null = null;

      // 1) Try token endpoint (form-encoded)
      try {
        const params = new URLSearchParams();
        params.append("username", email);
        params.append("password", password);

        const res1 = await fetch(PROXY_TOKEN, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: params.toString(),
        });

        if (res1.ok) {
          data = await res1.json();
        } else {
          const t = await res1.text();
          console.debug("token endpoint failed:", res1.status, t);
        }
      } catch (err) {
        console.debug("token endpoint request error:", err);
      }

      // 2) If token endpoint didn't return usable data, try JSON login endpoint
      if (!data) {
        const res2 = await fetch(PROXY_LOGIN, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (!res2.ok) {
          const text = await res2.text();
          throw new Error(text || `HTTP ${res2.status}`);
        }

        data = await res2.json();
      }

      const token =
        data?.access_token ||
        data?.token ||
        data?.accessToken ||
        data?.idToken ||
        null;

      if (!token) {
        const maybeMsg = data?.detail || data?.message || JSON.stringify(data);
        throw new Error(maybeMsg || "トークンが返されませんでした");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("isLoggedIn", "true");
      // navigate to home; force a reload to ensure parent client component
      // re-reads localStorage and shows the HomePage when we're already on '/'
      router.push("/");
      try {
        // full reload ensures useEffect in parent picks up new token
        window.location.reload();
      } catch {
        // fallback: refresh router cache if reload isn't available
        const maybeRouter = router as unknown as { refresh?: () => void };
        if (typeof maybeRouter.refresh === "function") {
          maybeRouter.refresh();
        }
      }
    } catch (err) {
      setError(getErrorMessage(err, "ログインに失敗しました"));
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(PROXY_SIGNUP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }

      // サインアップ成功後は自動でログインを試み、ホームに遷移させる
      try {
        let data: AuthData | null = null;

        // 1) Try token endpoint (form-encoded)
        try {
          const params = new URLSearchParams();
          params.append("username", email);
          params.append("password", password);

          const res1 = await fetch(PROXY_TOKEN, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params.toString(),
          });

          if (res1.ok) {
            data = await res1.json();
          } else {
            const t = await res1.text();
            console.debug("token endpoint failed:", res1.status, t);
          }
        } catch (err) {
          console.debug("token endpoint request error:", err);
        }

        // 2) If token endpoint didn't return usable data, try JSON login endpoint
        if (!data) {
          const res2 = await fetch(PROXY_LOGIN, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });

          if (!res2.ok) {
            const text = await res2.text();
            throw new Error(text || `HTTP ${res2.status}`);
          }

          data = await res2.json();
        }

        const token =
          data?.access_token ||
          data?.token ||
          data?.accessToken ||
          data?.idToken ||
          null;

        if (!token) {
          const maybeMsg =
            data?.detail || data?.message || JSON.stringify(data);
          throw new Error(maybeMsg || "サイン後にトークンが返されませんでした");
        }

        localStorage.setItem("token", token);
        localStorage.setItem("isLoggedIn", "true");
        router.push("/");
        try {
          window.location.reload();
        } catch {
          const maybeRouter = router as unknown as { refresh?: () => void };
          if (typeof maybeRouter.refresh === "function") {
            maybeRouter.refresh();
          }
        }
      } catch (err) {
        // ログイン試行に失敗した場合はサインアップ後にログイン画面へ戻す
        setIsSignup(false);
        setError(
          getErrorMessage(
            err,
            "自動ログインに失敗しました。ログインしてください。",
          ),
        );
      }
    } catch (err) {
      setError(getErrorMessage(err, "サインアップに失敗しました"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* メインコンテンツ */}
      <div className="flex flex-1 items-center justify-center mt-[-50px]">
        <div className="container mx-auto px-4 md:flex md:space-x-8">
          {/* テキスト */}
          <div className="md:w-1/2 flex flex-col items-center justify-center mb-8 md:mb-0">
            <h1 className="text-4xl font-bold mb-2 text-center">
              Welcome to <br />
              Smart Shopper!!
            </h1>
            <p className="text-lg text-gray-600">
              Join us and become a Smart Shopper!!
            </p>
          </div>

          {/* 右側フォーム */}
          <div className="md:w-1/2">
            {!isSignup ? (
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">Login</h2>
                <form onSubmit={handleSignIn}>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Email</label>
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    disabled={loading}
                  >
                    {loading ? "Signing in..." : "Login"}
                  </button>
                  {error && (
                    <p className="text-sm text-red-600 mt-2">{error}</p>
                  )}
                </form>
                <button
                  onClick={() => setIsSignup(true)}
                  className="w-full mt-3 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 transition"
                >
                  or Sign Up
                </button>
              </div>
            ) : (
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
                <form onSubmit={handleSignUp}>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Email</label>
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-300"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-300"
                      required
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
                    Your password must be at least 8 characters, not too common,
                    and not entirely numeric.
                  </p>
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                    disabled={loading}
                  >
                    {loading ? "Signing up..." : "Sign Up"}
                  </button>
                  {error && (
                    <p className="text-sm text-red-600 mt-2">{error}</p>
                  )}
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
    </div>
  );
}
