import { BrowserRouter, Route, Link,Routes } from 'react-router-dom'
import './App.css'
import Home from './components/pages/Home'
import About from './components/pages/About'
import Cart from './components/pages/Cart'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
