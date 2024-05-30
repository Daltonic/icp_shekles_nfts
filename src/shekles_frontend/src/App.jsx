import homeImage from '../assets/home-img.png'
import Header from './components/Header'
import Footer from './components/Footer'
import Minter from './components/Minter'
import Gallery from './components/Gallery'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <main className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={<img className="bottom-space" src={homeImage} />}
        />
        <Route path="/minter" element={<Minter />} />
        <Route path="/discover" element={<Gallery title="Discover" />} />
        <Route path="/collection" element={<Gallery title="My NFTs" role={true} />} />
      </Routes>
      <Footer />
    </main>
  )
}

export default App
