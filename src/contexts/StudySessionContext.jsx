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
    mode: 'mixed', // 'flashcards', 'quiz', 'mixed'
    sessionItems: [],
    itemIndex: 0,
    responses: [],
    stats: {
      correctAnswers: 0,
      totalAnswers: 0,
      timeSpent: 0
    },
    startTime: null
  });

  const [userProgress, setUserProgress] = useState({
    programming: { attempted: 0, correct: 0, streak: 0 },
    english: { attempted: 0, correct: 0, streak: 0 },
    business: { attempted: 0, correct: 0, streak: 0 },
    design: { attempted: 0, correct: 0, streak: 0 },
    marketing: { attempted: 0, correct: 0, streak: 0 },
    finance: { attempted: 0, correct: 0, streak: 0 }
  });

  const [detailedStats, setDetailedStats] = useState({
    dailyStats: {},
    weeklyGoals: {
      targetMinutes: 300, // 5時間/週
      currentMinutes: 59
    },
    streakData: {
      currentStreak: 7,
      longestStreak: 20
    }
  });

  // セッション開始
  const startSession = (categoryKey, mode = 'mixed', itemCount = 10) => {
    try {
      const category = learningContent[categoryKey];
      if (!category) {
        console.error('Category not found:', categoryKey);
        return;
      }

      let sessionItems = [];
      
      if (mode === 'flashcards') {
        sessionItems = [...category.flashcards].slice(0, itemCount);
      } else if (mode === 'quiz') {
        sessionItems = [...category.quizzes].slice(0, itemCount);
      } else {
        // mixed mode
        const flashcards = category.flashcards.slice(0, Math.ceil(itemCount / 2));
        const quizzes = category.quizzes.slice(0, Math.floor(itemCount / 2));
        sessionItems = [...flashcards, ...quizzes].sort(() => Math.random() - 0.5);
      }

      setCurrentSession({
        isActive: true,
        category: categoryKey,
        mode,
        sessionItems,
        itemIndex: 0,
        responses: [],
        stats: {
          correctAnswers: 0,
          totalAnswers: 0,
          timeSpent: 0
        },
        startTime: Date.now()
      });
    } catch (error) {
      console.error('Error starting session:', error);
    }
  };

  // セッション終了
  const endSession = () => {
    const endTime = Date.now();
    const timeSpent = currentSession.startTime ? endTime - currentSession.startTime : 0;
    
    // 統計更新
    if (currentSession.category && currentSession.responses.length > 0) {
      setUserProgress(prev => ({
        ...prev,
        [currentSession.category]: {
          ...prev[currentSession.category],
          attempted: prev[currentSession.category].attempted + currentSession.responses.length,
          correct: prev[currentSession.category].correct + currentSession.stats.correctAnswers
        }
      }));
    }

    setCurrentSession({
      isActive: false,
      category: null,
      mode: 'mixed',
      sessionItems: [],
      itemIndex: 0,
      responses: [],
      stats: {
        correctAnswers: 0,
        totalAnswers: 0,
        timeSpent: 0
      },
      startTime: null
    });
  };

  // 回答記録
  const recordResponse = (itemId, isCorrect, timeSpent = 0) => {
    const newResponse = {
      itemId,
      isCorrect,
      timeSpent,
      timestamp: Date.now()
    };

    setCurrentSession(prev => ({
      ...prev,
      responses: [...prev.responses, newResponse],
      stats: {
        ...prev.stats,
        correctAnswers: prev.stats.correctAnswers + (isCorrect ? 1 : 0),
        totalAnswers: prev.stats.totalAnswers + 1,
        timeSpent: prev.stats.timeSpent + timeSpent
      }
    }));
  };

  // 次のアイテムに進む
  const nextItem = () => {
    setCurrentSession(prev => ({
      ...prev,
      itemIndex: prev.itemIndex + 1
    }));
  };

  const value = {
    currentSession,
    userProgress,
    detailedStats,
    startSession,
    endSession,
    recordResponse,
    nextItem
  };

  return (
    <StudySessionContext.Provider value={value}>
      {children}
    </StudySessionContext.Provider>
  );
};
