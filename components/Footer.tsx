'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0b131c] text-white py-12 mt-5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
              <h3 className="font-semibold text-[#edb232] mb-4">
                📄 Content Use Disclaimer
              </h3>
              <p className="text-sm text-[#a6a6a6]">
                At Boss’s Academy, we aim to provide students with free and accessible educational materials.  
              </p>
              <p className="text-sm text-[#a6a6a6] mb-2">
                If you are the rightful owner of any resource featured on this platform and wish to have it removed, please contact us at {' '}
                <a 
                  href="mailto:bossacademy906@gmail.com" 
                  className="text-[#edb232] hover:underline ml-1"
                >
                  bossacademy906@gmail.com 
                </a>{' '}
                 with proof of ownership. We will promptly take action to resolve the matter.
              </p>
            </div>


          <div>
            <h4 className="font-semibold text-[#edb232] mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-[#a6a6a6] hover:text-[#edb232] transition-colors cursor-pointer">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/subjects" className="text-[#a6a6a6] hover:text-[#edb232] transition-colors cursor-pointer">
                  Subjects
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[#a6a6a6] hover:text-[#edb232] transition-colors cursor-pointer">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#a6a6a6] hover:text-[#edb232] transition-colors cursor-pointer">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#edb232] mb-4">Programs</h4>
            <ul className="space-y-2 text-[#a6a6a6]">
              <li>
                <Link href="/subjects#igcse" className="text-[#a6a6a6] hover:text-[#edb232] transition-colors cursor-pointer">
                  IGCSE Materials
                </Link>
              </li>
              <li>
                <Link href="/subjects#alevel" className="text-[#a6a6a6] hover:text-[#edb232] transition-colors cursor-pointer">
                  A-Level Materials
                </Link>
              </li>
              <li>
                <Link href="/subjects#ib" className="text-[#a6a6a6] hover:text-[#edb232] transition-colors cursor-pointer">
                  IB Materials
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#edb232] mb-4">Wanna reach out to us?</h4>
            <div className="flex space-x-4 mt-4">
                          <a
                              href="mailto:bossacademy906@gmail.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#a6a6a6] hover:text-[#edb232] transition-colors w-8 h-8 flex items-center justify-center cursor-pointer"
                          >
                              <i className="ri-mail-fill text-xl"></i>
                          </a>

                          <a
                              href="https://www.facebook.com/profile.php?id=61572583179403"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#a6a6a6] hover:text-[#edb232] transition-colors w-8 h-8 flex items-center justify-center cursor-pointer"
                          >
                              <i className="ri-facebook-fill text-xl"></i>
                          </a>

                          <a
                              href="https://www.youtube.com/@bosssacademy"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#a6a6a6] hover:text-[#edb232] transition-colors w-8 h-8 flex items-center justify-center cursor-pointer"
                          >
                              <i className="ri-youtube-fill text-xl"></i>
                          </a>

                          <a
                              href="https://www.instagram.com/boss_s_academy"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#a6a6a6] hover:text-[#edb232] transition-colors w-8 h-8 flex items-center justify-center cursor-pointer"
                          >
                              <i className="ri-instagram-fill text-xl"></i>
                          </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#325d8e] pt-8 mt-8 text-center text-[#a6a6a6]">
          <p>&copy; 2025 Boss&apos;s Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}