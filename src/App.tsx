import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, MessageCircle, FileText, Menu, X, Sparkles, FileUp } from 'lucide-react';
import VocabularyPage from './components/VocabularyPage';
import ConversationsPage from './components/ConversationsPage';
import GrammarPage from './components/GrammarPage';
import HomePage from './components/HomePage';
import PDFExtractor from './components/PDFExtractor';

type Page = 'home' | 'vocabulary' | 'conversations' | 'grammar' | 'pdf';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home' as Page, label: 'الرئيسية', icon: Sparkles },
    { id: 'vocabulary' as Page, label: 'الكلمات', icon: BookOpen },
    { id: 'conversations' as Page, label: 'المحادثات', icon: MessageCircle },
    { id: 'grammar' as Page, label: 'القواعد', icon: FileText },
    { id: 'pdf' as Page, label: 'استخراج PDF', icon: FileUp },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage onNavigate={setCurrentPage} />;
      case 'vocabulary': return <VocabularyPage />;
      case 'conversations': return <ConversationsPage />;
      case 'grammar': return <GrammarPage />;
      case 'pdf': return <PDFExtractor />;
    }
  };

  return (
    <div className="min-h-screen bg-chinese-dark chinese-pattern text-white" dir="rtl">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => setCurrentPage('home')}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-chinese-red to-chinese-gold flex items-center justify-center text-xl font-bold animate-lantern">
                中
              </div>
              <span className="text-lg font-bold text-gradient hidden sm:block">学中文</span>
            </motion.div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    currentPage === item.id
                      ? 'bg-gradient-to-r from-chinese-red/20 to-chinese-gold/20 text-chinese-gold border border-chinese-gold/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon size={16} />
                  <span className="hidden lg:inline">{item.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-white/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass border-t border-white/10"
            >
              <div className="px-4 py-3 space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { setCurrentPage(item.id); setMobileMenuOpen(false); }}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      currentPage === item.id
                        ? 'bg-gradient-to-r from-chinese-red/20 to-chinese-gold/20 text-chinese-gold'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-chinese-red to-chinese-gold flex items-center justify-center text-sm font-bold">
              中
            </div>
            <span className="text-gradient font-bold">学中文 - تعلم الصينية</span>
          </div>
          <p className="text-gray-400 text-sm">
            رحلة تعلم اللغة الصينية تبدأ من هنا 🏮
          </p>
          <p className="text-gray-500 text-xs mt-2">
            صُمم بحب لمساعدة العرب على تعلم اللغة الصينية
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
