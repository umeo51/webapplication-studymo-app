import React, { createContext, useContext, useState, useEffect } from 'react';

const SubscriptionContext = createContext({});

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};

export const SubscriptionProvider = ({ children }) => {
  const [subscriptionData, setSubscriptionData] = useState({
    isPremium: false,
    plan: 'free', // 'free', 'monthly', 'yearly'
    subscriptionDate: null,
    expiryDate: null,
    dailySessionsUsed: 0,
    maxDailySessions: 1, // 無料プランは1日1セッション
  });

  // ローカルストレージからデータを読み込み
  useEffect(() => {
    const savedData = localStorage.getItem('studymo-subscription-data');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setSubscriptionData(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Failed to parse subscription data:', error);
      }
    }
  }, []);

  // データが変更されたらローカルストレージに保存
  useEffect(() => {
    localStorage.setItem('studymo-subscription-data', JSON.stringify(subscriptionData));
  }, [subscriptionData]);

  // 日付が変わったら使用回数をリセット
  useEffect(() => {
    const today = new Date().toDateString();
    const lastResetDate = localStorage.getItem('studymo-last-reset-date');
    
    if (lastResetDate !== today) {
      setSubscriptionData(prev => ({
        ...prev,
        dailySessionsUsed: 0,
      }));
      localStorage.setItem('studymo-last-reset-date', today);
    }
  }, []);

  const upgradeToPremium = (plan = 'monthly') => {
    const now = new Date();
    const expiryDate = new Date(now);
    
    if (plan === 'monthly') {
      expiryDate.setMonth(expiryDate.getMonth() + 1);
    } else if (plan === 'yearly') {
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    }

    setSubscriptionData(prev => ({
      ...prev,
      isPremium: true,
      plan,
      subscriptionDate: now.toISOString(),
      expiryDate: expiryDate.toISOString(),
      maxDailySessions: Infinity, // プレミアムは無制限
    }));
  };

  const cancelSubscription = () => {
    setSubscriptionData(prev => ({
      ...prev,
      isPremium: false,
      plan: 'free',
      subscriptionDate: null,
      expiryDate: null,
      maxDailySessions: 1,
    }));
  };

  const useSession = () => {
    if (subscriptionData.isPremium) {
      return true; // プレミアムは無制限
    }

    if (subscriptionData.dailySessionsUsed >= subscriptionData.maxDailySessions) {
      return false; // 制限に達している
    }

    setSubscriptionData(prev => ({
      ...prev,
      dailySessionsUsed: prev.dailySessionsUsed + 1,
    }));

    return true;
  };

  const canStartSession = () => {
    if (subscriptionData.isPremium) {
      return true;
    }
    return subscriptionData.dailySessionsUsed < subscriptionData.maxDailySessions;
  };

  const getRemainingSessions = () => {
    if (subscriptionData.isPremium) {
      return Infinity;
    }
    return Math.max(0, subscriptionData.maxDailySessions - subscriptionData.dailySessionsUsed);
  };

  const getPlanDetails = () => {
    const plans = {
      free: {
        name: '無料プラン',
        price: '¥0',
        features: [
          '1日1セッション',
          '基本的な学習カテゴリー',
          '基本統計',
          '広告表示あり'
        ],
        limitations: [
          '1日1セッション制限',
          '限定的な学習カテゴリー',
          '広告表示'
        ]
      },
      monthly: {
        name: 'プレミアム（月額）',
        price: '¥680',
        features: [
          '無制限セッション',
          'すべての学習カテゴリー',
          '詳細分析レポート',
          'AI学習アドバイザー',
          '広告非表示'
        ],
        limitations: []
      },
      yearly: {
        name: 'プレミアム（年額）',
        price: '¥6,800',
        originalPrice: '¥8,160',
        discount: '17%オフ',
        features: [
          '無制限セッション',
          'すべての学習カテゴリー',
          '詳細分析レポート',
          'AI学習アドバイザー',
          '広告非表示',
          '優先サポート'
        ],
        limitations: []
      }
    };

    return plans[subscriptionData.plan] || plans.free;
  };

  const value = {
    subscriptionData,
    upgradeToPremium,
    cancelSubscription,
    useSession,
    canStartSession,
    getRemainingSessions,
    getPlanDetails,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};
