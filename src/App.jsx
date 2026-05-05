import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import OrderForm from './pages/OrderForm'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<OrderForm />} />
        <Route path="/admin" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
