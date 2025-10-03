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
import QuizQuestion from './components/QuizQuestion';

// learningContentを直接定義
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
  const { currentSession, startSession } = useStudySession();
  const [currentView, setCurrentView] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (categoryKey) => {
    console.log('Category selected:', categoryKey);
    setSelectedCategory(categoryKey);
    startSession(categoryKey, 'quiz', 10);
    setCurrentView('session');
  };

  const handleRandomStart = () => {
    const categories = Object.keys(learningContent);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    handleCategorySelect(randomCategory);
  };

  const handleSessionComplete = () => {
    setCurrentView('summary');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedCategory(null);
  };

  if (currentView === 'session' && currentSession?.isActive) {
    return (
      <StudySession 
        category={selectedCategory}
        onComplete={handleSessionComplete}
      />
    );
  }

  if (currentView === 'summary') {
    return (
      <SessionSummary 
        onBackToHome={handleBackToHome}
      />
    );
  }

  if (currentView === 'analytics') {
    return <AnalyticsDashboard onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'guide') {
    return <LearningGuide onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'privacy') {
    return <PrivacyPolicy onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'terms') {
    return <TermsOfService onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'contact') {
    return <Contact onBack={() => setCurrentView('home')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-blue-600 cursor-pointer" onClick={() => setCurrentView('home')}>
                Studymo
              </h1>
              <nav className="hidden md:flex space-x-6">
                <button 
                  onClick={() => setCurrentView('home')}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  ホーム
                </button>
                <button 
                  onClick={() => setCurrentView('analytics')}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  学習分析
                </button>
                <button 
                  onClick={() => setCurrentView('guide')}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  学習ガイド
                </button>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                今日の学習: 0分　連続: 0日
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                プレミアム
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* メインコンテンツ */}
          <div className="flex-1">
            <AdBanner position="banner" />
            
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">今日の学習セッション</h2>
              <p className="text-gray-600">15分の集中学習でスキルを身につけましょう</p>
            </div>

            {/* カテゴリグリッド */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {Object.entries(learningContent).map(([key, category]) => {
                const categoryStats = {
                  questionsAnswered: 0,
                  correctRate: 0
                };

                return (
                  <div
                    key={key}
                    onClick={() => handleCategorySelect(key)}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border-2 border-transparent hover:border-blue-200"
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-3">{category.icon}</div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{category.name}</h3>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>学習済み: {categoryStats.questionsAnswered}問</div>
                        <div>正答率: {categoryStats.correctRate}%</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ランダム学習ボタン */}
            <div className="text-center mb-8">
              <button
                onClick={handleRandomStart}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                🎲 ランダム学習開始
              </button>
            </div>
          </div>

          {/* サイドバー */}
          <div className="w-80 space-y-6">
            <AdBanner position="sidebar" />
            
            {/* 今週の目標 */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-4">今週の目標</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>学習時間</span>
                    <span>0/300分</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '0%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>学習日数</span>
                    <span>0/7日</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '0%'}}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* 最近の成果 */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-4">最近の成果</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    🏆
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">7日連続学習達成！</div>
                    <div className="text-xs text-gray-500">24時間前</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    🎯
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">プログラミング正答率90%</div>
                    <div className="text-xs text-gray-500">昨日</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    📚
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">100問学習完了</div>
                    <div className="text-xs text-gray-500">3日前</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* フッター */}
        <footer className="mt-16 py-8 border-t border-gray-200">
          <div className="flex justify-center space-x-6 text-sm text-gray-600">
            <button onClick={() => setCurrentView('privacy')} className="hover:text-blue-600">
              プライバシーポリシー
            </button>
            <button onClick={() => setCurrentView('terms')} className="hover:text-blue-600">
              利用規約
            </button>
            <button onClick={() => setCurrentView('contact')} className="hover:text-blue-600">
              お問い合わせ
            </button>
          </div>
          <div className="text-center mt-4 text-xs text-gray-500">
            © 2024 Studymo. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
};

// アプリケーションのルートコンポーネント
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
