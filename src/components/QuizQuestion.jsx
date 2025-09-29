import React, { useState } from 'react';

const QuizQuestion = ({ quiz, onResponse, disabled = false }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [textInput, setTextInput] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [hasResponded, setHasResponded] = useState(false);

  if (!quiz) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">問題が見つかりません</p>
      </div>
    );
  }

  const handleMultipleChoiceAnswer = (answerIndex) => {
    if (hasResponded || disabled) return;

    setSelectedAnswer(answerIndex);
    setShowResult(true);
    setHasResponded(true);

    const isCorrect = answerIndex === quiz.correctAnswer;
    
    setTimeout(() => {
      if (onResponse) {
        onResponse(isCorrect);
      }
    }, 2000);
  };

  const handleTextInputSubmit = () => {
    if (hasResponded || disabled || !textInput.trim()) return;

    setShowResult(true);
    setHasResponded(true);

    const userAnswer = textInput.trim().toLowerCase();
    const isCorrect = quiz.correctAnswers.some(answer => 
      answer.toLowerCase() === userAnswer
    );

    setTimeout(() => {
      if (onResponse) {
        onResponse(isCorrect);
      }
    }, 2000);
  };

  const getDifficultyColor = (difficulty = 1) => {
    switch (difficulty) {
      case 1: return 'green';
      case 2: return 'blue';
      case 3: return 'orange';
      case 4: return 'red';
      default: return 'gray';
    }
  };

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
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 mb-6">
        <h3 className="text-xl font-bold text-white mb-4">問題</h3>
        <p className="text-lg text-white leading-relaxed">
          {quiz.question}
        </p>
      </div>

      {/* 選択式問題 */}
      {quiz.type === 'multiple_choice' && (
        <div className="space-y-3 mb-6">
          {quiz.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleMultipleChoiceAnswer(index)}
              disabled={hasResponded || disabled}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                hasResponded
                  ? index === quiz.correctAnswer
                    ? 'bg-green-100 border-green-500 text-green-800'
                    : index === selectedAnswer
                    ? 'bg-red-100 border-red-500 text-red-800'
                    : 'bg-gray-100 border-gray-300 text-gray-600'
                  : 'bg-white border-gray-300 hover:border-blue-500 hover:bg-blue-50'
              } ${hasResponded || disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
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
      )}

      {/* 記述式問題 */}
      {quiz.type === 'text_input' && (
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              disabled={hasResponded || disabled}
              placeholder="答えを入力してください"
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleTextInputSubmit();
                }
              }}
            />
            <button
              onClick={handleTextInputSubmit}
              disabled={hasResponded || disabled || !textInput.trim()}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              回答
            </button>
          </div>
          
          {/* 記述式の結果表示 */}
          {showResult && quiz.type === 'text_input' && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>正解例:</strong> {quiz.correctAnswers.join(', ')}
              </p>
            </div>
          )}
        </div>
      )}

      {/* 結果表示 */}
      {showResult && (
        <div className={`p-4 rounded-lg ${
          (quiz.type === 'multiple_choice' && selectedAnswer === quiz.correctAnswer) ||
          (quiz.type === 'text_input' && quiz.correctAnswers.some(answer => 
            answer.toLowerCase() === textInput.trim().toLowerCase()
          ))
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
        }`}>
          <div className="flex items-center mb-2">
            {((quiz.type === 'multiple_choice' && selectedAnswer === quiz.correctAnswer) ||
              (quiz.type === 'text_input' && quiz.correctAnswers.some(answer => 
                answer.toLowerCase() === textInput.trim().toLowerCase()
              ))) ? (
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

export default QuizQuestion;
