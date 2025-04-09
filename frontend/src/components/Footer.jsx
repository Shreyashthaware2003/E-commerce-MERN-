import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-100 text-black py-10 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand Info */}
        <div>
          <img src="logo.png" alt="Forever Logo" className="w-28 mb-3" />
          <p className="text-sm">
            Discover a better way to shop. Quality, convenience, and style—delivered to your door.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Quick Links</h3>
          <ul className="text-sm space-y-2">
            <li><a href="/home" className="hover:underline hover:text-gray-600">Home</a></li>
            <li><a href="/collection" className="hover:underline hover:text-gray-600">Collection</a></li>
            <li><a href="/account" className="hover:underline hover:text-gray-600">Account</a></li>
            <li><a href="/cart" className="hover:underline hover:text-gray-600">Cart</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Support</h3>
          <ul className="text-sm space-y-2">
            <li><a href="#" className="hover:underline hover:text-gray-600">Contact Us</a></li>
            <li><a href="#" className="hover:underline hover:text-gray-600">FAQs</a></li>
            <li><a href="#" className="hover:underline hover:text-gray-600">Shipping & Returns</a></li>
            <li><a href="#" className="hover:underline hover:text-gray-600">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Newsletter</h3>
          <p className="text-sm mb-4">Subscribe to get the latest updates & offers.</p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 rounded-sm w-full outline-none border border-gray-400"
              required
            />
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-sm font-medium text-sm hover:bg-gray-800 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Social & Copyright */}
      <div className="mt-10 border-t border-gray-300 pt-6 text-center text-sm">
        <div className="flex justify-center gap-4 mb-4 text-gray-700">
          <a href="#" className="hover:text-black"><FaFacebookF /></a>
          <a href="#" className="hover:text-black"><FaInstagram /></a>
          <a href="#" className="hover:text-black"><FaTwitter /></a>
          <a href="#" className="hover:text-black"><FaYoutube /></a>
        </div>
        <p className="text-gray-600">&copy; {new Date().getFullYear()} Forever. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
