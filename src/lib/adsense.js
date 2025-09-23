// Google AdSense統合ライブラリ

class AdSenseManager {
  constructor() {
    this.isLoaded = false;
    this.publisherId = import.meta.env.VITE_ADSENSE_PUBLISHER_ID;
    this.adSlots = {
      banner: import.meta.env.VITE_ADSENSE_BANNER_SLOT,
      sidebar: import.meta.env.VITE_ADSENSE_SIDEBAR_SLOT,
      rectangle: import.meta.env.VITE_ADSENSE_RECTANGLE_SLOT,
      interstitial: import.meta.env.VITE_ADSENSE_INTERSTITIAL_SLOT,
    };
  }

  // AdSenseスクリプトを読み込む
  async loadAdSense() {
    if (this.isLoaded || !this.publisherId) {
      return;
    }

    try {
      // AdSenseスクリプトを動的に読み込み
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${this.publisherId}`;
      script.crossOrigin = 'anonymous';
      
      document.head.appendChild(script);
      
      // adsbygoogleの初期化
      window.adsbygoogle = window.adsbygoogle || [];
      
      this.isLoaded = true;
      console.log('AdSense loaded successfully');
    } catch (error) {
      console.error('AdSense loading failed:', error);
    }
  }

  // 広告を表示する
  displayAd(adUnitId, format = 'auto', responsive = true) {
    if (!this.isLoaded || !this.publisherId) {
      console.warn('AdSense not loaded or publisher ID missing');
      return;
    }

    try {
      const adElement = document.querySelector(`[data-ad-slot="${adUnitId}"]`);
      if (adElement && window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (error) {
      console.error('Ad display failed:', error);
    }
  }

  // 広告の統計情報を取得（模擬データ）
  getAdStats() {
    return {
      impressions: Math.floor(Math.random() * 10000) + 1000,
      clicks: Math.floor(Math.random() * 100) + 10,
      revenue: (Math.random() * 50 + 5).toFixed(2),
      ctr: ((Math.random() * 2 + 0.5).toFixed(2)) + '%',
      cpm: (Math.random() * 3 + 1).toFixed(2),
    };
  }

  // 広告設定の検証
  validateConfig() {
    const issues = [];
    
    if (!this.publisherId) {
      issues.push('Publisher ID not configured');
    }
    
    Object.entries(this.adSlots).forEach(([key, value]) => {
      if (!value) {
        issues.push(`${key} ad slot not configured`);
      }
    });
    
    return {
      isValid: issues.length === 0,
      issues,
    };
  }
}

export const adSenseManager = new AdSenseManager();
export default AdSenseManager;
