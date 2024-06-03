import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { serialize } from 'cookie';

const SECRET_KEY = 'your-secret-key';
const users: { username: string, password: string }[] = [
  {
    username: 'admin',
    password: '$2b$10$u7c6oD5dzM.bI7bPaa5nKuKiP.aQfR6BOQ5/fP0CVfQpJ8XffgjHG', // hashed password for 'password'
  },
];

export async function POST(request: Request) {
  const { username, password } = await request.json();
  
  const user = users.find((user) => user.username === username);
  
  if (user) {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (isPasswordValid) {
      const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
      const cookie = serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60,
        path: '/',
      });
      const response = NextResponse.json({ message: 'Login successful' });
      response.headers.set('Set-Cookie', cookie);
      return response;
    }
  }
  
  return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
}
