import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ここで実際の送信処理を行う
    console.log('お問い合わせ内容:', formData);
    setIsSubmitted(true);
    
    // フォームをリセット
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">お問い合わせ</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* お問い合わせフォーム */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">メッセージを送信</h2>
            
            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <div className="text-4xl mb-3">✅</div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">送信完了</h3>
                <p className="text-green-700">
                  お問い合わせありがとうございます。  

                  2営業日以内にご返信いたします。
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    お名前 *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input w-full"
                    placeholder="山田太郎"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    メールアドレス *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input w-full"
                    placeholder="example@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    件名 *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="input w-full"
                  >
                    <option value="">選択してください</option>
                    <option value="general">一般的なお問い合わせ</option>
                    <option value="technical">技術的な問題</option>
                    <option value="feature">機能に関する要望</option>
                    <option value="billing">料金・課金について</option>
                    <option value="bug">バグ報告</option>
                    <option value="other">その他</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    メッセージ *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="input w-full resize-none"
                    placeholder="お問い合わせ内容をご記入ください..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-full"
                >
                  送信する
                </button>
              </form>
            )}
          </div>
          
          {/* お問い合わせ情報 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">お問い合わせ情報</h2>
            
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="font-semibold text-blue-800 mb-3">📧 メールサポート</h3>
                <p className="text-blue-700 mb-2">
                  support@studymo.com
                </p>
                <p className="text-blue-600 text-sm">
                  平日 9:00-18:00（土日祝日除く）  

                  2営業日以内にご返信いたします
                </p>
              </div>
              
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="font-semibold text-green-800 mb-3">💬 よくある質問</h3>
                <p className="text-green-700 mb-2">
                  お問い合わせの前に、よくある質問をご確認ください。
                </p>
                <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                  FAQを見る →
                </button>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="font-semibold text-purple-800 mb-3">🚀 機能リクエスト</h3>
                <p className="text-purple-700 mb-2">
                  新機能のご要望やアイデアをお聞かせください。
                </p>
                <p className="text-purple-600 text-sm">
                  ユーザーの皆様のフィードバックを大切にしています
                </p>
              </div>
              
              <div className="bg-orange-50 rounded-lg p-6">
                <h3 className="font-semibold text-orange-800 mb-3">🐛 バグ報告</h3>
                <p className="text-orange-700 mb-2">
                  問題を発見された場合は、詳細をお教えください。
                </p>
                <ul className="text-orange-600 text-sm space-y-1">
                  <li>• 発生した状況</li>
                  <li>• 使用ブラウザ・デバイス</li>
                  <li>• エラーメッセージ（あれば）</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
