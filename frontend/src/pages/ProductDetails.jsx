import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { FiStar, FiArrowLeft, FiShoppingCart, FiCheck } from 'react-icons/fi'
import { AiFillStar } from 'react-icons/ai'
import axios from 'axios'
import { useCart } from '../context/CartContext'

const API_BASE_URL = 'http://localhost:5000/api'

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [similarProducts, setSimilarProducts] = useState([])
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    fetchProduct()
  }, [id])

  useEffect(() => {
    if (product) {
      fetchSimilarProducts()
    }
  }, [product])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_BASE_URL}/products/${id}`)
      setProduct(response.data.data)
    } catch (error) {
      console.error('Error fetching product:', error)
      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  const fetchSimilarProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`)
      const similar = response.data.data
        .filter((p) => p.category === product.category && p._id !== product._id)
        .slice(0, 4)
      setSimilarProducts(similar)
    } catch (error) {
      console.error('Error fetching similar products:', error)
    }
  }

  const handleAddToCart = () => {
    addToCart(product)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleBuyNow = () => {
    addToCart(product)
    navigate('/checkout')
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<AiFillStar key={i} className="text-yellow-400" />)
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<AiFillStar key={i} className="text-yellow-400 opacity-50" />)
      } else {
        stars.push(<FiStar key={i} className="text-gray-300" />)
      }
    }
    return stars
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h2>
          <Link to="/" className="text-primary-600 hover:text-primary-700">
            Go back to home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-primary-600">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-500">{product.category}</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-800 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-6 transition-colors"
        >
          <FiArrowLeft />
          <span>Back</span>
        </button>

        {/* Product Details */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-12">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/600x600?text=Product+Image'
                  }}
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {renderStars(product.rating)}
                </div>
                <span className="text-lg text-gray-600">
                  {product.rating.toFixed(1)} ({Math.floor(Math.random() * 500 + 100)} reviews)
                </span>
              </div>

              <div className="mb-6">
                <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {product.category}
                </span>
              </div>

              <div className="mb-6">
                <p className="text-4xl font-bold text-primary-600 mb-2">
                  ${product.price}
                </p>
                <p className="text-gray-600 text-lg">
                  {product.description || 'Premium quality product with excellent features and design.'}
                </p>
              </div>

              {/* Action Buttons - Desktop */}
              <div className="hidden lg:flex flex-col gap-4 mt-auto">
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Buy Now
                </button>
                <button
                  onClick={handleAddToCart}
                  className={`w-full flex items-center justify-center gap-2 font-semibold py-4 px-6 rounded-lg transition-all duration-300 ${
                    addedToCart
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                >
                  {addedToCart ? (
                    <>
                      <FiCheck className="text-xl" />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <FiShoppingCart className="text-xl" />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons - Mobile (Sticky) */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-50">
            <div className="container mx-auto flex gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 font-semibold py-3 px-4 rounded-lg transition-all duration-300 ${
                  addedToCart
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {addedToCart ? (
                  <>
                    <FiCheck />
                    Added
                  </>
                ) : (
                  <>
                    <FiShoppingCart />
                    Add to Cart
                  </>
                )}
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Similar Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map((item) => (
                <Link
                  key={item._id}
                  to={`/product/${item._id}`}
                  className="card group cursor-pointer transform hover:scale-105"
                >
                  <div className="relative overflow-hidden bg-gray-100 h-48">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x400?text=Product+Image'
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xl font-bold text-primary-600">${item.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetails

