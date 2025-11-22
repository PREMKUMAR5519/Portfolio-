import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Index'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
