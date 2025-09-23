import React, { createContext, useContext, useState, useEffect } from 'react';

const LearningContext = createContext({});

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
};

export const LearningProvider = ({ children }) => {
  const [learningData, setLearningData] = useState({
    totalSessions: 0,
    totalMinutes: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastSessionDate: null,
    skillLevels: {
      programming: 1,
      english: 1,
      business: 1,
      design: 1,
      marketing: 1,
      finance: 1,
    },
    dailyGoal: 15, // 分
    weeklyGoal: 105, // 分 (15分 × 7日)
  });

  const [currentSession, setCurrentSession] = useState({
    isActive: false,
    startTime: null,
    duration: 0,
    category: null,
    isPaused: false,
  });

  // ローカルストレージからデータを読み込み
  useEffect(() => {
    const savedData = localStorage.getItem('studymo-learning-data');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setLearningData(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Failed to parse learning data:', error);
      }
    }
  }, []);

  // データが変更されたらローカルストレージに保存
  useEffect(() => {
    localStorage.setItem('studymo-learning-data', JSON.stringify(learningData));
  }, [learningData]);

  const startSession = (category) => {
    setCurrentSession({
      isActive: true,
      startTime: new Date(),
      duration: 0,
      category,
      isPaused: false,
    });
  };

  const pauseSession = () => {
    setCurrentSession(prev => ({
      ...prev,
      isPaused: !prev.isPaused,
    }));
  };

  const completeSession = () => {
    if (!currentSession.isActive) return;

    const sessionDuration = Math.floor((new Date() - currentSession.startTime) / 1000 / 60);
    const today = new Date().toDateString();
    
    setLearningData(prev => {
      const newStreak = prev.lastSessionDate === today ? prev.currentStreak : prev.currentStreak + 1;
      
      return {
        ...prev,
        totalSessions: prev.totalSessions + 1,
        totalMinutes: prev.totalMinutes + sessionDuration,
        currentStreak: newStreak,
        longestStreak: Math.max(prev.longestStreak, newStreak),
        lastSessionDate: today,
        skillLevels: {
          ...prev.skillLevels,
          [currentSession.category]: Math.min(prev.skillLevels[currentSession.category] + 0.1, 10),
        },
      };
    });

    setCurrentSession({
      isActive: false,
      startTime: null,
      duration: 0,
      category: null,
      isPaused: false,
    });

    return sessionDuration;
  };

  const resetProgress = () => {
    setLearningData({
      totalSessions: 0,
      totalMinutes: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastSessionDate: null,
      skillLevels: {
        programming: 1,
        english: 1,
        business: 1,
        design: 1,
        marketing: 1,
        finance: 1,
      },
      dailyGoal: 15,
      weeklyGoal: 105,
    });
  };

  const updateGoals = (daily, weekly) => {
    setLearningData(prev => ({
      ...prev,
      dailyGoal: daily,
      weeklyGoal: weekly,
    }));
  };

  const getTodayProgress = () => {
    const today = new Date().toDateString();
    if (learningData.lastSessionDate !== today) {
      return 0;
    }
    // 簡易的な実装：今日の進捗は最後のセッション時間として計算
    return Math.min(learningData.totalMinutes % learningData.dailyGoal, learningData.dailyGoal);
  };

  const getWeeklyProgress = () => {
    // 簡易的な実装：週間進捗は総時間の一部として計算
    return Math.min(learningData.totalMinutes % learningData.weeklyGoal, learningData.weeklyGoal);
  };

  const value = {
    learningData,
    currentSession,
    startSession,
    pauseSession,
    completeSession,
    resetProgress,
    updateGoals,
    getTodayProgress,
    getWeeklyProgress,
  };

  return (
    <LearningContext.Provider value={value}>
      {children}
    </LearningContext.Provider>
  );
};
