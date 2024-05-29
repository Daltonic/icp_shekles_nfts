import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Principal } from '@dfinity/principal'
import App from './App'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

const CURRENT_USER_ID = Principal.fromText('2vxsx-fae')
export default CURRENT_USER_ID
