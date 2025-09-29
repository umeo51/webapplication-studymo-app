import React, { useState } from 'react';

const Quiz = ({ quiz, onResponse }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [hasResponded, setHasResponded] = useState(false);

  // quizが存在しない場合のエラーハンドリング
  if (!quiz) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">クイズが見つかりません</p>
      </div>
    );
  }

  const handleAnswerSelect = (answerIndex) => {
    if (hasResponded) return;

    setSelectedAnswer(answerIndex);
    setShowResult(true);
    setHasResponded(true);

    const isCorrect = answerIndex === quiz.correctAnswer;
    
    // 1.5秒後に回答を記録
    setTimeout(() => {
      if (onResponse) {
        onResponse(isCorrect);
      }
    }, 1500);
  };

  // 難易度の色を取得（デフォルト値を設定）
  const getDifficultyColor = (difficulty = 1) => {
    switch (difficulty) {
      case 1: return 'green';
      case 2: return 'blue';
      case 3: return 'orange';
      case 4: return 'red';
      default: return 'gray';
    }
  };

  // 難易度ラベルを取得（デフォルト値を設定）
  const getDifficultyLabel = (difficulty = 1) => {
    switch (difficulty) {
      case 1: return '初級';
      case 2: return '中級';
      case 3: return '上級';
      case 4: return '専門';
      default: return '不明';
    }
  };

  const difficultyColor = getDifficultyColor(quiz.difficulty);
  const difficultyLabel = getDifficultyLabel(quiz.difficulty);
  const isCorrect = selectedAnswer === quiz.correctAnswer;

  return (
    <div className="max-w-2xl mx-auto">
      {/* 難易度表示 */}
      <div className="flex justify-between items-center mb-6">
        <span className={`px-3 py-1 rounded-full text-sm font-medium bg-${difficultyColor}-100 text-${difficultyColor}-800`}>
          {difficultyLabel}
        </span>
        {quiz.tags && quiz.tags.length > 0 && (
          <div className="flex gap-2">
            {quiz.tags.slice(0, 2).map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 質問 */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 mb-6">
        <h3 className="text-xl font-bold text-white mb-4">クイズ</h3>
        <p className="text-lg text-white leading-relaxed">
          {quiz.question || 'No question available'}
        </p>
      </div>

      {/* 選択肢 */}
      <div className="space-y-3 mb-6">
        {(quiz.options || []).map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            disabled={hasResponded}
            className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
              hasResponded
                ? index === quiz.correctAnswer
                  ? 'bg-green-100 border-green-500 text-green-800'
                  : index === selectedAnswer
                  ? 'bg-red-100 border-red-500 text-red-800'
                  : 'bg-gray-100 border-gray-300 text-gray-600'
                : 'bg-white border-gray-300 hover:border-blue-500 hover:bg-blue-50'
            } ${hasResponded ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">
                {String.fromCharCode(65 + index)}. {option}
              </span>
              {showResult && index === quiz.correctAnswer && (
                <span className="text-green-600 font-bold">✓</span>
              )}
              {showResult && index === selectedAnswer && index !== quiz.correctAnswer && (
                <span className="text-red-600 font-bold">✗</span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* 結果表示 */}
      {showResult && (
        <div className={`p-4 rounded-lg ${
          isCorrect 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
        }`}>
          <div className="flex items-center mb-2">
            {isCorrect ? (
              <>
                <span className="text-green-600 text-xl mr-2">🎉</span>
                <span className="font-semibold text-green-800">正解です！</span>
              </>
            ) : (
              <>
                <span className="text-red-600 text-xl mr-2">😅</span>
                <span className="font-semibold text-red-800">不正解です</span>
              </>
            )}
          </div>
          {quiz.explanation && (
            <p className="text-gray-700 text-sm">
              {quiz.explanation}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
