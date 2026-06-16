import Home from '@/Screens/Home/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
export default Routing
