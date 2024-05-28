import homeImage from '../assets/home-img.png'
import Header from './components/Header'
import Footer from './components/Footer'
import Minter from './components/Minter'
import Item from './components/Item'

function App() {
  const NFT_ID = 'b77ix-eeaaa-aaaaa-qaada-cai'
  return (
    <main className="App">
      <Header />
      {/* <img className="bottom-space" src={homeImage} /> */}
      {/* <Item id={NFT_ID} /> */}
      <Minter />
      <Footer />
    </main>
  )
}

export default App
