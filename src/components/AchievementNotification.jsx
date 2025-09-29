import React, { useEffect, useState } from 'react';
import { useGamification } from '../contexts/GamificationContext';

const AchievementNotification = () => {
  const { recentAchievements, markAchievementAsRead } = useGamification();
  const [visibleAchievements, setVisibleAchievements] = useState([]);

  useEffect(() => {
    if (recentAchievements.length > 0) {
      const latest = recentAchievements[recentAchievements.length - 1];
      setVisibleAchievements(prev => [...prev, { ...latest, id: Date.now() }]);
      
      // 5秒後に自動で消去
      setTimeout(() => {
        setVisibleAchievements(prev => prev.slice(1));
        markAchievementAsRead(recentAchievements.length - 1);
      }, 5000);
    }
  }, [recentAchievements, markAchievementAsRead]);

  const getNotificationStyle = (type) => {
    switch (type) {
      case 'level_up':
        return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white';
      case 'badge_unlock':
        return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
      case 'xp_gain':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white';
      default:
        return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
    }
  };

  const getNotificationIcon = (type, achievement) => {
    switch (type) {
      case 'level_up':
        return '🎉';
      case 'badge_unlock':
        return achievement.badge?.icon || '🏆';
      case 'xp_gain':
        return '⭐';
      default:
        return '✨';
    }
  };

  if (visibleAchievements.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {visibleAchievements.map((achievement, index) => (
        <div
          key={achievement.id}
          className={`${getNotificationStyle(achievement.type)} rounded-lg p-4 shadow-lg transform transition-all duration-500 animate-slide-in-right max-w-sm`}
          style={{
            animation: `slideInRight 0.5s ease-out ${index * 0.1}s both, fadeOut 0.5s ease-in 4.5s both`
          }}
        >
          <div className="flex items-center space-x-3">
            <div className="text-2xl">
              {getNotificationIcon(achievement.type, achievement)}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-sm">
                {achievement.type === 'level_up' && `レベルアップ！`}
                {achievement.type === 'badge_unlock' && `バッジ獲得！`}
                {achievement.type === 'xp_gain' && `XP獲得！`}
              </div>
              <div className="text-xs opacity-90">
                {achievement.message}
              </div>
              {achievement.amount && (
                <div className="text-xs font-bold">
                  +{achievement.amount} XP
                </div>
              )}
            </div>
            <button
              onClick={() => {
                setVisibleAchievements(prev => prev.filter(a => a.id !== achievement.id));
                markAchievementAsRead(index);
              }}
              className="text-white hover:text-gray-200 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AchievementNotification;
