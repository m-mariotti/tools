'use client'
import { useState } from 'react';
import { Globe } from 'lucide-react';
import { translations } from '../locales/translations';
import { toolsConfig, categories } from '../config/tools';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [language, setLanguage] = useState('en');
  const [activeCategory, setActiveCategory] = useState('all');
  const router = useRouter();
  
  const t = translations[language];
  
  const filteredTools = activeCategory === 'all' 
    ? toolsConfig 
    : toolsConfig.filter(tool => tool.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-xl font-bold text-gray-800">{t.siteName}</span>
          
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-gray-400" />
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                language === 'en' ? 'bg-gray-800 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('it')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                language === 'it' ? 'bg-gray-800 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              IT
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3 text-center">
          {t.welcome}
        </h1>
        <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
          {t.subtitle}
        </p>
      </section>

      {/* Category Tabs */}
      <section className="max-w-6xl mx-auto px-6 mb-8">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2.5 rounded-lg font-medium whitespace-nowrap transition ${
                activeCategory === cat.id
                  ? 'bg-gray-800 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {t.categories[cat.key]}
            </button>
          ))}
        </div>
      </section>

      {/* Tools Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => {
            const Icon = tool.icon;
            const toolData = t.tools[tool.id];
            return (
              <button
                key={tool.id}
                onClick={() => router.push(tool.path)}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 p-6 text-left group border border-gray-100 hover:border-gray-200"
              >
                <div className={`${tool.color} w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {toolData.name}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {toolData.desc}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-500">
            © 2025 Tools Portal - All tools are free to use
          </p>
        </div>
      </footer>
    </div>
  );
}