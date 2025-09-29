import React, { useState } from 'react';
import { useGamification } from '../contexts/GamificationContext';

const LevelBadgeDisplay = () => {
  const { userStats, getBadgeInfo, getProgressInfo } = useGamification();
  const [activeTab, setActiveTab] = useState('level');
  
  const progressInfo = getProgressInfo();
  const badgeInfo = getBadgeInfo();

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500';
      case 'rare': return 'from-purple-400 to-pink-500';
      case 'uncommon': return 'from-blue-400 to-cyan-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getRarityBorder = (rarity) => {
    switch (rarity) {
      case 'legendary': return 'border-yellow-400';
      case 'rare': return 'border-purple-400';
      case 'uncommon': return 'border-blue-400';
      default: return 'border-gray-400';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* タブナビゲーション */}
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('level')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'level'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          レベル・XP
        </button>
        <button
          onClick={() => setActiveTab('badges')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'badges'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          バッジ ({badgeInfo.unlockedCount}/{badgeInfo.total})
        </button>
      </div>

      {/* レベル・XP表示 */}
      {activeTab === 'level' && (
        <div className="space-y-6">
          {/* 現在のレベル */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full text-white text-2xl font-bold mb-4">
              {progressInfo.currentLevel}
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              レベル {progressInfo.currentLevel}
            </h3>
            <p className="text-gray-600">
              総XP: {userStats.totalXp.toLocaleString()}
            </p>
          </div>

          {/* 進捗バー */}
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>次のレベルまで</span>
              <span>{progressInfo.xpProgress} / {progressInfo.xpNeeded} XP</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressInfo.progressPercentage}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {Math.round(progressInfo.progressPercentage)}% 完了
            </p>
          </div>

          {/* 統計情報 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {userStats.totalSessions}
              </div>
              <div className="text-sm text-blue-800">総セッション数</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {userStats.currentStreak}
              </div>
              <div className="text-sm text-green-800">連続学習日数</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round(userStats.overallAccuracy)}%
              </div>
              <div className="text-sm text-purple-800">総合正答率</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {Math.round(userStats.totalStudyTime / 3600000)}h
              </div>
              <div className="text-sm text-orange-800">総学習時間</div>
            </div>
          </div>
        </div>
      )}

      {/* バッジ表示 */}
      {activeTab === 'badges' && (
        <div className="space-y-6">
          {/* 獲得済みバッジ */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              獲得済みバッジ ({badgeInfo.unlockedCount})
            </h3>
            {badgeInfo.unlocked.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {badgeInfo.unlocked.map(badge => (
                  <div
                    key={badge.id}
                    className={`bg-gradient-to-br ${getRarityColor(badge.rarity)} rounded-lg p-4 text-white text-center border-2 ${getRarityBorder(badge.rarity)}`}
                  >
                    <div className="text-3xl mb-2">{badge.icon}</div>
                    <h4 className="font-semibold text-sm">{badge.name}</h4>
                    <p className="text-xs opacity-90 mt-1">{badge.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                まだバッジを獲得していません。  

                学習を続けてバッジを集めましょう！
              </p>
            )}
          </div>

          {/* 未獲得バッジ */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              未獲得バッジ ({badgeInfo.locked.length})
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {badgeInfo.locked.map(badge => (
                <div
                  key={badge.id}
                  className="bg-gray-100 rounded-lg p-4 text-center border-2 border-gray-300 opacity-60"
                >
                  <div className="text-3xl mb-2 grayscale">{badge.icon}</div>
                  <h4 className="font-semibold text-sm text-gray-700">{badge.name}</h4>
                  <p className="text-xs text-gray-600 mt-1">{badge.description}</p>
                  <div className="mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      badge.rarity === 'legendary' ? 'bg-yellow-100 text-yellow-800' :
                      badge.rarity === 'rare' ? 'bg-purple-100 text-purple-800' :
                      badge.rarity === 'uncommon' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-200 text-gray-700'
                    }`}>
                      {badge.rarity === 'legendary' ? 'レジェンダリー' :
                       badge.rarity === 'rare' ? 'レア' :
                       badge.rarity === 'uncommon' ? 'アンコモン' : 'コモン'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LevelBadgeDisplay;
