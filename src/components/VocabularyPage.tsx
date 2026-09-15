import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Volume2, Filter, X, BookOpen } from 'lucide-react';
import { vocabulary, categories } from '../data';

export default function VocabularyPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [selectedLevel, setSelectedLevel] = useState('الكل');
  const [selectedWord, setSelectedWord] = useState<number | null>(null);

  const filteredWords = vocabulary.filter(word => {
    const matchesSearch = word.chinese.includes(searchTerm) ||
      word.pinyin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.arabic.includes(searchTerm) ||
      word.english.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'الكل' || word.category === selectedCategory;
    const matchesLevel = selectedLevel === 'الكل' || word.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'intermediate': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'advanced': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'beginner': return 'مبتدئ';
      case 'intermediate': return 'متوسط';
      case 'advanced': return 'متقدم';
      default: return level;
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
              <BookOpen size={24} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold">
              <span className="text-gradient">词汇</span> - الكلمات والمفردات
            </h1>
          </div>
          <p className="text-gray-400">تعلم كلمات جديدة مع النطق الصحيح والمعنى</p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-4 mb-6"
        >
          {/* Search */}
          <div className="relative mb-4">
            <Search size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="ابحث عن كلمة... (صيني، بينيين، عربي، إنجليزي)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pr-12 pl-4 text-white placeholder-gray-500 focus:outline-none focus:border-chinese-gold/50 transition-colors"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <Filter size={16} className="text-gray-400 mt-2" />
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-chinese-red text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="w-px h-6 bg-white/10 mx-2 self-center" />
            <div className="flex flex-wrap gap-2">
              {['الكل', 'beginner', 'intermediate', 'advanced'].map(level => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    selectedLevel === level
                      ? 'bg-chinese-gold text-chinese-dark'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {level === 'الكل' ? 'الكل' : getLevelLabel(level)}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Word Count */}
        <div className="text-sm text-gray-400 mb-4">
          عدد الكلمات: <span className="text-chinese-gold font-bold">{filteredWords.length}</span>
        </div>

        {/* Words Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredWords.map((word, i) => (
              <motion.div
                key={word.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedWord(word.id)}
                className="glass rounded-xl p-5 cursor-pointer card-hover group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-4xl font-bold group-hover:text-chinese-gold transition-colors">
                    {word.chinese}
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); speak(word.chinese); }}
                    className="p-2 rounded-full bg-chinese-red/20 hover:bg-chinese-red/40 transition-colors"
                  >
                    <Volume2 size={16} className="text-chinese-red" />
                  </button>
                </div>
                <div className="text-chinese-gold text-sm mb-1 font-mono">{word.pinyin}</div>
                <div className="text-white font-medium">{word.arabic}</div>
                <div className="text-gray-400 text-sm">{word.english}</div>
                <div className="flex items-center gap-2 mt-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${getLevelColor(word.level)}`}>
                    {getLevelLabel(word.level)}
                  </span>
                  <span className="text-xs text-gray-500">{word.category}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredWords.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-400">لم يتم العثور على كلمات</p>
          </motion.div>
        )}

        {/* Word Detail Modal */}
        <AnimatePresence>
          {selectedWord && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedWord(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="glass rounded-2xl p-8 max-w-md w-full border border-chinese-gold/20"
              >
                {(() => {
                  const word = vocabulary.find(w => w.id === selectedWord);
                  if (!word) return null;
                  return (
                    <>
                      <div className="flex items-center justify-between mb-6">
                        <span className={`text-xs px-2 py-1 rounded-full border ${getLevelColor(word.level)}`}>
                          {getLevelLabel(word.level)}
                        </span>
                        <button
                          onClick={() => setSelectedWord(null)}
                          className="p-2 rounded-full hover:bg-white/10"
                        >
                          <X size={20} />
                        </button>
                      </div>
                      <div className="text-center mb-6">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring' }}
                          className="text-7xl font-bold mb-3 animate-ink-spread"
                        >
                          {word.chinese}
                        </motion.div>
                        <div className="text-xl text-chinese-gold font-mono mb-2">{word.pinyin}</div>
                        <button
                          onClick={() => speak(word.chinese)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-chinese-red/20 hover:bg-chinese-red/40 transition-colors text-chinese-red"
                        >
                          <Volume2 size={16} />
                          استمع للنطق
                        </button>
                      </div>
                      <div className="space-y-3">
                        <div className="p-3 rounded-lg bg-white/5">
                          <div className="text-xs text-gray-400 mb-1">المعنى بالعربية</div>
                          <div className="text-lg font-medium">{word.arabic}</div>
                        </div>
                        <div className="p-3 rounded-lg bg-white/5">
                          <div className="text-xs text-gray-400 mb-1">English</div>
                          <div className="text-lg font-medium">{word.english}</div>
                        </div>
                        {word.example && (
                          <div className="p-3 rounded-lg bg-white/5">
                            <div className="text-xs text-gray-400 mb-1">مثال</div>
                            <div className="text-lg">{word.example}</div>
                          </div>
                        )}
                        <div className="p-3 rounded-lg bg-white/5">
                          <div className="text-xs text-gray-400 mb-1">التصنيف</div>
                          <div className="text-lg">{word.category}</div>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
