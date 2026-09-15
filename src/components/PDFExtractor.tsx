import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Volume2, X, Sparkles, Download, Check } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
// @ts-ignore
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Configure worker using local bundled worker
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

interface ExtractedWord {
  id: string;
  chinese: string;
  pinyin: string;
  arabic: string;
  english: string;
}

export default function PDFExtractor() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState<string>('');
  const [extractedWords, setExtractedWords] = useState<ExtractedWord[]>([]);
  const [fileName, setFileName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [savedWords, setSavedWords] = useState<Set<string>>(new Set());
  const fileInputRef = useRef<HTMLInputElement>(null);

  const extractChineseWords = (text: string): string[] => {
    // Extract Chinese characters sequences (2+ characters)
    const chineseRegex = /[\u4e00-\u9fa5]{2,}/g;
    const matches = text.match(chineseRegex) || [];
    
    // Remove duplicates and filter
    const unique = [...new Set(matches)];
    return unique.filter(w => w.length >= 2 && w.length <= 8);
  };

  const extractPinyin = (text: string): string[] => {
    // Extract pinyin patterns (with tone marks)
    const pinyinRegex = /[a-zA-Z][a-zA-Zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜü]{0,10}(?:\s+[a-zA-Z][a-zA-Zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǚǜü]{0,10}){0,5}/g;
    return text.match(pinyinRegex) || [];
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setError('الرجاء رفع ملف PDF فقط');
      return;
    }

    setIsProcessing(true);
    setError('');
    setFileName(file.name);
    setExtractedWords([]);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      let fullText = '';
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        fullText += pageText + '\n';
      }

      setExtractedText(fullText);

      // Extract Chinese words
      const chineseWords = extractChineseWords(fullText);
      
      // Create word objects
      const words: ExtractedWord[] = chineseWords.map((word, index) => ({
        id: `pdf-${Date.now()}-${index}`,
        chinese: word,
        pinyin: '', // Will need manual input or dictionary lookup
        arabic: '',
        english: '',
      }));

      setExtractedWords(words);
    } catch (err) {
      console.error(err);
      setError('حدث خطأ أثناء قراءة الملف. تأكد من أن الملف ليس محمياً بكلمة مرور.');
    } finally {
      setIsProcessing(false);
    }
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

  const toggleSaveWord = (id: string) => {
    setSavedWords(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const updateWord = (id: string, field: keyof ExtractedWord, value: string) => {
    setExtractedWords(prev => 
      prev.map(w => w.id === id ? { ...w, [field]: value } : w)
    );
  };

  const exportWords = () => {
    const data = extractedWords
      .filter(w => savedWords.has(w.id))
      .map(w => `${w.chinese}\t${w.pinyin}\t${w.arabic}\t${w.english}`)
      .join('\n');
    
    const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chinese-words.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setExtractedText('');
    setExtractedWords([]);
    setFileName('');
    setError('');
    setSavedWords(new Set());
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-red-500 flex items-center justify-center">
              <FileText size={24} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold">
              <span className="text-gradient">PDF</span> - استخراج الكلمات من PDF
            </h1>
          </div>
          <p className="text-gray-400">
            ارفع ملف PDF يحتوي على كلمات صينية وسنستخرجها لك تلقائياً
          </p>
        </motion.div>

        {/* Upload Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {!extractedText && (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="glass rounded-2xl p-12 border-2 border-dashed border-chinese-gold/30 hover:border-chinese-gold/60 cursor-pointer transition-all group"
            >
              <div className="text-center">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block mb-4"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500/20 to-red-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Upload size={36} className="text-chinese-gold" />
                  </div>
                </motion.div>
                <h3 className="text-xl font-bold mb-2 text-white">
                  اضغط هنا لرفع ملف PDF
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  أو اسحب الملف وأفلته هنا
                </p>
                <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-500">
                  <span className="px-2 py-1 rounded bg-white/5">📄 ملفات PDF</span>
                  <span className="px-2 py-1 rounded bg-white/5">🀄 كلمات صينية</span>
                  <span className="px-2 py-1 rounded bg-white/5">📚 كتب دراسية</span>
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
            >
              ⚠️ {error}
            </motion.div>
          )}

          {isProcessing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 text-center"
            >
              <div className="inline-block">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="w-16 h-16 rounded-full border-4 border-chinese-gold/20 border-t-chinese-gold"
                />
              </div>
              <p className="text-gray-400 mt-4">جاري قراءة الملف واستخراج الكلمات...</p>
            </motion.div>
          )}
        </motion.div>

        {/* Results */}
        <AnimatePresence>
          {extractedText && !isProcessing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 space-y-6"
            >
              {/* File Info */}
              <div className="glass rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                    <FileText size={20} className="text-red-400" />
                  </div>
                  <div>
                    <div className="font-medium text-white">{fileName}</div>
                    <div className="text-xs text-gray-400">
                      تم استخراج {extractedWords.length} كلمة صينية
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {savedWords.size > 0 && (
                    <motion.button
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={exportWords}
                      className="px-3 py-2 rounded-lg bg-chinese-gold/20 text-chinese-gold text-sm flex items-center gap-2"
                    >
                      <Download size={16} />
                      تصدير ({savedWords.size})
                    </motion.button>
                  )}
                  <button
                    onClick={reset}
                    className="p-2 rounded-lg hover:bg-white/10 text-gray-400"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Instructions */}
              <div className="glass rounded-xl p-4 border border-chinese-gold/10">
                <div className="flex items-start gap-2">
                  <Sparkles size={16} className="text-chinese-gold mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-gray-300">
                    <strong className="text-chinese-gold">ملاحظة:</strong> تم استخراج الكلمات الصينية تلقائياً. 
                    يمكنك الآن إضافة النطق (Pinyin) والمعنى بالعربية والإنجليزية لكل كلمة يدوياً، 
                    ثم حفظها أو تصديرها.
                  </div>
                </div>
              </div>

              {/* Words Grid */}
              {extractedWords.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {extractedWords.map((word, i) => (
                    <motion.div
                      key={word.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className={`glass rounded-xl p-4 border transition-all ${
                        savedWords.has(word.id) 
                          ? 'border-chinese-gold/50 bg-chinese-gold/5' 
                          : 'border-white/5'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="text-3xl font-bold">{word.chinese}</div>
                          <button
                            onClick={() => speak(word.chinese)}
                            className="p-1.5 rounded-full bg-chinese-red/20 hover:bg-chinese-red/40 transition-colors"
                          >
                            <Volume2 size={14} className="text-chinese-red" />
                          </button>
                        </div>
                        <button
                          onClick={() => toggleSaveWord(word.id)}
                          className={`p-2 rounded-full transition-all ${
                            savedWords.has(word.id)
                              ? 'bg-chinese-gold text-chinese-dark'
                              : 'bg-white/5 hover:bg-white/10 text-gray-400'
                          }`}
                        >
                          {savedWords.has(word.id) ? <Check size={16} /> : <span>+</span>}
                        </button>
                      </div>

                      <div className="space-y-2">
                        <input
                          type="text"
                          placeholder="Pinyin (مثال: nǐ hǎo)"
                          value={word.pinyin}
                          onChange={(e) => updateWord(word.id, 'pinyin', e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-chinese-gold/50"
                        />
                        <input
                          type="text"
                          placeholder="المعنى بالعربية"
                          value={word.arabic}
                          onChange={(e) => updateWord(word.id, 'arabic', e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-chinese-gold/50"
                          dir="rtl"
                        />
                        <input
                          type="text"
                          placeholder="English meaning"
                          value={word.english}
                          onChange={(e) => updateWord(word.id, 'english', e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-chinese-gold/50"
                          dir="ltr"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 glass rounded-xl">
                  <div className="text-5xl mb-3">🤷</div>
                  <p className="text-gray-400">لم يتم العثور على كلمات صينية في هذا الملف</p>
                  <p className="text-xs text-gray-500 mt-2">تأكد من أن الملف يحتوي على أحرف صينية</p>
                </div>
              )}

              {/* Raw Text Preview */}
              <details className="glass rounded-xl">
                <summary className="p-4 cursor-pointer text-sm text-gray-400 hover:text-white transition-colors">
                  📄 عرض النص الكامل المستخرج
                </summary>
                <div className="p-4 border-t border-white/5 max-h-96 overflow-y-auto">
                  <pre className="text-xs text-gray-400 whitespace-pre-wrap font-mono">
                    {extractedText}
                  </pre>
                </div>
              </details>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
