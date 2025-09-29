import React, { useEffect } from 'react';

const AdBanner = ({ type = 'banner', className = '' }) => {
  useEffect(() => {
    // AdSenseの初期化を安全に行う
    try {
      const publisherId = import.meta.env.VITE_ADSENSE_PUBLISHER_ID;
      
      if (!publisherId) {
        console.log('AdSense Publisher ID not configured');
        return;
      }

      // AdSenseスクリプトが読み込まれているかチェック
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        // 既に広告が配置されている要素をチェック
        const adElements = document.querySelectorAll('.adsbygoogle');
        let hasUnprocessedAds = false;
        
        adElements.forEach(element => {
          if (!element.getAttribute('data-adsbygoogle-status')) {
            hasUnprocessedAds = true;
          }
        });

        if (hasUnprocessedAds) {
          try {
            window.adsbygoogle.push({});
          } catch (error) {
            console.log('AdSense push error (non-critical):', error.message);
          }
        }
      }
    } catch (error) {
      console.log('AdSense initialization error (non-critical):', error.message);
    }
  }, []);

  const getAdSize = () => {
    switch (type) {
      case 'banner':
        return { width: '728px', height: '90px' };
      case 'sidebar':
        return { width: '300px', height: '250px' };
      case 'rectangle':
        return { width: '336px', height: '280px' };
      default:
        return { width: '728px', height: '90px' };
    }
  };

  const adSize = getAdSize();

  return (
    <div className={`ad-${type} ${className}`}>
      <div 
        className="flex items-center justify-center text-gray-500 text-sm"
        style={{ 
          minWidth: adSize.width, 
          minHeight: adSize.height,
          border: '1px dashed #d1d5db',
          borderRadius: '8px'
        }}
      >
        広告エリア ({type})
      </div>
    </div>
  );
};

export default AdBanner;
