import { NextResponse } from 'next/server';
// We can still use import syntax here because Next.js handles it.
import { getDbConnection } from '../../../../lib/db';
import bcrypt from 'bcryptjs';


/**
 * Handles the POST request to register a new user.
 * @param {Request} request The incoming request object.
 */
export async function POST(request) {
  try {
    const { username, email, password } = await request.json();

    if (!username || !email || !password) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const db = await getDbConnection();

    // Check if a user with the same email or username already exists
    const existingUser = await db.get('SELECT * FROM users WHERE email = ? OR username = ?', [email, username]);
    if (existingUser) {
      return NextResponse.json({ error: 'User with this email or username already exists.' }, { status: 409 });
    }

    // Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Insert the new user into the database
    const result = await db.run(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      username,
      email,
      hashedPassword
    );

    return NextResponse.json({ message: 'User created successfully!', userId: result.lastID }, { status: 201 });

  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}
