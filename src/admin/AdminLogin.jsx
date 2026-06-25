import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";

export default function AdminLogin() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setError("");
    setSubmitting(true);

    const { error: signInError } = await signIn(email, password);

    setSubmitting(false);

    if (signInError) {
      setError(signInError.message || "Sign in failed. Please try again.");
      return;
    }

    navigate("/admin");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#e9ebe0] px-4 py-10">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-brand-cream shadow-xl ring-1 ring-black/5">
        <header className="bg-brand-dark px-6 py-5 text-center">
          <h1 className="text-lg font-semibold uppercase tracking-wide text-white">
            Admin Login
          </h1>
          <p className="mt-1 text-sm text-white/75">Yahya&apos;s HR Dashboard</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5 px-6 py-8">
          {error && (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 ring-1 ring-red-200">
              {error}
            </p>
          )}

          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-[13px] font-medium text-brand-green"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-brand-olive/40 bg-brand-cream/40 px-3 py-2 text-sm text-brand-green outline-none transition focus:border-brand-olive focus:ring-2 focus:ring-brand-olive/30"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-[13px] font-medium text-brand-green"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-brand-olive/40 bg-brand-cream/40 px-3 py-2 text-sm text-brand-green outline-none transition focus:border-brand-olive focus:ring-2 focus:ring-brand-olive/30"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full cursor-pointer rounded-full bg-brand-dark px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition hover:bg-brand-green hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
