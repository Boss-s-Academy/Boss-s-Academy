
'use client';

import Link from 'next/link';
import { useState } from 'react';
import AuthButton from './AuthButton';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-[#0b131c] text-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link
          href="/"
          className="text-2xl text-[#ffffff] flex items-center justify-center gap-3"
          style={{ fontFamily: 'Pacifico, serif' }}
        >
          <Image
            src="/favicon.ico"
            alt="Boss's Academy Logo"
            width={40}
            height={40}
            className="rounded-lg"
            priority // ensures the image loads ASAP for performance
          />
          Boss&apos;s Academy
        </Link>

          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-[#edb232] transition-colors whitespace-nowrap cursor-pointer">
              Home
            </Link>
            <Link href="/subjects" className="hover:text-[#edb232] transition-colors whitespace-nowrap cursor-pointer">
              Subjects
            </Link>
            <Link href="/about" className="hover:text-[#edb232] transition-colors whitespace-nowrap cursor-pointer">
              About
            </Link>
            <Link href="/contact" className="hover:text-[#edb232] transition-colors whitespace-nowrap cursor-pointer">
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex">
            <AuthButton />
          </div>

          <button
            className="md:hidden text-[#edb232] w-6 h-6 flex items-center justify-center cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className="ri-menu-line text-xl"></i>
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-4 space-y-2 border-t border-[#325d8e] pt-4">
            <Link href="/" className="block py-2 hover:text-[#edb232] transition-colors cursor-pointer">
              Home
            </Link>
            <Link href="/subjects" className="block py-2 hover:text-[#edb232] transition-colors cursor-pointer">
              Subjects
            </Link>
            <Link href="/about" className="block py-2 hover:text-[#edb232] transition-colors cursor-pointer">
              About
            </Link>
            <Link href="/contact" className="block py-2 hover:text-[#edb232] transition-colors cursor-pointer">
              Contact
            </Link>
            <div className="pt-4 border-t border-[#325d8e]">
              <AuthButton />
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
