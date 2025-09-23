import React, { createContext, useContext, useState, useEffect } from 'react';
import { adSenseManager } from '../lib/adsense';

const AdContext = createContext({});

export const useAds = () => {
  const context = useContext(AdContext);
  if (!context) {
    throw new Error('useAds must be used within an AdProvider');
  }
  return context;
};

export const AdProvider = ({ children }) => {
  const [adState, setAdState] = useState({
    isLoaded: false,
    isEnabled: true,
    showInterstitial: false,
    adStats: {
      impressions: 0,
      clicks: 0,
      revenue: 0,
      ctr: '0%',
      cpm: '0',
    },
    adConfig: {
      bannerEnabled: true,
      sidebarEnabled: true,
      rectangleEnabled: true,
      interstitialEnabled: true,
      frequency: {
        interstitial: 3, // 3セッションごとに表示
      },
    },
  });

  const [sessionCount, setSessionCount] = useState(0);

  // AdSenseの初期化
  useEffect(() => {
    const initializeAds = async () => {
      try {
        await adSenseManager.loadAdSense();
        setAdState(prev => ({
          ...prev,
          isLoaded: true,
          adStats: adSenseManager.getAdStats(),
        }));
      } catch (error) {
        console.error('Failed to initialize ads:', error);
      }
    };

    initializeAds();
  }, []);

  // 統計情報を定期的に更新
  useEffect(() => {
    const interval = setInterval(() => {
      if (adState.isLoaded) {
        setAdState(prev => ({
          ...prev,
          adStats: adSenseManager.getAdStats(),
        }));
      }
    }, 30000); // 30秒ごと

    return () => clearInterval(interval);
  }, [adState.isLoaded]);

  const displayAd = (adType, elementId) => {
    if (!adState.isLoaded || !adState.isEnabled) {
      return false;
    }

    try {
      const adSlots = {
        banner: adSenseManager.adSlots.banner,
        sidebar: adSenseManager.adSlots.sidebar,
        rectangle: adSenseManager.adSlots.rectangle,
        interstitial: adSenseManager.adSlots.interstitial,
      };

      const slotId = adSlots[adType];
      if (slotId) {
        adSenseManager.displayAd(slotId);
        return true;
      }
    } catch (error) {
      console.error('Failed to display ad:', error);
    }

    return false;
  };

  const showInterstitialAd = () => {
    if (!adState.isLoaded || !adState.adConfig.interstitialEnabled) {
      return false;
    }

    const newSessionCount = sessionCount + 1;
    setSessionCount(newSessionCount);

    // 設定された頻度でインタースティシャル広告を表示
    if (newSessionCount % adState.adConfig.frequency.interstitial === 0) {
      setAdState(prev => ({
        ...prev,
        showInterstitial: true,
      }));
      return true;
    }

    return false;
  };

  const hideInterstitialAd = () => {
    setAdState(prev => ({
      ...prev,
      showInterstitial: false,
    }));
  };

  const toggleAdType = (adType, enabled) => {
    setAdState(prev => ({
      ...prev,
      adConfig: {
        ...prev.adConfig,
        [`${adType}Enabled`]: enabled,
      },
    }));
  };

  const updateAdFrequency = (adType, frequency) => {
    setAdState(prev => ({
      ...prev,
      adConfig: {
        ...prev.adConfig,
        frequency: {
          ...prev.adConfig.frequency,
          [adType]: frequency,
        },
      },
    }));
  };

  const getAdPerformance = () => {
    return {
      ...adState.adStats,
      totalRevenue: parseFloat(adState.adStats.revenue),
      averageCTR: adState.adStats.ctr,
      averageCPM: `$${adState.adStats.cpm}`,
      impressionsToday: Math.floor(adState.adStats.impressions * 0.1),
      clicksToday: Math.floor(adState.adStats.clicks * 0.1),
    };
  };

  const validateAdSetup = () => {
    return adSenseManager.validateConfig();
  };

  const value = {
    adState,
    displayAd,
    showInterstitialAd,
    hideInterstitialAd,
    toggleAdType,
    updateAdFrequency,
    getAdPerformance,
    validateAdSetup,
  };

  return (
    <AdContext.Provider value={value}>
      {children}
    </AdContext.Provider>
  );
};
