export interface Word {
  id: number;
  chinese: string;
  pinyin: string;
  arabic: string;
  english: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  example?: string;
}

export interface Conversation {
  id: number;
  title: string;
  titleAr: string;
  level: string;
  dialogues: DialogueLine[];
}

export interface DialogueLine {
  speaker: string;
  chinese: string;
  pinyin: string;
  arabic: string;
}

export interface GrammarRule {
  id: number;
  title: string;
  titleAr: string;
  level: string;
  explanation: string;
  explanationAr: string;
  structure: string;
  examples: GrammarExample[];
  tips?: string[];
}

export interface GrammarExample {
  chinese: string;
  pinyin: string;
  arabic: string;
}

export const vocabulary: Word[] = [
  // Greetings
  { id: 1, chinese: '你好', pinyin: 'nǐ hǎo', arabic: 'مرحباً', english: 'Hello', category: 'تحيات', level: 'beginner', example: '你好，你叫什么名字？' },
  { id: 2, chinese: '谢谢', pinyin: 'xiè xie', arabic: 'شكراً', english: 'Thank you', category: 'تحيات', level: 'beginner', example: '谢谢你的帮助。' },
  { id: 3, chinese: '再见', pinyin: 'zài jiàn', arabic: 'مع السلامة', english: 'Goodbye', category: 'تحيات', level: 'beginner', example: '再见，明天见！' },
  { id: 4, chinese: '对不起', pinyin: 'duì bu qǐ', arabic: 'آسف', english: 'Sorry', category: 'تحيات', level: 'beginner', example: '对不起，我迟到了。' },
  { id: 5, chinese: '不客气', pinyin: 'bú kè qi', arabic: 'على الرحب والسعة', english: "You're welcome", category: 'تحيات', level: 'beginner' },
  
  // Numbers
  { id: 6, chinese: '一', pinyin: 'yī', arabic: 'واحد', english: 'One', category: 'أرقام', level: 'beginner' },
  { id: 7, chinese: '二', pinyin: 'èr', arabic: 'اثنان', english: 'Two', category: 'أرقام', level: 'beginner' },
  { id: 8, chinese: '三', pinyin: 'sān', arabic: 'ثلاثة', english: 'Three', category: 'أرقام', level: 'beginner' },
  { id: 9, chinese: '四', pinyin: 'sì', arabic: 'أربعة', english: 'Four', category: 'أرقام', level: 'beginner' },
  { id: 10, chinese: '五', pinyin: 'wǔ', arabic: 'خمسة', english: 'Five', category: 'أرقام', level: 'beginner' },
  { id: 11, chinese: '六', pinyin: 'liù', arabic: 'ستة', english: 'Six', category: 'أرقام', level: 'beginner' },
  { id: 12, chinese: '七', pinyin: 'qī', arabic: 'سبعة', english: 'Seven', category: 'أرقام', level: 'beginner' },
  { id: 13, chinese: '八', pinyin: 'bā', arabic: 'ثمانية', english: 'Eight', category: 'أرقام', level: 'beginner' },
  { id: 14, chinese: '九', pinyin: 'jiǔ', arabic: 'تسعة', english: 'Nine', category: 'أرقام', level: 'beginner' },
  { id: 15, chinese: '十', pinyin: 'shí', arabic: 'عشرة', english: 'Ten', category: 'أرقام', level: 'beginner' },
  
  // Daily Life
  { id: 16, chinese: '吃饭', pinyin: 'chī fàn', arabic: 'يأكل', english: 'Eat', category: 'حياة يومية', level: 'beginner', example: '我们一起吃饭吧。' },
  { id: 17, chinese: '喝水', pinyin: 'hē shuǐ', arabic: 'يشرب ماء', english: 'Drink water', category: 'حياة يومية', level: 'beginner' },
  { id: 18, chinese: '睡觉', pinyin: 'shuì jiào', arabic: 'ينام', english: 'Sleep', category: 'حياة يومية', level: 'beginner' },
  { id: 19, chinese: '工作', pinyin: 'gōng zuò', arabic: 'يعمل', english: 'Work', category: 'حياة يومية', level: 'beginner' },
  { id: 20, chinese: '学习', pinyin: 'xué xí', arabic: 'يدرس', english: 'Study', category: 'حياة يومية', level: 'beginner', example: '我每天学习中文。' },
  
  // Travel
  { id: 21, chinese: '飞机', pinyin: 'fēi jī', arabic: 'طائرة', english: 'Airplane', category: 'سفر', level: 'intermediate' },
  { id: 22, chinese: '火车', pinyin: 'huǒ chē', arabic: 'قطار', english: 'Train', category: 'سفر', level: 'intermediate' },
  { id: 23, chinese: '出租车', pinyin: 'chū zū chē', arabic: 'سيارة أجرة', english: 'Taxi', category: 'سفر', level: 'intermediate' },
  { id: 24, chinese: '酒店', pinyin: 'jiǔ diàn', arabic: 'فندق', english: 'Hotel', category: 'سفر', level: 'intermediate' },
  { id: 25, chinese: '护照', pinyin: 'hù zhào', arabic: 'جواز سفر', english: 'Passport', category: 'سفر', level: 'intermediate' },
  
  // Food
  { id: 26, chinese: '米饭', pinyin: 'mǐ fàn', arabic: 'أرز', english: 'Rice', category: 'طعام', level: 'beginner' },
  { id: 27, chinese: '面条', pinyin: 'miàn tiáo', arabic: 'نودلز', english: 'Noodles', category: 'طعام', level: 'beginner' },
  { id: 28, chinese: '茶', pinyin: 'chá', arabic: 'شاي', english: 'Tea', category: 'طعام', level: 'beginner' },
  { id: 29, chinese: '水果', pinyin: 'shuǐ guǒ', arabic: 'فاكهة', english: 'Fruit', category: 'طعام', level: 'beginner' },
  { id: 30, chinese: '饺子', pinyin: 'jiǎo zi', arabic: 'زلابية', english: 'Dumplings', category: 'طعام', level: 'intermediate' },

  // Advanced
  { id: 31, chinese: '经济', pinyin: 'jīng jì', arabic: 'اقتصاد', english: 'Economy', category: 'متقدم', level: 'advanced' },
  { id: 32, chinese: '文化', pinyin: 'wén huà', arabic: 'ثقافة', english: 'Culture', category: 'متقدم', level: 'advanced' },
  { id: 33, chinese: '环境', pinyin: 'huán jìng', arabic: 'بيئة', english: 'Environment', category: 'متقدم', level: 'advanced' },
  { id: 34, chinese: '科技', pinyin: 'kē jì', arabic: 'تكنولوجيا', english: 'Technology', category: 'متقدم', level: 'advanced' },
  { id: 35, chinese: '教育', pinyin: 'jiào yù', arabic: 'تعليم', english: 'Education', category: 'متقدم', level: 'advanced' },
];

export const conversations: Conversation[] = [
  {
    id: 1,
    title: 'Meeting Someone New',
    titleAr: 'مقابلة شخص جديد',
    level: 'مبتدئ',
    dialogues: [
      { speaker: 'A', chinese: '你好！你叫什么名字？', pinyin: 'Nǐ hǎo! Nǐ jiào shénme míngzi?', arabic: 'مرحباً! ما اسمك؟' },
      { speaker: 'B', chinese: '你好！我叫李明。你呢？', pinyin: 'Nǐ hǎo! Wǒ jiào Lǐ Míng. Nǐ ne?', arabic: 'مرحباً! اسمي لي مينغ. وأنت؟' },
      { speaker: 'A', chinese: '我叫王华。你是哪国人？', pinyin: 'Wǒ jiào Wáng Huá. Nǐ shì nǎ guó rén?', arabic: 'اسمي وانغ هوا. من أي بلد أنت؟' },
      { speaker: 'B', chinese: '我是中国人。你是哪国人？', pinyin: 'Wǒ shì Zhōngguó rén. Nǐ shì nǎ guó rén?', arabic: 'أنا صيني. من أي بلد أنت؟' },
      { speaker: 'A', chinese: '我是阿拉伯人。很高兴认识你！', pinyin: 'Wǒ shì Ālābó rén. Hěn gāoxìng rènshi nǐ!', arabic: 'أنا عربي. سعيد بلقائك!' },
      { speaker: 'B', chinese: '我也很高兴认识你！', pinyin: 'Wǒ yě hěn gāoxìng rènshi nǐ!', arabic: 'أنا أيضاً سعيد بلقائك!' },
    ]
  },
  {
    id: 2,
    title: 'At a Restaurant',
    titleAr: 'في المطعم',
    level: 'مبتدئ',
    dialogues: [
      { speaker: '服务员', chinese: '欢迎光临！请问几位？', pinyin: 'Huānyíng guānglín! Qǐngwèn jǐ wèi?', arabic: 'أهلاً وسهلاً! كم عددكم؟' },
      { speaker: 'A', chinese: '两位。请给我们菜单。', pinyin: 'Liǎng wèi. Qǐng gěi wǒmen càidān.', arabic: 'اثنان. أعطنا القائمة من فضلك.' },
      { speaker: '服务员', chinese: '好的，这是菜单。您想喝什么？', pinyin: 'Hǎo de, zhè shì càidān. Nín xiǎng hē shénme?', arabic: 'حسناً، هذه القائمة. ماذا تريدون أن تشربوا؟' },
      { speaker: 'A', chinese: '我要一杯茶，他要一杯水。', pinyin: 'Wǒ yào yī bēi chá, tā yào yī bēi shuǐ.', arabic: 'أريد كوب شاي، وهو يريد كوب ماء.' },
      { speaker: 'B', chinese: '我想吃饺子和面条。', pinyin: 'Wǒ xiǎng chī jiǎozi hé miàntiáo.', arabic: 'أريد أن آكل زلابية ونودلز.' },
      { speaker: '服务员', chinese: '好的，请稍等。', pinyin: 'Hǎo de, qǐng shāo děng.', arabic: 'حسناً، انتظروا قليلاً.' },
    ]
  },
  {
    id: 3,
    title: 'Asking for Directions',
    titleAr: 'السؤال عن الاتجاهات',
    level: 'متوسط',
    dialogues: [
      { speaker: 'A', chinese: '对不起，请问地铁站怎么走？', pinyin: 'Duìbuqǐ, qǐngwèn dìtiě zhàn zěnme zǒu?', arabic: 'عفواً، كيف أصل إلى محطة المترو؟' },
      { speaker: 'B', chinese: '往前走，到第一个路口右转。', pinyin: 'Wǎng qián zǒu, dào dì yī gè lùkǒu yòu zhuǎn.', arabic: 'امشِ للأمام، عند أول مفترق انعطف يميناً.' },
      { speaker: 'A', chinese: '大概要走多久？', pinyin: 'Dàgài yào zǒu duō jiǔ?', arabic: 'كم تقريباً يستغرق المشي؟' },
      { speaker: 'B', chinese: '大概十分钟就到了。', pinyin: 'Dàgài shí fēnzhōng jiù dào le.', arabic: 'تقريباً عشر دقائق وستصل.' },
      { speaker: 'A', chinese: '谢谢你！', pinyin: 'Xièxie nǐ!', arabic: 'شكراً لك!' },
      { speaker: 'B', chinese: '不客气，祝你顺利！', pinyin: 'Bú kèqi, zhù nǐ shùnlì!', arabic: 'على الرحب، أتمنى لك التوفيق!' },
    ]
  },
  {
    id: 4,
    title: 'Shopping',
    titleAr: 'التسوق',
    level: 'متوسط',
    dialogues: [
      { speaker: 'A', chinese: '这件衣服多少钱？', pinyin: 'Zhè jiàn yīfu duōshao qián?', arabic: 'كم سعر هذا الثوب؟' },
      { speaker: 'B', chinese: '这件两百块。', pinyin: 'Zhè jiàn liǎng bǎi kuài.', arabic: 'هذا بمئتين يوان.' },
      { speaker: 'A', chinese: '太贵了！能便宜一点吗？', pinyin: 'Tài guì le! Néng piányi yīdiǎn ma?', arabic: 'غالي جداً! هل يمكن تخفيض السعر؟' },
      { speaker: 'B', chinese: '好吧，一百八给你。', pinyin: 'Hǎo ba, yī bǎi bā gěi nǐ.', arabic: 'حسناً، بمئة وثمانين.' },
      { speaker: 'A', chinese: '好的，我买了。可以刷卡吗？', pinyin: 'Hǎo de, wǒ mǎi le. Kěyǐ shuākǎ ma?', arabic: 'حسناً، سآخذه. هل يمكن الدفع بالبطاقة؟' },
      { speaker: 'B', chinese: '可以的，请刷卡。', pinyin: 'Kěyǐ de, qǐng shuākǎ.', arabic: 'نعم، تفضل ادفع بالبطاقة.' },
    ]
  },
  {
    id: 5,
    title: 'Talking About Hobbies',
    titleAr: 'التحدث عن الهوايات',
    level: 'متوسط',
    dialogues: [
      { speaker: 'A', chinese: '你平时喜欢做什么？', pinyin: 'Nǐ píngshí xǐhuān zuò shénme?', arabic: 'ماذا تحب أن تفعل عادةً؟' },
      { speaker: 'B', chinese: '我喜欢看书和听音乐。你呢？', pinyin: 'Wǒ xǐhuān kàn shū hé tīng yīnyuè. Nǐ ne?', arabic: 'أحب القراءة والاستماع للموسيقى. وأنت؟' },
      { speaker: 'A', chinese: '我喜欢打篮球和看电影。', pinyin: 'Wǒ xǐhuān dǎ lánqiú hé kàn diànyǐng.', arabic: 'أحب لعب كرة السلة ومشاهدة الأفلام.' },
      { speaker: 'B', chinese: '你最喜欢什么电影？', pinyin: 'Nǐ zuì xǐhuān shénme diànyǐng?', arabic: 'ما هو فيلمك المفضل؟' },
      { speaker: 'A', chinese: '我最喜欢中国电影，特别是功夫片。', pinyin: 'Wǒ zuì xǐhuān Zhōngguó diànyǐng, tèbié shì gōngfu piàn.', arabic: 'أحب الأفلام الصينية خاصة أفلام الكونغ فو.' },
      { speaker: 'B', chinese: '那我们下次一起去看电影吧！', pinyin: 'Nà wǒmen xià cì yīqǐ qù kàn diànyǐng ba!', arabic: 'إذن لنشاهد فيلماً معاً المرة القادمة!' },
    ]
  },
];

export const grammarRules: GrammarRule[] = [
  {
    id: 1,
    title: 'Basic Sentence Structure',
    titleAr: 'البنية الأساسية للجملة',
    level: 'مبتدئ',
    explanation: 'Chinese follows Subject-Verb-Object (SVO) order, similar to English.',
    explanationAr: 'تتبع اللغة الصينية ترتيب الفاعل-الفعل-المفعول به (SVO)، مشابه للإنجليزية.',
    structure: '主语 + 谓语 + 宾语 (فاعل + فعل + مفعول)',
    examples: [
      { chinese: '我吃苹果。', pinyin: 'Wǒ chī píngguǒ.', arabic: 'أنا آكل تفاحة.' },
      { chinese: '他看电影。', pinyin: 'Tā kàn diànyǐng.', arabic: 'هو يشاهد فيلماً.' },
      { chinese: '我们学习中文。', pinyin: 'Wǒmen xuéxí zhōngwén.', arabic: 'نحن ندرس الصينية.' },
    ],
    tips: ['الترتيب ثابت ولا يتغير', 'لا يوجد تصريف أفعال', 'السياق يحدد الزمن']
  },
  {
    id: 2,
    title: 'Using 是 (shì) - To Be',
    titleAr: 'استخدام 是 (shì) - فعل الكون',
    level: 'مبتدئ',
    explanation: '是 (shì) is used to equate two nouns, similar to "am/is/are" in English.',
    explanationAr: 'يُستخدم 是 (shì) للمساواة بين اسمين، مشابه لـ "am/is/are" في الإنجليزية.',
    structure: 'A + 是 + B (أ هو ب)',
    examples: [
      { chinese: '我是学生。', pinyin: 'Wǒ shì xuéshēng.', arabic: 'أنا طالب.' },
      { chinese: '她是老师。', pinyin: 'Tā shì lǎoshī.', arabic: 'هي معلمة.' },
      { chinese: '他们是朋友。', pinyin: 'Tāmen shì péngyǒu.', arabic: 'هم أصدقاء.' },
    ],
    tips: ['النفي: 不是 (bú shì)', 'لا تُستخدم مع الصفات مباشرة', 'تُستخدم فقط للمساواة بين الأسماء']
  },
  {
    id: 3,
    title: 'Question Particles 吗 and 呢',
    titleAr: 'أدوات الاستفهام 吗 و 呢',
    level: 'مبتدئ',
    explanation: '吗 (ma) turns a statement into a yes/no question. 呢 (ne) is used for "what about...?"',
    explanationAr: 'تحوّل 吗 (ma) الجملة الخبرية إلى سؤال نعم/لا. تُستخدم 呢 (ne) لـ "وماذا عن...؟"',
    structure: 'جملة + 吗؟ / ... + 呢؟',
    examples: [
      { chinese: '你是中国人吗？', pinyin: 'Nǐ shì Zhōngguó rén ma?', arabic: 'هل أنت صيني؟' },
      { chinese: '你喜欢中国菜吗？', pinyin: 'Nǐ xǐhuān Zhōngguó cài ma?', arabic: 'هل تحب الطعام الصيني؟' },
      { chinese: '我很好，你呢？', pinyin: 'Wǒ hěn hǎo, nǐ ne?', arabic: 'أنا بخير، وماذا عنك؟' },
    ],
    tips: ['吗 تُضاف في نهاية الجملة فقط', '呢 تُستخدم لرد السؤال', 'لا تُستخدم 吗 مع كلمات الاستفهام الأخرى']
  },
  {
    id: 4,
    title: 'Measure Words 量词',
    titleAr: 'أدوات العد 量词',
    level: 'متوسط',
    explanation: 'Chinese requires measure words between numbers and nouns. The most common is 个 (gè).',
    explanationAr: 'تتطلب الصينية أدوات عد بين الأرقام والأسماء. الأكثر شيوعاً هو 个 (gè).',
    structure: '数字 + 量词 + 名词 (رقم + أداة عد + اسم)',
    examples: [
      { chinese: '一个人', pinyin: 'yī gè rén', arabic: 'شخص واحد' },
      { chinese: '两本书', pinyin: 'liǎng běn shū', arabic: 'كتابان' },
      { chinese: '三杯水', pinyin: 'sān bēi shuǐ', arabic: 'ثلاثة أكواب ماء' },
    ],
    tips: ['个 (gè) - الأداة العامة', '本 (běn) - للكتب', '只 (zhī) - للحيوانات', '杯 (bēi) - للأكواب']
  },
  {
    id: 5,
    title: 'Past Experience with 了 (le)',
    titleAr: 'التعبير عن التجربة الماضية بـ 了 (le)',
    level: 'متوسط',
    explanation: '了 (le) indicates completion of an action or a change of state.',
    explanationAr: 'تشير 了 (le) إلى إتمام الفعل أو تغير الحالة.',
    structure: '动词 + 了 + (宾语) / 已经 + ... + 了',
    examples: [
      { chinese: '我吃了饭。', pinyin: 'Wǒ chī le fàn.', arabic: 'أكلتُ (أنهيت الأكل).' },
      { chinese: '他来了。', pinyin: 'Tā lái le.', arabic: 'جاء (لقد وصل).' },
      { chinese: '下雨了。', pinyin: 'Xià yǔ le.', arabic: 'بدأ المطر (تغير الحالة).' },
    ],
    tips: ['了 الفعل: إتمام الحدث', '了 الجملة: تغير الحالة', 'لا تعني دائماً الماضي', 'قد تأتي في نهاية الجملة أو بعد الفعل']
  },
  {
    id: 6,
    title: 'Comparisons with 比 (bǐ)',
    titleAr: 'المقارنة بـ 比 (bǐ)',
    level: 'متوسط',
    explanation: '比 (bǐ) is used to compare two things, meaning "more than" or "compared to".',
    explanationAr: 'تُستخدم 比 (bǐ) للمقارنة بين شيئين، بمعنى "أكثر من" أو "مقارنة بـ".',
    structure: 'A + 比 + B + 形容词',
    examples: [
      { chinese: '他比我高。', pinyin: 'Tā bǐ wǒ gāo.', arabic: 'هو أطول مني.' },
      { chinese: '今天比昨天热。', pinyin: 'Jīntiān bǐ zuótiān rè.', arabic: 'اليوم أكثر حرارة من أمس.' },
      { chinese: '中文比英文难。', pinyin: 'Zhōngwén bǐ Yīngwén nán.', arabic: 'الصينية أصعب من الإنجليزية.' },
    ],
    tips: ['يمكن إضافة أكثر: 得多 (de duō)', 'النفي: 没有...那么 (méiyǒu...nàme)', 'لا تُستخدم 很 مع 比 في نفس الجملة']
  },
  {
    id: 7,
    title: 'The 把 (bǎ) Structure',
    titleAr: 'بنية 把 (bǎ)',
    level: 'متقدم',
    explanation: '把 (bǎ) restructures the sentence to emphasize the result of an action on an object.',
    explanationAr: 'تعيد 把 (bǎ) هيكلة الجملة للتأكيد على نتيجة الفعل على المفعول به.',
    structure: '主语 + 把 + 宾语 + 动词 + 补语',
    examples: [
      { chinese: '请把门关上。', pinyin: 'Qǐng bǎ mén guān shàng.', arabic: 'أغلق الباب من فضلك.' },
      { chinese: '他把书放在桌子上。', pinyin: 'Tā bǎ shū fàng zài zhuōzi shàng.', arabic: 'وضع الكتاب على الطاولة.' },
      { chinese: '我把作业做完了。', pinyin: 'Wǒ bǎ zuòyè zuò wán le.', arabic: 'أنهيت الواجب.' },
    ],
    tips: ['المفعول يجب أن يكون محدداً', 'يجب أن يكون هناك نتيجة أو تكملة', 'تُستخدم كثيراً في التعليمات', 'لا يمكن استخدامها مع كل الأفعال']
  },
  {
    id: 8,
    title: 'Complement of Result',
    titleAr: 'تكملة النتيجة',
    level: 'متقدم',
    explanation: 'Result complements follow the verb to show the outcome of an action.',
    explanationAr: 'تكملة النتيجة تتبع الفعل لتبين نتيجة الحدث.',
    structure: '动词 + 结果补语 (فعل + تكملة النتيجة)',
    examples: [
      { chinese: '我听懂了。', pinyin: 'Wǒ tīng dǒng le.', arabic: 'فهمتُ (بالسمع).' },
      { chinese: '他吃完了。', pinyin: 'Tā chī wán le.', arabic: 'أنهى الأكل.' },
      { chinese: '我找到了钥匙。', pinyin: 'Wǒ zhǎodào le yàoshi.', arabic: 'وجدتُ المفتاح.' },
    ],
    tips: ['常见: 到，完，好，对，错', 'تعبّر عن نتيجة محددة', 'تُستخدم 不 للنفي: 听不懂', 'مختلفة عن تكملة الاتجاه']
  },
];

export const categories = ['الكل', 'تحيات', 'أرقام', 'حياة يومية', 'سفر', 'طعام', 'متقدم'];

export const levels = ['الكل', 'beginner', 'intermediate', 'advanced'];
