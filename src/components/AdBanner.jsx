import React, { useEffect, useRef } from 'react';
import { useAds } from '../contexts/AdContext';
import { useSubscription } from '../contexts/SubscriptionContext';

const AdBanner = ({ 
  type = 'banner', 
  className = '',
  style = {},
  showFallback = true 
}) => {
  const { adState, displayAd } = useAds();
  const { subscriptionData } = useSubscription();
  const adRef = useRef(null);

  // プレミアムユーザーには広告を表示しない
  if (subscriptionData.isPremium) {
    return null;
  }

  useEffect(() => {
    if (adState.isLoaded && adRef.current) {
      const success = displayAd(type, adRef.current.id);
      if (!success && showFallback) {
        // 広告の読み込みに失敗した場合のフォールバック
        console.log(`Fallback for ${type} ad`);
      }
    }
  }, [adState.isLoaded, type, displayAd, showFallback]);

  const getAdDimensions = () => {
    switch (type) {
      case 'banner':
        return { width: '728px', height: '90px', minHeight: '90px' };
      case 'sidebar':
        return { width: '300px', height: '250px', minHeight: '250px' };
      case 'rectangle':
        return { width: '300px', height: '250px', minHeight: '250px' };
      case 'mobile-banner':
        return { width: '320px', height: '50px', minHeight: '50px' };
      default:
        return { width: '100%', height: 'auto', minHeight: '90px' };
    }
  };

  const dimensions = getAdDimensions();
  const adSlotId = adState.isLoaded ? 
    (type === 'banner' ? process.env.VITE_ADSENSE_BANNER_SLOT :
     type === 'sidebar' ? process.env.VITE_ADSENSE_SIDEBAR_SLOT :
     type === 'rectangle' ? process.env.VITE_ADSENSE_RECTANGLE_SLOT :
     'default-slot') : 'loading';

  return (
    <div 
      className={`ad-${type} ${className}`}
      style={{ ...dimensions, ...style }}
    >
      {adState.isLoaded && adSlotId !== 'loading' ? (
        <ins
          ref={adRef}
          id={`ad-${type}-${Date.now()}`}
          className="adsbygoogle"
          style={{
            display: 'block',
            width: dimensions.width,
            height: dimensions.height,
          }}
          data-ad-client={process.env.VITE_ADSENSE_PUBLISHER_ID}
          data-ad-slot={adSlotId}
          data-ad-format={type === 'banner' ? 'horizontal' : 'rectangle'}
          data-full-width-responsive={type === 'banner' ? 'true' : 'false'}
        />
      ) : (
        <div 
          className="flex items-center justify-center bg-gray-100 border border-gray-200 rounded text-gray-500 text-sm"
          style={dimensions}
        >
          {showFallback ? (
            <div className="text-center">
              <div className="animate-pulse">
                📢 広告を読み込み中...
              </div>
              <div className="text-xs mt-1 text-gray-400">
                AdSense審査完了後に表示されます
              </div>
            </div>
          ) : (
            <div className="animate-pulse bg-gray-200 w-full h-full rounded" />
          )}
        </div>
      )}
    </div>
  );
};

export default AdBanner;
