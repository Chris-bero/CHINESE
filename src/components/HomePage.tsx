import { motion } from 'framer-motion';
import { BookOpen, MessageCircle, FileText, ArrowLeft, Star, FileUp } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: 'home' | 'vocabulary' | 'conversations' | 'grammar' | 'pdf') => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const features = [
    {
      id: 'vocabulary',
      title: 'الكلمات والمفردات',
      description: 'تعلم كلمات جديدة مع النطق الصحيح والمعنى بالعربية',
      icon: BookOpen,
      color: 'from-red-500 to-orange-500',
      chars: '词汇',
    },
    {
      id: 'conversations',
      title: 'المحادثات اليومية',
      description: 'تدرب على محادثات واقعية في مواقف حياتية مختلفة',
      icon: MessageCircle,
      color: 'from-blue-500 to-purple-500',
      chars: '对话',
    },
    {
      id: 'grammar',
      title: 'القواعد النحوية',
      description: 'افهم قواعد اللغة الصينية بشرح مفصل وأمثلة واضحة',
      icon: FileText,
      color: 'from-green-500 to-teal-500',
      chars: '语法',
    },
    {
      id: 'pdf',
      title: 'استخراج من PDF',
      description: 'ارفع ملف PDF واستخرج الكلمات الصينية منه تلقائياً',
      icon: FileUp,
      color: 'from-amber-500 to-red-500',
      chars: '提取',
    },
  ];

  const stats = [
    { number: '35+', label: 'كلمة' },
    { number: '5', label: 'محادثة' },
    { number: '8', label: 'قاعدة' },
    { number: '3', label: 'مستويات' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 right-10 text-8xl opacity-10"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            龙
          </motion.div>
          <motion.div
            className="absolute bottom-20 left-10 text-8xl opacity-10"
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            福
          </motion.div>
          <motion.div
            className="absolute top-40 left-1/4 text-6xl opacity-5"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            学
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-chinese-red to-chinese-gold flex items-center justify-center animate-pulse-glow">
                <span className="text-5xl font-bold text-white">中</span>
              </div>
              <motion.div
                className="absolute -top-2 -right-2 w-8 h-8 bg-chinese-gold rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Star size={16} className="text-chinese-dark" />
              </motion.div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            <span className="text-gradient">学中文</span>
            <br />
            <span className="text-white">تعلم اللغة الصينية</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            ابدأ رحلتك في تعلم اللغة الصينية مع دروس تفاعلية، كلمات مع النطق،
            محادثات يومية، وقواعد مشروحة بالعربية 🏮
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('vocabulary')}
              className="px-8 py-3 bg-gradient-to-r from-chinese-red to-chinese-gold rounded-full text-white font-bold shadow-lg shadow-chinese-red/30 flex items-center gap-2"
            >
              ابدأ التعلم
              <ArrowLeft size={18} />
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
                className="glass rounded-xl p-4 text-center"
              >
                <div className="text-2xl font-bold text-chinese-gold">{stat.number}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            <span className="text-gradient">ماذا ستتعلم؟</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ y: -10 }}
                onClick={() => onNavigate(feature.id as any)}
                className="glass rounded-2xl p-6 cursor-pointer card-hover group"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon size={28} className="text-white" />
                </div>
                <div className="text-4xl mb-3 opacity-30 group-hover:opacity-60 transition-opacity">
                  {feature.chars}
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
                <div className="mt-4 flex items-center gap-1 text-chinese-gold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>ابدأ الآن</span>
                  <ArrowLeft size={14} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 border border-chinese-gold/20"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">
              <span className="text-gradient">💡 نصائح لتعلم الصينية</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { tip: 'تدرب على النغمات الأربع يومياً', icon: '🎵' },
                { tip: 'اكتب الحروف الصينية بيدك', icon: '✍️' },
                { tip: 'استمع للصينية كل يوم حتى لو 10 دقائق', icon: '🎧' },
                { tip: 'تعلم 5 كلمات جديدة يومياً على الأقل', icon: '📚' },
                { tip: 'شاهد أفلام صينية مع ترجمة', icon: '🎬' },
                { tip: 'تحدث مع متعلمين آخرين', icon: '🗣️' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-gray-300 text-sm">{item.tip}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
