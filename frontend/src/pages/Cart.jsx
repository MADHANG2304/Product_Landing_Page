import { Link, useNavigate } from 'react-router-dom'
import { FiTrash2, FiShoppingBag, FiPlus, FiMinus } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import Footer from '../components/Footer'

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart()
  const navigate = useNavigate()

  const handleQuantityChange = (productId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change
    updateQuantity(productId, newQuantity)
  }

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      navigate('/checkout')
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FiShoppingBag className="text-6xl text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to get started!</p>
          <Link
            to="/"
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <Link to="/" className="text-gray-500 hover:text-primary-600">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-800 font-medium">Cart</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-md p-6 mb-4">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Shopping Cart</h1>
                <button
                  onClick={clearCart}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Clear Cart
                </button>
              </div>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col sm:flex-row gap-4 p-4 border-b border-gray-200 last:border-b-0"
                  >
                    {/* Product Image */}
                    <Link
                      to={`/product/${item._id}`}
                      className="flex-shrink-0 w-full sm:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/200x200?text=Product+Image'
                        }}
                      />
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <Link
                          to={`/product/${item._id}`}
                          className="text-lg font-semibold text-gray-800 hover:text-primary-600 transition-colors mb-2 block"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                        <p className="text-xl font-bold text-primary-600">${item.price}</p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
                          <button
                            onClick={() => handleQuantityChange(item._id, item.quantity, -1)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <FiMinus className="text-gray-600" />
                          </button>
                          <span className="px-4 py-2 text-gray-800 font-medium min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item._id, item.quantity, 1)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <FiPlus className="text-gray-600" />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-800">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>

                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove item"
                        >
                          <FiTrash2 className="text-xl" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Link
              to="/"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:w-96">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-xl font-bold text-gray-800">
                    <span>Total</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg mb-4"
              >
                Proceed to Checkout
              </button>

              <p className="text-xs text-gray-500 text-center">
                Secure checkout • Free shipping on orders over $50
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Cart

