import React, { useState } from 'react';

const QuizQuestion = ({ question, onAnswer, disabled }) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [inputAnswer, setInputAnswer] = useState('');

  if (!question) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
        <p className="text-gray-500">問題を読み込み中...</p>
      </div>
    );
  }

  const handleSubmit = () => {
    if (disabled) return;

    let answer, isCorrect;
    
    if (question.type === 'quiz') {
      answer = selectedAnswer;
      isCorrect = selectedAnswer === question.correctAnswer;
    } else {
      answer = inputAnswer.trim();
      isCorrect = answer.toLowerCase() === question.correctAnswer.toLowerCase();
    }

    if (answer) {
      onAnswer(answer, isCorrect);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
      {/* 問題文 */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {question.question}
        </h2>
        
        {/* 難易度とタグ */}
        <div className="flex items-center space-x-4 mb-6">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            question.difficulty === '初級' ? 'bg-green-100 text-green-800' :
            question.difficulty === '中級' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {question.difficulty}
          </span>
          {question.tags && question.tags.map((tag, index) => (
            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 回答エリア */}
      <div className="mb-8">
        {question.type === 'quiz' ? (
          // 選択式問題
          <div className="space-y-3">
            {question.options && question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !disabled && setSelectedAnswer(option)}
                disabled={disabled}
                className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                  selectedAnswer === option
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswer === option
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswer === option && (
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          // 記述式問題
          <div>
            <input
              type="text"
              value={inputAnswer}
              onChange={(e) => !disabled && setInputAnswer(e.target.value)}
              disabled={disabled}
              placeholder="答えを入力してください"
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            />
          </div>
        )}
      </div>

      {/* 回答ボタン */}
      <div className="text-center">
        <button
          onClick={handleSubmit}
          disabled={disabled || (question.type === 'quiz' ? !selectedAnswer : !inputAnswer.trim())}
          className="bg-blue-600 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          回答する
        </button>
      </div>
    </div>
  );
};

export default QuizQuestion;
