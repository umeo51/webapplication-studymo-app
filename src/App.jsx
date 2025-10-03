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

// learningContentを直接定義（複数問題を追加）
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
      },
      {
        id: 'prog_2',
        type: 'quiz',
        question: 'CSSでボックスモデルに含まれないものはどれですか？',
        options: ['margin', 'padding', 'border', 'font-family'],
        correctAnswer: 'font-family',
        difficulty: '中級',
        tags: ['CSS', 'ボックスモデル']
      },
      {
        id: 'prog_3',
        type: 'quiz',
        question: 'HTMLで段落を表すタグはどれですか？',
        options: ['<div>', '<p>', '<span>', '<section>'],
        correctAnswer: '<p>',
        difficulty: '初級',
        tags: ['HTML', '基本']
      },
      {
        id: 'prog_4',
        type: 'quiz',
        question: 'JavaScriptで変数を宣言するキーワードはどれですか？',
        options: ['var', 'variable', 'declare', 'define'],
        correctAnswer: 'var',
        difficulty: '初級',
        tags: ['JavaScript', '変数']
      },
      {
        id: 'prog_5',
        type: 'quiz',
        question: 'CSSでテキストを中央揃えにするプロパティはどれですか？',
        options: ['text-align: center', 'align: center', 'center: true', 'text-center: yes'],
        correctAnswer: 'text-align: center',
        difficulty: '初級',
        tags: ['CSS', 'テキスト']
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
      },
      {
        id: 'eng_2',
        type: 'quiz',
        question: 'ありがとうの英語は？',
        options: ['Thank you', 'Please', 'Sorry', 'Excuse me'],
        correctAnswer: 'Thank you',
        difficulty: '初級',
        tags: ['挨拶', '基礎']
      },
      {
        id: 'eng_3',
        type: 'input',
        question: 'さようならを英語で言うと？',
        correctAnswer: 'Goodbye',
        difficulty: '初級',
        tags: ['挨拶', '基礎']
      },
      {
        id: 'eng_4',
        type: 'quiz',
        question: 'すみませんの英語は？',
        options: ['Excuse me', 'Thank you', 'Hello', 'Goodbye'],
        correctAnswer: 'Excuse me',
        difficulty: '初級',
        tags: ['挨拶', '基礎']
      },
      {
        id: 'eng_5',
        type: 'input',
        question: 'おはようございますを英語で言うと？',
        correctAnswer: 'Good morning',
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
      },
      {
        id: 'biz_2',
        type: 'quiz',
        question: 'PDCAサイクルのDは何を表しますか？',
        options: ['Do', 'Design', 'Develop', 'Decide'],
        correctAnswer: 'Do',
        difficulty: '初級',
        tags: ['PDCA', '基礎']
      },
      {
        id: 'biz_3',
        type: 'quiz',
        question: 'PDCAサイクルのCは何を表しますか？',
        options: ['Check', 'Create', 'Change', 'Control'],
        correctAnswer: 'Check',
        difficulty: '初級',
        tags: ['PDCA', '基礎']
      },
      {
        id: 'biz_4',
        type: 'quiz',
        question: 'PDCAサイクルのAは何を表しますか？',
        options: ['Action', 'Analyze', 'Approve', 'Apply'],
        correctAnswer: 'Action',
        difficulty: '初級',
        tags: ['PDCA', '基礎']
      },
      {
        id: 'biz_5',
        type: 'quiz',
        question: 'KPIは何の略ですか？',
        options: ['Key Performance Indicator', 'Key Process Improvement', 'Key Product Information', 'Key Project Initiative'],
        correctAnswer: 'Key Performance Indicator',
        difficulty: '中級',
        tags: ['KPI', '指標']
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
      },
      {
        id: 'design_2',
        type: 'quiz',
        question: 'RGBカラーモデルでGは何を表しますか？',
        options: ['Green', 'Gray', 'Gold', 'Gradient'],
        correctAnswer: 'Green',
        difficulty: '初級',
        tags: ['色彩', 'RGB']
      },
      {
        id: 'design_3',
        type: 'quiz',
        question: 'RGBカラーモデルでBは何を表しますか？',
        options: ['Blue', 'Black', 'Bold', 'Border'],
        correctAnswer: 'Blue',
        difficulty: '初級',
        tags: ['色彩', 'RGB']
      },
      {
        id: 'design_4',
        type: 'quiz',
        question: 'デザインの基本原則に含まれないものはどれですか？',
        options: ['コントラスト', '反復', '近接', '複雑性'],
        correctAnswer: '複雑性',
        difficulty: '中級',
        tags: ['デザイン原則', '基礎']
      },
      {
        id: 'design_5',
        type: 'quiz',
        question: 'フォントの種類でセリフ体の特徴は？',
        options: ['装飾的な線がある', '装飾的な線がない', '太字のみ', '斜体のみ'],
        correctAnswer: '装飾的な線がある',
        difficulty: '初級',
        tags: ['フォント', 'タイポグラフィ']
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
      },
      {
        id: 'mkt_2',
        type: 'quiz',
        question: '4PのProductは何を意味しますか？',
        options: ['製品', '価格', '場所', '販促'],
        correctAnswer: '製品',
        difficulty: '初級',
        tags: ['4P', '基礎']
      },
      {
        id: 'mkt_3',
        type: 'quiz',
        question: '4PのPriceは何を意味しますか？',
        options: ['価格', '製品', '場所', '販促'],
        correctAnswer: '価格',
        difficulty: '初級',
        tags: ['4P', '基礎']
      },
      {
        id: 'mkt_4',
        type: 'quiz',
        question: '4PのPlaceは何を意味しますか？',
        options: ['流通', '価格', '製品', '販促'],
        correctAnswer: '流通',
        difficulty: '初級',
        tags: ['4P', '基礎']
      },
      {
        id: 'mkt_5',
        type: 'quiz',
        question: '4PのPromotionは何を意味しますか？',
        options: ['販売促進', '価格', '製品', '流通'],
        correctAnswer: '販売促進',
        difficulty: '初級',
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
      },
      {
        id: 'fin_2',
        type: 'quiz',
        question: 'ROEは何の略ですか？',
        options: ['Return on Equity', 'Rate of Exchange', 'Risk of Equity', 'Revenue on Expense'],
        correctAnswer: 'Return on Equity',
        difficulty: '中級',
        tags: ['ROE', '指標']
      },
      {
        id: 'fin_3',
        type: 'quiz',
        question: 'NPVは何の略ですか？',
        options: ['Net Present Value', 'New Product Value', 'Net Profit Value', 'Normal Price Value'],
        correctAnswer: 'Net Present Value',
        difficulty: '上級',
        tags: ['NPV', '投資']
      },
      {
        id: 'fin_4',
        type: 'quiz',
        question: 'IRRは何の略ですか？',
        options: ['Internal Rate of Return', 'Interest Rate Ratio', 'Investment Risk Rate', 'Income Revenue Rate'],
        correctAnswer: 'Internal Rate of Return',
        difficulty: '上級',
        tags: ['IRR', '投資']
      },
      {
        id: 'fin_5',
        type: 'quiz',
        question: 'PERは何の略ですか？',
        options: ['Price Earnings Ratio', 'Profit Expense Rate', 'Product Exchange Rate', 'Performance Evaluation Rate'],
        correctAnswer: 'Price Earnings Ratio',
        difficulty: '中級',
        tags: ['PER', '株式']
      }
    ]
  }
};

// 以下は既存のMainAppコンポーネントと同じ内容...

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

