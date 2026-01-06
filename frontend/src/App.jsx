import React, { useState } from 'react'
import { ProductProvider } from './contexts/ProductContext.jsx'
import { CartProvider } from './contexts/CartContext.jsx'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import About from './pages/About'
import Contact from './pages/Contact'
import Favorites from './pages/Favorites'
import CartSidebar from './components/CartSidebar'
import SearchModal from './components/SearchModal'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [showCart, setShowCart] = useState(false)
  const [showFavorites, setShowFavorites] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const handleToggleCart = () => {
    setShowCart(!showCart)
  }

  const handleToggleFavorites = () => {
    setShowFavorites(!showFavorites)
  }

  const handleToggleSearch = () => {
    setShowSearch(!showSearch)
  }

  const handleSearch = (term) => {
    setSearchTerm(term)
    setCurrentPage('catalog')
  }

  const renderPage = () => {
    if (showFavorites) {
      return <Favorites />
    }

    switch (currentPage) {
      case 'catalog':
        return <Catalog searchTerm={searchTerm} />
      case 'about':
        return <About />
      case 'contact':
        return <Contact />
      default:
        return <Home />
    }
  }

  return (
    <ProductProvider>
      <CartProvider>
        <div className="App">
          <Header 
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onToggleCart={handleToggleCart}
            onToggleFavorites={handleToggleFavorites}
            onToggleSearch={handleToggleSearch}
          />
          
          {/* Banner Principal */}
          <div className="w-full">
            <img 
              src="/img/slidemain.png" 
              alt="Holy Street Banner" 
              className="w-full h-auto object-cover"
            />
          </div>
          
          <main>
            {renderPage()}
          </main>
          
          <Footer />
          
          <CartSidebar 
            isOpen={showCart} 
            onClose={() => setShowCart(false)} 
          />

          <SearchModal
            isOpen={showSearch}
            onClose={() => setShowSearch(false)}
            onSearch={handleSearch}
          />
        </div>
      </CartProvider>
    </ProductProvider>
  )
}

export default App
