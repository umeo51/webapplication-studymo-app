import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const LearningContext = createContext({})

export const useLearning = () => {
  const context = useContext(LearningContext)
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider')
  }
  return context
}

export const LearningProvider = ({ children }) => {
  const { currentUser, userProfile, updateUserProfile } = useAuth()
  const [learningData, setLearningData] = useState({
    todaysLessons: [],
    learningHistory: [],
    currentSession: null
  })

  // Learning categories with content
  const categories = {
    programming: {
      id: 'programming',
      name: 'プログラミング',
      icon: '💻',
      color: 'bg-blue-500',
      lessons: [
        { id: 'js-basics', title: 'JavaScript基礎：変数と関数', duration: 15, difficulty: 'beginner' },
        { id: 'react-hooks', title: 'React Hooks入門', duration: 12, difficulty: 'intermediate' },
        { id: 'api-integration', title: 'API連携の基本', duration: 18, difficulty: 'intermediate' },
        { id: 'async-programming', title: '非同期プログラミング', duration: 20, difficulty: 'advanced' },
        { id: 'testing-basics', title: 'テスト駆動開発入門', duration: 16, difficulty: 'intermediate' }
      ]
    },
    english: {
      id: 'english',
      name: '英語学習',
      icon: '🇺🇸',
      color: 'bg-green-500',
      lessons: [
        { id: 'daily-conversation', title: '日常英会話フレーズ', duration: 10, difficulty: 'beginner' },
        { id: 'business-english', title: 'ビジネス英語基礎', duration: 15, difficulty: 'intermediate' },
        { id: 'toeic-reading', title: 'TOEIC読解対策', duration: 20, difficulty: 'intermediate' },
        { id: 'pronunciation', title: '発音練習', duration: 12, difficulty: 'beginner' },
        { id: 'grammar-advanced', title: '上級文法', duration: 18, difficulty: 'advanced' }
      ]
    },
    business: {
      id: 'business',
      name: 'ビジネススキル',
      icon: '📊',
      color: 'bg-purple-500',
      lessons: [
        { id: 'presentation-skills', title: 'プレゼンテーション技術', duration: 15, difficulty: 'intermediate' },
        { id: 'data-analysis', title: 'データ分析入門', duration: 20, difficulty: 'intermediate' },
        { id: 'project-management', title: 'プロジェクト管理', duration: 18, difficulty: 'advanced' },
        { id: 'leadership', title: 'リーダーシップ基礎', duration: 16, difficulty: 'intermediate' },
        { id: 'negotiation', title: '交渉術', duration: 14, difficulty: 'advanced' }
      ]
    },
    design: {
      id: 'design',
      name: 'デザイン',
      icon: '🎨',
      color: 'bg-pink-500',
      lessons: [
        { id: 'ui-principles', title: 'UI設計の原則', duration: 15, difficulty: 'beginner' },
        { id: 'color-theory', title: '色彩理論', duration: 12, difficulty: 'beginner' },
        { id: 'typography', title: 'タイポグラフィ', duration: 18, difficulty: 'intermediate' },
        { id: 'user-research', title: 'ユーザーリサーチ', duration: 20, difficulty: 'intermediate' },
        { id: 'prototyping', title: 'プロトタイピング', duration: 16, difficulty: 'advanced' }
      ]
    }
  }

  // Generate today's lessons based on user preferences and skill level
  const generateTodaysLessons = () => {
    if (!userProfile) return []

    const preferredCategories = userProfile.preferences?.preferredCategories || ['programming']
    const skillLevels = userProfile.skillLevels || {}
    
    const lessons = []
    
    preferredCategories.forEach(categoryId => {
      const category = categories[categoryId]
      if (!category) return
      
      const userSkillLevel = skillLevels[categoryId] || 0
      let difficulty = 'beginner'
      if (userSkillLevel > 30) difficulty = 'intermediate'
      if (userSkillLevel > 70) difficulty = 'advanced'
      
      // Select lessons appropriate for user's skill level
      const appropriateLessons = category.lessons.filter(lesson => 
        lesson.difficulty === difficulty || 
        (difficulty === 'intermediate' && lesson.difficulty === 'beginner') ||
        (difficulty === 'advanced' && lesson.difficulty !== 'beginner')
      )
      
      // Add 1-2 lessons from this category
      const selectedLessons = appropriateLessons
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.min(2, appropriateLessons.length))
        .map(lesson => ({
          ...lesson,
          category: categoryId,
          completed: Math.random() > 0.7 // Simulate some completed lessons
        }))
      
      lessons.push(...selectedLessons)
    })
    
    return lessons.slice(0, 4) // Limit to 4 lessons per day
  }

  // Complete a lesson
  const completeLesson = async (lessonId) => {
    const updatedLessons = learningData.todaysLessons.map(lesson =>
      lesson.id === lessonId ? { ...lesson, completed: true } : lesson
    )
    
    setLearningData(prev => ({
      ...prev,
      todaysLessons: updatedLessons
    }))
    
    // Update user profile
    const completedCount = updatedLessons.filter(l => l.completed).length
    const lesson = updatedLessons.find(l => l.id === lessonId)
    
    if (lesson && userProfile) {
      const skillIncrease = lesson.difficulty === 'beginner' ? 1 : 
                           lesson.difficulty === 'intermediate' ? 2 : 3
      
      const updates = {
        completedLessons: userProfile.completedLessons + 1,
        skillLevels: {
          ...userProfile.skillLevels,
          [lesson.category]: Math.min(
            (userProfile.skillLevels[lesson.category] || 0) + skillIncrease,
            100
          )
        }
      }
      
      await updateUserProfile(updates)
    }
  }

  // Start learning session
  const startLearningSession = (categoryId, lessonId = null) => {
    const session = {
      id: Date.now().toString(),
      categoryId,
      lessonId,
      startTime: new Date(),
      duration: 0,
      completed: false
    }
    
    setLearningData(prev => ({
      ...prev,
      currentSession: session
    }))
    
    return session
  }

  // Complete learning session
  const completeLearningSession = async (sessionDuration) => {
    if (!learningData.currentSession || !userProfile) return
    
    const session = {
      ...learningData.currentSession,
      duration: sessionDuration,
      completed: true,
      endTime: new Date()
    }
    
    // Update learning history
    setLearningData(prev => ({
      ...prev,
      currentSession: null,
      learningHistory: [session, ...prev.learningHistory.slice(0, 49)] // Keep last 50 sessions
    }))
    
    // Update user profile
    const updates = {
      totalLearningTime: userProfile.totalLearningTime + Math.floor(sessionDuration / 60),
      currentStreak: userProfile.currentStreak + (Math.random() > 0.3 ? 1 : 0) // Simulate streak logic
    }
    
    await updateUserProfile(updates)
    
    // Complete associated lesson if any
    if (session.lessonId) {
      await completeLesson(session.lessonId)
    }
  }

  // Initialize today's lessons when user profile is available
  useEffect(() => {
    if (userProfile && learningData.todaysLessons.length === 0) {
      const lessons = generateTodaysLessons()
      setLearningData(prev => ({
        ...prev,
        todaysLessons: lessons
      }))
    }
  }, [userProfile])

  const value = {
    categories,
    learningData,
    completeLesson,
    startLearningSession,
    completeLearningSession,
    generateTodaysLessons
  }

  return (
    <LearningContext.Provider value={value}>
      {children}
    </LearningContext.Provider>
  )
}
