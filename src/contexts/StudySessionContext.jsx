import React, { createContext, useContext, useState } from 'react';
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
    items: [],
    currentIndex: 0,
    correctAnswers: 0,
    totalAnswers: 0,
    startTime: null,
    responses: []
  });

  const [sessionStats, setSessionStats] = useState({
    totalSessions: 0,
    totalCorrect: 0,
    totalQuestions: 0,
    averageTime: 0,
    longestStreak: 0
  });

  // セッション開始
  const startSession = (categoryKey, mode = 'quiz', itemCount = 10) => {
    try {
      console.log('Starting session for category:', categoryKey);
      const category = learningContent[categoryKey];
      
      if (!category) {
        console.error('Category not found:', categoryKey);
        return;
      }

      console.log('Category data:', category);
      
      let sessionItems = [];
      
      // クイズが存在する場合のみ使用
      if (category.quizzes && category.quizzes.length > 0) {
        sessionItems = [...category.quizzes].slice(0, itemCount);
      } else {
        console.warn('No quizzes available for category:', categoryKey);
        return;
      }

      console.log('Session items:', sessionItems);

      setCurrentSession({
        isActive: true,
        category: categoryKey,
        items: sessionItems,
        currentIndex: 0,
        correctAnswers: 0,
        totalAnswers: 0,
        startTime: Date.now(),
        responses: []
      });

      console.log('Session started successfully');
    } catch (error) {
      console.error('Error starting session:', error);
    }
  };

  // 回答記録
  const recordResponse = (response) => {
    setCurrentSession(prev => ({
      ...prev,
      responses: [...prev.responses, response],
      correctAnswers: prev.correctAnswers + (response.isCorrect ? 1 : 0),
      totalAnswers: prev.totalAnswers + 1
    }));
  };

  // 次の問題へ
  const nextItem = () => {
    setCurrentSession(prev => ({
      ...prev,
      currentIndex: prev.currentIndex + 1
    }));
  };

  // セッション終了
  const endSession = () => {
    const sessionData = {
      ...currentSession,
      endTime: Date.now()
    };

    // 統計更新
    setSessionStats(prev => ({
      ...prev,
      totalSessions: prev.totalSessions + 1,
      totalCorrect: prev.totalCorrect + sessionData.correctAnswers,
      totalQuestions: prev.totalQuestions + sessionData.totalAnswers
    }));

    setCurrentSession({
      isActive: false,
      category: null,
      items: [],
      currentIndex: 0,
      correctAnswers: 0,
      totalAnswers: 0,
      startTime: null,
      responses: []
    });

    return sessionData;
  };

  const value = {
    currentSession,
    sessionStats,
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
