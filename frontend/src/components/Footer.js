import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-10">
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Us Section */}
        <div>
          <h4 className="text-green-700 font-bold text-lg mb-4">About PlantShop</h4>
          <p className="text-gray-700">
            We are passionate about bringing nature closer to you. Explore our range of indoor and outdoor plants that will brighten your space and purify your environment.
          </p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h4 className="text-green-700 font-bold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-700">
            <li>
              <a href="/" className="hover:text-green-800">Home</a>
            </li>
            <li>
              <a href="/shop" className="hover:text-green-800">Shop</a>
            </li>
            <li>
              <a href="/about" className="hover:text-green-800">About Us</a>
            </li>
            <li>
              <a href="/contact" className="hover:text-green-800">Contact</a>
            </li>
          </ul>
        </div>

        {/* Contact Info Section */}
        <div>
          <h4 className="text-green-700 font-bold text-lg mb-4">Contact Us</h4>
          <p className="text-gray-700">123 Green Street, Plant City, Earth</p>
          <p className="text-gray-700">Email: info@plantshop.com</p>
          <p className="text-gray-700">Phone: +1 234 567 890</p>
        </div>

        {/* Social Media Section */}
        <div>
          <h4 className="text-green-700 font-bold text-lg mb-4">Follow Us</h4>
          <div className="flex space-x-4 text-green-700">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-800">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.35v21.3C0 23.4.6 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128v-2.671c0-3.099 1.893-4.787 4.658-4.787 1.325 0 2.465.099 2.796.143v3.243h-1.918c-1.504 0-1.796.715-1.796 1.76v2.311h3.588l-.467 3.622h-3.12V24h6.117c.723 0 1.323-.6 1.323-1.35V1.35C24 .6 23.4 0 22.675 0z" />
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-800">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557a9.822 9.822 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 0 0-8.379 4.482 13.978 13.978 0 0 1-10.15-5.147 4.92 4.92 0 0 0 1.524 6.573 4.902 4.902 0 0 1-2.228-.616v.062a4.924 4.924 0 0 0 3.946 4.827 4.901 4.901 0 0 1-2.224.085 4.927 4.927 0 0 0 4.6 3.417 9.864 9.864 0 0 1-7.29 2.03A13.918 13.918 0 0 0 7.548 21c9.056 0 14.009-7.506 14.009-14.009 0-.213-.004-.425-.014-.636A10.011 10.011 0 0 0 24 4.557z" />
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-800">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.206.055 2.07.24 2.535.415.653.25 1.127.55 1.62 1.043.493.493.793.967 1.043 1.62.175.465.36 1.329.415 2.535.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.055 1.206-.24 2.07-.415 2.535-.25.653-.55 1.127-1.043 1.62-.493.493-.967.793-1.62 1.043-.465.175-1.329.36-2.535.415-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.206-.055-2.07-.24-2.535-.415a4.647 4.647 0 0 1-1.62-1.043 4.647 4.647 0 0 1-1.043-1.62c-.175-.465-.36-1.329-.415-2.535-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.055-1.206.24-2.07.415-2.535.25-.653.55-1.127 1.043-1.62.493-.493.967-.793 1.62-1.043.465-.175 1.329-.36 2.535-.415 1.266-.058 1.646-.07 4.85-.07zm0 6.15a5.85 5.85 0 1 0 0 11.7 5.85 5.85 0 0 0 0-11.7zm0 9.45a3.6 3.6 0 1 1 0-7.2 3.6 3.6 0 0 1 0 7.2zm4.225-7.225a.925.925 0 1 0-.001-1.85.925.925 0 0 0 .001 1.85z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-green-700 text-white text-center py-4">
        <p className="text-sm">&copy; {new Date().getFullYear()} PlantShop. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
