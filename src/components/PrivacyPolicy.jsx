import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">プライバシーポリシー</h1>
        
        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">1. 個人情報の収集について</h2>
            <p>
              Studymoでは、サービスの提供・改善のために必要最小限の個人情報を収集いたします。
              収集する情報には、学習進捗、利用状況、デバイス情報などが含まれます。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">2. 個人情報の利用目的</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>学習コンテンツの提供・カスタマイズ</li>
              <li>学習進捗の記録・分析</li>
              <li>サービスの改善・新機能の開発</li>
              <li>カスタマーサポートの提供</li>
              <li>利用規約違反の防止</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">3. 個人情報の第三者提供</h2>
            <p>
              法令に基づく場合を除き、ユーザーの同意なく個人情報を第三者に提供することはありません。
              ただし、サービス提供に必要な範囲で、信頼できるパートナー企業と情報を共有する場合があります。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Cookieの使用</h2>
            <p>
              より良いユーザー体験を提供するため、Cookieを使用しています。
              ブラウザの設定でCookieを無効にすることも可能ですが、一部機能が制限される場合があります。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">5. データの保護</h2>
            <p>
              個人情報の安全性を確保するため、適切な技術的・組織的措置を講じています。
              データは暗号化され、アクセス制限を設けて管理しています。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">6. お問い合わせ</h2>
            <p>
              プライバシーポリシーに関するご質問は、お問い合わせページからご連絡ください。
            </p>
          </section>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            最終更新日: 2024年1月1日
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
