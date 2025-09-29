import React from 'react';

const LearningGuide = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">学習ガイド</h1>
        
        <div className="space-y-8">
          {/* Studymoの使い方 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">🚀 Studymoの使い方</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="text-3xl mb-3">1️⃣</div>
                <h3 className="font-semibold text-blue-800 mb-2">カテゴリを選択</h3>
                <p className="text-blue-700 text-sm">
                  プログラミング、英語、ビジネスから学習したい分野を選びましょう。
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-6">
                <div className="text-3xl mb-3">2️⃣</div>
                <h3 className="font-semibold text-green-800 mb-2">15分間集中学習</h3>
                <p className="text-green-700 text-sm">
                  フラッシュカードとクイズで効率的に学習を進めます。
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-6">
                <div className="text-3xl mb-3">3️⃣</div>
                <h3 className="font-semibold text-purple-800 mb-2">進捗を確認</h3>
                <p className="text-purple-700 text-sm">
                  学習分析で自分の成長を可視化し、弱点を克服しましょう。
                </p>
              </div>
            </div>
          </section>

          {/* 効果的な学習方法 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">📚 効果的な学習方法</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="font-semibold text-gray-800 mb-2">🎯 短時間集中学習</h3>
                <p className="text-gray-700">
                  15分という短時間に集中することで、記憶の定着率が向上します。
                  ポモドーロ・テクニックの原理を活用した効果的な学習法です。
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="font-semibold text-gray-800 mb-2">🔄 反復学習</h3>
                <p className="text-gray-700">
                  同じ内容を繰り返し学習することで、長期記憶に定着させます。
                  間隔反復学習法により、忘却曲線に対抗します。
                </p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="font-semibold text-gray-800 mb-2">📊 進捗の可視化</h3>
                <p className="text-gray-700">
                  学習の進捗を数値やグラフで確認することで、モチベーションを維持し、
                  継続的な学習習慣を身につけることができます。
                </p>
              </div>
            </div>
          </section>

          {/* カテゴリ別学習のコツ */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">💡 カテゴリ別学習のコツ</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="text-4xl mb-3">💻</div>
                <h3 className="font-semibold text-gray-800 mb-3">プログラミング</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• 基本構文を確実に覚える</li>
                  <li>• 実際にコードを書いて練習</li>
                  <li>• エラーメッセージを理解する</li>
                  <li>• 小さなプロジェクトから始める</li>
                </ul>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="text-4xl mb-3">🇺🇸</div>
                <h3 className="font-semibold text-gray-800 mb-3">英語</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• 単語は文脈で覚える</li>
                  <li>• 音読で発音も練習</li>
                  <li>• 文法は例文で理解</li>
                  <li>• 毎日少しずつ継続</li>
                </ul>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="text-4xl mb-3">💼</div>
                <h3 className="font-semibold text-gray-800 mb-3">ビジネス</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• 実例と合わせて学習</li>
                  <li>• フレームワークを活用</li>
                  <li>• 業界トレンドを把握</li>
                  <li>• 実践で応用する</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 学習継続のコツ */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">🔥 学習継続のコツ</h2>
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-orange-800 mb-3">習慣化のポイント</h3>
                  <ul className="text-orange-700 space-y-2">
                    <li>✅ 毎日同じ時間に学習</li>
                    <li>✅ 小さな目標から始める</li>
                    <li>✅ 学習環境を整える</li>
                    <li>✅ 進捗を記録する</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-red-800 mb-3">モチベーション維持</h3>
                  <ul className="text-red-700 space-y-2">
                    <li>🎯 明確な目標設定</li>
                    <li>🏆 達成感を味わう</li>
                    <li>📈 成長を実感する</li>
                    <li>👥 仲間と共に学ぶ</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* よくある質問 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">❓ よくある質問</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Q: 1日どのくらい学習すればよいですか？</h3>
                <p className="text-gray-700">
                  A: 最低15分から始めて、慣れてきたら30分〜1時間程度が理想的です。
                  継続することが最も重要です。
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Q: 学習効果を高めるにはどうすればよいですか？</h3>
                <p className="text-gray-700">
                  A: 集中できる環境で学習し、学んだ内容を実際に使ってみることが大切です。
                  また、定期的に復習することで記憶の定着を図りましょう。
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Q: 学習が続かない場合はどうすればよいですか？</h3>
                <p className="text-gray-700">
                  A: 目標を小さく設定し直し、学習時間を短くしてみてください。
                  また、学習分析機能で自分の進歩を確認することでモチベーションを維持できます。
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LearningGuide;
