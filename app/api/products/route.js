import { NextResponse } from 'next/server';
import { getDbConnection } from '../../../lib/db';

export async function GET() {
  try {
    const db = await getDbConnection();
    const products = await db.all('SELECT * FROM products');
    return NextResponse.json(products);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { title, description, category, price, sellerName } = await request.json();

    if (!title || !price || !sellerName) {
      return NextResponse.json({ error: 'Title, price, and seller name are required.' }, { status: 400 });
    }

    const db = await getDbConnection();
    const result = await db.run(
      'INSERT INTO products (title, description, category, price, sellerName) VALUES (?, ?, ?, ?, ?)',
      title,
      description,
      category,
      price,
      sellerName
    );

    return NextResponse.json({ message: 'Product added successfully!', productId: result.lastID }, { status: 201 });
  } catch (error) {
    console.error("Failed to add product:", error);
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}