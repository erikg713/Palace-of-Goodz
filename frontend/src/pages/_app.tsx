import { useSession, SessionProvider } from "next-auth/react";
import Link from "next/link";
import { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <SessionProvider session={session}>
      <Head>
        <title>Palace of Goodz</title>
        <meta name="description" content="A Web3-powered decentralized marketplace" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <NavBar session={session} />
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}

type NavBarProps = {
  session: ReturnType<typeof useSession>["data"];
};

function NavBar({ session }: NavBarProps) {
  return (
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
  );
}

export default MyApp;
