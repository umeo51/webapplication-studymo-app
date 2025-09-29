// 学習コンテンツのデータベース（選択式・記述式のみ）
export const learningContent = {
  programming: {
    name: 'プログラミング',
    icon: '💻',
    color: 'blue',
    quizzes: [
      // 選択式問題
      {
        id: 'prog_quiz_001',
        question: 'HTMLの正式名称は何ですか？',
        type: 'multiple_choice',
        options: [
          'HyperText Markup Language',
          'High Tech Modern Language',
          'Home Tool Markup Language',
          'Hyperlink Text Management Language'
        ],
        correctAnswer: 0,
        difficulty: 1,
        tags: ['HTML', '基礎'],
        explanation: 'HTMLは「HyperText Markup Language」の略で、Webページの構造を定義するマークアップ言語です。'
      },
      {
        id: 'prog_quiz_002',
        question: 'CSSで要素を中央揃えにするプロパティはどれですか？',
        type: 'multiple_choice',
        options: [
          'align-center',
          'text-align: center',
          'center-align',
          'middle-align'
        ],
        correctAnswer: 1,
        difficulty: 2,
        tags: ['CSS', 'レイアウト'],
        explanation: 'text-align: center は、インライン要素やテキストを中央揃えにするCSSプロパティです。'
      },
      {
        id: 'prog_quiz_003',
        question: 'JavaScriptで変数を宣言するキーワードを1つ答えてください。',
        type: 'text_input',
        correctAnswers: ['var', 'let', 'const'],
        difficulty: 1,
        tags: ['JavaScript', '変数'],
        explanation: 'JavaScriptでは var、let、const のいずれかを使って変数を宣言できます。'
      },
      {
        id: 'prog_quiz_004',
        question: 'HTMLでリンクを作成するタグはどれですか？',
        type: 'multiple_choice',
        options: [
          '<link>',
          '<a>',
          '<href>',
          '<url>'
        ],
        correctAnswer: 1,
        difficulty: 1,
        tags: ['HTML', 'タグ'],
        explanation: '<a>タグはアンカー要素で、href属性でリンク先を指定します。'
      },
      {
        id: 'prog_quiz_005',
        question: 'CSSでフォントサイズを指定するプロパティ名を答えてください。',
        type: 'text_input',
        correctAnswers: ['font-size'],
        difficulty: 1,
        tags: ['CSS', 'フォント'],
        explanation: 'font-sizeプロパティでフォントのサイズを指定できます。'
      },
      {
        id: 'prog_quiz_006',
        question: 'HTMLで画像を表示するタグはどれですか？',
        type: 'multiple_choice',
        options: [
          '<image>',
          '<img>',
          '<pic>',
          '<photo>'
        ],
        correctAnswer: 1,
        difficulty: 1,
        tags: ['HTML', '画像'],
        explanation: '<img>タグでsrc属性に画像のパスを指定して画像を表示します。'
      },
      {
        id: 'prog_quiz_007',
        question: 'JavaScriptでコンソールに出力する関数名を答えてください。',
        type: 'text_input',
        correctAnswers: ['console.log'],
        difficulty: 1,
        tags: ['JavaScript', 'デバッグ'],
        explanation: 'console.log()関数でブラウザのコンソールに値を出力できます。'
      },
      {
        id: 'prog_quiz_008',
        question: 'CSSでボックスモデルに含まれないものはどれですか？',
        type: 'multiple_choice',
        options: [
          'margin',
          'padding',
          'border',
          'background'
        ],
        correctAnswer: 3,
        difficulty: 2,
        tags: ['CSS', 'ボックスモデル'],
        explanation: 'ボックスモデルはcontent、padding、border、marginで構成されます。backgroundは含まれません。'
      },
      {
        id: 'prog_quiz_009',
        question: 'HTMLの基本構造で、ページのタイトルを設定するタグを答えてください。',
        type: 'text_input',
        correctAnswers: ['title', '<title>'],
        difficulty: 1,
        tags: ['HTML', '構造'],
        explanation: '<title>タグでブラウザのタブに表示されるページタイトルを設定します。'
      },
      {
        id: 'prog_quiz_010',
        question: 'JavaScriptで配列を作成する正しい方法はどれですか？',
        type: 'multiple_choice',
        options: [
          'var arr = [];',
          'var arr = {};',
          'var arr = ();',
          'var arr = <>;'
        ],
        correctAnswer: 0,
        difficulty: 2,
        tags: ['JavaScript', '配列'],
        explanation: '[]を使って空の配列を作成できます。{}はオブジェクト、()は関数呼び出しに使用されます。'
      },
      {
        id: 'prog_quiz_011',
        question: 'CSSでフレックスボックスを有効にするプロパティ値を答えてください。',
        type: 'text_input',
        correctAnswers: ['flex', 'display: flex'],
        difficulty: 2,
        tags: ['CSS', 'フレックスボックス'],
        explanation: 'display: flex でフレックスボックスレイアウトを有効にできます。'
      },
      {
        id: 'prog_quiz_012',
        question: 'HTMLで順序なしリストを作成するタグはどれですか？',
        type: 'multiple_choice',
        options: [
          '<ol>',
          '<ul>',
          '<list>',
          '<li>'
        ],
        correctAnswer: 1,
        difficulty: 1,
        tags: ['HTML', 'リスト'],
        explanation: '<ul>は順序なしリスト、<ol>は順序ありリスト、<li>はリスト項目を表します。'
      },
      {
        id: 'prog_quiz_013',
        question: 'JavaScriptで文字列を数値に変換する関数を1つ答えてください。',
        type: 'text_input',
        correctAnswers: ['parseInt', 'parseFloat', 'Number'],
        difficulty: 2,
        tags: ['JavaScript', '型変換'],
        explanation: 'parseInt()、parseFloat()、Number()などで文字列を数値に変換できます。'
      },
      {
        id: 'prog_quiz_014',
        question: 'CSSでグリッドレイアウトを有効にするプロパティ値はどれですか？',
        type: 'multiple_choice',
        options: [
          'display: grid',
          'layout: grid',
          'grid: true',
          'grid-layout: on'
        ],
        correctAnswer: 0,
        difficulty: 3,
        tags: ['CSS', 'グリッド'],
        explanation: 'display: grid でCSSグリッドレイアウトを有効にできます。'
      },
      {
        id: 'prog_quiz_015',
        question: 'HTMLでフォームを作成するタグを答えてください。',
        type: 'text_input',
        correctAnswers: ['form', '<form>'],
        difficulty: 1,
        tags: ['HTML', 'フォーム'],
        explanation: '<form>タグでユーザー入力を受け取るフォームを作成します。'
      }
    ]
  },
  english: {
    name: '英語',
    icon: '🇺🇸',
    color: 'red',
    quizzes: [
      {
        id: 'eng_quiz_001',
        question: '「こんにちは」を英語で言うと？',
        type: 'multiple_choice',
        options: [
          'Good morning',
          'Hello',
          'Good night',
          'Goodbye'
        ],
        correctAnswer: 1,
        difficulty: 1,
        tags: ['挨拶', '基礎'],
        explanation: 'Helloは時間を問わず使える一般的な挨拶です。'
      },
      {
        id: 'eng_quiz_002',
        question: '「ありがとう」の英語を答えてください。',
        type: 'text_input',
        correctAnswers: ['thank you', 'thanks'],
        difficulty: 1,
        tags: ['挨拶', '感謝'],
        explanation: 'Thank youまたはThanksで感謝を表現できます。'
      },
      {
        id: 'eng_quiz_003',
        question: '「I am a student.」の意味はどれですか？',
        type: 'multiple_choice',
        options: [
          '私は先生です',
          '私は学生です',
          '私は医者です',
          '私は会社員です'
        ],
        correctAnswer: 1,
        difficulty: 1,
        tags: ['be動詞', '職業'],
        explanation: 'I am a student. は「私は学生です」という意味です。'
      },
      {
        id: 'eng_quiz_004',
        question: '「cat」の複数形を答えてください。',
        type: 'text_input',
        correctAnswers: ['cats'],
        difficulty: 1,
        tags: ['名詞', '複数形'],
        explanation: '一般的な名詞の複数形は語尾に-sを付けます。'
      },
      {
        id: 'eng_quiz_005',
        question: '「彼は走っています」を英語で言うとどれですか？',
        type: 'multiple_choice',
        options: [
          'He run',
          'He runs',
          'He is running',
          'He was running'
        ],
        correctAnswer: 2,
        difficulty: 2,
        tags: ['現在進行形', '動詞'],
        explanation: '現在進行形は「be動詞 + 動詞のing形」で表現します。'
      }
    ]
  },
  business: {
    name: 'ビジネス',
    icon: '💼',
    color: 'purple',
    quizzes: [
      {
        id: 'biz_quiz_001',
        question: 'PDCAサイクルの「P」は何を表しますか？',
        type: 'multiple_choice',
        options: [
          'Practice',
          'Plan',
          'Process',
          'Product'
        ],
        correctAnswer: 1,
        difficulty: 2,
        tags: ['PDCA', '業務改善'],
        explanation: 'PDCAのPはPlan（計画）を表します。'
      },
      {
        id: 'biz_quiz_002',
        question: 'KPIの正式名称を答えてください。',
        type: 'text_input',
        correctAnswers: ['Key Performance Indicator', 'key performance indicator'],
        difficulty: 2,
        tags: ['KPI', '指標'],
        explanation: 'KPIはKey Performance Indicator（重要業績評価指標）の略です。'
      },
      {
        id: 'biz_quiz_003',
        question: 'SWOT分析の「S」は何を表しますか？',
        type: 'multiple_choice',
        options: [
          'Strategy',
          'Strength',
          'System',
          'Service'
        ],
        correctAnswer: 1,
        difficulty: 2,
        tags: ['SWOT', '分析'],
        explanation: 'SWOT分析のSはStrength（強み）を表します。'
      }
    ]
  },
  design: {
    name: 'デザイン',
    icon: '🎨',
    color: 'pink',
    quizzes: [
      {
        id: 'design_quiz_001',
        question: 'RGBカラーモデルで「R」は何を表しますか？',
        type: 'multiple_choice',
        options: [
          'Red',
          'Right',
          'Round',
          'Ratio'
        ],
        correctAnswer: 0,
        difficulty: 1,
        tags: ['色彩', 'RGB'],
        explanation: 'RGBのRはRed（赤）を表します。'
      }
    ]
  },
  marketing: {
    name: 'マーケティング',
    icon: '📈',
    color: 'green',
    quizzes: [
      {
        id: 'marketing_quiz_001',
        question: '4Pマーケティングに含まれないものはどれですか？',
        type: 'multiple_choice',
        options: [
          'Product',
          'Price',
          'Promotion',
          'Performance'
        ],
        correctAnswer: 3,
        difficulty: 2,
        tags: ['4P', 'マーケティングミックス'],
        explanation: '4PはProduct、Price、Place、Promotionです。'
      }
    ]
  },
  finance: {
    name: 'ファイナンス',
    icon: '💰',
    color: 'yellow',
    quizzes: [
      {
        id: 'finance_quiz_001',
        question: 'ROIの正式名称を答えてください。',
        type: 'text_input',
        correctAnswers: ['Return on Investment', 'return on investment'],
        difficulty: 2,
        tags: ['ROI', '投資'],
        explanation: 'ROIはReturn on Investment（投資収益率）の略です。'
      }
    ]
  }
};

// 統計情報を取得する関数
export const getContentStats = () => {
  const categories = Object.values(learningContent);
  let totalQuizzes = 0;
  let totalItems = 0;

  categories.forEach(category => {
    totalQuizzes += category.quizzes.length;
    totalItems += category.quizzes.length;
  });

  return {
    totalCategories: categories.length,
    totalQuizzes,
    totalItems,
    averageItemsPerCategory: Math.round(totalItems / categories.length)
  };
};
