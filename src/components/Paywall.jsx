import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { X, Check, Star, Zap, Shield, BarChart3 } from 'lucide-react'
import { useSubscription } from '../contexts/SubscriptionContext.jsx'

export const Paywall = () => {
  const { showPaywall, hidePaywall, upgradeToPremium, plans } = useSubscription()
  const [selectedPlan, setSelectedPlan] = useState('monthly')
  const [isProcessing, setIsProcessing] = useState(false)

  if (!showPaywall) return null

  const handleUpgrade = async () => {
    setIsProcessing(true)
    try {
      await upgradeToPremium(selectedPlan)
      // Show success message
      alert('プレミアムプランにアップグレードしました！')
    } catch (error) {
      alert('アップグレードに失敗しました。もう一度お試しください。')
    } finally {
      setIsProcessing(false)
    }
  }

  const monthlyPrice = plans.premium.price
  const yearlyPrice = plans.premium.priceYearly
  const monthlyYearlyPrice = Math.round(yearlyPrice / 12)
  const savings = Math.round(((monthlyPrice * 12 - yearlyPrice) / (monthlyPrice * 12)) * 100)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-4 top-4"
            onClick={hidePaywall}
          >
            <X className="w-4 h-4" />
          </Button>
          <div className="text-center">
            <CardTitle className="text-3xl font-bold mb-2">
              <Star className="inline-block w-8 h-8 text-yellow-500 mr-2" />
              プレミアムで学習を加速
            </CardTitle>
            <CardDescription className="text-lg">
              無制限学習で目標達成を確実に
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          {/* Plan Selection */}
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              <div className="bg-gray-100 p-1 rounded-lg flex">
                <Button
                  variant={selectedPlan === 'monthly' ? 'default' : 'ghost'}
                  onClick={() => setSelectedPlan('monthly')}
                  className="px-6"
                >
                  月額プラン
                </Button>
                <Button
                  variant={selectedPlan === 'yearly' ? 'default' : 'ghost'}
                  onClick={() => setSelectedPlan('yearly')}
                  className="px-6 relative"
                >
                  年額プラン
                  <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs">
                    {savings}%お得
                  </Badge>
                </Button>
              </div>
            </div>

            {/* Pricing Display */}
            <div className="text-center mb-8">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                ¥{selectedPlan === 'yearly' ? monthlyYearlyPrice : monthlyPrice}
                <span className="text-lg text-gray-600">/月</span>
              </div>
              {selectedPlan === 'yearly' && (
                <p className="text-sm text-gray-600">
                  年額 ¥{yearlyPrice} (月額換算 ¥{monthlyYearlyPrice})
                </p>
              )}
            </div>
          </div>

          {/* Feature Comparison */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Free Plan */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-center">無料プラン</CardTitle>
                <CardDescription className="text-center">現在のプラン</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plans.free.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="border-2 border-blue-500 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-500 text-white px-4 py-1">
                  おすすめ
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-center text-blue-600">プレミアムプラン</CardTitle>
                <CardDescription className="text-center">すべての機能が利用可能</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plans.premium.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Premium Benefits Highlight */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-bold text-center mb-4">プレミアムで得られるメリット</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <h4 className="font-semibold mb-1">学習効率3倍アップ</h4>
                <p className="text-sm text-gray-600">無制限セッションで集中学習</p>
              </div>
              <div className="text-center">
                <BarChart3 className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <h4 className="font-semibold mb-1">詳細な成長分析</h4>
                <p className="text-sm text-gray-600">AI分析で弱点を特定</p>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <h4 className="font-semibold mb-1">広告なしの集中環境</h4>
                <p className="text-sm text-gray-600">中断されない学習体験</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleUpgrade}
              disabled={isProcessing}
              size="lg"
              className="px-8 py-3 text-lg"
            >
              {isProcessing ? '処理中...' : `プレミアムを始める (¥${selectedPlan === 'yearly' ? yearlyPrice : monthlyPrice})`}
            </Button>
            <Button
              variant="outline"
              onClick={hidePaywall}
              size="lg"
              className="px-8 py-3"
            >
              無料プランを続ける
            </Button>
          </div>

          {/* Terms */}
          <div className="text-center mt-6">
            <p className="text-xs text-gray-500">
              ※ これはデモ版です。実際の決済は行われません。<br />
              実際のアプリでは、いつでもキャンセル可能です。
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
