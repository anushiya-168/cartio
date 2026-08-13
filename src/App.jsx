import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Toast from './components/Toast'
import Footer from './components/Footer'
import PhoneCases from './pages/PhoneCases'
import PhoneCaseDetail from './pages/PhoneCaseDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<PhoneCases />} />
          <Route path="/phone-case/:id" element={<PhoneCaseDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <Footer />
        <Toast />
      </BrowserRouter>
    </CartProvider>
  )
}

export default App