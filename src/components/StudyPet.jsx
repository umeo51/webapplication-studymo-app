import React, { useState, useEffect } from 'react';
import { useGamification } from '../contexts/GamificationContext';

const StudyPet = () => {
  const { userStats } = useGamification();
  const [petMood, setPetMood] = useState('happy');
  const [petAnimation, setPetAnimation] = useState('idle');
  const [showMessage, setShowMessage] = useState(false);
  const [petMessage, setPetMessage] = useState('');

  // ペットの状態を学習状況に基づいて決定
  useEffect(() => {
    const now = new Date();
    const lastStudy = userStats.lastStudyDate ? new Date(userStats.lastStudyDate) : null;
    const hoursSinceLastStudy = lastStudy ? (now - lastStudy) / (1000 * 60 * 60) : 0;

    if (hoursSinceLastStudy > 48) {
      setPetMood('sad');
      setPetMessage('もう2日も学習していないよ...😢');
    } else if (hoursSinceLastStudy > 24) {
      setPetMood('worried');
      setPetMessage('昨日は学習しなかったね。今日は頑張ろう！🤔');
    } else if (userStats.currentStreak >= 7) {
      setPetMood('excited');
      setPetMessage('7日連続学習すごいね！僕も嬉しいよ！🎉');
    } else if (userStats.currentStreak >= 3) {
      setPetMood('happy');
      setPetMessage('継続学習いいね！一緒に頑張ろう！😊');
    } else {
      setPetMood('normal');
      setPetMessage('今日も学習頑張ろうね！📚');
    }
  }, [userStats]);

  // ペットをクリックした時の反応
  const handlePetClick = () => {
    setPetAnimation('bounce');
    setShowMessage(true);
    
    const messages = [
      '学習頑張ってるね！👏',
      '君と一緒だと楽しいよ！😄',
      'もっと学習して僕を成長させて！🌱',
      '今日の調子はどう？💪',
      '一緒に新しいことを学ぼう！✨'
    ];
    
    setPetMessage(messages[Math.floor(Math.random() * messages.length)]);
    
    setTimeout(() => {
      setPetAnimation('idle');
      setShowMessage(false);
    }, 3000);
  };

  // ペットの見た目を決定
  const getPetAppearance = () => {
    const level = userStats.level;
    
    if (level >= 20) {
      return { emoji: '🐉', name: 'ドラゴン', stage: 'legendary' };
    } else if (level >= 15) {
      return { emoji: '🦄', name: 'ユニコーン', stage: 'mythical' };
    } else if (level >= 10) {
      return { emoji: '🐺', name: 'オオカミ', stage: 'advanced' };
    } else if (level >= 5) {
      return { emoji: '🐱', name: 'ネコ', stage: 'intermediate' };
    } else {
      return { emoji: '🐣', name: 'ヒヨコ', stage: 'beginner' };
    }
  };

  const pet = getPetAppearance();

  const getMoodColor = () => {
    switch (petMood) {
      case 'excited': return 'from-yellow-400 to-orange-400';
      case 'happy': return 'from-green-400 to-emerald-400';
      case 'normal': return 'from-blue-400 to-cyan-400';
      case 'worried': return 'from-orange-400 to-red-400';
      case 'sad': return 'from-gray-400 to-gray-600';
      default: return 'from-blue-400 to-cyan-400';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        学習パートナー
      </h3>
      
      <div className="text-center">
        {/* ペット表示 */}
        <div className="relative inline-block">
          <div
            onClick={handlePetClick}
            className={`
              inline-flex items-center justify-center w-24 h-24 rounded-full cursor-pointer
              bg-gradient-to-br ${getMoodColor()} shadow-lg transform transition-all duration-300
              ${petAnimation === 'bounce' ? 'animate-bounce' : 'hover:scale-110'}
            `}
          >
            <span className="text-4xl">{pet.emoji}</span>
          </div>
          
          {/* レベル表示 */}
          <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {userStats.level}
          </div>
        </div>

        {/* ペット情報 */}
        <div className="mt-4">
          <h4 className="font-semibold text-gray-800">{pet.name}</h4>
          <p className="text-sm text-gray-600 capitalize">{pet.stage} Stage</p>
        </div>

        {/* ペットのメッセージ */}
        {showMessage && (
          <div className="mt-4 bg-gray-100 rounded-lg p-3 relative">
            <p className="text-sm text-gray-700">{petMessage}</p>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
              <div className="w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-100"></div>
            </div>
          </div>
        )}

        {/* ペットの状態インジケーター */}
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-xs text-gray-600">
            <span>幸福度</span>
            <span>{petMood === 'excited' ? '100%' : petMood === 'happy' ? '80%' : petMood === 'normal' ? '60%' : petMood === 'worried' ? '40%' : '20%'}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full bg-gradient-to-r ${getMoodColor()} transition-all duration-500`}
              style={{ 
                width: petMood === 'excited' ? '100%' : 
                       petMood === 'happy' ? '80%' : 
                       petMood === 'normal' ? '60%' : 
                       petMood === 'worried' ? '40%' : '20%' 
              }}
            />
          </div>
        </div>

        {/* 成長予測 */}
        <div className="mt-4 text-xs text-gray-500">
          {userStats.level < 5 && (
            <p>レベル5で進化するよ！ 🐱</p>
          )}
          {userStats.level >= 5 && userStats.level < 10 && (
            <p>レベル10で進化するよ！ 🐺</p>
          )}
          {userStats.level >= 10 && userStats.level < 15 && (
            <p>レベル15で進化するよ！ 🦄</p>
          )}
          {userStats.level >= 15 && userStats.level < 20 && (
            <p>レベル20で最終進化！ 🐉</p>
          )}
          {userStats.level >= 20 && (
            <p>最強の学習パートナーだね！ ✨</p>
          )}
        </div>

        {/* ペットケア */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-600 mb-2">ペットのお世話</p>
          <div className="flex justify-center space-x-2">
            <button 
              onClick={() => {
                setPetMessage('ありがとう！元気になったよ！😊');
                setShowMessage(true);
                setTimeout(() => setShowMessage(false), 2000);
              }}
              className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs hover:bg-pink-200 transition-colors"
            >
              🍎 おやつ
            </button>
            <button 
              onClick={() => {
                setPetMessage('気持ちいいな〜！😌');
                setShowMessage(true);
                setTimeout(() => setShowMessage(false), 2000);
              }}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs hover:bg-blue-200 transition-colors"
            >
              🧸 遊ぶ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPet;
