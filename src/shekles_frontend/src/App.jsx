import homeImage from '../assets/home-img.png'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <main className="App">
      <Header />
      <img className="bottom-space" src={homeImage} />
      <Footer />
    </main>
  )
}

export default App
