// File: app/navbar/page.tsx

'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ShoppingCart, User, Menu, X, LogOut } from 'lucide-react';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/sheet';
import Link from 'next/link';

const Navbar = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isClient, setIsClient] = useState(false); // <-- NEW: State to check if we are in the browser
  const router = useRouter();

  // This hook now runs only on the client side
  useEffect(() => {
    setIsClient(true); // Mark that we are now in the browser
    if (localStorage.getItem('user')) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    alert('You have been logged out.');
    router.push('/');
  };

  const NavLinks = () => (
    <>
      <Link href="/products" className="text-gray-700 hover:text-[#644858] transition-colors duration-200 font-medium">
        Shop
      </Link>
      <a href="#" className="text-gray-700 hover:text-[#644858] transition-colors duration-200 font-medium">
        Categories
      </a>
      <a href="#" className="text-gray-700 hover:text-[#644858] transition-colors duration-200 font-medium">
        About
      </a>
      <a href="#" className="text-gray-700 hover:text-[#644858] transition-colors duration-200 font-medium">
        Contact
      </a>
    </>
  );

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0">
              <Link href="/products" className="text-2xl font-bold text-[#644858] tracking-tight">
                Eco Finds
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <NavLinks />
            </div>
          </div>

          <div className="hidden sm:flex flex-1 max-w-lg mx-8">
            {/* Search Bar can be added back here if needed */}
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="relative group">
              <ShoppingCart className="h-5 w-5 text-gray-600 group-hover:text-[#644858]" />
            </Button>
            
            {/* --- CORRECTED LOGIC FOR LOGIN/LOGOUT (Desktop) --- */}
            <div className="hidden sm:flex">
              {isClient && ( // <-- NEW: Only render this part in the browser
                isLoggedIn ? (
                  <Button variant="ghost" size="sm" onClick={handleLogout} className="group">
                    <LogOut className="h-5 w-5 text-gray-600 group-hover:text-red-500" />
                  </Button>
                ) : (
                  <Link href="/">
                    <Button variant="ghost" size="sm" className="group">
                      <User className="h-5 w-5 text-gray-600 group-hover:text-[#644858]" />
                    </Button>
                  </Link>
                )
              )}
            </div>
            
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-6 w-6 text-gray-600" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between pb-6 border-b">
                    <h2 className="text-lg font-semibold text-[#644858]">Menu</h2>
                    <SheetClose asChild><Button variant="ghost" size="sm"><X className="h-5 w-5" /></Button></SheetClose>
                  </div>
                  <div className="flex flex-col space-y-6 py-6 flex-1">
                    <NavLinks />
                    {/* --- CORRECTED LOGIC FOR LOGIN/LOGOUT (Mobile) --- */}
                    {isClient && ( // <-- NEW: Only render this part in the browser
                      isLoggedIn ? (
                        <button onClick={handleLogout} className="text-gray-700 hover:text-red-500 font-medium flex items-center space-x-2 text-left">
                          <LogOut className="h-5 w-5" />
                          <span>Logout</span>
                        </button>
                      ) : (
                        <Link href="/" className="text-gray-700 hover:text-[#644858] font-medium flex items-center space-x-2">
                          <User className="h-5 w-5" />
                          <span>Login / Register</span>
                        </Link>
                      )
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;