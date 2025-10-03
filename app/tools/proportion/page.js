'use client'
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Calculator, Info, BookOpen, Lightbulb, Target } from 'lucide-react';
import ToolPageLayout from '../../../components/ToolPageLayout';
import { proportionTranslations } from '../../../locales/proportion-translations';
import { translations } from '../../../locales/translations';

export default function ProportionCalculator() {
  const [language, setLanguage] = useState('en');
  const [mounted, setMounted] = useState(false);

  // Structured data for proportion calculator
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Proportion Calculator",
    "url": "https://mariottimauro.eu/tools/proportion",
    "description": "Solve mathematical proportions online. Find missing values in equations of the form a:b = c:d. Includes explanations, properties, and practical examples.",
    "applicationCategory": "EducationalApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR"
    },
    "featureList": [
      "Solve proportions instantly",
      "Step-by-step calculations",
      "Cross-multiplication verification",
      "Educational examples",
      "Properties of proportions"
    ]
  };

  // Form inputs
  const [valueA, setValueA] = useState('');
  const [valueB, setValueB] = useState('');
  const [valueC, setValueC] = useState('');
  const [valueD, setValueD] = useState('');

  // Results
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  // Carica la lingua salvata
  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('siteLanguage') || 'en';
      setLanguage(savedLanguage);
    }
  }, []);

  // Ascolta i cambi di lingua
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleLanguageChange = (e) => {
      setLanguage(e.detail.language);
    };
    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('siteLanguage', lang);
      window.dispatchEvent(new CustomEvent('languageChanged', {
        detail: { language: lang }
      }));
    }
  };

  const t = proportionTranslations[language];
  const footerT = translations[language];

  const calculateProportion = () => {
    setError('');
    setResult(null);

    const values = [valueA, valueB, valueC, valueD];
    const emptyCount = values.filter(v => v === '' || v === null || v === undefined).length;

    if (emptyCount !== 1) {
      setError(t.calculator.error.needThreeValues);
      return;
    }

    const a = valueA === '' ? null : parseFloat(valueA);
    const b = valueB === '' ? null : parseFloat(valueB);
    const c = valueC === '' ? null : parseFloat(valueC);
    const d = valueD === '' ? null : parseFloat(valueD);

    // Verifica che i valori inseriti siano numeri validi
    const definedValues = [a, b, c, d].filter(v => v !== null);
    if (definedValues.some(v => isNaN(v))) {
      setError(t.calculator.error.invalidValues);
      return;
    }

    let unknown = '';
    let solution = 0;
    let calculationSteps = '';

    // a : b = c : d
    // Proprietà fondamentale: a × d = b × c

    if (a === null) {
      // a = (b × c) / d
      if (d === 0) {
        setError(t.calculator.error.divisionByZero);
        return;
      }
      solution = (b * c) / d;
      unknown = 'a';
      calculationSteps = `a × ${d} = ${b} × ${c}\na = (${b} × ${c}) / ${d}\na = ${solution}`;
    } else if (b === null) {
      // b = (a × d) / c
      if (c === 0) {
        setError(t.calculator.error.divisionByZero);
        return;
      }
      solution = (a * d) / c;
      unknown = 'b';
      calculationSteps = `${a} × ${d} = b × ${c}\nb = (${a} × ${d}) / ${c}\nb = ${solution}`;
    } else if (c === null) {
      // c = (b × a) / d
      if (d === 0) {
        setError(t.calculator.error.divisionByZero);
        return;
      }
      solution = (b * a) / d;
      unknown = 'c';
      calculationSteps = `${a} × ${d} = ${b} × c\nc = (${b} × ${a}) / ${d}\nc = ${solution}`;
    } else if (d === null) {
      // d = (b × c) / a
      if (a === 0) {
        setError(t.calculator.error.divisionByZero);
        return;
      }
      solution = (b * c) / a;
      unknown = 'd';
      calculationSteps = `${a} × d = ${b} × ${c}\nd = (${b} × ${c}) / ${a}\nd = ${solution}`;
    }

    // Crea l'array completo con la soluzione
    const finalValues = {
      a: a !== null ? a : solution,
      b: b !== null ? b : solution,
      c: c !== null ? c : solution,
      d: d !== null ? d : solution
    };

    // Verifica: a × d = b × c
    const leftProduct = finalValues.a * finalValues.d;
    const rightProduct = finalValues.b * finalValues.c;

    setResult({
      unknown,
      solution: solution.toFixed(4),
      proportion: `${finalValues.a.toFixed(2)} : ${finalValues.b.toFixed(2)} = ${finalValues.c.toFixed(2)} : ${finalValues.d.toFixed(2)}`,
      calculation: calculationSteps,
      verification: `${finalValues.a.toFixed(2)} × ${finalValues.d.toFixed(2)} = ${leftProduct.toFixed(4)}\n${finalValues.b.toFixed(2)} × ${finalValues.c.toFixed(2)} = ${rightProduct.toFixed(4)}`
    });
  };

  const resetCalculator = () => {
    setValueA('');
    setValueB('');
    setValueC('');
    setValueD('');
    setResult(null);
    setError('');
  };

  return (
    <>
      <Head>
        <title>Proportion Calculator - Solve Mathematical Proportions Online | Tools Portal</title>
        <meta name="description" content="Free online proportion calculator. Solve proportions and find missing values in equations (a:b = c:d). Includes step-by-step calculations, properties, and real-world examples." />
        <meta name="keywords" content="proportion calculator, solve proportions, ratio calculator, cross multiplication, math calculator, proportion solver, mathematical proportions" />
        <link rel="canonical" href="https://mariottimauro.eu/tools/proportion" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <ToolPageLayout
        title={t.title}
      subtitle={t.subtitle}
      icon={Calculator}
      iconBgColor="bg-gradient-to-br from-purple-500 to-indigo-600"
      language={language}
      changeLanguage={changeLanguage}
      backText={t.backToHome}
      backHref="/"
      footerTranslations={footerT}
      topAdSlot={process.env.NEXT_PUBLIC_BANNER_TOP}
      leftAdSlot={process.env.NEXT_PUBLIC_BANNER_LEFT}
      rightAdSlot={process.env.NEXT_PUBLIC_BANNER_RIGHT}
      bottomAdSlot={process.env.NEXT_PUBLIC_BANNER_BOTTOM}
      showTopAd={true}
      showLeftAd={true}
      showRightAd={true}
      showBottomAd={true}
    >
      {/* Calculator Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Calculator className="w-6 h-6 text-purple-600" />
          {t.calculator.title}
        </h2>
        <p className="text-gray-700 mb-6">{t.calculator.description}</p>

        {/* Proportion Formula Display */}
        <div className="bg-purple-50 rounded-xl p-6 mb-6 border border-purple-200">
          <div className="flex items-center justify-center gap-4 text-3xl font-bold text-purple-900">
            <span>a : b = c : d</span>
          </div>
        </div>

        {/* Input Grid */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t.calculator.inputA}
            </label>
            <input
              type="number"
              step="any"
              value={valueA}
              onChange={(e) => setValueA(e.target.value)}
              placeholder={valueA === '' ? t.calculator.placeholderUnknown : t.calculator.placeholderKnown}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors text-gray-900 placeholder:text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t.calculator.inputB}
            </label>
            <input
              type="number"
              step="any"
              value={valueB}
              onChange={(e) => setValueB(e.target.value)}
              placeholder={valueB === '' ? t.calculator.placeholderUnknown : t.calculator.placeholderKnown}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors text-gray-900 placeholder:text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t.calculator.inputC}
            </label>
            <input
              type="number"
              step="any"
              value={valueC}
              onChange={(e) => setValueC(e.target.value)}
              placeholder={valueC === '' ? t.calculator.placeholderUnknown : t.calculator.placeholderKnown}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors text-gray-900 placeholder:text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t.calculator.inputD}
            </label>
            <input
              type="number"
              step="any"
              value={valueD}
              onChange={(e) => setValueD(e.target.value)}
              placeholder={valueD === '' ? t.calculator.placeholderUnknown : t.calculator.placeholderKnown}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors text-gray-900 placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 mb-6">
            <p className="text-red-700 font-semibold">{error}</p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={calculateProportion}
            className="flex-1 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            {t.calculator.calculate}
          </button>
          <button
            onClick={resetCalculator}
            className="px-8 py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-xl transition-colors"
          >
            {t.calculator.reset}
          </button>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.results.title}</h2>

          <div className="space-y-4">
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <span className="text-sm font-semibold text-gray-700 block mb-2">{t.results.proportion}</span>
              <span className="text-2xl font-bold text-purple-600">{result.proportion}</span>
            </div>

            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <span className="text-sm font-semibold text-gray-700 block mb-2">{t.results.solution}</span>
              <span className="text-2xl font-bold text-emerald-600">{result.unknown} = {result.solution}</span>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <span className="text-sm font-semibold text-gray-700 block mb-2">{t.results.calculation}</span>
              <pre className="text-blue-900 font-mono text-sm whitespace-pre-wrap">{result.calculation}</pre>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-sm font-semibold text-gray-700 block mb-2">{t.results.verification}</span>
              <pre className="text-gray-900 font-mono text-sm whitespace-pre-wrap">{result.verification}</pre>
              <p className="text-xs text-gray-600 mt-2 italic">{t.results.explanation}</p>
            </div>
          </div>
        </div>
      )}

      {/* Introduction */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Info className="w-6 h-6 text-indigo-600" />
          {t.intro.title}
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">{t.intro.description}</p>

        <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-200 mb-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-900 mb-3 leading-tight">{t.intro.formula}</div>
            <p className="text-gray-700 text-sm mb-3 leading-relaxed">{t.intro.formulaAlt}</p>
            <div className="text-2xl font-bold text-indigo-800 leading-tight">{t.intro.formulaFraction}</div>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed">{t.intro.explanation}</p>
      </div>

      {/* Properties */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-600" />
          {t.properties.title}
        </h2>

        <div className="space-y-6">
          <div className="border-l-4 border-blue-500 bg-blue-50 rounded-r-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight">{t.properties.fundamental.title}</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">{t.properties.fundamental.description}</p>
            <div className="bg-white rounded-lg p-4 font-mono text-lg text-blue-900 mb-3 leading-relaxed">
              {t.properties.fundamental.formula}
            </div>
            <p className="text-sm text-gray-600 italic leading-relaxed">{t.properties.fundamental.explanation}</p>
          </div>

          <div className="border-l-4 border-green-500 bg-green-50 rounded-r-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight">{t.properties.invertendo.title}</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">{t.properties.invertendo.description}</p>
            <div className="bg-white rounded-lg p-4 font-mono text-sm text-green-900 mb-3 leading-relaxed">
              {t.properties.invertendo.formula}
            </div>
            <p className="text-sm text-gray-600 italic leading-relaxed">{t.properties.invertendo.explanation}</p>
          </div>

          <div className="border-l-4 border-purple-500 bg-purple-50 rounded-r-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight">{t.properties.componendo.title}</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">{t.properties.componendo.description}</p>
            <div className="bg-white rounded-lg p-4 font-mono text-sm text-purple-900 mb-3 leading-relaxed">
              {t.properties.componendo.formula}
            </div>
            <p className="text-sm text-gray-600 italic leading-relaxed">{t.properties.componendo.explanation}</p>
          </div>

          <div className="border-l-4 border-orange-500 bg-orange-50 rounded-r-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight">{t.properties.scomponendo.title}</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">{t.properties.scomponendo.description}</p>
            <div className="bg-white rounded-lg p-4 font-mono text-sm text-orange-900 mb-3 leading-relaxed">
              {t.properties.scomponendo.formula}
            </div>
            <p className="text-sm text-gray-600 italic leading-relaxed">{t.properties.scomponendo.explanation}</p>
          </div>
        </div>
      </div>

      {/* Examples */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-yellow-600" />
          {t.examples.title}
        </h2>

        <div className="space-y-6">
          {['example1', 'example2', 'example3', 'example4'].map((exKey, idx) => (
            <div key={exKey} className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 leading-tight">{t.examples[exKey].title}</h3>
              <div className="space-y-3 text-gray-700">
                <p className="font-semibold text-indigo-900 leading-relaxed">{t.examples[exKey].problem}</p>
                <p className="pl-4 border-l-2 border-indigo-300 leading-relaxed">{t.examples[exKey].setup}</p>
                <p className="pl-4 border-l-2 border-blue-300 leading-relaxed">{t.examples[exKey].solution}</p>
                <p className="pl-4 border-l-2 border-green-300 font-mono text-sm leading-relaxed">{t.examples[exKey].calculation}</p>
                <p className="pl-4 bg-emerald-50 rounded p-3 font-semibold text-emerald-900 leading-relaxed">{t.examples[exKey].answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Applications */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Target className="w-6 h-6 text-red-600" />
          {t.applications.title}
        </h2>
        <p className="text-gray-700 mb-6 leading-relaxed">{t.applications.description}</p>
        <ul className="grid md:grid-cols-2 gap-3">
          {t.applications.list.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-red-600 font-bold">•</span>
              <span className="text-gray-700 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl shadow-lg p-8 border border-amber-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.tips.title}</h2>
        <ul className="space-y-4">
          {['tip1', 'tip2', 'tip3', 'tip4', 'tip5'].map((tipKey, idx) => (
            <li key={tipKey} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                {idx + 1}
              </span>
              <span className="text-gray-700 pt-0.5 leading-relaxed">{t.tips[tipKey]}</span>
            </li>
          ))}
        </ul>
      </div>
    </ToolPageLayout>
    </>
  );
}
