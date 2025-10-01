'use client'
import { useState } from 'react';
import { Globe, Sparkles } from 'lucide-react';
import { translations } from '../locales/translations';
import { toolsConfig, categories } from '../config/tools';
import { useRouter } from 'next/navigation';
import AdBanner from '../components/AdBanner';

export default function Home() {
  const [language, setLanguage] = useState('en');
  const [activeCategory, setActiveCategory] = useState('all');
  const router = useRouter();
  
  const t = translations[language];
  
  const filteredTools = activeCategory === 'all' 
    ? toolsConfig 
    : toolsConfig.filter(tool => tool.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-indigo-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              {t.siteName}
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-gray-400" />
            <button
              onClick={() => setLanguage('en')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                language === 'en' 
                  ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-200' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('it')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                language === 'it' 
                  ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-200' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              IT
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-8">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            <span>Free & Simple Tools</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            {t.welcome}
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Top Banner Ad - Posizione strategica dopo l'hero */}
      <section className="max-w-6xl mx-auto px-6 pb-8">
        <AdBanner 
          dataAdSlot="XXXXXXXXXX" 
          dataAdFormat="horizontal"
          className="min-h-[100px]"
        />
      </section>

      {/* Category Tabs */}
      <section className="max-w-6xl mx-auto px-6 mb-12">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-8 py-3 rounded-xl font-semibold whitespace-nowrap transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-xl shadow-indigo-200 scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-indigo-200 hover:shadow-md'
              }`}
            >
              {t.categories[cat.key]}
            </button>
          ))}
        </div>
      </section>

      {/* Tools Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTools.map((tool, index) => {
            const Icon = tool.icon;
            const toolData = t.tools[tool.id];
            return (
              <div key={tool.id}>
                <button
                  onClick={() => router.push(tool.path)}
                  className="w-full bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 p-8 text-left group border border-gray-100 hover:border-indigo-200 hover:-translate-y-2"
                >
                  <div className={`${tool.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                    {toolData.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {toolData.desc}
                  </p>
                  
                  <div className="flex items-center text-indigo-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Try it now</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>

                {/* Ad ogni 3 tools, inserisci un banner pubblicitario */}
                {(index + 1) % 3 === 0 && (
                  <div className="mt-8">
                    <AdBanner 
                      dataAdSlot="YYYYYYYYYY"
                      dataAdFormat="rectangle"
                      className="min-h-[250px]"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom Banner Ad */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <AdBanner 
          dataAdSlot="ZZZZZZZZZZ"
          dataAdFormat="horizontal"
          className="min-h-[100px]"
        />
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white/50 backdrop-blur-sm py-8 mt-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-500">
            © 2025 Tools Portal - All tools are free to use
          </p>
        </div>
      </footer>
    </div>
  );
}