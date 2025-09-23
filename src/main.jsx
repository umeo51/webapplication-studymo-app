import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { LearningProvider } from './contexts/LearningContext.jsx'
import { SubscriptionProvider } from './contexts/SubscriptionContext.jsx'
import { AdProvider } from './contexts/AdContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <SubscriptionProvider>
        <AdProvider>
          <LearningProvider>
            <App />
          </LearningProvider>
        </AdProvider>
      </SubscriptionProvider>
    </AuthProvider>
  </StrictMode>,
)
