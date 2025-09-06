// File: app/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User as UserIcon } from 'lucide-react'; // Import icons

export default function AuthPage() {
  const [isLoginView, setIsLoginView] = useState(true);
  const router = useRouter();
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('user', JSON.stringify(data.user));
        router.push('/products');
      } else {
        const data = await res.json();
        setError(data.error || 'Login failed.');
      }
    } catch (err) {
      setError('An error occurred during login.');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      if (res.ok) {
        alert('Registration successful! Please log in.');
        setIsLoginView(true);
      } else {
        const data = await res.json();
        setError(data.error || 'Registration failed.');
      }
    } catch (err) {
      setError('An error occurred during registration.');
    }
  };

  const inputStyles = "w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 transition duration-300";
  const iconStyles = "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300";

  return (
    <main className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-black/20 rounded-2xl shadow-2xl backdrop-blur-lg border border-white/10">
        {isLoginView ? (
          // LOGIN FORM
          <div>
            <h1 className="text-3xl font-bold text-center text-white drop-shadow-md">Welcome Back</h1>
            <p className="text-center text-gray-300 mt-2">Login to access your EcoFinds account.</p>
            <form onSubmit={handleLogin} className="mt-8 space-y-6">
              <div className="relative">
                <Mail size={20} className={iconStyles} />
                <input placeholder="Email" id="email" type="email" onChange={(e) => setEmail(e.target.value)} className={inputStyles} required />
              </div>
              <div className="relative">
                <Lock size={20} className={iconStyles} />
                <input placeholder="Password" id="password" type="password" onChange={(e) => setPassword(e.target.value)} className={inputStyles} required />
              </div>
              {error && <p className="text-red-400 text-sm text-center animate-pulse">{error}</p>}
              <button type="submit" className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300">
                Login
              </button>
            </form>
            <p className="mt-6 text-sm text-center text-gray-300">
              Don't have an account?{' '}
              <button onClick={() => { setIsLoginView(false); setError(''); }} className="font-medium text-white hover:underline focus:outline-none">
                Register
              </button>
            </p>
          </div>
        ) : (
          // REGISTER FORM
          <div>
            <h1 className="text-3xl font-bold text-center text-white drop-shadow-md">Create Account</h1>
            <p className="text-center text-gray-300 mt-2">Join the EcoFinds community.</p>
            <form onSubmit={handleRegister} className="mt-8 space-y-6">
               <div className="relative">
                <UserIcon size={20} className={iconStyles} />
                <input placeholder="Username" id="username" type="text" onChange={(e) => setUsername(e.target.value)} className={inputStyles} required />
              </div>
              <div className="relative">
                <Mail size={20} className={iconStyles} />
                <input placeholder="Email" id="email" type="email" onChange={(e) => setEmail(e.target.value)} className={inputStyles} required />
              </div>
              <div className="relative">
                <Lock size={20} className={iconStyles} />
                <input placeholder="Password" id="password" type="password" onChange={(e) => setPassword(e.target.value)} className={inputStyles} required />
              </div>
              {error && <p className="text-red-400 text-sm text-center animate-pulse">{error}</p>}
              <button type="submit" className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold rounded-lg shadow-lg hover:from-green-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300">
                Create Account
              </button>
            </form>
            <p className="mt-6 text-sm text-center text-gray-300">
              Already have an account?{' '}
              <button onClick={() => { setIsLoginView(true); setError(''); }} className="font-medium text-white hover:underline focus:outline-none">
                Login
              </button>
            </p>
          </div>
        )}
      </div>
    </main>
  );
}