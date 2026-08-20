"use client";

import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  ram?: number;
  storage?: number;
}

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  const router = useRouter();

  if (!products.length) {
    return (
      <div className="rounded-lg border p-6 text-center text-gray-500">
        No products found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <div
          key={product.id}
          className="overflow-hidden rounded-xl border bg-white shadow-sm"
        >
          <div className="flex h-48 items-center justify-center bg-gray-100">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-contain"
              />
            ) : (
              <span className="text-gray-400">No Image</span>
            )}
          </div>

          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {product.name}
            </h2>

            <p className="mt-2 text-xl font-bold">
              ₹{product.price.toLocaleString("en-IN")}
            </p>

            <div className="mt-3 flex gap-2 text-sm text-gray-600">
              {product.ram && (
                <span className="rounded bg-gray-100 px-2 py-1">
                  {product.ram}GB RAM
                </span>
              )}

              {product.storage && (
                <span className="rounded bg-gray-100 px-2 py-1">
                  {product.storage >= 1024
                    ? `${product.storage / 1024}TB`
                    : `${product.storage}GB`}
                </span>
              )}
            </div>

            <button
              onClick={() => router.push(`/products/${product.id}`)}
              className="mt-4 w-full rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800"
            >
              View Product
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}