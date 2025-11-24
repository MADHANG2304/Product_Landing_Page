import { Link } from 'react-router-dom'
import { FiFacebook, FiInstagram, FiTwitter, FiLinkedin, FiMail, FiPhone } from 'react-icons/fi'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">ShopHub</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Your trusted destination for premium products. We offer quality items across 
              electronics, fashion, and lifestyle categories with exceptional customer service.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <FiMail className="text-primary-400" />
              <span>support@shophub.com</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400 mt-2">
              <FiPhone className="text-primary-400" />
              <span>+91 9363234339</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-primary-400 transition-colors duration-300 text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-primary-400 transition-colors duration-300 text-sm"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-primary-400 transition-colors duration-300 text-sm"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="text-gray-400 hover:text-primary-400 transition-colors duration-300 text-sm"
                >
                  Cart
                </Link>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-primary-400 transition-colors duration-300 text-sm"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-primary-400 transition-colors duration-300 text-sm"
                >
                  Electronics
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-primary-400 transition-colors duration-300 text-sm"
                >
                  Shoes
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-primary-400 transition-colors duration-300 text-sm"
                >
                  Shirts
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-primary-400 transition-colors duration-300 text-sm"
                >
                  T-Shirts
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-primary-400 transition-colors duration-300 text-sm"
                >
                  Bags
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Follow Us</h4>
            <p className="text-gray-400 text-sm mb-4">
              Stay connected with us on social media for the latest updates and offers.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                aria-label="Facebook"
              >
                <FiFacebook className="text-lg" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                aria-label="Instagram"
              >
                <FiInstagram className="text-lg" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                aria-label="Twitter"
              >
                <FiTwitter className="text-lg" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                aria-label="LinkedIn"
              >
                <FiLinkedin className="text-lg" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} ShopHub. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <a
                href="#privacy"
                className="hover:text-primary-400 transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#terms"
                className="hover:text-primary-400 transition-colors duration-300"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

