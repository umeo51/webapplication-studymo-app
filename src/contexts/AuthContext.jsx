import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userProfile, setUserProfile] = useState(null)

  // Demo login for testing
  const demoLogin = async () => {
    const demoUser = {
      uid: 'demo-user-123',
      email: 'demo@skillhabit.com',
      displayName: 'デモユーザー'
    }
    
    const demoProfile = {
      displayName: 'デモユーザー',
      email: 'demo@skillhabit.com',
      currentStreak: 7,
      totalLearningTime: 420,
      completedLessons: 12,
      skillLevels: {
        javascript: 75,
        react: 60,
        api: 45,
        english: 30,
        business: 20,
        design: 15
      },
      preferences: {
        dailyGoal: 15,
        reminderTime: '19:00',
        preferredCategories: ['programming', 'english']
      },
      subscription: {
        plan: 'free',
        startDate: null,
        endDate: null
      }
    }
    
    setCurrentUser(demoUser)
    setUserProfile(demoProfile)
    setLoading(false)
    return demoUser
  }

  // Logout function
  const logout = async () => {
    setCurrentUser(null)
    setUserProfile(null)
  }

  // Update user profile
  const updateUserProfile = async (updates) => {
    if (!currentUser) return
    setUserProfile(prev => ({ ...prev, ...updates }))
  }

  // Initialize with demo data for development
  useEffect(() => {
    const initDemo = async () => {
      await demoLogin()
    }
    initDemo()
  }, [])

  const value = {
    currentUser,
    userProfile,
    logout,
    updateUserProfile,
    demoLogin,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
