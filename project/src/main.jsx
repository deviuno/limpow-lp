import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import AppRoot from './App.jsx'
import './index.css'
import { initAuth } from './lib/auth'

// Inicializa o listener de autenticação
initAuth();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <Router>
        <AppRoot />
      </Router>
    </HelmetProvider>
  </React.StrictMode>,
)