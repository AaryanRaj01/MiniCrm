import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { NameProvider } from './ContextHook/NameContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NameProvider>
    <App />
    </NameProvider>
    
  </React.StrictMode>,
)
