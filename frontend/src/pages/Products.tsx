import { useSession, signIn, signOut } from "next-auth/react";

export default function Products() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white">
        <h1>Please Log In to View the Marketplace</h1>
        <button onClick={() => signIn()} className="mt-4 px-6 py-2 bg-yellow-500 text-black rounded-lg">
          Sign in
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center text-white">Marketplace</h1>
      <button onClick={() => signOut()} className="absolute top-5 right-5 px-4 py-2 bg-red-500 text-white rounded">
        Logout
      </button>
      {/* Product Listings Here */}
    </div>
  );
}


const products = [
  { id: 1, name: "Product A", price: "10 Pi", image: "/images/product1.jpg" },
  { id: 2, name: "Product B", price: "15 Pi", image: "/images/product2.jpg" },
];

export default function Products() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center text-white">Marketplace</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {products.map((product) => (
          <div key={product.id} className="bg-gray-800 p-5 rounded-lg shadow-lg">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md" />
            <h2 className="text-xl font-bold text-white mt-2">{product.name}</h2>
            <p className="text-yellow-400">{product.price}</p>
            <button className="mt-3 bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-400">
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
