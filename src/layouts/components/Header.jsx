import React from 'react';
import { Menu, X } from 'lucide-react';

export const Header = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 bg-gray-900 text-white z-50">
      <div className="flex items-center justify-between h-16 px-4">
        <h1 className="text-xl font-bold">PerfTrack</h1>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </header>
  );
};