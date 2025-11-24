import { Link } from 'react-router-dom'
import { FiCheckCircle } from 'react-icons/fi'

const Checkout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 text-center">
          <div className="mb-6">
            <FiCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Checkout Flow
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              Checkout flow not implemented — assignment demo.
            </p>
            <p className="text-sm text-gray-500">
              This is a placeholder page for demonstration purposes.
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <Link
              to="/"
              className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Return to Home
            </Link>
            <div>
              <Link
                to="/cart"
                className="inline-block text-primary-600 hover:text-primary-700 font-medium"
              >
                Back to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout

