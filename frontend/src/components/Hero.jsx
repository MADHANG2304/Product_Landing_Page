import { FiArrowRight } from 'react-icons/fi'

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white overflow-hidden">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Discover Amazing Products
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-primary-100">
            Shop the latest trends in electronics, fashion, and more. 
            Quality products at unbeatable prices.
          </p>
          <button className="btn-primary bg-white text-primary-600 hover:bg-primary-50 flex items-center gap-2 group">
            Shop Now
            <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500 rounded-full opacity-20 blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-400 rounded-full opacity-20 blur-3xl translate-y-1/2 -translate-x-1/2"></div>
    </section>
  )
}

export default Hero

