import React, { useState, useEffect } from 'react';

const Flashcard = ({ flashcard, onResponse, disabled = false }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasResponded, setHasResponded] = useState(false);

  // コンポーネントがマウントされるたびにリセット
  useEffect(() => {
    setIsFlipped(false);
    setHasResponded(false);
  }, [flashcard.id]); // flashcard.idが変わったときにリセット

  // flashcardが存在しない場合のエラーハンドリング
  if (!flashcard) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">フラッシュカードが見つかりません</p>
      </div>
    );
  }

  const handleFlip = () => {
    if (!hasResponded && !disabled) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleResponse = (isCorrect) => {
    if (!hasResponded && !disabled) {
      setHasResponded(true);
      if (onResponse) {
        onResponse(isCorrect);
      }
    }
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

  const difficultyColor = getDifficultyColor(flashcard.difficulty);
  const difficultyLabel = getDifficultyLabel(flashcard.difficulty);

  return (
    <div className="max-w-2xl mx-auto">
      {/* 難易度表示 */}
      <div className="flex justify-between items-center mb-4">
        <span className={`px-3 py-1 rounded-full text-sm font-medium bg-${difficultyColor}-100 text-${difficultyColor}-800`}>
          {difficultyLabel}
        </span>
        {flashcard.tags && flashcard.tags.length > 0 && (
          <div className="flex gap-2">
            {flashcard.tags.slice(0, 2).map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* フラッシュカード */}
      <div 
        className={`relative w-full h-64 cursor-pointer transition-transform duration-500 ${
          disabled ? 'cursor-not-allowed opacity-75' : ''
        }`}
        onClick={handleFlip}
        style={{ perspective: '1000px' }}
      >
        {/* 表面（質問） */}
        <div className={`absolute inset-0 w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg flex items-center justify-center p-6 transition-transform duration-500 ${
          isFlipped ? 'transform rotateY-180' : ''
        }`}
        style={{ 
          backfaceVisibility: 'hidden',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">質問</h3>
            <p className="text-xl text-white leading-relaxed">
              {flashcard.question || 'No question available'}
            </p>
            <p className="text-blue-100 text-sm mt-4">
              クリックして答えを確認
            </p>
          </div>
        </div>

        {/* 裏面（答え） */}
        <div className={`absolute inset-0 w-full h-full bg-gradient-to-br from-green-500 to-teal-600 rounded-lg shadow-lg flex items-center justify-center p-6 transition-transform duration-500 ${
          isFlipped ? '' : 'transform rotateY-180'
        }`}
        style={{ 
          backfaceVisibility: 'hidden',
          transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(-180deg)'
        }}>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">答え</h3>
            <p className="text-xl text-white leading-relaxed">
              {flashcard.answer || 'No answer available'}
            </p>
          </div>
        </div>
      </div>

      {/* 回答ボタン */}
      {isFlipped && !hasResponded && !disabled && (
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={() => handleResponse(false)}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold"
          >
            😅 難しかった
          </button>
          <button
            onClick={() => handleResponse(true)}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
          >
            😊 簡単だった
          </button>
        </div>
      )}

      {/* 回答済み表示 */}
      {hasResponded && (
        <div className="mt-6 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-lg">
            <span className="mr-2">✅</span>
            回答を記録しました
          </div>
        </div>
      )}
    </div>
  );
};

export default Flashcard;
