import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { LearningProvider } from './contexts/LearningContext';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import { StudySessionProvider } from './contexts/StudySessionContext';
import { AdProvider } from './contexts/AdContext';
import AdBanner from './components/AdBanner';
import StudySession from './components/StudySession';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import SessionSummary from './components/SessionSummary';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import LearningGuide from './components/LearningGuide';
import Contact from './components/Contact';
import { useStudySession } from './contexts/StudySessionContext';
import QuizQuestion from './components/QuizQuestion';// learningContentを直接定義
const learningContent = {
  programming: {
    name: 'プログラミング',
    icon: '💻',
    quizzes: [
      {
        id: 'prog_1',
        type: 'quiz',
        question: 'CSSでフォントサイズを指定するプロパティを答えてください。',
        options: ['font-size', 'text-size', 'size', 'font-weight'],
        correctAnswer: 'font-size',
        difficulty: '初級',
        tags: ['CSS', 'フォント']
      }
    ]
  },
  english: {
    name: '英語',
    icon: '🇺🇸',
    quizzes: [
      {
        id: 'eng_1',
        type: 'input',
        question: 'こんにちはを英語で言うと？',
        correctAnswer: 'Hello',
        difficulty: '初級',
        tags: ['挨拶', '基礎']
      }
    ]
  },
  business: {
    name: 'ビジネス',
    icon: '💼',
    quizzes: [
      {
        id: 'biz_1',
        type: 'quiz',
        question: 'PDCAサイクルのPは何を表しますか？',
        options: ['Plan', 'Practice', 'Process', 'Product'],
        correctAnswer: 'Plan',
        difficulty: '初級',
        tags: ['PDCA', '基礎']
      }
    ]
  },
  design: {
    name: 'デザイン',
    icon: '🎨',
    quizzes: [
      {
        id: 'design_1',
        type: 'quiz',
        question: 'RGBカラーモデルでRは何を表しますか？',
        options: ['Red', 'Right', 'Rotate', 'Radius'],
        correctAnswer: 'Red',
        difficulty: '初級',
        tags: ['色彩', 'RGB']
      }
    ]
  },
  marketing: {
    name: 'マーケティング',
    icon: '📈',
    quizzes: [
      {
        id: 'mkt_1',
        type: 'quiz',
        question: '4Pマーケティングミックスに含まれないものは？',
        options: ['Product', 'Price', 'Place', 'People'],
        correctAnswer: 'People',
        difficulty: '中級',
        tags: ['4P', '基礎']
      }
    ]
  },
  finance: {
    name: 'ファイナンス',
    icon: '💰',
    quizzes: [
      {
        id: 'fin_1',
        type: 'quiz',
        question: 'ROIは何の略ですか？',
        options: ['Return on Investment', 'Rate of Interest', 'Risk of Investment', 'Revenue on Income'],
        correctAnswer: 'Return on Investment',
        difficulty: '中級',
        tags: ['ROI', '指標']
      }
    ]
  }
};

// メインアプリケーションコンポーネント
const MainApp = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sessionResults, setSessionResults] = useState(null);
  const { startSession, userProgress } = useStudySession();

  const handleStartSession = (category) => {
    setSelectedCategory(category);
    startSession(category);
    setCurrentView('session');
  };

  const handleSessionComplete = (results) => {
    setSessionResults(results);
    setCurrentView('summary');
  };

  const handleSummaryClose = () => {
    setCurrentView('home');
    setSessionResults(null);
    setSelectedCategory(null);
  };

  const handleRetrySession = () => {
    if (selectedCategory) {
      startSession(selectedCategory);
      setCurrentView('session');
      setSessionResults(null);
    }
  };

  // ナビゲーションメニュー
  const NavigationMenu = () => (
    <nav className="bg-white shadow-sm border-b border-gray-200 mb-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <button
              onClick={() => setCurrentView('home')}
              className="text-2xl font-bold text-blue-600 hover:text-blue-700"
            >
              Studymo
            </button>
            <div className="hidden md:flex space-x-6">
              <button
                onClick={() => setCurrentView('home')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'home' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                ホーム
              </button>
              <button
                onClick={() => setCurrentView('analytics')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'analytics' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                学習分析
              </button>
              <button
                onClick={() => setCurrentView('guide')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'guide' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                学習ガイド
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4 text-sm text-gray-600">
              <span>今日の学習: {getTodayStudyTime()}分</span>
              <span>連続: {getStudyStreak()}日</span>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              プレミアム
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  const getTodayStudyTime = () => {
    // 今日の学習時間を計算（プレースホルダー）
    return Math.floor(Math.random() * 60);
  };

  const getStudyStreak = () => {
    // 学習ストリークを計算（プレースホルダー）
    return Math.floor(Math.random() * 30);
  };

  // ホーム画面
  const HomeView = () => (
    <div className="max-w-7xl mx-auto px-4">
      {/* 広告バナー */}
      <div className="mb-8">
        <AdBanner type="banner" className="mx-auto" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* メインコンテンツ */}
        <div className="lg:col-span-2 space-y-8">
          {/* 今日の学習セッション */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">今日の学習セッション</h2>
            <p className="text-gray-600 mb-6">15分の集中学習でスキルを身につけましょう</p>
            
            {/* 学習カテゴリ */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {Object.entries(learningContent).map(([key, category]) => {
                const progress = userProgress[key] || { attempted: 0, correct: 0 };
                const accuracy = progress.attempted > 0 
                  ? Math.round((progress.correct / progress.attempted) * 100) 
                  : 0;

                return (
                  <button
                    key={key}
                    onClick={() => handleStartSession(key)}
                    className="group bg-gradient-to-br from-gray-50 to-gray-100 hover:from-blue-50 hover:to-blue-100 border-2 border-gray-200 hover:border-blue-300 rounded-lg p-6 transition-all duration-200 transform hover:scale-105"
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-3">{category.icon}</div>
                      <h3 className="font-semibold text-gray-800 group-hover:text-blue-700 mb-2">
                        {category.name}
                      </h3>
                      <div className="text-sm text-gray-600">
                        <div>学習済み: {progress.attempted}問</div>
                        <div>正答率: {accuracy}%</div>
                      </div>
                      <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full bg-${category.color}-500 transition-all`}
                          style={{ width: `${Math.min(accuracy, 100)}%` }}
                        />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* クイックスタートボタン */}
            <div className="text-center">
              <button
                onClick={() => {
                  const categories = Object.keys(learningContent);
                  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
                  handleStartSession(randomCategory);
                }}
                className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold text-lg"
              >
                🎲 ランダム学習開始
              </button>
            </div>
          </div>

          {/* 学習統計プレビュー */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">学習統計</h2>
              <button
                onClick={() => setCurrentView('analytics')}
                className="text-blue-500 hover:text-blue-600 text-sm font-medium"
              >
                詳細を見る →
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {Object.values(userProgress).reduce((sum, cat) => sum + cat.attempted, 0)}
                </div>
                <div className="text-sm text-blue-800">総学習数</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {Object.values(userProgress).reduce((sum, cat) => sum + cat.correct, 0)}
                </div>
                <div className="text-sm text-green-800">正解数</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {getStudyStreak()}
                </div>
                <div className="text-sm text-purple-800">連続日数</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {getTodayStudyTime()}
                </div>
                <div className="text-sm text-orange-800">今日の学習時間</div>
              </div>
            </div>
          </div>
        </div>

        {/* サイドバー */}
        <div className="space-y-6">
          {/* 広告サイドバー */}
          <AdBanner type="sidebar" />

          {/* 学習目標 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="font-semibold text-gray-800 mb-4">今週の目標</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>学習時間</span>
                  <span>{getTodayStudyTime()}/300分</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${Math.min((getTodayStudyTime() / 300) * 100, 100)}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>学習日数</span>
                  <span>{Math.min(getStudyStreak(), 7)}/7日</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${Math.min((getStudyStreak() / 7) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 最近の成果 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="font-semibold text-gray-800 mb-4">最近の成果</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🏆</span>
                <div>
                  <div className="font-medium text-sm">7日連続学習達成！</div>
                  <div className="text-xs text-gray-500">2時間前</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <div className="font-medium text-sm">プログラミング正答率90%</div>
                  <div className="text-xs text-gray-500">昨日</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📚</span>
                <div>
                  <div className="font-medium text-sm">100問学習完了</div>
                  <div className="text-xs text-gray-500">3日前</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // メインレンダリング
  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationMenu />
      
      {currentView === 'home' && <HomeView />}
      {currentView === 'session' && selectedCategory && (
        <StudySession 
          category={selectedCategory} 
          onComplete={handleSessionComplete}
        />
      )}
      {currentView === 'analytics' && <AnalyticsDashboard />}
      {currentView === 'guide' && <LearningGuide />}
      {currentView === 'privacy' && <PrivacyPolicy />}
      {currentView === 'terms' && <TermsOfService />}
      {currentView === 'contact' && <Contact />}
      
      {sessionResults && (
        <SessionSummary
          results={sessionResults}
          category={selectedCategory}
          onClose={handleSummaryClose}
          onRetry={handleRetrySession}
        />
      )}
    </div>
  );
};

// ルートアプリケーションコンポーネント
function App() {
  return (
    <AuthProvider>
      <LearningProvider>
        <SubscriptionProvider>
          <StudySessionProvider>
            <AdProvider>
              <MainApp />
            </AdProvider>
          </StudySessionProvider>
        </SubscriptionProvider>
      </LearningProvider>
    </AuthProvider>
  );
}

export default App;
