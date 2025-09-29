import React, { createContext, useContext, useState, useEffect } from 'react';

const GamificationContext = createContext();

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
};

// バッジ定義
const BADGES = {
  first_session: {
    id: 'first_session',
    name: '初心者',
    description: '初回学習セッション完了',
    icon: '🌱',
    rarity: 'common',
    condition: (stats) => stats.totalSessions >= 1
  },
  streak_3: {
    id: 'streak_3',
    name: '継続の力',
    description: '3日連続学習',
    icon: '🔥',
    rarity: 'common',
    condition: (stats) => stats.currentStreak >= 3
  },
  streak_7: {
    id: 'streak_7',
    name: '一週間戦士',
    description: '7日連続学習',
    icon: '⚡',
    rarity: 'uncommon',
    condition: (stats) => stats.currentStreak >= 7
  },
  streak_30: {
    id: 'streak_30',
    name: '習慣マスター',
    description: '30日連続学習',
    icon: '👑',
    rarity: 'legendary',
    condition: (stats) => stats.currentStreak >= 30
  },
  accuracy_90: {
    id: 'accuracy_90',
    name: '精密射手',
    description: '正答率90%以上を達成',
    icon: '🎯',
    rarity: 'rare',
    condition: (stats) => stats.overallAccuracy >= 90
  },
  speed_demon: {
    id: 'speed_demon',
    name: 'スピードデーモン',
    description: '平均回答時間5秒以下',
    icon: '💨',
    rarity: 'rare',
    condition: (stats) => stats.averageResponseTime <= 5000
  },
  night_owl: {
    id: 'night_owl',
    name: '夜更かし学習者',
    description: '22時以降に学習セッション完了',
    icon: '🦉',
    rarity: 'uncommon',
    condition: (stats) => stats.nightSessions >= 5
  },
  early_bird: {
    id: 'early_bird',
    name: '早起き学習者',
    description: '6時前に学習セッション完了',
    icon: '🐦',
    rarity: 'uncommon',
    condition: (stats) => stats.earlySessions >= 5
  },
  perfectionist: {
    id: 'perfectionist',
    name: '完璧主義者',
    description: '100%正答率のセッションを5回達成',
    icon: '💎',
    rarity: 'legendary',
    condition: (stats) => stats.perfectSessions >= 5
  },
  knowledge_seeker: {
    id: 'knowledge_seeker',
    name: '知識探求者',
    description: '全カテゴリで学習',
    icon: '📚',
    rarity: 'rare',
    condition: (stats) => stats.categoriesStudied >= 3
  },
  marathon_runner: {
    id: 'marathon_runner',
    name: 'マラソンランナー',
    description: '累計学習時間100時間達成',
    icon: '🏃‍♂️',
    rarity: 'legendary',
    condition: (stats) => stats.totalStudyTime >= 360000000 // 100時間（ミリ秒）
  }
};

// レベル計算関数
const calculateLevel = (xp) => {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
};

const getXpForNextLevel = (currentLevel) => {
  return Math.pow(currentLevel, 2) * 100;
};

export const GamificationProvider = ({ children }) => {
  const [userStats, setUserStats] = useState({
    totalXp: 0,
    level: 1,
    totalSessions: 0,
    currentStreak: 0,
    longestStreak: 0,
    overallAccuracy: 0,
    averageResponseTime: 0,
    totalStudyTime: 0,
    perfectSessions: 0,
    nightSessions: 0,
    earlySessions: 0,
    categoriesStudied: 0,
    lastStudyDate: null
  });

  const [unlockedBadges, setUnlockedBadges] = useState([]);
  const [recentAchievements, setRecentAchievements] = useState([]);

  // XP獲得
  const gainXp = (amount, reason = '') => {
    setUserStats(prev => {
      const newXp = prev.totalXp + amount;
      const newLevel = calculateLevel(newXp);
      const leveledUp = newLevel > prev.level;

      if (leveledUp) {
        setRecentAchievements(prev => [...prev, {
          type: 'level_up',
          level: newLevel,
          timestamp: new Date(),
          message: `レベル ${newLevel} に到達！`
        }]);
      }

      return {
        ...prev,
        totalXp: newXp,
        level: newLevel
      };
    });

    // 新しい実績の通知
    if (reason) {
      setRecentAchievements(prev => [...prev, {
        type: 'xp_gain',
        amount,
        reason,
        timestamp: new Date()
      }]);
    }
  };

  // セッション完了時の処理
  const completeSession = (sessionData) => {
    const now = new Date();
    const hour = now.getHours();
    
    setUserStats(prev => {
      const newStats = {
        ...prev,
        totalSessions: prev.totalSessions + 1,
        totalStudyTime: prev.totalStudyTime + sessionData.duration,
        nightSessions: hour >= 22 ? prev.nightSessions + 1 : prev.nightSessions,
        earlySessions: hour <= 6 ? prev.earlySessions + 1 : prev.earlySessions,
        lastStudyDate: now
      };

      // 正答率の更新
      const totalCorrect = (prev.overallAccuracy * prev.totalSessions + sessionData.accuracy * sessionData.itemsCompleted) / 100;
      const totalAttempted = prev.totalSessions * 10 + sessionData.itemsCompleted; // 仮定
      newStats.overallAccuracy = (totalCorrect / totalAttempted) * 100;

      // 完璧なセッションのカウント
      if (sessionData.accuracy === 100) {
        newStats.perfectSessions = prev.perfectSessions + 1;
      }

      // ストリークの計算
      const lastStudy = prev.lastStudyDate;
      if (lastStudy) {
        const daysDiff = Math.floor((now - lastStudy) / (1000 * 60 * 60 * 24));
        if (daysDiff === 1) {
          newStats.currentStreak = prev.currentStreak + 1;
        } else if (daysDiff > 1) {
          newStats.currentStreak = 1;
        }
      } else {
        newStats.currentStreak = 1;
      }

      newStats.longestStreak = Math.max(newStats.currentStreak, prev.longestStreak);

      return newStats;
    });

    // XP獲得
    let xpGained = 0;
    xpGained += sessionData.itemsCompleted * 10; // 基本XP
    xpGained += Math.floor(sessionData.accuracy / 10) * 5; // 正答率ボーナス
    if (sessionData.accuracy === 100) xpGained += 50; // 完璧ボーナス

    gainXp(xpGained, `学習セッション完了 (+${xpGained} XP)`);

    // バッジチェック
    checkForNewBadges();
  };

  // 新しいバッジのチェック
  const checkForNewBadges = () => {
    Object.values(BADGES).forEach(badge => {
      if (!unlockedBadges.includes(badge.id) && badge.condition(userStats)) {
        setUnlockedBadges(prev => [...prev, badge.id]);
        setRecentAchievements(prev => [...prev, {
          type: 'badge_unlock',
          badge,
          timestamp: new Date(),
          message: `バッジ「${badge.name}」を獲得！`
        }]);
        
        // バッジ獲得でXPボーナス
        const bonusXp = badge.rarity === 'legendary' ? 200 : 
                       badge.rarity === 'rare' ? 100 : 
                       badge.rarity === 'uncommon' ? 50 : 25;
        gainXp(bonusXp, `バッジ獲得ボーナス`);
      }
    });
  };

  // 実績の既読処理
  const markAchievementAsRead = (index) => {
    setRecentAchievements(prev => prev.filter((_, i) => i !== index));
  };

  // 進捗情報の取得
  const getProgressInfo = () => {
    const currentXp = userStats.totalXp;
    const currentLevel = userStats.level;
    const xpForCurrentLevel = getXpForNextLevel(currentLevel - 1);
    const xpForNextLevel = getXpForNextLevel(currentLevel);
    const xpProgress = currentXp - xpForCurrentLevel;
    const xpNeeded = xpForNextLevel - xpForCurrentLevel;
    const progressPercentage = (xpProgress / xpNeeded) * 100;

    return {
      currentLevel,
      currentXp,
      xpProgress,
      xpNeeded,
      progressPercentage: Math.min(progressPercentage, 100),
      xpForNextLevel
    };
  };

  // バッジ情報の取得
  const getBadgeInfo = () => {
    const unlocked = unlockedBadges.map(id => BADGES[id]);
    const locked = Object.values(BADGES).filter(badge => !unlockedBadges.includes(badge.id));
    
    return {
      unlocked,
      locked,
      total: Object.keys(BADGES).length,
      unlockedCount: unlockedBadges.length
    };
  };

  const value = {
    userStats,
    unlockedBadges,
    recentAchievements,
    gainXp,
    completeSession,
    markAchievementAsRead,
    getProgressInfo,
    getBadgeInfo,
    BADGES
  };

  return (
    <GamificationContext.Provider value={value}>
      {children}
    </GamificationContext.Provider>
  );
};
