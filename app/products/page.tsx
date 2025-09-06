// File: app/products/page.tsx

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../navbar/page'; // <-- IMPORT THE NAVBAR

type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  sellerName: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <>
      <Navbar /> {/* <-- ADD THE NAVBAR HERE */}
      <main className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">EcoFinds Marketplace</h1>
          <Link href="/add-product" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
            + List an Item
          </Link>
        </div>

        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product.id} className="border rounded-lg p-4 shadow-sm flex flex-col bg-white">
                  <h2 className="text-xl font-semibold text-gray-800">{product.title}</h2>
                  <p className="text-gray-500 text-sm mb-2">{product.category}</p>
                  <p className="text-lg font-bold my-2 text-green-700">${product.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-700 flex-grow">{product.description}</p>
                  <p className="text-xs text-right mt-4 text-gray-500">Sold by: {product.sellerName}</p>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">No products listed yet. Be the first!</p>
            )}
          </div>
        )}
      </main>
    </>
  );
}