import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold">Login</h2>
        <button onClick={() => signIn()} className="mt-4 px-6 py-2 bg-yellow-500 text-black rounded-lg">
          Sign in with Credentials
        </button>
      </div>
    </div>
  );
}
