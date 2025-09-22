import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const SubscriptionContext = createContext({})

export const useSubscription = () => {
  const context = useContext(SubscriptionContext)
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider')
  }
  return context
}

export const SubscriptionProvider = ({ children }) => {
  const { currentUser, userProfile, updateUserProfile } = useAuth()
  const [subscriptionStatus, setSubscriptionStatus] = useState('free')
  const [showPaywall, setShowPaywall] = useState(false)
  const [dailyUsage, setDailyUsage] = useState({
    sessionsCompleted: 0,
    maxFreeSessions: 1
  })

  // Subscription plans
  const plans = {
    free: {
      id: 'free',
      name: '無料プラン',
      price: 0,
      features: [
        '1日1回（15分）の学習セッション',
        '基本的な進捗追跡',
        '3つの学習カテゴリー',
        '広告表示あり'
      ],
      limitations: {
        maxDailySessions: 1,
        maxCategories: 3,
        showAds: true,
        advancedAnalytics: false,
        offlineAccess: false
      }
    },
    premium: {
      id: 'premium',
      name: 'プレミアムプラン',
      price: 680,
      priceYearly: 5800,
      features: [
        '無制限の学習セッション',
        '広告非表示',
        '全学習カテゴリーへのアクセス',
        '詳細な学習分析レポート',
        'AI学習アドバイザー',
        'オフライン学習対応',
        '優先サポート'
      ],
      limitations: {
        maxDailySessions: -1, // unlimited
        maxCategories: -1, // unlimited
        showAds: false,
        advancedAnalytics: true,
        offlineAccess: true
      }
    }
  }

  // Check if user can start a new session
  const canStartSession = () => {
    if (subscriptionStatus === 'premium') return true
    return dailyUsage.sessionsCompleted < dailyUsage.maxFreeSessions
  }

  // Check if feature is available
  const hasFeatureAccess = (feature) => {
    const currentPlan = plans[subscriptionStatus]
    if (!currentPlan) return false
    
    switch (feature) {
      case 'unlimited_sessions':
        return currentPlan.limitations.maxDailySessions === -1
      case 'no_ads':
        return !currentPlan.limitations.showAds
      case 'all_categories':
        return currentPlan.limitations.maxCategories === -1
      case 'advanced_analytics':
        return currentPlan.limitations.advancedAnalytics
      case 'offline_access':
        return currentPlan.limitations.offlineAccess
      default:
        return false
    }
  }

  // Track session completion
  const trackSessionCompletion = () => {
    if (subscriptionStatus === 'free') {
      setDailyUsage(prev => ({
        ...prev,
        sessionsCompleted: prev.sessionsCompleted + 1
      }))
    }
  }

  // Show paywall
  const triggerPaywall = (reason = 'session_limit') => {
    setShowPaywall(true)
  }

  // Hide paywall
  const hidePaywall = () => {
    setShowPaywall(false)
  }

  // Simulate subscription upgrade (for demo)
  const upgradeToPremium = async (plan = 'monthly') => {
    const startDate = new Date()
    const endDate = new Date()
    endDate.setMonth(endDate.getMonth() + (plan === 'yearly' ? 12 : 1))
    
    const subscriptionData = {
      plan: 'premium',
      startDate,
      endDate,
      paymentMethod: 'demo',
      amount: plan === 'yearly' ? 5800 : 680
    }
    
    await updateUserProfile({
      subscription: subscriptionData
    })
    
    setSubscriptionStatus('premium')
    setShowPaywall(false)
    
    // Reset daily usage for premium users
    setDailyUsage({
      sessionsCompleted: 0,
      maxFreeSessions: -1
    })
    
    return subscriptionData
  }

  // Cancel subscription (demo)
  const cancelSubscription = async () => {
    await updateUserProfile({
      subscription: {
        plan: 'free',
        startDate: null,
        endDate: null
      }
    })
    
    setSubscriptionStatus('free')
    setDailyUsage({
      sessionsCompleted: 0,
      maxFreeSessions: 1
    })
  }

  // Initialize subscription status from user profile
  useEffect(() => {
    if (userProfile?.subscription) {
      const { plan, endDate } = userProfile.subscription
      
      // Check if subscription is still valid
      if (plan === 'premium' && endDate) {
        const now = new Date()
        const expiry = new Date(endDate)
        
        if (now < expiry) {
          setSubscriptionStatus('premium')
          setDailyUsage({
            sessionsCompleted: 0,
            maxFreeSessions: -1
          })
        } else {
          // Subscription expired
          setSubscriptionStatus('free')
          cancelSubscription()
        }
      } else {
        setSubscriptionStatus('free')
      }
    }
  }, [userProfile])

  // Reset daily usage at midnight (simplified for demo)
  useEffect(() => {
    const resetDailyUsage = () => {
      if (subscriptionStatus === 'free') {
        setDailyUsage(prev => ({
          ...prev,
          sessionsCompleted: 0
        }))
      }
    }
    
    // Reset usage every 24 hours (simplified)
    const interval = setInterval(resetDailyUsage, 24 * 60 * 60 * 1000)
    return () => clearInterval(interval)
  }, [subscriptionStatus])

  const value = {
    subscriptionStatus,
    plans,
    dailyUsage,
    showPaywall,
    canStartSession,
    hasFeatureAccess,
    trackSessionCompletion,
    triggerPaywall,
    hidePaywall,
    upgradeToPremium,
    cancelSubscription
  }

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  )
}
