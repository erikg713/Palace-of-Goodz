export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-700 to-indigo-900 text-white flex flex-col">
      {/* Navigation Bar */}
      <nav className="w-full p-5 bg-black/50 backdrop-blur-md fixed top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Palace of Goodz</h1>
          <button className="px-4 py-2 bg-yellow-400 text-black rounded-md font-semibold">
            Explore Now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center text-center px-4">
        <div>
          <h1 className="text-5xl font-extrabold drop-shadow-lg">
            Welcome to <span className="text-yellow-400">Palace of Goodz</span>!
          </h1>
          <p className="mt-4 text-lg max-w-xl mx-auto">
            COMING SOON - Your go-to marketplace on the{" "}
            <span className="text-blue-300">Pi Network Ecosystem</span>!
          </p>
          <button className="mt-6 px-6 py-3 bg-yellow-500 text-black text-lg font-bold rounded-lg shadow-md hover:bg-yellow-400 transition">
            Join the Waitlist
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/50 text-center py-4">
        <p className="text-sm">
          © 2024 Palace of Goodz. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
