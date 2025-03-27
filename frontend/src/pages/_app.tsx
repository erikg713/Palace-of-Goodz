import { useSession } from "next-auth/react";
import Link from "next/link";

export default function MyApp({ Component, pageProps }) {
  const { data: session } = useSession();

  return (
    <div>
      <nav className="w-full p-5 bg-black/50 backdrop-blur-md fixed top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white">
            Palace of Goodz
          </Link>
          {session?.user?.role === "admin" && (
            <Link href="/admin" className="px-4 py-2 bg-yellow-500 text-black rounded-md">
              Admin Panel
            </Link>
          )}
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  );
}
