'use client'
import { useState } from 'react';
import Head from 'next/head';
import { TrendingUp, Info, Calculator } from 'lucide-react';
import ToolPageLayout from '../../../components/ToolPageLayout';
import InvestmentInput from '../../../components/investment/InvestmentInput';
import FrequencySelector from '../../../components/investment/FrequencySelector';
import ResultsCard from '../../../components/investment/ResultsCard';
import FormulaDetails from '../../../components/investment/FormulaDetails';
import ChartDisplay from '../../../components/investment/ChartDisplay';
import { investmentTranslations } from '../../../locales/investment-translations';
import { translations } from '../../../locales/translations';
import { useLanguage } from '../../../hooks/useLanguage';
import {
  validateInvestmentInputs,
  getDepositsPerYear,
  calculateSimpleInterest,
  calculateCompoundInterest,
  generateChartData,
  formatCurrency,
  formatPercentage
} from '../../../utils/investmentCalculator';

export default function InvestmentCalculator() {
  const { language, changeLanguage } = useLanguage('en');

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Investment Interest Calculator",
    "url": "https://mariottimauro.eu/tools/investment",
    "description": "Calculate simple and compound interest on your investments. Free online investment calculator with recurring deposits.",
    "applicationCategory": "FinanceApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR"
    },
    "featureList": [
      "Simple interest calculation",
      "Compound interest calculation",
      "Recurring deposits support",
      "Interactive charts",
      "CSV and PDF export"
    ]
  };

  // State management
  const [showResults, setShowResults] = useState(false);
  const [showSimpleFormulaDetails, setShowSimpleFormulaDetails] = useState(false);
  const [showCompoundFormulaDetails, setShowCompoundFormulaDetails] = useState(false);
  const [initialInvestment, setInitialInvestment] = useState('10000');
  const [recurringDeposit, setRecurringDeposit] = useState('500');
  const [frequency, setFrequency] = useState('monthly');
  const [interestRate, setInterestRate] = useState('5');
  const [years, setYears] = useState('10');
  const [errors, setErrors] = useState({});
  const [results, setResults] = useState(null);
  const [chartData, setChartData] = useState([]);

  const t = investmentTranslations[language];
  const footerT = translations[language];

  // Calculate investment results
  const calculateInvestment = () => {
    const validationErrors = validateInvestmentInputs(
      { initialInvestment, recurringDeposit, interestRate, years },
      language
    );

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    const principal = parseFloat(initialInvestment) || 0;
    const deposit = parseFloat(recurringDeposit) || 0;
    const rate = (parseFloat(interestRate) || 0) / 100;
    const period = parseInt(years) || 1;
    const depositsPerYear = getDepositsPerYear(frequency);

    // Calculate simple interest
    const simpleResults = calculateSimpleInterest(principal, deposit, rate, period, depositsPerYear);

    // Calculate compound interest
    const compoundResults = calculateCompoundInterest(principal, deposit, rate, period, depositsPerYear);

    // Generate chart data
    const chartDataPoints = generateChartData(principal, deposit, rate, period, depositsPerYear);

    setResults({
      initialInvestment: principal,
      recurringDeposit: deposit,
      frequency,
      interestRate: parseFloat(interestRate),
      years: period,
      depositsPerYear,
      totalRecurringDeposits: simpleResults.totalRecurringDeposits,
      totalDeposits: simpleResults.totalDeposits,
      simpleInterestTotal: simpleResults.interestTotal,
      simpleTotal: simpleResults.finalAmount,
      compoundInterestTotal: compoundResults.interestTotal,
      compoundTotal: compoundResults.finalAmount
    });

    setChartData(chartDataPoints);
    setShowResults(true);
  };

  // Export to CSV
  const exportToCSV = () => {
    if (!results || !chartData.length) return;

    const headers = [
      language === 'it' ? 'Anno' : 'Year',
      language === 'it' ? 'Interesse Semplice' : 'Simple Interest',
      language === 'it' ? 'Interesse Composto' : 'Compound Interest',
      language === 'it' ? 'Differenza' : 'Difference'
    ];

    const rows = chartData.map(data => [
      data.year,
      data.simple.toFixed(2),
      data.compound.toFixed(2),
      (data.compound - data.simple).toFixed(2)
    ]);

    let csvContent = headers.join(',') + '\n';
    rows.forEach(row => {
      csvContent += row.join(',') + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `investment-calculator-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export to PDF
  const exportToPDF = () => {
    if (!results || !chartData.length) return;

    const svgElement = document.getElementById('investment-chart');
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBase64 = btoa(unescape(encodeURIComponent(svgData)));
    const svgDataUrl = `data:image/svg+xml;base64,${svgBase64}`;

    const printWindow = window.open('', '', 'height=800,width=800');

    const pdfContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>${t.title}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 40px;
            color: #333;
          }
          h1 {
            color: #4f46e5;
            border-bottom: 3px solid #4f46e5;
            padding-bottom: 10px;
            margin-bottom: 30px;
          }
          h2 {
            color: #1e293b;
            margin-top: 30px;
            margin-bottom: 15px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            page-break-inside: avoid;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
          }
          th {
            background-color: #4f46e5;
            color: white;
            font-weight: bold;
          }
          tr:nth-child(even) {
            background-color: #f8fafc;
          }
          .params {
            background-color: #f1f5f9;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            page-break-inside: avoid;
          }
          .params div {
            margin: 10px 0;
          }
          .label {
            font-weight: bold;
            display: inline-block;
            width: 250px;
          }
          .summary {
            background-color: #ecfdf5;
            padding: 15px;
            border-left: 4px solid #10b981;
            margin: 20px 0;
            page-break-inside: avoid;
          }
          .summary-simple {
            background-color: #eff6ff;
            border-left-color: #3b82f6;
          }
          .summary-compound {
            background-color: #ecfdf5;
            border-left-color: #10b981;
          }
          .chart-container {
            margin: 30px 0;
            page-break-inside: avoid;
            text-align: center;
          }
          .chart-container img {
            max-width: 100%;
            height: auto;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 10px;
            background: white;
          }
          @media print {
            body { padding: 20px; }
            .page-break { page-break-before: always; }
          }
        </style>
      </head>
      <body>
        <h1>${t.title}</h1>
        <p><strong>${language === 'it' ? 'Data' : 'Date'}:</strong> ${new Date().toLocaleDateString(language === 'it' ? 'it-IT' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <h2>${t.results.parameters}</h2>
        <div class="params">
          <div><span class="label">${t.form.initialInvestment}:</span> ${formatCurrency(results.initialInvestment, language)}</div>
          <div><span class="label">${t.form.recurringDeposit}:</span> ${formatCurrency(results.recurringDeposit, language)}</div>
          <div><span class="label">${t.form.frequency}:</span> ${t.form.frequencies[results.frequency]}</div>
          <div><span class="label">${t.form.interestRate}:</span> ${formatPercentage(results.interestRate)}</div>
          <div><span class="label">${t.form.years}:</span> ${results.years} ${language === 'it' ? 'anni' : 'years'}</div>
        </div>

        <h2>${t.results.statistics}</h2>
        <div class="params">
          <div><span class="label">${t.results.initialInvestment}:</span> ${formatCurrency(results.initialInvestment, language)}</div>
          <div><span class="label">${t.results.totalRecurringDeposits}:</span> ${formatCurrency(results.totalRecurringDeposits, language)}</div>
          <div><span class="label">${t.results.totalDeposits}:</span> ${formatCurrency(results.totalDeposits, language)}</div>
        </div>

        <div class="summary summary-simple">
          <h3>${t.results.simpleInterest.title}</h3>
          <div><span class="label">${t.results.simpleInterest.totalInterest}:</span> ${formatCurrency(results.simpleInterestTotal, language)}</div>
          <div><span class="label">${t.results.simpleInterest.finalAmount}:</span> ${formatCurrency(results.simpleTotal, language)}</div>
        </div>

        <div class="summary summary-compound">
          <h3>${t.results.compoundInterest.title}</h3>
          <div><span class="label">${t.results.compoundInterest.totalInterest}:</span> ${formatCurrency(results.compoundInterestTotal, language)}</div>
          <div><span class="label">${t.results.compoundInterest.finalAmount}:</span> ${formatCurrency(results.compoundTotal, language)}</div>
          <div style="margin-top: 15px; padding-top: 15px; border-top: 2px solid #10b981;">
            <span class="label">${language === 'it' ? 'Differenza' : 'Difference'}:</span>
            <strong>${formatCurrency(results.compoundInterestTotal - results.simpleInterestTotal, language)}</strong>
          </div>
        </div>

        <div class="page-break"></div>

        <h2>${t.results.chart.title}</h2>
        <div class="chart-container">
          <img src="${svgDataUrl}" alt="Investment Growth Chart" style="width: 100%; max-width: 900px;" />
        </div>

        <h2 style="margin-top: 40px;">${language === 'it' ? 'Dettaglio Anno per Anno' : 'Year by Year Details'}</h2>
        <table>
          <thead>
            <tr>
              <th>${t.results.chart.year}</th>
              <th>${t.results.chart.simpleInterest}</th>
              <th>${t.results.chart.compoundInterest}</th>
              <th>${language === 'it' ? 'Differenza' : 'Difference'}</th>
            </tr>
          </thead>
          <tbody>
            ${chartData.map(data => `
              <tr>
                <td>${data.year}</td>
                <td>${formatCurrency(data.simple, language)}</td>
                <td>${formatCurrency(data.compound, language)}</td>
                <td>${formatCurrency(data.compound - data.simple, language)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 12px;">
          <p>${t.disclaimer.text}</p>
          <p style="margin-top: 10px;">${language === 'it' ? 'Generato da' : 'Generated by'} ${window.location.hostname} - ${new Date().toLocaleString(language === 'it' ? 'it-IT' : 'en-US')}</p>
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
              setTimeout(function() { window.close(); }, 100);
            }, 500);
          }
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(pdfContent);
    printWindow.document.close();
  };

  return (
    <>
      <Head>
        <title>{t.metaTitle || 'Investment Interest Calculator - Simple & Compound Interest | Tools Portal'}</title>
        <meta name="description" content={t.metaDescription || 'Free online investment calculator. Calculate simple and compound interest with recurring deposits. Compare returns, visualize growth with charts, and export results to CSV or PDF.'} />
        <meta name="keywords" content="investment calculator, compound interest calculator, simple interest, financial calculator, investment growth, recurring deposits, interest calculator online" />
        <link rel="canonical" href="https://mariottimauro.eu/tools/investment" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <ToolPageLayout
        title={t.title}
        subtitle={t.subtitle}
        icon={TrendingUp}
        iconBgColor="bg-gradient-to-br from-emerald-500 to-green-600"
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
        {/* Introduction */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Info className="w-6 h-6 text-indigo-600" />
            {t.intro.title}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">{t.intro.description}</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t.intro.simpleInterest.title}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">{t.intro.simpleInterest.description}</p>
              <div className="bg-white rounded-lg p-4 font-mono text-sm text-gray-800 border border-blue-200">
                {t.intro.simpleInterest.formula}
              </div>
            </div>

            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t.intro.compoundInterest.title}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">{t.intro.compoundInterest.description}</p>
              <div className="bg-white rounded-lg p-4 font-mono text-sm text-gray-800 border border-emerald-200">
                {t.intro.compoundInterest.formula}
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-amber-900 mb-2">{t.disclaimer.title}</h3>
          <p className="text-amber-800 leading-relaxed">{t.disclaimer.text}</p>
        </div>

        {/* Calculator Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Calculator className="w-6 h-6 text-indigo-600" />
            {t.form.calculate}
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <InvestmentInput
              label={t.form.initialInvestment}
              value={initialInvestment}
              onChange={setInitialInvestment}
              placeholder={t.form.initialInvestmentPlaceholder}
              min="0"
              max="10000000"
              step="100"
              error={errors.initialInvestment}
            />

            <InvestmentInput
              label={t.form.recurringDeposit}
              value={recurringDeposit}
              onChange={setRecurringDeposit}
              placeholder={t.form.recurringDepositPlaceholder}
              min="0"
              max="1000000"
              step="10"
              error={errors.recurringDeposit}
            />

            <FrequencySelector
              label={t.form.frequency}
              value={frequency}
              onChange={setFrequency}
              frequencies={t.form.frequencies}
            />

            <InvestmentInput
              label={t.form.interestRate}
              value={interestRate}
              onChange={setInterestRate}
              placeholder={t.form.interestRatePlaceholder}
              min="0"
              max="100"
              step="0.1"
              error={errors.interestRate}
            />

            <div className="md:col-span-2">
              <InvestmentInput
                label={t.form.years}
                value={years}
                onChange={setYears}
                placeholder={t.form.yearsPlaceholder}
                min="1"
                max="100"
                step="1"
                error={errors.years}
              />
            </div>
          </div>

          <button
            onClick={calculateInvestment}
            className="w-full px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            {t.form.calculate}
          </button>
        </div>

        {/* Results */}
        {showResults && results && (
          <div className="space-y-8">
            {/* Parameters */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t.results.parameters}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">{t.form.initialInvestment}</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(results.initialInvestment, language)}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">{t.form.recurringDeposit}</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(results.recurringDeposit, language)}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">{t.form.frequency}</span>
                  <span className="font-semibold text-gray-900">{t.form.frequencies[results.frequency]}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">{t.form.interestRate}</span>
                  <span className="font-semibold text-gray-900">{formatPercentage(results.interestRate)}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg md:col-span-2">
                  <span className="text-gray-700">{t.form.years}</span>
                  <span className="font-semibold text-gray-900">{results.years} {language === 'it' ? 'anni' : 'years'}</span>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t.results.statistics}</h2>

              <div className="space-y-4 mb-8">
                <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-900">{t.results.initialInvestment}</span>
                    <span className="text-xl font-semibold text-indigo-600">{formatCurrency(results.initialInvestment, language)}</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{t.explanations.initialInvestment.text}</p>
                </div>

                <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-900">{t.results.totalRecurringDeposits}</span>
                    <span className="text-xl font-semibold text-indigo-600">{formatCurrency(results.totalRecurringDeposits, language)}</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed mb-2">{t.explanations.totalRecurringDeposits.text}</p>
                  <div className="bg-white rounded p-2 text-xs font-mono text-gray-700">
                    {t.explanations.totalRecurringDeposits.formula}
                  </div>
                </div>

                <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-900">{t.results.totalDeposits}</span>
                    <span className="text-xl font-semibold text-indigo-600">{formatCurrency(results.totalDeposits, language)}</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed mb-2">{t.explanations.totalDeposits.text}</p>
                  <div className="bg-white rounded p-2 text-xs font-mono text-gray-700">
                    {t.explanations.totalDeposits.formula}
                  </div>
                </div>
              </div>

              {/* Simple Interest */}
              <div className="mb-8">
                <ResultsCard
                  title={t.results.simpleInterest.title}
                  explanation={t.results.simpleInterest.explanation}
                  formula={t.results.simpleInterest.formula}
                  totalInterest={results.simpleInterestTotal}
                  finalAmount={results.simpleTotal}
                  totalDeposits={results.totalDeposits}
                  language={language}
                  bgColor="bg-blue-50"
                  borderColor="border-blue-200"
                  textColor="text-blue-600"
                  showFormulaDetails={showSimpleFormulaDetails}
                  onToggleFormulaDetails={() => setShowSimpleFormulaDetails(!showSimpleFormulaDetails)}
                  formulaDetailsComponent={
                    <FormulaDetails
                      formulaDetailed={t.results.simpleInterest.formulaDetailed}
                      language={language}
                      type="simple"
                    />
                  }
                />
              </div>

              {/* Compound Interest */}
              <ResultsCard
                title={t.results.compoundInterest.title}
                explanation={t.results.compoundInterest.explanation}
                formula={t.results.compoundInterest.formula}
                totalInterest={results.compoundInterestTotal}
                finalAmount={results.compoundTotal}
                totalDeposits={results.totalDeposits}
                difference={results.compoundInterestTotal - results.simpleInterestTotal}
                language={language}
                bgColor="bg-emerald-50"
                borderColor="border-emerald-200"
                textColor="text-emerald-600"
                showFormulaDetails={showCompoundFormulaDetails}
                onToggleFormulaDetails={() => setShowCompoundFormulaDetails(!showCompoundFormulaDetails)}
                formulaDetailsComponent={
                  <FormulaDetails
                    formulaDetailed={t.results.compoundInterest.formulaDetailed}
                    language={language}
                    type="compound"
                  />
                }
              />
            </div>

            {/* Chart */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">{t.results.chart.title}</h2>
                <div className="flex gap-3">
                  <button
                    onClick={exportToCSV}
                    className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    CSV
                  </button>
                  <button
                    onClick={exportToPDF}
                    className="flex-1 sm:flex-none px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    PDF
                  </button>
                </div>
              </div>

              <ChartDisplay
                chartData={chartData}
                results={results}
                language={language}
                translations={t.results.chart}
              />

              {/* Data Table */}
              <div className="mt-8 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">{t.results.chart.year}</th>
                      <th className="text-right py-3 px-4 font-semibold text-blue-600">{t.results.chart.simpleInterest}</th>
                      <th className="text-right py-3 px-4 font-semibold text-emerald-600">{t.results.chart.compoundInterest}</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">{language === 'it' ? 'Differenza' : 'Difference'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chartData.map((data, index) => (
                      <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{data.year}</td>
                        <td className="py-3 px-4 text-right text-blue-600">{formatCurrency(data.simple, language)}</td>
                        <td className="py-3 px-4 text-right text-emerald-600">{formatCurrency(data.compound, language)}</td>
                        <td className="py-3 px-4 text-right font-semibold">{formatCurrency(data.compound - data.simple, language)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </ToolPageLayout>
    </>
  );
}
