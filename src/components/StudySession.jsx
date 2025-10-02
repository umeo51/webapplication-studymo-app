import React, { useState, useEffect } from 'react';
import { useStudySession } from '../contexts/StudySessionContext';
import QuizQuestion from './QuizQuestion';
import FlashCard from './FlashCard';

const StudySession = ({ category, onComplete }) => {
  const { currentSession, recordResponse, nextItem, endSession } = useStudySession();
  const [currentQuestionStartTime, setCurrentQuestionStartTime] = useState(Date.now());
  const [showResult, setShowResult] = useState(false);
  const [lastAnswer, setLastAnswer] = useState(null);

  useEffect(() => {
    setCurrentQuestionStartTime(Date.now());
  }, [currentSession?.currentIndex]);

  if (!currentSession?.isActive) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">学習セッションを開始してください</h2>
          <p className="text-gray-600">カテゴリを選択して学習を始めましょう。</p>
        </div>
      </div>
    );
  }

  const currentItem = currentSession.items[currentSession.currentIndex];
  const progress = ((currentSession.currentIndex + 1) / currentSession.items.length) * 100;

  const handleAnswer = (answer, isCorrect, responseTime = null) => {
    const actualResponseTime = responseTime || (Date.now() - currentQuestionStartTime);
    
    setLastAnswer({ answer, isCorrect });
    setShowResult(true);

    recordResponse({
      itemId: currentItem.id,
      answer,
      isCorrect,
      responseTime: actualResponseTime
    });

    setTimeout(() => {
      setShowResult(false);
      if (currentSession.currentIndex < currentSession.items.length - 1) {
        nextItem();
      } else {
        endSession();
        if (onComplete) {
          onComplete();
        }
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">📚</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">{currentSession.category}</h1>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">正解: {currentSession.correctAnswers} / {currentSession.currentIndex}</div>
            </div>
          </div>
          
          {/* プログレスバー */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>問題 {currentSession.currentIndex + 1} / {currentSession.items.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* 結果表示オーバーレイ */}
        {showResult && lastAnswer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`bg-white rounded-2xl p-8 text-center max-w-md mx-4 transform transition-all duration-300 ${
              showResult ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}>
              <div className={`text-6xl mb-4 ${lastAnswer.isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                {lastAnswer.isCorrect ? '✅' : '❌'}
              </div>
              <h3 className={`text-2xl font-bold mb-2 ${
                lastAnswer.isCorrect ? 'text-green-700' : 'text-red-700'
              }`}>
                {lastAnswer.isCorrect ? '正解！' : '不正解'}
              </h3>
              {!lastAnswer.isCorrect && (
                <p className="text-gray-600 mb-4">
                  正解: {currentItem.correctAnswer || currentItem.answer}
                </p>
              )}
              <div className="text-sm text-gray-500">
                次の問題に進みます...
              </div>
            </div>
          </div>
        )}

        {/* 問題表示 */}
        <div className="max-w-4xl mx-auto">
          {currentItem.type === 'quiz' ? (
            <QuizQuestion
              question={currentItem}
              onAnswer={handleAnswer}
              disabled={showResult}
            />
          ) : (
            <FlashCard
              card={currentItem}
              onAnswer={handleAnswer}
              disabled={showResult}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StudySession;
