import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Square, 
  BarChart3, 
  Settings, 
  Crown,
  Clock,
  Target,
  TrendingUp,
  Lock,
  Zap
} from 'lucide-react';

import { useLearning } from './contexts/LearningContext';
import { useSubscription } from './contexts/SubscriptionContext';
import { useAds } from './contexts/AdContext';
import AdBanner from './components/AdBanner';
import Paywall from './components/Paywall';

const LEARNING_CATEGORIES = [
  { id: 'programming', name: 'プログラミング', icon: '💻', color: 'bg-blue-500', available: true },
  { id: 'english', name: '英語', icon: '🇺🇸', color: 'bg-green-500', available: true },
  { id: 'business', name: 'ビジネス', icon: '💼', color: 'bg-purple-500', available: true },
  { id: 'design', name: 'デザイン', icon: '🎨', color: 'bg-pink-500', available: false },
  { id: 'marketing', name: 'マーケティング', icon: '📈', color: 'bg-orange-500', available: false },
  { id: 'finance', name: 'ファイナンス', icon: '💰', color: 'bg-yellow-500', available: false },
];

function App() {
  const { 
    learningData, 
    currentSession, 
    startSession, 
    pauseSession, 
    completeSession,
    getTodayProgress,
    getWeeklyProgress 
  } = useLearning();
  
  const { 
    subscriptionData, 
    canStartSession, 
    useSession, 
    getRemainingSessions 
  } = useSubscription();
  
  const { showInterstitialAd } = useAds();

  const [selectedCategory, setSelectedCategory] = useState('programming');
  const [sessionTimer, setSessionTimer] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);
  const [paywallReason, setPaywallReason] = useState('');
  const [showStats, setShowStats] = useState(false);

  // セッションタイマー
  useEffect(() => {
    let interval;
    if (currentSession.isActive && !currentSession.isPaused) {
      interval = setInterval(() => {
        setSessionTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentSession.isActive, currentSession.isPaused]);

  // セッション開始時にタイマーをリセット
  useEffect(() => {
    if (currentSession.isActive) {
      setSessionTimer(0);
    }
  }, [currentSession.isActive]);

  const handleStartSession = () => {
    if (!canStartSession()) {
      setPaywallReason('セッション制限に達しました。プレミアムプランで無制限に学習できます。');
      setShowPaywall(true);
      return;
    }

    if (useSession()) {
      startSession(selectedCategory);
    }
  };

  const handleCompleteSession = () => {
    const duration = completeSession();
    showInterstitialAd(); // セッション完了時にインタースティシャル広告を表示
    setSessionTimer(0);
  };

  const handleCategorySelect = (categoryId) => {
    const category = LEARNING_CATEGORIES.find(c => c.id === categoryId);
    
    if (!category.available && !subscriptionData.isPremium) {
      setPaywallReason(`${category.name}カテゴリーはプレミアム限定です。すべてのカテゴリーにアクセスしましょう。`);
      setShowPaywall(true);
      return;
    }
    
    setSelectedCategory(categoryId);
  };

  const handleShowDetailedStats = () => {
    if (!subscriptionData.isPremium) {
      setPaywallReason('詳細分析はプレミアム限定機能です。学習パターンを詳しく分析しましょう。');
      setShowPaywall(true);
      return;
    }
    setShowStats(true);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const todayProgress = getTodayProgress();
  const weeklyProgress = getWeeklyProgress();
  const remainingSessions = getRemainingSessions();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary-600">Studymo</h1>
              {subscriptionData.isPremium && (
                <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  <Crown size={12} className="mr-1" />
                  プレミアム
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              {!subscriptionData.isPremium && (
                <span className="text-sm text-gray-600">
                  残り {remainingSessions === Infinity ? '∞' : remainingSessions} セッション
                </span>
              )}
              <button
                onClick={() => setShowPaywall(true)}
                className="btn btn-primary text-sm"
              >
                <Crown size={16} className="mr-1" />
                プレミアム
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* メインコンテンツ */}
          <div className="lg:col-span-3">
            {/* 広告バナー（上部） */}
            <div className="mb-6">
              <AdBanner type="banner" className="w-full" />
            </div>

            {/* 学習セッション */}
            <div className="card mb-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  今日の学習セッション
                </h2>
                <p className="text-gray-600 mb-6">
                  15分の集中学習で新しいスキルを身につけましょう
                </p>

                {/* タイマー表示 */}
                <div className="mb-8">
                  <div className="relative w-48 h-48 mx-auto">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        className="text-gray-200"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray={`${(sessionTimer / 900) * 283} 283`}
                        className="text-primary-500 timer-circle"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900">
                          {formatTime(sessionTimer)}
                        </div>
                        <div className="text-sm text-gray-500">
                          / 15:00
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* セッションコントロール */}
                <div className="flex justify-center space-x-4 mb-6">
                  {!currentSession.isActive ? (
                    <button
                      onClick={handleStartSession}
                      className="btn btn-primary btn-lg"
                      disabled={!canStartSession()}
                    >
                      <Play size={20} className="mr-2" />
                      学習開始
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={pauseSession}
                        className="btn btn-secondary"
                      >
                        {currentSession.isPaused ? (
                          <>
                            <Play size={20} className="mr-2" />
                            再開
                          </>
                        ) : (
                          <>
                            <Pause size={20} className="mr-2" />
                            一時停止
                          </>
                        )}
                      </button>
                      <button
                        onClick={handleCompleteSession}
                        className="btn btn-success"
                      >
                        <Square size={20} className="mr-2" />
                        完了
                      </button>
                    </>
                  )}
                </div>

                {/* カテゴリー選択 */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    学習カテゴリー
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {LEARNING_CATEGORIES.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategorySelect(category.id)}
                        className={`relative p-4 rounded-lg border-2 transition-all ${
                          selectedCategory === category.id
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        } ${
                          !category.available && !subscriptionData.isPremium
                            ? 'opacity-60'
                            : ''
                        }`}
                      >
                        <div className="text-2xl mb-2">{category.icon}</div>
                        <div className="font-medium text-gray-900">
                          {category.name}
                        </div>
                        {!category.available && !subscriptionData.isPremium && (
                          <div className="absolute top-2 right-2">
                            <Lock size={16} className="text-gray-400" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 今日のレッスン */}
            <div className="card mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                今日のレッスン
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900">
                    React Hooks の基礎
                  </h4>
                  <p className="text-blue-700 text-sm mt-1">
                    useState と useEffect を使ったコンポーネント設計
                  </p>
                  <div className="mt-2">
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      初級
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 広告レクタングル */}
            <div className="mb-8">
              <AdBanner type="rectangle" className="mx-auto" />
            </div>
          </div>

          {/* サイドバー */}
          <div className="lg:col-span-1">
            {/* 広告サイドバー */}
            <div className="mb-6">
              <AdBanner type="sidebar" className="w-full" />
            </div>

            {/* 学習統計 */}
            <div className="card mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">学習統計</h3>
                <button
                  onClick={handleShowDetailedStats}
                  className="text-primary-600 hover:text-primary-700"
                >
                  <BarChart3 size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>今日の進捗</span>
                    <span>{todayProgress}/{learningData.dailyGoal}分</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-500 h-2 rounded-full progress-bar"
                      style={{ width: `${Math.min((todayProgress / learningData.dailyGoal) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>週間進捗</span>
                    <span>{weeklyProgress}/{learningData.weeklyGoal}分</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full progress-bar"
                      style={{ width: `${Math.min((weeklyProgress / learningData.weeklyGoal) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-600">
                      {learningData.totalSessions}
                    </div>
                    <div className="text-xs text-gray-500">総セッション</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {learningData.currentStreak}
                    </div>
                    <div className="text-xs text-gray-500">連続日数</div>
                  </div>
                </div>
              </div>

              {!subscriptionData.isPremium && (
                <button
                  onClick={handleShowDetailedStats}
                  className="w-full mt-4 btn btn-primary text-sm"
                >
                  <Lock size={16} className="mr-1" />
                  詳細分析
                </button>
              )}
            </div>

            {/* スキルレベル */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                スキルレベル
              </h3>
              <div className="space-y-3">
                {Object.entries(learningData.skillLevels).map(([skill, level]) => {
                  const category = LEARNING_CATEGORIES.find(c => c.id === skill);
                  if (!category) return null;
                  
                  return (
                    <div key={skill}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="flex items-center">
                          <span className="mr-2">{category.icon}</span>
                          {category.name}
                        </span>
                        <span>Lv.{Math.floor(level)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${category.color.replace('bg-', 'bg-')} progress-bar`}
                          style={{ width: `${(level % 1) * 100}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ペイウォール */}
      <AnimatePresence>
        {showPaywall && (
          <Paywall
            isOpen={showPaywall}
            onClose={() => setShowPaywall(false)}
            description={paywallReason}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
