import { useState, useEffect } from 'react'
import Hero from '../components/Hero'
import ProductsGrid from '../components/ProductsGrid'
import FilterSection from '../components/FilterSection'
import Footer from '../components/Footer'
import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000/api'

function Home() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [priceRange, setPriceRange] = useState([0, 10000])

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [products, selectedCategory, priceRange])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_BASE_URL}/products`)
      setProducts(response.data.data)
      setFilteredProducts(response.data.data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...products]

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Price range filter
    filtered = filtered.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    )

    setFilteredProducts(filtered)
  }

  const categories = ['All', ...new Set(products.map(p => p.category))]

  return (
    <>
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <FilterSection
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          maxPrice={Math.max(...products.map(p => p.price), 10000)}
        />
        <ProductsGrid products={filteredProducts} loading={loading} />
      </div>
      <Footer />
    </>
  )
}

export default Home

