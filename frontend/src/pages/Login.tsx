import { signIn } from "next-auth/react";
import { useState } from "react";
// Assuming you have a Spinner component
import Spinner from "../components/Spinner";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      await signIn();
    } catch (err) {
      setError(err.message || "Failed to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold">Login</h2>
        {error && <p className="mt-2 text-red-500" role="alert">{error}</p>}
        <button
          onClick={handleSignIn}
          className="mt-4 px-6 py-2 bg-yellow-500 text-black rounded-lg"
          disabled={loading}
          aria-live="polite"
          aria-busy={loading}
          aria-label="Sign in"
        >
          {loading ? "Signing in..." : "Sign in with Credentials"}
        </button>
        {loading && <Spinner className="mt-4" />}
      </div>
    </div>
  );
}
