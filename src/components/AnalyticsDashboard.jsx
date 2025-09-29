import React, { useState, useMemo } from 'react';
import { useStudySession } from '../contexts/StudySessionContext';
import { learningContent } from '../data/learningContent';

const AnalyticsDashboard = () => {
  const { userProgress, detailedStats } = useStudySession();
  const [selectedTimeRange, setSelectedTimeRange] = useState('week'); // 'day', 'week', 'month'
  const [selectedCategory, setSelectedCategory] = useState('all');

  // 学習統計の計算
  const overallStats = useMemo(() => {
    const totalAttempted = Object.values(userProgress).reduce((sum, cat) => sum + cat.attempted, 0);
    const totalCorrect = Object.values(userProgress).reduce((sum, cat) => sum + cat.correct, 0);
    const overallAccuracy = totalAttempted > 0 ? (totalCorrect / totalAttempted * 100).toFixed(1) : 0;
    
    const recentDays = Object.entries(detailedStats.dailyStats || {})
      .sort(([a], [b]) => new Date(b) - new Date(a))
      .slice(0, 7);
    
    const weeklyTotal = recentDays.reduce((sum, [, stats]) => sum + stats.totalTime, 0);
    const averageDaily = weeklyTotal / 7;
    
    return {
      totalAttempted,
      totalCorrect,
      overallAccuracy,
      weeklyTotal: Math.round(weeklyTotal / 60000), // 分単位
      averageDaily: Math.round(averageDaily / 60000),
      studyStreak: calculateStudyStreak(detailedStats.dailyStats)
    };
  }, [userProgress, detailedStats]);

  const calculateStudyStreak = (dailyStats) => {
    if (!dailyStats) return 0;
    
    let streak = 0;
    const today = new Date();
    
    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateString = date.toDateString();
      
      if (dailyStats[dateString] && dailyStats[dateString].sessionsCompleted > 0) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  // 時間帯別パフォーマンス分析
  const timeOfDayAnalysis = useMemo(() => {
    const hourlyData = Array.from({ length: 24 }, (_, hour) => {
      const data = detailedStats.timeOfDayPerformance?.[hour];
      return {
        hour,
        sessions: data?.sessions || 0,
        accuracy: data?.averageAccuracy || 0,
        label: `${hour}:00`
      };
    });

    const bestHour = hourlyData.reduce((best, current) => 
      current.accuracy > best.accuracy ? current : best
    );

    return { hourlyData, bestHour };
  }, [detailedStats]);

  // カテゴリ別パフォーマンス
  const categoryAnalysis = useMemo(() => {
    return Object.entries(userProgress).map(([category, progress]) => {
      const categoryData = learningContent[category];
      const accuracy = progress.attempted > 0 ? (progress.correct / progress.attempted * 100).toFixed(1) : 0;
      
      return {
        category,
        name: categoryData?.name || category,
        icon: categoryData?.icon || '📚',
        color: categoryData?.color || 'gray',
        ...progress,
        accuracy: parseFloat(accuracy),
        improvement: calculateImprovement(category)
      };
    });
  }, [userProgress]);

  const calculateImprovement = (category) => {
    // 簡単な改善度計算（実際はより複雑な分析が必要）
    const recent = userProgress[category];
    if (recent.attempted < 10) return 0;
    
    // 最近の正答率と全体の正答率を比較
    return Math.random() * 20 - 10; // プレースホルダー
  };

  // 弱点分析
  const weaknessAnalysis = useMemo(() => {
    const allWeakAreas = Object.values(userProgress)
      .flatMap(progress => progress.weakAreas || []);
    
    const weaknessCount = {};
    allWeakAreas.forEach(area => {
      weaknessCount[area] = (weaknessCount[area] || 0) + 1;
    });

    return Object.entries(weaknessCount)
      .map(([area, count]) => ({ area, count, severity: count > 2 ? 'high' : count > 1 ? 'medium' : 'low' }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [userProgress]);

  // 学習効率スコア計算
  const efficiencyScore = useMemo(() => {
    const accuracy = parseFloat(overallStats.overallAccuracy);
    const consistency = Math.min(overallStats.studyStreak / 7, 1) * 100;
    const diversity = Object.values(userProgress).filter(p => p.attempted > 0).length / 3 * 100;
    
    return Math.round((accuracy * 0.4 + consistency * 0.3 + diversity * 0.3));
  }, [overallStats, userProgress]);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* ヘッダー */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">学習分析ダッシュボード</h1>
        <div className="flex space-x-2">
          {['day', 'week', 'month'].map(range => (
            <button
              key={range}
              onClick={() => setSelectedTimeRange(range)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedTimeRange === range
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {range === 'day' ? '日' : range === 'week' ? '週' : '月'}
            </button>
          ))}
        </div>
      </div>

      {/* 概要統計 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">総学習時間</p>
              <p className="text-3xl font-bold">{overallStats.weeklyTotal}分</p>
              <p className="text-blue-200 text-sm">今週</p>
            </div>
            <div className="text-4xl opacity-80">⏱️</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">総合正答率</p>
              <p className="text-3xl font-bold">{overallStats.overallAccuracy}%</p>
              <p className="text-green-200 text-sm">{overallStats.totalAttempted}問中{overallStats.totalCorrect}問正解</p>
            </div>
            <div className="text-4xl opacity-80">🎯</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">学習ストリーク</p>
              <p className="text-3xl font-bold">{overallStats.studyStreak}日</p>
              <p className="text-purple-200 text-sm">連続学習</p>
            </div>
            <div className="text-4xl opacity-80">🔥</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">学習効率</p>
              <p className="text-3xl font-bold">{efficiencyScore}</p>
              <p className="text-orange-200 text-sm">効率スコア</p>
            </div>
            <div className="text-4xl opacity-80">⚡</div>
          </div>
        </div>
      </div>

      {/* カテゴリ別パフォーマンス */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">カテゴリ別パフォーマンス</h2>
        <div className="space-y-4">
          {categoryAnalysis.map(category => (
            <div key={category.category} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{category.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-800">{category.name}</h3>
                    <p className="text-sm text-gray-600">
                      {category.attempted}問学習 • 正答率 {category.accuracy}%
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${
                    category.improvement > 0 ? 'text-green-600' : 
                    category.improvement < 0 ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {category.improvement > 0 ? '↗️' : category.improvement < 0 ? '↘️' : '→'} 
                    {Math.abs(category.improvement).toFixed(1)}%
                  </div>
                </div>
              </div>
              
              {/* 進捗バー */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full bg-${category.color}-500`}
                  style={{ width: `${Math.min(category.accuracy, 100)}%` }}
                />
              </div>
              
              {/* 弱点・強点表示 */}
              <div className="mt-3 flex flex-wrap gap-2">
                {category.weakAreas?.slice(0, 3).map(area => (
                  <span key={area} className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                    弱点: {area}
                  </span>
                ))}
                {category.strongAreas?.slice(0, 2).map(area => (
                  <span key={area} className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                    得意: {area}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 時間帯別パフォーマンス */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">時間帯別パフォーマンス</h2>
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            最も効率的な学習時間: <span className="font-semibold text-blue-600">
              {timeOfDayAnalysis.bestHour.label} (正答率 {timeOfDayAnalysis.bestHour.accuracy.toFixed(1)}%)
            </span>
          </p>
        </div>
        
        <div className="grid grid-cols-12 gap-1">
          {timeOfDayAnalysis.hourlyData.map(data => (
            <div key={data.hour} className="text-center">
              <div 
                className="bg-blue-500 rounded mb-1 transition-all hover:bg-blue-600"
                style={{ 
                  height: `${Math.max(data.accuracy * 2, 4)}px`,
                  opacity: data.sessions > 0 ? 1 : 0.3
                }}
                title={`${data.label}: ${data.sessions}セッション, ${data.accuracy.toFixed(1)}%`}
              />
              <div className="text-xs text-gray-500">{data.hour}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 弱点分析と改善提案 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">弱点分析</h2>
          {weaknessAnalysis.length > 0 ? (
            <div className="space-y-3">
              {weaknessAnalysis.map(weakness => (
                <div key={weakness.area} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      weakness.severity === 'high' ? 'bg-red-500' :
                      weakness.severity === 'medium' ? 'bg-yellow-500' : 'bg-orange-500'
                    }`} />
                    <span className="font-medium">{weakness.area}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {weakness.count}カテゴリで苦手
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              十分なデータがありません。  

              もう少し学習を続けてください。
            </p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">改善提案</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-blue-800">学習時間の最適化</h3>
              <p className="text-sm text-gray-600">
                {timeOfDayAnalysis.bestHour.label}頃の学習効率が最も高いです。
                この時間帯を活用しましょう。
              </p>
            </div>
            
            {weaknessAnalysis.slice(0, 2).map(weakness => (
              <div key={weakness.area} className="border-l-4 border-red-500 pl-4">
                <h3 className="font-semibold text-red-800">{weakness.area}の強化</h3>
                <p className="text-sm text-gray-600">
                  この分野の問題を重点的に学習することをお勧めします。
                </p>
              </div>
            ))}
            
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-green-800">学習継続</h3>
              <p className="text-sm text-gray-600">
                {overallStats.studyStreak}日連続で学習中です！
                この調子で継続しましょう。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
