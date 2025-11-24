import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FiSearch, FiShoppingCart } from 'react-icons/fi'
import axios from 'axios'
import { useCart } from '../context/CartContext'

const API_BASE_URL = 'http://localhost:5000/api'

const Header = () => {
  const navigate = useNavigate()
  const { getCartItemsCount } = useCart()
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchRef = useRef(null)
  const suggestionsRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.trim().length > 0) {
        try {
          const response = await axios.get(`${API_BASE_URL}/search`, {
            params: { q: searchTerm }
          })
          setSuggestions(response.data.data)
          setShowSuggestions(true)
        } catch (error) {
          console.error('Error fetching suggestions:', error)
          setSuggestions([])
        }
      } else {
        setSuggestions([])
        setShowSuggestions(false)
      }
    }

    const debounceTimer = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(debounceTimer)
  }, [searchTerm])

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm('')
    setShowSuggestions(false)
    navigate(`/product/${suggestion._id}`)
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-primary-600">ShopHub</h1>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl relative" ref={searchRef}>
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => searchTerm.trim().length > 0 && setShowSuggestions(true)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
              />
            </div>

            {/* Autosuggest Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div
                ref={suggestionsRef}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-64 overflow-y-auto z-50"
              >
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion._id}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-4 py-3 hover:bg-primary-50 cursor-pointer transition-colors duration-200 border-b border-gray-100 last:border-b-0 flex items-center gap-3"
                  >
                    <FiSearch className="text-gray-400" />
                    <span className="text-gray-700">{suggestion.name}</span>
                  </div>
                ))}
              </div>
            )}

            {showSuggestions && searchTerm.trim().length > 0 && suggestions.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50">
                <p className="text-gray-500 text-center">No products found</p>
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <Link to="/cart" className="relative">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 relative">
              <FiShoppingCart className="text-2xl text-gray-700" />
              {getCartItemsCount() > 0 && (
                <span className="absolute top-0 right-0 bg-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartItemsCount() > 9 ? '9+' : getCartItemsCount()}
                </span>
              )}
            </button>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header

