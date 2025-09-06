'use client'

import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';

const Navbar = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const NavLinks = () => (
    <>
      <a href="#" className="text-gray-700 hover:text-[#644858] transition-colors duration-200 font-medium">
        Shop
      </a>
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
          {/* Logo and Brand */}
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-[#644858] tracking-tight">
                Eco Finds
              </h1>
            </div>

            {/* Desktop Navigation Links - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-6">
              <NavLinks />
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden sm:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className={`h-5 w-5 transition-colors duration-200 ${
                  isSearchFocused ? 'text-[#644858]' : 'text-gray-400'
                }`} />
              </div>
              <Input
                type="text"
                placeholder="Search eco-friendly products..."
                className="pl-10 pr-4 py-2 w-full border-gray-300 rounded-full focus:ring-2 focus:ring-[#644858]/20 focus:border-[#644858] transition-all duration-200"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search Icon */}
            <Button variant="ghost" size="sm" className="sm:hidden">
              <Search className="h-5 w-5 text-gray-600" />
            </Button>

            {/* Cart Icon */}
            <Button variant="ghost" size="sm" className="relative group">
              <ShoppingCart className="h-5 w-5 text-gray-600 group-hover:text-[#644858] transition-colors duration-200" />
              <span className="absolute -top-2 -right-2 bg-[#644858] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                2
              </span>
            </Button>

            {/* Profile Icon */}
            <Button variant="ghost" size="sm" className="group hidden sm:flex">
              <User className="h-5 w-5 text-gray-600 group-hover:text-[#644858] transition-colors duration-200" />
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-6 w-6 text-gray-600" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between pb-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-[#644858]">Menu</h2>
                    <SheetClose asChild>
                      <Button variant="ghost" size="sm">
                        <X className="h-5 w-5" />
                      </Button>
                    </SheetClose>
                  </div>
                  
                  {/* Mobile Search */}
                  <div className="py-6 border-b border-gray-200">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Search products..."
                        className="pl-10 w-full"
                      />
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <div className="flex flex-col space-y-6 py-6 flex-1">
                    <NavLinks />
                    
                    {/* Profile Link for Mobile */}
                    <a href="#" className="text-gray-700 hover:text-[#644858] transition-colors duration-200 font-medium flex items-center space-x-2">
                      <User className="h-5 w-5" />
                      <span>Account</span>
                    </a>
                  </div>

                  {/* Footer */}
                  <div className="pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-500 text-center">
                      © 2025 Eco Finds. All rights reserved.
                    </p>
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