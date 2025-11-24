import { useNavigate } from 'react-router-dom'
import { FiStar } from 'react-icons/fi'
import { AiFillStar } from 'react-icons/ai'

const ProductsGrid = ({ products, loading }) => {
  const navigate = useNavigate()
  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <AiFillStar
            key={i}
            className="text-yellow-400"
          />
        )
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <AiFillStar
            key={i}
            className="text-yellow-400 opacity-50"
          />
        )
      } else {
        stars.push(
          <FiStar key={i} className="text-gray-300" />
        )
      }
    }
    return stars
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600"></div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-gray-500">No products found. Try adjusting your filters.</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Products ({products.length})
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            onClick={() => navigate(`/product/${product._id}`)}
            className="card group cursor-pointer transform hover:scale-105"
          >
            {/* Product Image */}
            <div className="relative overflow-hidden bg-gray-100 h-64">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x400?text=Product+Image'
                }}
              />
              <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
                <span className="text-sm font-semibold text-primary-600">
                  ${product.price}
                </span>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors duration-300">
                {product.name}
              </h3>
              
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-gray-600">
                  ({product.rating.toFixed(1)})
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <span className="text-primary-600 hover:text-primary-700 font-semibold text-sm transition-colors duration-300">
                  View Details →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductsGrid

