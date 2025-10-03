'use client'
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Calculator, Info, BookOpen, Lightbulb, Target } from 'lucide-react';
import ToolPageLayout from '../../../components/ToolPageLayout';
import ProportionInput from '../../../components/proportion/ProportionInput';
import ResultCard from '../../../components/proportion/ResultCard';
import PropertyCard from '../../../components/proportion/PropertyCard';
import ExampleCard from '../../../components/proportion/ExampleCard';
import { proportionTranslations } from '../../../locales/proportion-translations';
import { translations } from '../../../locales/translations';
import { useLanguage } from '../../../hooks/useLanguage';
import {
  validateProportionInputs,
  calculateProportion,
  formatProportionResult
} from '../../../utils/proportionCalculator';

export default function ProportionCalculator() {
  const { language, changeLanguage } = useLanguage('en');
  const t = proportionTranslations[language];
  const footerT = translations[language];

  // Form state
  const [valueA, setValueA] = useState('');
  const [valueB, setValueB] = useState('');
  const [valueC, setValueC] = useState('');
  const [valueD, setValueD] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  // SEO structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": t.metaTitle,
    "url": "https://mariottimauro.eu/tools/proportion",
    "description": t.metaDescription,
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

  const handleCalculate = () => {
    setError('');
    setResult(null);

    // Validate inputs
    const validation = validateProportionInputs([valueA, valueB, valueC, valueD]);
    if (!validation.isValid) {
      setError(t.calculator.error[validation.error]);
      return;
    }

    // Parse values
    const a = valueA === '' ? null : parseFloat(valueA);
    const b = valueB === '' ? null : parseFloat(valueB);
    const c = valueC === '' ? null : parseFloat(valueC);
    const d = valueD === '' ? null : parseFloat(valueD);

    // Calculate proportion
    const calcResult = calculateProportion(a, b, c, d);
    if (calcResult.error) {
      setError(t.calculator.error[calcResult.error]);
      return;
    }

    // Format and set result
    const formattedResult = formatProportionResult(
      { a, b, c, d },
      calcResult.unknown,
      calcResult.solution,
      calcResult.calculationSteps
    );
    setResult(formattedResult);
  };

  const handleReset = () => {
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
        <title>{t.metaTitle} | Tools Portal</title>
        <meta name="description" content={t.metaDescription} />
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
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calculator className="w-6 h-6 text-purple-600" />
            {t.calculator.title}
          </h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            {t.calculator.description}
          </p>

          {/* Formula Display */}
          <div className="bg-purple-50 rounded-xl p-6 mb-6 border border-purple-200">
            <div className="flex items-center justify-center text-3xl font-semibold text-purple-900">
              a : b = c : d
            </div>
          </div>

          {/* Input Grid */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <ProportionInput
              label={t.calculator.inputA}
              value={valueA}
              onChange={setValueA}
              placeholder={valueA === '' ? t.calculator.placeholderUnknown : t.calculator.placeholderKnown}
            />
            <ProportionInput
              label={t.calculator.inputB}
              value={valueB}
              onChange={setValueB}
              placeholder={valueB === '' ? t.calculator.placeholderUnknown : t.calculator.placeholderKnown}
            />
            <ProportionInput
              label={t.calculator.inputC}
              value={valueC}
              onChange={setValueC}
              placeholder={valueC === '' ? t.calculator.placeholderUnknown : t.calculator.placeholderKnown}
            />
            <ProportionInput
              label={t.calculator.inputD}
              value={valueD}
              onChange={setValueD}
              placeholder={valueD === '' ? t.calculator.placeholderUnknown : t.calculator.placeholderKnown}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 mb-6">
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleCalculate}
              className="flex-1 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              {t.calculator.calculate}
            </button>
            <button
              onClick={handleReset}
              className="px-8 py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl transition-colors"
            >
              {t.calculator.reset}
            </button>
          </div>
        </section>

        {/* Results */}
        {result && <ResultCard result={result} translations={t} />}

        {/* Introduction */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Info className="w-6 h-6 text-indigo-600" />
            {t.intro.title}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            {t.intro.description}
          </p>

          <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-200 mb-4">
            <div className="text-center">
              <div className="text-3xl font-semibold text-indigo-900 mb-3">
                {t.intro.formula}
              </div>
              <p className="text-gray-700 text-sm mb-3">
                {t.intro.formulaAlt}
              </p>
              <div className="text-2xl font-semibold text-indigo-800">
                {t.intro.formulaFraction}
              </div>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed">
            {t.intro.explanation}
          </p>
        </section>

        {/* Properties */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-600" />
            {t.properties.title}
          </h2>

          <div className="space-y-6">
            <PropertyCard
              property={t.properties.fundamental}
              borderColor="border-blue-500"
              bgColor="bg-blue-50"
            />
            <PropertyCard
              property={t.properties.invertendo}
              borderColor="border-green-500"
              bgColor="bg-green-50"
            />
            <PropertyCard
              property={t.properties.componendo}
              borderColor="border-purple-500"
              bgColor="bg-purple-50"
            />
            <PropertyCard
              property={t.properties.scomponendo}
              borderColor="border-orange-500"
              bgColor="bg-orange-50"
            />
          </div>
        </section>

        {/* Examples */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-yellow-600" />
            {t.examples.title}
          </h2>

          <div className="space-y-6">
            {['example1', 'example2', 'example3', 'example4'].map((exKey) => (
              <ExampleCard key={exKey} example={t.examples[exKey]} />
            ))}
          </div>
        </section>

        {/* Applications */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Target className="w-6 h-6 text-red-600" />
            {t.applications.title}
          </h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            {t.applications.description}
          </p>
          <ul className="grid md:grid-cols-2 gap-3">
            {t.applications.list.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-red-600 font-semibold">•</span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Tips */}
        <section className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl shadow-lg p-8 border border-amber-200">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            {t.tips.title}
          </h2>
          <ul className="space-y-4">
            {['tip1', 'tip2', 'tip3', 'tip4', 'tip5'].map((tipKey, idx) => (
              <li key={tipKey} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  {idx + 1}
                </span>
                <span className="text-gray-700 pt-0.5 leading-relaxed">
                  {t.tips[tipKey]}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </ToolPageLayout>
    </>
  );
}
