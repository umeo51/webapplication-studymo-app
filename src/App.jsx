import { useState, useEffect, useMemo, useCallback } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { BookOpen, Clock, Target, TrendingUp, Play, Pause, Check, Star, User, LogOut, Crown, Lock, Zap, Award } from 'lucide-react'
import { useAuth } from './contexts/AuthContext.jsx'
import { useLearning } from './contexts/LearningContext.jsx'
import { useSubscription } from './contexts/SubscriptionContext.jsx'
import { Paywall } from './components/Paywall.jsx'
import { AdBanner } from './components/AdBanner.jsx'
import './App.css'

function App() {
  const { currentUser, userProfile, logout } = useAuth()
  const { categories, learningData, completeLesson, startLearningSession, completeLearningSession } = useLearning()
  const { 
    subscriptionStatus, 
    canStartSession, 
    hasFeatureAccess, 
    trackSessionCompletion, 
    triggerPaywall,
    dailyUsage 
  } = useSubscription()
  
  const [isLearning, setIsLearning] = useState(false)
  const [sessionTime, setSessionTime] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('programming')
  const [currentSession, setCurrentSession] = useState(null)
  const [showInterstitialAd, setShowInterstitialAd] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)

  // Timer for learning session
  useEffect(() => {
    let interval = null
    if (isLearning) {
      interval = setInterval(() => {
        setSessionTime(time => time + 1)
      }, 1000)
    } else if (!isLearning && sessionTime !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isLearning, sessionTime])

  // Memoized calculations for performance
  const categoriesArray = useMemo(() => Object.values(categories), [categories])
  const completedTodayCount = useMemo(() => 
    learningData.todaysLessons.filter(l => l.completed).length, 
    [learningData.todaysLessons]
  )
  const weeklyProgress = useMemo(() => 
    Math.min(userProfile?.currentStreak || 0, 7), 
    [userProfile?.currentStreak]
  )
  const isPremium = useMemo(() => subscriptionStatus === 'premium', [subscriptionStatus])
  const averageSkillLevel = useMemo(() => {
    if (!userProfile?.skillLevels) return 0
    const levels = Object.values(userProfile.skillLevels)
    return Math.round(levels.reduce((a, b) => a + b, 0) / levels.length)
  }, [userProfile?.skillLevels])

  const startLearning = useCallback(() => {
    // Check if user can start a session
    if (!canStartSession()) {
      triggerPaywall('session_limit')
      return
    }

    const session = startLearningSession(selectedCategory)
    setCurrentSession(session)
    setIsLearning(true)
    setSessionTime(0)
  }, [canStartSession, triggerPaywall, startLearningSession, selectedCategory])

  const pauseLearning = useCallback(() => {
    setIsLearning(false)
  }, [])

  const completeLearning = useCallback(async () => {
    setIsLearning(false)
    if (currentSession) {
      await completeLearningSession(sessionTime)
      trackSessionCompletion()
      
      // Show celebration for completed sessions
      if (sessionTime >= 900) { // 15 minutes
        setShowCelebration(true)
        setTimeout(() => setShowCelebration(false), 3000)
      }
      
      // Show interstitial ad for free users after session completion
      if (subscriptionStatus === 'free' && Math.random() > 0.5) {
        setShowInterstitialAd(true)
        setTimeout(() => setShowInterstitialAd(false), 5000)
      }
    }
    setSessionTime(0)
    setCurrentSession(null)
  }, [currentSession, sessionTime, completeLearningSession, trackSessionCompletion, subscriptionStatus])

  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }, [])

  const handleLessonComplete = useCallback(async (lessonId) => {
    await completeLesson(lessonId)
    // Show mini celebration
    setShowCelebration(true)
    setTimeout(() => setShowCelebration(false), 1500)
  }, [completeLesson])

  const handleCategorySelect = useCallback((categoryId) => {
    // Check if category is available for free users
    if (subscriptionStatus === 'free') {
      const allowedCategories = ['programming', 'english', 'business']
      if (!allowedCategories.includes(categoryId)) {
        triggerPaywall('category_limit')
        return
      }
    }
    setSelectedCategory(categoryId)
  }, [subscriptionStatus, triggerPaywall])

  if (!currentUser || !userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-96 animate-pulse">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              <BookOpen className="inline-block mr-2 text-blue-600" />
              SkillHabit
            </CardTitle>
            <CardDescription>15分で身につく学習習慣</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="mb-4">読み込み中...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 relative">
      {/* Celebration Animation */}
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="animate-bounce text-6xl">🎉</div>
          <div className="absolute animate-ping text-4xl">⭐</div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8 animate-fade-in">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold text-gray-800 mb-2 hover:scale-105 transition-transform duration-200">
              <BookOpen className="inline-block mr-2 text-blue-600" />
              SkillHabit
            </h1>
            <p className="text-gray-600 text-lg">15分で身につく学習習慣</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              {isPremium ? (
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white animate-pulse">
                  <Crown className="w-3 h-3 mr-1" />
                  プレミアム
                </Badge>
              ) : (
                <Badge variant="outline">無料プラン</Badge>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User className="w-4 h-4" />
              {userProfile.displayName}
            </div>
            <Button variant="outline" size="sm" onClick={logout} className="hover:scale-105 transition-transform">
              <LogOut className="w-4 h-4 mr-1" />
              ログアウト
            </Button>
          </div>
        </header>

        {/* Usage Limit Warning for Free Users */}
        {!isPremium && dailyUsage.sessionsCompleted >= dailyUsage.maxFreeSessions && (
          <Card className="mb-6 border-orange-200 bg-orange-50 animate-slide-down">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Lock className="w-5 h-5 text-orange-600 mr-2 animate-pulse" />
                  <div>
                    <p className="font-medium text-orange-800">今日の無料セッションを使い切りました</p>
                    <p className="text-sm text-orange-600">プレミアムプランで無制限学習を始めませんか？</p>
                  </div>
                </div>
                <Button onClick={() => triggerPaywall('session_limit')} className="hover:scale-105 transition-transform">
                  <Zap className="w-4 h-4 mr-1" />
                  アップグレード
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Ad Banner for Free Users */}
        {!isPremium && <AdBanner position="banner" category={selectedCategory} />}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center hover:shadow-lg transition-shadow duration-200 hover:scale-105 transform transition-transform">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-orange-600 animate-count-up">
                {userProfile.currentStreak}
              </CardTitle>
              <CardDescription className="flex items-center justify-center">
                <Target className="w-4 h-4 mr-1" />
                連続学習日数
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow duration-200 hover:scale-105 transform transition-transform">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-blue-600">
                {Math.floor(userProfile.totalLearningTime / 60)}h {userProfile.totalLearningTime % 60}m
              </CardTitle>
              <CardDescription className="flex items-center justify-center">
                <Clock className="w-4 h-4 mr-1" />
                総学習時間
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow duration-200 hover:scale-105 transform transition-transform">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-green-600">
                {userProfile.completedLessons}
              </CardTitle>
              <CardDescription className="flex items-center justify-center">
                <Check className="w-4 h-4 mr-1" />
                完了レッスン
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow duration-200 hover:scale-105 transform transition-transform">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-purple-600">
                {averageSkillLevel}%
              </CardTitle>
              <CardDescription className="flex items-center justify-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                平均スキルレベル
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Learning Session */}
          <div className="lg:col-span-2">
            <Card className="mb-6 hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Play className="w-5 h-5 mr-2" />
                    今日の学習セッション
                  </div>
                  {!isPremium && (
                    <Badge variant="outline" className="text-xs">
                      {dailyUsage.sessionsCompleted}/{dailyUsage.maxFreeSessions} 使用済み
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  15分の集中学習で確実にスキルアップ
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Category Selection */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">学習カテゴリー</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {categoriesArray.map((category, index) => {
                      const isLocked = !isPremium && index >= 3
                      const isSelected = selectedCategory === category.id
                      return (
                        <Button
                          key={category.id}
                          variant={isSelected ? "default" : "outline"}
                          className={`justify-start h-12 relative transition-all duration-200 ${
                            isSelected ? 'scale-105 shadow-md' : 'hover:scale-102'
                          } ${isLocked ? 'opacity-60' : ''}`}
                          onClick={() => handleCategorySelect(category.id)}
                          disabled={isLocked}
                        >
                          <span className="text-lg mr-2">{category.icon}</span>
                          {category.name}
                          {isLocked && <Lock className="w-4 h-4 ml-auto" />}
                        </Button>
                      )
                    })}
                  </div>
                </div>

                {/* Timer */}
                <div className="text-center mb-6">
                  <div className={`text-6xl font-mono font-bold text-blue-600 mb-4 transition-all duration-300 ${
                    isLearning ? 'animate-pulse scale-110' : ''
                  }`}>
                    {formatTime(sessionTime)}
                  </div>
                  <div className="flex justify-center gap-4">
                    {!isLearning ? (
                      <Button 
                        onClick={startLearning} 
                        size="lg" 
                        className="px-8 hover:scale-105 transition-transform duration-200"
                        disabled={!canStartSession()}
                      >
                        <Play className="w-5 h-5 mr-2" />
                        学習開始
                      </Button>
                    ) : (
                      <>
                        <Button 
                          onClick={pauseLearning} 
                          variant="outline" 
                          size="lg"
                          className="hover:scale-105 transition-transform duration-200"
                        >
                          <Pause className="w-5 h-5 mr-2" />
                          一時停止
                        </Button>
                        <Button 
                          onClick={completeLearning} 
                          size="lg" 
                          className="px-8 hover:scale-105 transition-transform duration-200"
                        >
                          <Check className="w-5 h-5 mr-2" />
                          完了
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>今日の目標: 15分</span>
                    <span>{Math.floor(sessionTime / 60)}/15分</span>
                  </div>
                  <Progress 
                    value={(sessionTime / 900) * 100} 
                    className="h-2 transition-all duration-300" 
                  />
                </div>
              </CardContent>
            </Card>

            {/* Today's Lessons */}
            <Card className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <CardTitle>今日のレッスン</CardTitle>
                <CardDescription>あなたに最適化された学習コンテンツ</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {learningData.todaysLessons.map((lesson, index) => (
                    <div
                      key={lesson.id}
                      className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 hover:shadow-md ${
                        lesson.completed 
                          ? 'bg-green-50 border-green-200 scale-98' 
                          : 'bg-white border-gray-200 hover:scale-102'
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 transition-all duration-200 ${
                          lesson.completed 
                            ? 'bg-green-500 text-white scale-110' 
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {lesson.completed ? <Check className="w-4 h-4" /> : lesson.duration}
                        </div>
                        <div>
                          <h4 className="font-medium">{lesson.title}</h4>
                          <p className="text-sm text-gray-600">
                            {lesson.duration}分 • {categories[lesson.category]?.name}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {lesson.completed ? (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            <Award className="w-3 h-3 mr-1" />
                            完了
                          </Badge>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleLessonComplete(lesson.id)}
                            className="hover:scale-105 transition-transform duration-200"
                          >
                            完了にする
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div>
            {/* Ad for Free Users */}
            {!isPremium && (
              <div className="mb-6">
                <AdBanner position="sidebar" category={selectedCategory} />
              </div>
            )}

            {/* Skill Progress */}
            <Card className="mb-6 hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 mr-2" />
                    スキル進捗
                  </div>
                  {!isPremium && !hasFeatureAccess('advanced_analytics') && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => triggerPaywall('advanced_analytics')}
                      className="hover:scale-105 transition-transform duration-200"
                    >
                      <Lock className="w-3 h-3 mr-1" />
                      詳細分析
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(userProfile.skillLevels).map(([skill, level], index) => (
                    <div key={skill} style={{ animationDelay: `${index * 100}ms` }}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="capitalize">
                          {categories[skill]?.name || skill}
                        </span>
                        <span className="font-semibold">{level}%</span>
                      </div>
                      <Progress 
                        value={level} 
                        className="h-2 transition-all duration-500" 
                        style={{ 
                          animationDelay: `${index * 200}ms`,
                          animationDuration: '1s',
                          animationFillMode: 'both'
                        }}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weekly Goal */}
            <Card className="mb-6 hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <CardTitle>今週の目標</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2 animate-count-up">
                    {weeklyProgress}/7
                  </div>
                  <p className="text-sm text-gray-600 mb-4">日間学習完了</p>
                  <Progress 
                    value={(weeklyProgress/7) * 100} 
                    className="h-3 transition-all duration-1000" 
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    {weeklyProgress >= 7 ? (
                      <span className="text-green-600 font-semibold">🎉 目標達成！</span>
                    ) : (
                      `あと${7 - weeklyProgress}日で目標達成！`
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Today's Progress */}
            <Card className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <CardTitle>今日の進捗</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">完了レッスン</span>
                    <span className="font-semibold">{completedTodayCount}/{learningData.todaysLessons.length}</span>
                  </div>
                  <Progress 
                    value={(completedTodayCount / Math.max(learningData.todaysLessons.length, 1)) * 100} 
                    className="h-2 transition-all duration-500" 
                  />
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>学習時間</span>
                    <span>{Math.floor(sessionTime / 60)}分</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        {!isPremium && (
          <div className="mt-12 text-center animate-fade-in">
            <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-2xl transition-shadow duration-300">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">プレミアムプランで学習を加速</h2>
                <p className="mb-6">無制限学習、AI学習アドバイザー、詳細分析レポートなど</p>
                <div className="flex justify-center gap-4">
                  <Button 
                    variant="secondary" 
                    size="lg"
                    onClick={() => triggerPaywall('cta')}
                    className="hover:scale-105 transition-transform duration-200"
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    プレミアムを始める
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="text-white border-white hover:bg-white hover:text-blue-600 hover:scale-105 transition-all duration-200"
                  >
                    プランを比較
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Paywall Modal */}
        <Paywall />

        {/* Interstitial Ad */}
        {showInterstitialAd && (
          <AdBanner 
            position="interstitial" 
            category={selectedCategory}
          />
        )}
      </div>
    </div>
  )
}

export default App
