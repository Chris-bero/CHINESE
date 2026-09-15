import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Volume2, ChevronDown, ChevronUp, Users } from 'lucide-react';
import { conversations } from '../data';

export default function ConversationsPage() {
  const [expandedConversation, setExpandedConversation] = useState<number | null>(null);
  const [revealedLines, setRevealedLines] = useState<Record<string, boolean>>({});

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

  const speakAll = (convId: number) => {
    const conv = conversations.find(c => c.id === convId);
    if (!conv) return;
    
    speechSynthesis.cancel();
    conv.dialogues.forEach((line, index) => {
      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(line.chinese);
        utterance.lang = 'zh-CN';
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
      }, index * 3000);
    });
  };

  const toggleLine = (key: string) => {
    setRevealedLines(prev => ({ ...prev, [key]: !prev[key] }));
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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <MessageCircle size={24} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold">
              <span className="text-gradient">对话</span> - المحادثات اليومية
            </h1>
          </div>
          <p className="text-gray-400">تدرب على محادثات واقعية في مواقف حياتية مختلفة</p>
        </motion.div>

        {/* Conversations List */}
        <div className="space-y-4">
          {conversations.map((conv, i) => (
            <motion.div
              key={conv.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl overflow-hidden border border-white/5"
            >
              {/* Conversation Header */}
              <div
                className="p-5 cursor-pointer hover:bg-white/5 transition-colors"
                onClick={() => setExpandedConversation(expandedConversation === conv.id ? null : conv.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                      <Users size={20} className="text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{conv.titleAr}</h3>
                      <p className="text-sm text-gray-400">{conv.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs px-2 py-1 rounded-full bg-chinese-gold/20 text-chinese-gold">
                      {conv.level}
                    </span>
                    {expandedConversation === conv.id ? (
                      <ChevronUp size={20} className="text-gray-400" />
                    ) : (
                      <ChevronDown size={20} className="text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {expandedConversation === conv.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-white/5 p-5">
                      {/* Play All Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => speakAll(conv.id)}
                        className="w-full mb-6 py-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-400 font-medium flex items-center justify-center gap-2 hover:from-blue-500/30 hover:to-purple-500/30 transition-colors"
                      >
                        <Volume2 size={18} />
                        استمع للمحادثة كاملة
                      </motion.button>

                      {/* Dialogue Lines */}
                      <div className="space-y-3">
                        {conv.dialogues.map((line, lineIndex) => {
                          const lineKey = `${conv.id}-${lineIndex}`;
                          const isRevealed = revealedLines[lineKey];
                          const isSpeakerA = line.speaker === 'A' || line.speaker === '服务员';
                          
                          return (
                            <motion.div
                              key={lineIndex}
                              initial={{ opacity: 0, x: isSpeakerA ? 20 : -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: lineIndex * 0.1 }}
                              className={`flex ${isSpeakerA ? 'justify-start' : 'justify-end'}`}
                            >
                              <div className={`max-w-[85%] ${isSpeakerA ? 'order-1' : 'order-1'}`}>
                                {/* Speaker Label */}
                                <div className={`text-xs mb-1 ${isSpeakerA ? 'text-blue-400' : 'text-purple-400'}`}>
                                  {line.speaker}
                                </div>
                                
                                {/* Message Bubble */}
                                <div
                                  className={`rounded-2xl p-4 ${
                                    isSpeakerA
                                      ? 'bg-blue-500/10 border border-blue-500/20 rounded-tr-sm'
                                      : 'bg-purple-500/10 border border-purple-500/20 rounded-tl-sm'
                                  }`}
                                >
                                  <div className="flex items-start gap-2">
                                    <div className="flex-1">
                                      <div className="text-lg font-medium mb-1">{line.chinese}</div>
                                      <div className="text-sm text-chinese-gold font-mono mb-1">{line.pinyin}</div>
                                      
                                      {/* Translation - toggle to reveal */}
                                      <div
                                        className="cursor-pointer"
                                        onClick={() => toggleLine(lineKey)}
                                      >
                                        {isRevealed ? (
                                          <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="text-sm text-gray-300 mt-1"
                                          >
                                            {line.arabic}
                                          </motion.div>
                                        ) : (
                                          <div className="text-xs text-gray-500 mt-1 hover:text-gray-400 transition-colors">
                                            👆 اضغط لعرض الترجمة
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                    
                                    <button
                                      onClick={() => speak(line.chinese)}
                                      className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex-shrink-0"
                                    >
                                      <Volume2 size={14} className="text-gray-400" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>

                      {/* Vocabulary from conversation */}
                      <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/5">
                        <h4 className="text-sm font-bold text-chinese-gold mb-2">💡 ملاحظات</h4>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>• اضغط على أي جملة لسماع النطق</li>
                          <li>• اضغط على "اضغط لعرض الترجمة" لإظهار المعنى</li>
                          <li>• حاول تكرار الجمل بعد سماعها</li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
