import React, { createContext, useContext, useState, useEffect } from 'react';
import { learningContent } from '../data/learningContent';

const StudySessionContext = createContext();

export const useStudySession = () => {
  const context = useContext(StudySessionContext);
  if (!context) {
    throw new Error('useStudySession must be used within a StudySessionProvider');
  }
  return context;
};

export const StudySessionProvider = ({ children }) => {
  const [currentSession, setCurrentSession] = useState({
    isActive: false,
    category: null,
    mode: 'quiz', // 'quiz'のみに変更
    sessionItems: [],
    itemIndex: 0,
    responses: [],
    stats: {
      correctAnswers: 0,
      totalAnswers: 0,
      totalTime: 0
    },
    startTime: null
  });

  const [userProgress, setUserProgress] = useState({
    programming: { attempted: 0, correct: 0, level: 1, xp: 0 },
    english: { attempted: 0, correct: 0, level: 1, xp: 0 },
    business: { attempted: 0, correct: 0, level: 1, xp: 0 },
    design: { attempted: 0, correct: 0, level: 1, xp: 0 },
    marketing: { attempted: 0, correct: 0, level: 1, xp: 0 },
    finance: { attempted: 0, correct: 0, level: 1, xp: 0 }
  });

  const [detailedStats, setDetailedStats] = useState({
    dailyStats: {},
    weeklyStats: {},
    categoryPerformance: {}
  });

  // セッション開始関数
  const startSession = (categoryKey, mode = 'quiz', itemCount = 10) => {
    console.log('Starting session:', { categoryKey, mode, itemCount }); // デバッグ用

    const category = learningContent[categoryKey];
    if (!category) {
      console.error('Category not found:', categoryKey);
      return;
    }

    // クイズのみを使用
    const availableItems = category.quizzes || [];
    
    if (availableItems.length === 0) {
      console.error('No quizzes available for category:', categoryKey);
      return;
    }

    // ランダムに問題を選択
    const shuffledItems = [...availableItems].sort(() => Math.random() - 0.5);
    const sessionItems = shuffledItems.slice(0, Math.min(itemCount, shuffledItems.length));

    console.log('Session items:', sessionItems); // デバッグ用

    setCurrentSession({
      isActive: true,
      category: category.name,
      categoryKey: categoryKey,
      mode: 'quiz',
      sessionItems: sessionItems,
      itemIndex: 0,
      responses: [],
      stats: {
        correctAnswers: 0,
        totalAnswers: 0,
        totalTime: 0
      },
      startTime: Date.now()
    });
  };

  // 回答記録関数
  const recordResponse = (itemId, isCorrect, timeSpent) => {
    setCurrentSession(prev => {
      const newResponses = [...prev.responses, {
        itemId,
        isCorrect,
        timeSpent,
        timestamp: Date.now()
      }];

      const newStats = {
        correctAnswers: prev.stats.correctAnswers + (isCorrect ? 1 : 0),
        totalAnswers: prev.stats.totalAnswers + 1,
        totalTime: prev.stats.totalTime + timeSpent
      };

      return {
        ...prev,
        responses: newResponses,
        stats: newStats
      };
    });

    // ユーザー進捗を更新
    setUserProgress(prev => {
      const categoryKey = currentSession.categoryKey;
      if (!categoryKey || !prev[categoryKey]) return prev;

      return {
        ...prev,
        [categoryKey]: {
          ...prev[categoryKey],
          attempted: prev[categoryKey].attempted + 1,
          correct: prev[categoryKey].correct + (isCorrect ? 1 : 0),
          xp: prev[categoryKey].xp + (isCorrect ? 10 : 5)
        }
      };
    });
  };

  // 次のアイテムに進む
  const nextItem = () => {
    setCurrentSession(prev => ({
      ...prev,
      itemIndex: prev.itemIndex + 1
    }));
  };

  // セッション終了
  const endSession = () => {
    setCurrentSession({
      isActive: false,
      category: null,
      categoryKey: null,
      mode: 'quiz',
      sessionItems: [],
      itemIndex: 0,
      responses: [],
      stats: {
        correctAnswers: 0,
        totalAnswers: 0,
        totalTime: 0
      },
      startTime: null
    });
  };

  const value = {
    currentSession,
    userProgress,
    detailedStats,
    startSession,
    recordResponse,
    nextItem,
    endSession
  };

  return (
    <StudySessionContext.Provider value={value}>
      {children}
    </StudySessionContext.Provider>
  );
};
