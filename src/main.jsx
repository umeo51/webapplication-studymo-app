import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { LearningProvider } from './contexts/LearningContext.jsx'
import { SubscriptionProvider } from './contexts/SubscriptionContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <SubscriptionProvider>
        <LearningProvider>
          <App />
        </LearningProvider>
      </SubscriptionProvider>
    </AuthProvider>
  </StrictMode>,
)
