import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ChevronDown, ChevronUp, Lightbulb, BookMarked } from 'lucide-react';
import { grammarRules } from '../data';

export default function GrammarPage() {
  const [expandedRule, setExpandedRule] = useState<number | null>(null);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'مبتدئ': return 'from-green-500 to-emerald-500';
      case 'متوسط': return 'from-blue-500 to-cyan-500';
      case 'متقدم': return 'from-purple-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getLevelBg = (level: string) => {
    switch (level) {
      case 'مبتدئ': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'متوسط': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'متقدم': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center">
              <FileText size={24} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold">
              <span className="text-gradient">语法</span> - القواعد النحوية
            </h1>
          </div>
          <p className="text-gray-400">افهم قواعد اللغة الصينية بشرح مفصل وأمثلة واضحة</p>
        </motion.div>

        {/* Quick Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-5 mb-8 border border-chinese-gold/10"
        >
          <div className="flex items-center gap-2 mb-3">
            <BookMarked size={18} className="text-chinese-gold" />
            <h3 className="font-bold text-chinese-gold">مقدمة سريعة</h3>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            القواعد النحوية في اللغة الصينية أبسط مما تتخيل! لا يوجد تصريف أفعال، 
            ولا جنس للكلمات، ولا تصريف للجمع. المفتاح هو ترتيب الكلمات الصحيح 
            وفهم أدوات الربط. ابدأ بالقواعد الأساسية ثم انتقل تدريجياً للمستويات الأعلى.
          </p>
        </motion.div>

        {/* Grammar Rules */}
        <div className="space-y-4">
          {grammarRules.map((rule, i) => (
            <motion.div
              key={rule.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl overflow-hidden border border-white/5"
            >
              {/* Rule Header */}
              <div
                className="p-5 cursor-pointer hover:bg-white/5 transition-colors"
                onClick={() => setExpandedRule(expandedRule === rule.id ? null : rule.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getLevelColor(rule.level)} flex items-center justify-center text-white font-bold text-sm`}>
                      {rule.id}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{rule.titleAr}</h3>
                      <p className="text-sm text-gray-400">{rule.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-1 rounded-full border ${getLevelBg(rule.level)}`}>
                      {rule.level}
                    </span>
                    {expandedRule === rule.id ? (
                      <ChevronUp size={20} className="text-gray-400" />
                    ) : (
                      <ChevronDown size={20} className="text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {expandedRule === rule.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-white/5 p-5 space-y-5">
                      {/* Explanation */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-bold text-chinese-gold">📖 الشرح</h4>
                        <p className="text-gray-300 text-sm leading-relaxed">{rule.explanationAr}</p>
                        <p className="text-gray-400 text-xs italic">{rule.explanation}</p>
                      </div>

                      {/* Structure */}
                      <div className="p-4 rounded-xl bg-gradient-to-r from-chinese-red/10 to-chinese-gold/10 border border-chinese-gold/20">
                        <h4 className="text-sm font-bold text-chinese-gold mb-2">📐 البنية</h4>
                        <div className="text-lg font-mono text-white bg-black/20 rounded-lg p-3 text-center">
                          {rule.structure}
                        </div>
                      </div>

                      {/* Examples */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-bold text-chinese-gold">✏️ أمثلة</h4>
                        <div className="space-y-3">
                          {rule.examples.map((example, exIndex) => (
                            <motion.div
                              key={exIndex}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: exIndex * 0.1 }}
                              className="p-4 rounded-xl bg-white/5 border border-white/5"
                            >
                              <div className="text-xl font-bold mb-1">{example.chinese}</div>
                              <div className="text-sm text-chinese-gold font-mono mb-1">{example.pinyin}</div>
                              <div className="text-sm text-gray-300">{example.arabic}</div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Tips */}
                      {rule.tips && rule.tips.length > 0 && (
                        <div className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
                          <div className="flex items-center gap-2 mb-3">
                            <Lightbulb size={16} className="text-yellow-400" />
                            <h4 className="text-sm font-bold text-yellow-400">نصائح مهمة</h4>
                          </div>
                          <ul className="space-y-2">
                            {rule.tips.map((tip, tipIndex) => (
                              <motion.li
                                key={tipIndex}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: tipIndex * 0.1 }}
                                className="flex items-start gap-2 text-sm text-gray-300"
                              >
                                <span className="text-yellow-400 mt-0.5">•</span>
                                <span>{tip}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bottom Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 glass rounded-2xl p-6 border border-chinese-gold/10"
        >
          <h3 className="text-lg font-bold text-center mb-4">
            <span className="text-gradient">🎯 نصائح لدراسة القواعد</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              'ابدأ بقواعد المبتدئ أولاً',
              'احفظ البنية وليس القواعد المجردة',
              'تدرب على صنع جمل خاصة بك',
              'راجع القواعد القديمة بانتظام',
              'لا تخف من الأخطاء - التعلم يحتاج ممارسة',
              'اقرأ جمل صينية وحاول تحليل بنيتها',
            ].map((tip, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-2 text-sm text-gray-300 p-2 rounded-lg bg-white/5"
              >
                <span className="text-chinese-gold">✓</span>
                <span>{tip}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
