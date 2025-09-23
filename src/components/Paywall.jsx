import React from 'react';
import { motion } from 'framer-motion';
import { useSubscription } from '../contexts/SubscriptionContext';
import { Crown, Check, X, Zap } from 'lucide-react';

const Paywall = ({ 
  isOpen, 
  onClose, 
  title = "プレミアム機能をアンロック",
  description = "すべての機能を利用して、学習効果を最大化しましょう。"
}) => {
  const { upgradeToPremium, getPlanDetails } = useSubscription();

  if (!isOpen) return null;

  const freePlan = getPlanDetails();
  const monthlyPlan = { ...getPlanDetails(), plan: 'monthly' };
  const yearlyPlan = { ...getPlanDetails(), plan: 'yearly' };

  const handleUpgrade = (plan) => {
    upgradeToPremium(plan);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ヘッダー */}
        <div className="relative p-6 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            <X size={24} />
          </button>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
              <Crown size={32} />
            </div>
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-primary-100">{description}</p>
          </div>
        </div>

        {/* プラン比較 */}
        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* 無料プラン */}
            <div className="border border-gray-200 rounded-xl p-6">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">無料プラン</h3>
                <div className="text-3xl font-bold text-gray-900 mt-2">¥0</div>
                <div className="text-gray-500">永続無料</div>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <Check size={16} className="text-green-500 mr-2" />
                  <span className="text-sm">1日1セッション</span>
                </li>
                <li className="flex items-center">
                  <Check size={16} className="text-green-500 mr-2" />
                  <span className="text-sm">基本的な学習カテゴリー</span>
                </li>
                <li className="flex items-center">
                  <X size={16} className="text-red-500 mr-2" />
                  <span className="text-sm text-gray-500">詳細分析</span>
                </li>
                <li className="flex items-center">
                  <X size={16} className="text-red-500 mr-2" />
                  <span className="text-sm text-gray-500">AI学習アドバイザー</span>
                </li>
              </ul>
              
              <button 
                className="w-full btn btn-secondary"
                onClick={onClose}
              >
                現在のプラン
              </button>
            </div>

            {/* 月額プラン */}
            <div className="border-2 border-primary-500 rounded-xl p-6 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  人気
                </span>
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">プレミアム月額</h3>
                <div className="text-3xl font-bold text-primary-600 mt-2">¥680</div>
                <div className="text-gray-500">月額</div>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <Check size={16} className="text-green-500 mr-2" />
                  <span className="text-sm">無制限セッション</span>
                </li>
                <li className="flex items-center">
                  <Check size={16} className="text-green-500 mr-2" />
                  <span className="text-sm">すべての学習カテゴリー</span>
                </li>
                <li className="flex items-center">
                  <Check size={16} className="text-green-500 mr-2" />
                  <span className="text-sm">詳細分析レポート</span>
                </li>
                <li className="flex items-center">
                  <Check size={16} className="text-green-500 mr-2" />
                  <span className="text-sm">AI学習アドバイザー</span>
                </li>
                <li className="flex items-center">
                  <Check size={16} className="text-green-500 mr-2" />
                  <span className="text-sm">広告非表示</span>
                </li>
              </ul>
              
              <button 
                className="w-full btn btn-primary"
                onClick={() => handleUpgrade('monthly')}
              >
                月額プランを始める
              </button>
            </div>

            {/* 年額プラン */}
            <div className="border border-gray-200 rounded-xl p-6 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  17%オフ
                </span>
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">プレミアム年額</h3>
                <div className="text-3xl font-bold text-green-600 mt-2">¥6,800</div>
                <div className="text-gray-500">
                  年額 <span className="line-through text-red-500">¥8,160</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <Check size={16} className="text-green-500 mr-2" />
                  <span className="text-sm">無制限セッション</span>
                </li>
                <li className="flex items-center">
                  <Check size={16} className="text-green-500 mr-2" />
                  <span className="text-sm">すべての学習カテゴリー</span>
                </li>
                <li className="flex items-center">
                  <Check size={16} className="text-green-500 mr-2" />
                  <span className="text-sm">詳細分析レポート</span>
                </li>
                <li className="flex items-center">
                  <Check size={16} className="text-green-500 mr-2" />
                  <span className="text-sm">AI学習アドバイザー</span>
                </li>
                <li className="flex items-center">
                  <Check size={16} className="text-green-500 mr-2" />
                  <span className="text-sm">広告非表示</span>
                </li>
                <li className="flex items-center">
                  <Zap size={16} className="text-yellow-500 mr-2" />
                  <span className="text-sm font-medium">優先サポート</span>
                </li>
              </ul>
              
              <button 
                className="w-full btn bg-green-600 text-white hover:bg-green-700"
                onClick={() => handleUpgrade('yearly')}
              >
                年額プランを始める
              </button>
            </div>
          </div>

          {/* 特典説明 */}
          <div className="mt-8 p-6 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-900 mb-4">プレミアム特典の詳細</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <strong>無制限セッション:</strong> 1日何回でも学習セッションを開始できます
              </div>
              <div>
                <strong>すべてのカテゴリー:</strong> プログラミング、英語、ビジネス、デザイン、マーケティング、ファイナンス
              </div>
              <div>
                <strong>詳細分析:</strong> 学習パターン、効果的な時間帯、弱点分析など
              </div>
              <div>
                <strong>AI学習アドバイザー:</strong> パーソナライズされた学習提案とフィードバック
              </div>
            </div>
          </div>

          {/* 注意事項 */}
          <div className="mt-6 text-xs text-gray-500 text-center">
            <p>※ これはデモ版です。実際の決済は行われません。</p>
            <p>本番環境では Stripe などの決済システムと連携します。</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Paywall;
