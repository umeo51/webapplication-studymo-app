import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { X, ExternalLink } from 'lucide-react'
import { useSubscription } from '../contexts/SubscriptionContext.jsx'

// Demo ads data
const demoAds = [
  {
    id: 1,
    title: 'プログラミング学習なら Progate',
    description: '初心者から上級者まで、実践的なスキルが身につく',
    image: '💻',
    cta: '無料で始める',
    url: 'https://prog-8.com',
    category: 'programming'
  },
  {
    id: 2,
    title: 'TOEIC対策アプリ スタディサプリ',
    description: '最短2分から！スキマ時間で英語力アップ',
    image: '📚',
    cta: '7日間無料',
    url: 'https://eigosapuri.jp',
    category: 'english'
  },
  {
    id: 3,
    title: 'ビジネススキル向上 グロービス学び放題',
    description: '2,700本以上の動画で実践的なビジネススキルを習得',
    image: '📊',
    cta: '詳細を見る',
    url: 'https://hodai.globis.co.jp',
    category: 'business'
  },
  {
    id: 4,
    title: 'デザイン学習 Figma',
    description: 'プロも使うデザインツールで実践的なスキルを身につけよう',
    image: '🎨',
    cta: '無料で使う',
    url: 'https://figma.com',
    category: 'design'
  }
]

export const AdBanner = ({ position = 'banner', category = null }) => {
  const { hasFeatureAccess } = useSubscription()
  const [currentAd, setCurrentAd] = useState(null)
  const [isVisible, setIsVisible] = useState(true)

  // Don't show ads for premium users
  if (hasFeatureAccess('no_ads')) {
    return null
  }

  // Don't show if user dismissed
  if (!isVisible) {
    return null
  }

  // Select appropriate ad
  useEffect(() => {
    let availableAds = demoAds
    
    // Filter by category if specified
    if (category) {
      availableAds = demoAds.filter(ad => ad.category === category)
    }
    
    // Select random ad
    if (availableAds.length > 0) {
      const randomAd = availableAds[Math.floor(Math.random() * availableAds.length)]
      setCurrentAd(randomAd)
    }
  }, [category])

  const handleAdClick = () => {
    if (currentAd) {
      // In a real app, this would track the click and open the URL
      console.log('Ad clicked:', currentAd.title)
      // window.open(currentAd.url, '_blank')
    }
  }

  const handleDismiss = () => {
    setIsVisible(false)
  }

  if (!currentAd) {
    return null
  }

  // Banner style ad
  if (position === 'banner') {
    return (
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-dashed border-2 border-gray-300 mb-4">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center flex-1">
            <div className="text-3xl mr-4">{currentAd.image}</div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 mb-1">{currentAd.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{currentAd.description}</p>
              <Button
                size="sm"
                variant="outline"
                onClick={handleAdClick}
                className="text-xs"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                {currentAd.cta}
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="mb-2"
            >
              <X className="w-4 h-4" />
            </Button>
            <span className="text-xs text-gray-400">広告</span>
          </div>
        </div>
      </Card>
    )
  }

  // Interstitial style ad
  if (position === 'interstitial') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
        <Card className="w-full max-w-md">
          <div className="p-6 text-center">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">広告</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDismiss}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="text-6xl mb-4">{currentAd.image}</div>
            <h3 className="text-xl font-bold mb-2">{currentAd.title}</h3>
            <p className="text-gray-600 mb-6">{currentAd.description}</p>
            
            <div className="flex flex-col gap-3">
              <Button onClick={handleAdClick} className="w-full">
                <ExternalLink className="w-4 h-4 mr-2" />
                {currentAd.cta}
              </Button>
              <Button variant="outline" onClick={handleDismiss} className="w-full">
                スキップ
              </Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  // Sidebar style ad
  return (
    <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-dashed border-2 border-yellow-300">
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs text-gray-400 bg-white px-2 py-1 rounded">広告</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
        
        <div className="text-center">
          <div className="text-4xl mb-3">{currentAd.image}</div>
          <h4 className="font-semibold text-sm mb-2">{currentAd.title}</h4>
          <p className="text-xs text-gray-600 mb-3">{currentAd.description}</p>
          <Button
            size="sm"
            onClick={handleAdClick}
            className="w-full text-xs"
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            {currentAd.cta}
          </Button>
        </div>
      </div>
    </Card>
  )
}
