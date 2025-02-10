import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { CssBaseline } from '@mui/material'
import ContextProvider from './Context/ContextProvider.jsx'
import {Toaster} from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <ContextProvider>
      <CssBaseline>
        <App />
        <Toaster/>
      </CssBaseline>
    </ContextProvider>

  </React.StrictMode>,
)