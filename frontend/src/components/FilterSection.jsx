import { useState } from 'react'
import { FiFilter, FiX } from 'react-icons/fi'

const FilterSection = ({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  maxPrice
}) => {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="mb-8">
      {/* Mobile Filter Toggle */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="md:hidden flex items-center gap-2 mb-4 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
      >
        <FiFilter />
        <span>Filters</span>
      </button>

      {/* Filter Panel */}
      <div
        className={`${
          showFilters ? 'block' : 'hidden'
        } md:block bg-white rounded-xl shadow-md p-6 mb-6`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <FiFilter />
            Filters
          </h3>
          <button
            onClick={() => setShowFilters(false)}
            className="md:hidden text-gray-500 hover:text-gray-700"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </label>
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max={maxPrice}
                value={priceRange[1]}
                onChange={(e) =>
                  onPriceRangeChange([priceRange[0], parseInt(e.target.value)])
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>$0</span>
                <span>${maxPrice}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterSection

