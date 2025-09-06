import { NextResponse } from 'next/server';
import { getDbConnection } from '../../../../lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    const db = await getDbConnection();
    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
    }

    // In a real application, you would generate a session token (e.g., JWT) here.
    return NextResponse.json({ message: 'Login successful!', user: { id: user.id, username: user.username, email: user.email } });

  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}