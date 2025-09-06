'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddProductPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [sellerName, setSellerName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct = {
      title,
      description,
      category,
      price: parseFloat(price),
      sellerName,
    };

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });

      if (res.ok) {
        alert('Product added successfully!');
        router.push('/'); // Redirect to homepage
      } else {
        alert('Failed to add product.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred.');
    }
  };

  return (
    <main className="p-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">List a New Item</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md text-black"
            required
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium">Price</label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md text-black"
            required
            step="0.01"
          />
        </div>
        <div>
          <label htmlFor="sellerName" className="block text-sm font-medium">Your Name</label>
          <input
            id="sellerName"
            type="text"
            value={sellerName}
            onChange={(e) => setSellerName(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md text-black"
            required
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium">Category</label>
          <input
            id="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md text-black"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md text-black"
            rows={4}
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
          List Item
        </button>
      </form>
    </main>
  );
}