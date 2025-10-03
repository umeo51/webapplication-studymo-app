export const learningContent = {
  programming: {
    name: 'プログラミング',
    icon: '💻',
    quizzes: [
      {
        id: 'prog_1',
        type: 'quiz',
        question: 'CSSでフォントサイズを指定するプロパティを答えてください。',
        options: ['font-size', 'text-size', 'size', 'font-weight'],
        correctAnswer: 'font-size',
        difficulty: '初級',
        tags: ['CSS', 'フォント']
      },
      {
        id: 'prog_2',
        type: 'quiz',
        question: 'CSSでボックスモデルに含まれないものはどれですか？',
        options: ['margin', 'padding', 'border', 'font-family'],
        correctAnswer: 'font-family',
        difficulty: '中級',
        tags: ['CSS', 'ボックスモデル']
      },
      {
        id: 'prog_3',
        type: 'quiz',
        question: 'HTMLで段落を表すタグはどれですか？',
        options: ['<div>', '<p>', '<span>', '<section>'],
        correctAnswer: '<p>',
        difficulty: '初級',
        tags: ['HTML', '基本']
      }
    ]
  },
  english: {
    name: '英語',
    icon: '🇺🇸',
    quizzes: [
      {
        id: 'eng_1',
        type: 'input',
        question: '「こんにちは」を英語で言うと？',
        correctAnswer: 'Hello',
        difficulty: '初級',
        tags: ['挨拶', '基礎']
      },
      {
        id: 'eng_2',
        type: 'quiz',
        question: '「ありがとう」の英語は？',
        options: ['Thank you', 'Please', 'Sorry', 'Excuse me'],
        correctAnswer: 'Thank you',
        difficulty: '初級',
        tags: ['挨拶', '基礎']
      }
    ]
  },
  business: {
    name: 'ビジネス',
    icon: '💼',
    quizzes: [
      {
        id: 'biz_1',
        type: 'quiz',
        question: 'PDCAサイクルの「P」は何を表しますか？',
        options: ['Plan', 'Practice', 'Process', 'Product'],
        correctAnswer: 'Plan',
        difficulty: '初級',
        tags: ['PDCA', '基礎']
      }
    ]
  },
  design: {
    name: 'デザイン',
    icon: '🎨',
    quizzes: [
      {
        id: 'design_1',
        type: 'quiz',
        question: 'RGBカラーモデルで「R」は何を表しますか？',
        options: ['Red', 'Right', 'Rotate', 'Radius'],
        correctAnswer: 'Red',
        difficulty: '初級',
        tags: ['色彩', 'RGB']
      }
    ]
  },
  marketing: {
    name: 'マーケティング',
    icon: '📈',
    quizzes: [
      {
        id: 'mkt_1',
        type: 'quiz',
        question: '4Pマーケティングミックスに含まれないものは？',
        options: ['Product', 'Price', 'Place', 'People'],
        correctAnswer: 'People',
        difficulty: '中級',
        tags: ['4P', '基礎']
      }
    ]
  },
  finance: {
    name: 'ファイナンス',
    icon: '💰',
    quizzes: [
      {
        id: 'fin_1',
        type: 'quiz',
        question: 'ROIは何の略ですか？',
        options: ['Return on Investment', 'Rate of Interest', 'Risk of Investment', 'Revenue on Income'],
        correctAnswer: 'Return on Investment',
        difficulty: '中級',
        tags: ['ROI', '指標']
      }
    ]
  }
};
