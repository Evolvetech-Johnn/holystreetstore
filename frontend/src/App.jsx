import React, { useState } from 'react'
import { ProductProvider } from './contexts/ProductContext.jsx'
import { CartProvider } from './contexts/CartContext.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import About from './pages/About'
import Contact from './pages/Contact'
import Favorites from './pages/Favorites'
import Checkout from './pages/Checkout'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import SupportPages from './pages/SupportPages'
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
      case 'checkout':
        return <Checkout setCurrentPage={setCurrentPage} />
      case 'profile':
        return <Profile setCurrentPage={setCurrentPage} />
      case 'login':
        return <Login setCurrentPage={setCurrentPage} />
      case 'register':
        return <Register setCurrentPage={setCurrentPage} />
      case 'support-privacy':
        return <SupportPages page="privacy" setCurrentPage={setCurrentPage} />
      case 'support-terms':
        return <SupportPages page="terms" setCurrentPage={setCurrentPage} />
      case 'support-shipping':
        return <SupportPages page="shipping" setCurrentPage={setCurrentPage} />
      case 'support-returns':
        return <SupportPages page="returns" setCurrentPage={setCurrentPage} />
      default:
        return <Home setCurrentPage={setCurrentPage} />
    }
  }

  return (
    <ProductProvider>
      <AuthProvider>
        <CartProvider>
          <div className="App">
          <Header 
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onToggleCart={handleToggleCart}
            onToggleFavorites={handleToggleFavorites}
            onToggleSearch={handleToggleSearch}
          />
          
          {/* Banner Principal removido - Agora gerenciado pela Home.jsx */}
          
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
      </AuthProvider>
    </ProductProvider>
  )
}

export default App
