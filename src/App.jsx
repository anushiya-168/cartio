import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import Wishlist from './pages/Wishlist'
import Admin from './pages/Admin'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import AnnouncementBar from './components/AnnouncementBar'
import Toast from './components/Toast'
import FloatingHelp from './components/FloatingHelp'
import Footer from './components/Footer'
import PhoneCases from './pages/PhoneCases'
import PhoneCaseDetail from './pages/PhoneCaseDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
      <BrowserRouter>
      <AnnouncementBar />
      <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<PhoneCases />} />
          <Route path="/phone-case/:id" element={<PhoneCaseDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
        <Toast />
        <FloatingHelp />
      </BrowserRouter>
      </WishlistProvider>
    </CartProvider>
  )
}

export default App