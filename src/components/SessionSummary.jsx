import React from 'react';

const SessionSummary = ({ results, onRestart, onClose }) => {
  if (!results) {
    return null;
  }

  // 安全な数値計算
  const totalItems = results.totalItems || 0;
  const correctAnswers = results.correctAnswers || 0;
  const totalTime = results.totalTime || 0;
  const accuracy = totalItems > 0 ? Math.round((correctAnswers / totalItems) * 100) : 0;
  const timeInMinutes = Math.round(totalTime / 60000) || 0;
  const timeInSeconds = Math.round((totalTime % 60000) / 1000) || 0;

  // XP計算（安全な計算）
  const baseXP = correctAnswers * 10;
  const bonusXP = accuracy >= 80 ? Math.round(baseXP * 0.5) : 0;
  const totalXP = baseXP + bonusXP;

  const getPerformanceMessage = () => {
    if (accuracy >= 90) return { message: "素晴らしい成績です！", color: "text-green-600", emoji: "🎉" };
    if (accuracy >= 70) return { message: "良い成績です！", color: "text-blue-600", emoji: "👏" };
    if (accuracy >= 50) return { message: "もう少し頑張りましょう", color: "text-yellow-600", emoji: "💪" };
    return { message: "復習が必要です", color: "text-red-600", emoji: "📚" };
  };

  const performance = getPerformanceMessage();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* ヘッダー */}
          <div className="text-center mb-6">
            <div className="text-4xl sm:text-6xl mb-4">📚</div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              セッション完了！
            </h2>
            <p className={`text-sm sm:text-base ${performance.color} font-medium`}>
              <span className="mr-2">{performance.emoji}</span>
              {performance.message}
            </p>
          </div>

          {/* 結果統計 */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                {accuracy}%
              </div>
              <div className="text-xs sm:text-sm text-blue-800">正答率</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl sm:text-3xl font-bold text-green-600">
                {totalItems}
              </div>
              <div className="text-xs sm:text-sm text-green-800">完了項目</div>
            </div>
          </div>

          {/* 詳細統計 */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm sm:text-base text-gray-600">正解数</span>
              <span className="font-semibold text-green-600">{correctAnswers} / {totalItems}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm sm:text-base text-gray-600">学習時間</span>
              <span className="font-semibold text-blue-600">
                {timeInMinutes > 0 ? `${timeInMinutes}分${timeInSeconds}秒` : `${timeInSeconds}秒`}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm sm:text-base text-gray-600">カテゴリ</span>
              <span className="font-semibold text-purple-600">{results.category || '不明'}</span>
            </div>
          </div>

          {/* 励ましメッセージ */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <span className="text-yellow-600 text-lg mr-2">💡</span>
              <div>
                <h4 className="font-semibold text-yellow-800 text-sm sm:text-base">次のステップ</h4>
                <p className="text-yellow-700 text-xs sm:text-sm mt-1">
                  {accuracy >= 80 
                    ? "素晴らしい成績です！より難しい問題にチャレンジしてみましょう。"
                    : "継続的な学習が上達の鍵です。復習を重ねて理解を深めましょう。"
                  }
                </p>
              </div>
            </div>
          </div>

          {/* 経験値獲得 */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-4 mb-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-sm sm:text-base">経験値獲得</h4>
                <p className="text-xs sm:text-sm opacity-90">
                  基礎XP: {baseXP} {bonusXP > 0 ? `+ ボーナス: ${bonusXP}` : ''}
                </p>
              </div>
              <div className="text-right">
                <div className="text-xl sm:text-2xl font-bold">+{totalXP} XP</div>
                <div className="text-xs sm:text-sm opacity-90">レベルアップまで あと {250 - (totalXP % 250)} XP</div>
              </div>
            </div>
            <div className="mt-3">
              <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                <div 
                  className="bg-white h-2 rounded-full transition-all duration-500"
                  style={{ width: `${((totalXP % 250) / 250) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* アクションボタン */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onRestart}
              className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold text-sm sm:text-base"
            >
              もう一度
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold text-sm sm:text-base"
            >
              完了
            </button>
          </div>

          {/* ソーシャル共有 */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-center text-xs sm:text-sm text-gray-600 mb-3">
              成果をシェアしましょう！
            </p>
            <div className="flex justify-center space-x-3">
              <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors text-sm">
                📱
              </button>
              <button className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors text-sm">
                💬
              </button>
              <button className="p-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors text-sm">
                📧
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionSummary;
