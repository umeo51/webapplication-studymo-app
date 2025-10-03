import React, { useState } from 'react';

const FlashCard = ({ card, onAnswer, disabled }) => {
  const [inputAnswer, setInputAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);

  if (!card) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
        <p className="text-gray-500">問題を読み込み中...</p>
      </div>
    );
  }

  const handleSubmit = () => {
    if (disabled || !inputAnswer.trim()) return;

    const answer = inputAnswer.trim();
    const isCorrect = answer.toLowerCase() === card.correctAnswer.toLowerCase();
    
    onAnswer(answer, isCorrect);
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
      {/* 問題文 */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {card.question}
        </h2>
        
        {/* 難易度とタグ */}
        <div className="flex items-center space-x-4 mb-6">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            card.difficulty === '初級' ? 'bg-green-100 text-green-800' :
            card.difficulty === '中級' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {card.difficulty}
          </span>
          {card.tags && card.tags.map((tag, index) => (
            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 入力エリア */}
      <div className="mb-8">
        <input
          type="text"
          value={inputAnswer}
          onChange={(e) => !disabled && setInputAnswer(e.target.value)}
          disabled={disabled}
          placeholder="答えを入力してください"
          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
        />
        
        {/* ヒントボタン */}
        {card.hint && (
          <div className="mt-4">
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              💡 ヒントを見る
            </button>
            {showHint && (
              <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800">{card.hint}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 回答ボタン */}
      <div className="text-center">
        <button
          onClick={handleSubmit}
          disabled={disabled || !inputAnswer.trim()}
          className="bg-blue-600 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          回答する
        </button>
      </div>
    </div>
  );
};

export default FlashCard;
