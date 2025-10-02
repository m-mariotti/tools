'use client'
import { useState, useEffect } from 'react';
import { TrendingUp, Info, Calculator, ChevronDown, ChevronUp } from 'lucide-react';
import ToolPageLayout from '../../../components/ToolPageLayout';
import { investmentTranslations } from '../../../locales/investment-translations';
import { translations } from '../../../locales/translations';
import { useRouter } from 'next/navigation';

export default function InvestmentCalculator() {
  const [language, setLanguage] = useState('en');
  const [showResults, setShowResults] = useState(false);
  const [showSimpleFormulaDetails, setShowSimpleFormulaDetails] = useState(false);
  const [showCompoundFormulaDetails, setShowCompoundFormulaDetails] = useState(false);
  
  // Form inputs
  const [initialInvestment, setInitialInvestment] = useState('10000');
  const [recurringDeposit, setRecurringDeposit] = useState('500');
  const [frequency, setFrequency] = useState('monthly');
  const [interestRate, setInterestRate] = useState('5');
  const [years, setYears] = useState('10');
  
  // Validation errors
  const [errors, setErrors] = useState({});
  
  // Results
  const [results, setResults] = useState(null);
  const [chartData, setChartData] = useState([]);
  const router = useRouter();
  
  // Funzione di validazione
  const validateInputs = () => {
    const newErrors = {};
    
    const principal = parseFloat(initialInvestment);
    const deposit = parseFloat(recurringDeposit);
    const rate = parseFloat(interestRate);
    const period = parseInt(years);
    
    if (!principal || principal < 0 || principal > 10000000) {
      newErrors.initialInvestment = language === 'it' 
        ? 'Inserisci un importo tra €0 e €10.000.000' 
        : 'Enter an amount between €0 and €10,000,000';
    }
    
    if (deposit < 0 || deposit > 1000000) {
      newErrors.recurringDeposit = language === 'it'
        ? 'Inserisci un importo tra €0 e €1.000.000'
        : 'Enter an amount between €0 and €1,000,000';
    }
    
    if (!rate || rate < 0 || rate > 100) {
      newErrors.interestRate = language === 'it'
        ? 'Inserisci un tasso tra 0% e 100%'
        : 'Enter a rate between 0% and 100%';
    }
    
    if (!period || period < 1 || period > 100) {
      newErrors.years = language === 'it'
        ? 'Inserisci un periodo tra 1 e 100 anni'
        : 'Enter a period between 1 and 100 years';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Carica la lingua salvata
  useEffect(() => {
    const savedLanguage = localStorage.getItem('siteLanguage') || 'en';
    setLanguage(savedLanguage);
  }, []);

  // Ascolta i cambi di lingua
  useEffect(() => {
    const handleLanguageChange = (e) => {
      setLanguage(e.detail.language);
    };
    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('siteLanguage', lang);
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language: lang } 
    }));
  };
  
  const t = investmentTranslations[language];
  const footerT = translations[language];

  // Funzione per calcolare i risultati
  const calculateInvestment = () => {
    // Valida gli input prima di calcolare
    if (!validateInputs()) {
      return;
    }
    
    const principal = parseFloat(initialInvestment) || 0;
    const deposit = parseFloat(recurringDeposit) || 0;
    const rate = (parseFloat(interestRate) || 0) / 100;
    const period = parseInt(years) || 1;
    
    // Calcola depositi per anno in base alla frequenza
    const depositsPerYear = frequency === 'weekly' ? 52 : frequency === 'monthly' ? 12 : 1;
    const totalRecurringDeposits = deposit * depositsPerYear * period;
    const totalDeposits = principal + totalRecurringDeposits;
    
    // CALCOLO INTERESSE SEMPLICE CORRETTO
    let simpleInterestTotal = principal * rate * period;
    
    const totalDepositsCount = depositsPerYear * period;
    for (let i = 1; i <= totalDepositsCount; i++) {
      const yearsRemaining = (totalDepositsCount - i) / depositsPerYear;
      simpleInterestTotal += deposit * rate * yearsRemaining;
    }
    
    const simpleTotal = totalDeposits + simpleInterestTotal;
    
    // CALCOLO INTERESSE COMPOSTO CORRETTO
    let compoundTotal = principal;
    
    const periodicRate = rate / depositsPerYear;
    const totalPeriods = depositsPerYear * period;
    
    compoundTotal = principal * Math.pow(1 + periodicRate, totalPeriods);
    
    for (let i = 1; i <= totalPeriods; i++) {
      const periodsRemaining = totalPeriods - i;
      compoundTotal += deposit * Math.pow(1 + periodicRate, periodsRemaining);
    }
    
    const compoundInterestTotal = compoundTotal - totalDeposits;
    
    // Genera dati per il grafico
    const chartDataPoints = [];
    for (let year = 0; year <= period; year++) {
      let simpleYearInterest = principal * rate * year;
      const depositsUpToYear = depositsPerYear * year;
      
      for (let i = 1; i <= depositsUpToYear; i++) {
        const yearsForThisDeposit = (depositsUpToYear - i) / depositsPerYear;
        simpleYearInterest += deposit * rate * yearsForThisDeposit;
      }
      
      const simpleAmount = principal + (deposit * depositsUpToYear) + simpleYearInterest;
      
      let compoundYearTotal = principal;
      const periodicRate = rate / depositsPerYear;
      const periodsInYear = depositsPerYear * year;
      
      compoundYearTotal = principal * Math.pow(1 + periodicRate, periodsInYear);
      
      for (let i = 1; i <= periodsInYear; i++) {
        const periodsRemaining = periodsInYear - i;
        compoundYearTotal += deposit * Math.pow(1 + periodicRate, periodsRemaining);
      }
      
      const compoundAmount = compoundYearTotal;
      
      chartDataPoints.push({
        year,
        simple: Math.round(simpleAmount * 100) / 100,
        compound: Math.round(compoundAmount * 100) / 100
      });
    }
    
    setResults({
      initialInvestment: principal,
      recurringDeposit: deposit,
      frequency,
      interestRate: parseFloat(interestRate),
      years: period,
      depositsPerYear,
      totalRecurringDeposits,
      totalDeposits,
      simpleInterestTotal,
      simpleTotal,
      compoundInterestTotal,
      compoundTotal
    });
    
    setChartData(chartDataPoints);
    setShowResults(true);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat(language === 'it' ? 'it-IT' : 'en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    }).format(value);
  };

  const formatPercentage = (value) => {
    return `${value.toFixed(2)}%`;
  };

  // Funzione per esportare in CSV
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

  // Funzione per esportare in PDF
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
          <div><span class="label">${t.form.initialInvestment}:</span> ${formatCurrency(results.initialInvestment)}</div>
          <div><span class="label">${t.form.recurringDeposit}:</span> ${formatCurrency(results.recurringDeposit)}</div>
          <div><span class="label">${t.form.frequency}:</span> ${t.form.frequencies[results.frequency]}</div>
          <div><span class="label">${t.form.interestRate}:</span> ${formatPercentage(results.interestRate)}</div>
          <div><span class="label">${t.form.years}:</span> ${results.years} ${language === 'it' ? 'anni' : 'years'}</div>
        </div>

        <h2>${t.results.statistics}</h2>
        <div class="params">
          <div><span class="label">${t.results.initialInvestment}:</span> ${formatCurrency(results.initialInvestment)}</div>
          <div><span class="label">${t.results.totalRecurringDeposits}:</span> ${formatCurrency(results.totalRecurringDeposits)}</div>
          <div><span class="label">${t.results.totalDeposits}:</span> ${formatCurrency(results.totalDeposits)}</div>
        </div>

        <div class="summary summary-simple">
          <h3>${t.results.simpleInterest.title}</h3>
          <div><span class="label">${t.results.simpleInterest.totalInterest}:</span> ${formatCurrency(results.simpleInterestTotal)}</div>
          <div><span class="label">${t.results.simpleInterest.finalAmount}:</span> ${formatCurrency(results.simpleTotal)}</div>
        </div>

        <div class="summary summary-compound">
          <h3>${t.results.compoundInterest.title}</h3>
          <div><span class="label">${t.results.compoundInterest.totalInterest}:</span> ${formatCurrency(results.compoundInterestTotal)}</div>
          <div><span class="label">${t.results.compoundInterest.finalAmount}:</span> ${formatCurrency(results.compoundTotal)}</div>
          <div style="margin-top: 15px; padding-top: 15px; border-top: 2px solid #10b981;">
            <span class="label">${language === 'it' ? 'Differenza' : 'Difference'}:</span> 
            <strong>${formatCurrency(results.compoundInterestTotal - results.simpleInterestTotal)}</strong>
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
                <td>${formatCurrency(data.simple)}</td>
                <td>${formatCurrency(data.compound)}</td>
                <td>${formatCurrency(data.compound - data.simple)}</td>
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
      // Configurazione Ad Slots - SOSTITUISCI CON I TUOI VERI SLOT ID
      topAdSlot="1234567890"
      leftAdSlot="2345678901"
      rightAdSlot="3456789012"
      bottomAdSlot="4567890123"
      showTopAd={true}
      showLeftAd={true}
      showRightAd={true}
      showBottomAd={true}
    >
      {/* Introduction */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Info className="w-6 h-6 text-indigo-600" />
          {t.intro.title}
        </h2>
        <p className="text-gray-700 leading-relaxed mb-6">{t.intro.description}</p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-lg font-bold text-gray-900 mb-3">{t.intro.simpleInterest.title}</h3>
            <p className="text-gray-700 mb-4">{t.intro.simpleInterest.description}</p>
            <div className="bg-white rounded-lg p-4 font-mono text-sm text-gray-800 border border-blue-200">
              {t.intro.simpleInterest.formula}
            </div>
          </div>
          
          <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
            <h3 className="text-lg font-bold text-gray-900 mb-3">{t.intro.compoundInterest.title}</h3>
            <p className="text-gray-700 mb-4">{t.intro.compoundInterest.description}</p>
            <div className="bg-white rounded-lg p-4 font-mono text-sm text-gray-800 border border-emerald-200">
              {t.intro.compoundInterest.formula}
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-bold text-amber-900 mb-2">{t.disclaimer.title}</h3>
        <p className="text-amber-800 leading-relaxed">{t.disclaimer.text}</p>
      </div>

      {/* Calculator Form */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Calculator className="w-6 h-6 text-indigo-600" />
          {t.form.calculate}
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t.form.initialInvestment}
            </label>
            <input
              type="number"
              min="0"
              max="10000000"
              step="100"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(e.target.value)}
              placeholder={t.form.initialInvestmentPlaceholder}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors text-gray-900 placeholder:text-gray-500 ${
                errors.initialInvestment
                  ? 'border-red-500 focus:border-red-600'
                  : 'border-gray-200 focus:border-indigo-500'
              }`}
            />
            {errors.initialInvestment && (
              <p className="text-red-600 text-xs mt-1">{errors.initialInvestment}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t.form.recurringDeposit}
            </label>
            <input
              type="number"
              min="0"
              max="1000000"
              step="10"
              value={recurringDeposit}
              onChange={(e) => setRecurringDeposit(e.target.value)}
              placeholder={t.form.recurringDepositPlaceholder}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors text-gray-900 placeholder:text-gray-500 ${
                errors.recurringDeposit
                  ? 'border-red-500 focus:border-red-600'
                  : 'border-gray-200 focus:border-indigo-500'
              }`}
            />
            {errors.recurringDeposit && (
              <p className="text-red-600 text-xs mt-1">{errors.recurringDeposit}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t.form.frequency}
            </label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors text-gray-900"
            >
              <option value="weekly">{t.form.frequencies.weekly}</option>
              <option value="monthly">{t.form.frequencies.monthly}</option>
              <option value="yearly">{t.form.frequencies.yearly}</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t.form.interestRate}
            </label>
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder={t.form.interestRatePlaceholder}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors text-gray-900 placeholder:text-gray-500 ${
                errors.interestRate
                  ? 'border-red-500 focus:border-red-600'
                  : 'border-gray-200 focus:border-indigo-500'
              }`}
            />
            {errors.interestRate && (
              <p className="text-red-600 text-xs mt-1">{errors.interestRate}</p>
            )}
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t.form.years}
            </label>
            <input
              type="number"
              min="1"
              max="100"
              step="1"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder={t.form.yearsPlaceholder}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors text-gray-900 placeholder:text-gray-500 ${
                errors.years
                  ? 'border-red-500 focus:border-red-600'
                  : 'border-gray-200 focus:border-indigo-500'
              }`}
            />
            {errors.years && (
              <p className="text-red-600 text-xs mt-1">{errors.years}</p>
            )}
          </div>
        </div>
        
        <button
          onClick={calculateInvestment}
          className="w-full px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
        >
          {t.form.calculate}
        </button>
      </div>

      {/* Results */}
      {showResults && results && (
        <div className="space-y-8">
          {/* Parameters */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.results.parameters}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-700">{t.form.initialInvestment}</span>
                <span className="font-bold text-gray-900">{formatCurrency(results.initialInvestment)}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-700">{t.form.recurringDeposit}</span>
                <span className="font-bold text-gray-900">{formatCurrency(results.recurringDeposit)}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-700">{t.form.frequency}</span>
                <span className="font-bold text-gray-900">{t.form.frequencies[results.frequency]}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-700">{t.form.interestRate}</span>
                <span className="font-bold text-gray-900">{formatPercentage(results.interestRate)}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg md:col-span-2">
                <span className="text-gray-700">{t.form.years}</span>
                <span className="font-bold text-gray-900">{results.years} {language === 'it' ? 'anni' : 'years'}</span>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.results.statistics}</h2>
            
            <div className="space-y-4 mb-8">
              <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-900">{t.results.initialInvestment}</span>
                  <span className="text-xl font-bold text-indigo-600">{formatCurrency(results.initialInvestment)}</span>
                </div>
                <p className="text-sm text-gray-700">{t.explanations.initialInvestment.text}</p>
              </div>
              
              <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-900">{t.results.totalRecurringDeposits}</span>
                  <span className="text-xl font-bold text-indigo-600">{formatCurrency(results.totalRecurringDeposits)}</span>
                </div>
                <p className="text-sm text-gray-700 mb-2">{t.explanations.totalRecurringDeposits.text}</p>
                <div className="bg-white rounded p-2 text-xs font-mono text-gray-700">
                  {t.explanations.totalRecurringDeposits.formula}
                </div>
              </div>
              
              <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-900">{t.results.totalDeposits}</span>
                  <span className="text-xl font-bold text-indigo-600">{formatCurrency(results.totalDeposits)}</span>
                </div>
                <p className="text-sm text-gray-700 mb-2">{t.explanations.totalDeposits.text}</p>
                <div className="bg-white rounded p-2 text-xs font-mono text-gray-700">
                  {t.explanations.totalDeposits.formula}
                </div>
              </div>
            </div>

            {/* Simple Interest */}
            <div className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t.results.simpleInterest.title}</h3>
              <p className="text-gray-700 mb-4">{t.results.simpleInterest.explanation}</p>
              
              <div className="bg-white rounded-lg p-3 mb-2 font-mono text-sm text-gray-800">
                {t.results.simpleInterest.formula}
              </div>
              
              <button
                onClick={() => setShowSimpleFormulaDetails(!showSimpleFormulaDetails)}
                className="flex items-center gap-2 text-blue-700 hover:text-blue-800 font-semibold text-sm mb-4 transition-colors"
              >
                {showSimpleFormulaDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                {language === 'it' ? 'Mostra spiegazione dettagliata' : 'Show detailed explanation'}
              </button>
              
              {showSimpleFormulaDetails && (
                <div className="bg-blue-100 rounded-lg p-4 mb-4 text-sm space-y-3">
                  <h4 className="font-bold text-gray-900">{t.results.simpleInterest.formulaDetailed.title}</h4>
                  <div className="bg-white rounded p-3 font-mono text-gray-800">
                    {t.results.simpleInterest.formulaDetailed.mainFormula}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">{t.results.simpleInterest.formulaDetailed.where}</p>
                    <ul className="space-y-1 text-gray-700">
                      <li>• {t.results.simpleInterest.formulaDetailed.params.p}</li>
                      <li>• {t.results.simpleInterest.formulaDetailed.params.r}</li>
                      <li>• {t.results.simpleInterest.formulaDetailed.params.t}</li>
                      <li>• {t.results.simpleInterest.formulaDetailed.params.pmt}</li>
                      <li>• {t.results.simpleInterest.formulaDetailed.params.tRemaining}</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 rounded p-3">
                    <p className="text-gray-700">{t.results.simpleInterest.formulaDetailed.example}</p>
                  </div>
                </div>
              )}
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-lg">
                  <span className="text-sm text-gray-700 block mb-1">{t.results.simpleInterest.totalInterest}</span>
                  <span className="text-2xl font-bold text-blue-600">{formatCurrency(results.simpleInterestTotal)}</span>
                  <span className="text-xs text-gray-600 block mt-1">
                    ({formatPercentage((results.simpleInterestTotal / results.totalDeposits) * 100)})
                  </span>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <span className="text-sm text-gray-700 block mb-1">{t.results.simpleInterest.finalAmount}</span>
                  <span className="text-2xl font-bold text-blue-600">{formatCurrency(results.simpleTotal)}</span>
                </div>
              </div>
            </div>

            {/* Compound Interest */}
            <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t.results.compoundInterest.title}</h3>
              <p className="text-gray-700 mb-4">{t.results.compoundInterest.explanation}</p>
              
              <div className="bg-white rounded-lg p-3 mb-2 font-mono text-sm text-gray-800">
                {t.results.compoundInterest.formula}
              </div>
              
              <button
                onClick={() => setShowCompoundFormulaDetails(!showCompoundFormulaDetails)}
                className="flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-semibold text-sm mb-4 transition-colors"
              >
                {showCompoundFormulaDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                {language === 'it' ? 'Mostra spiegazione dettagliata' : 'Show detailed explanation'}
              </button>
              
              {showCompoundFormulaDetails && (
                <div className="bg-emerald-100 rounded-lg p-4 mb-4 text-sm space-y-3">
                  <h4 className="font-bold text-gray-900">{t.results.compoundInterest.formulaDetailed.title}</h4>
                  <div className="bg-white rounded p-3 font-mono text-gray-800 overflow-x-auto">
                    {t.results.compoundInterest.formulaDetailed.mainFormula}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">{t.results.compoundInterest.formulaDetailed.where}</p>
                    <ul className="space-y-1 text-gray-700">
                      <li>• {t.results.compoundInterest.formulaDetailed.params.fv}</li>
                      <li>• {t.results.compoundInterest.formulaDetailed.params.p}</li>
                      <li>• {t.results.compoundInterest.formulaDetailed.params.r}</li>
                      <li>• {t.results.compoundInterest.formulaDetailed.params.n}</li>
                      <li>• {t.results.compoundInterest.formulaDetailed.params.t}</li>
                      <li>• {t.results.compoundInterest.formulaDetailed.params.pmt}</li>
                      <li>• {t.results.compoundInterest.formulaDetailed.params.remainingPeriods}</li>
                      <li>• {t.results.compoundInterest.formulaDetailed.params.sigma}</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">{t.results.compoundInterest.formulaDetailed.breakdown.title}</p>
                    <div className="space-y-2">
                      <div className="bg-white rounded p-3">
                        <p className="font-semibold text-emerald-900">{t.results.compoundInterest.formulaDetailed.breakdown.part1.title}</p>
                        <p className="text-gray-700 text-xs mt-1">{t.results.compoundInterest.formulaDetailed.breakdown.part1.desc}</p>
                      </div>
                      <div className="bg-white rounded p-3">
                        <p className="font-semibold text-emerald-900">{t.results.compoundInterest.formulaDetailed.breakdown.part2.title}</p>
                        <p className="text-gray-700 text-xs mt-1">{t.results.compoundInterest.formulaDetailed.breakdown.part2.desc}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-emerald-50 rounded p-3">
                    <p className="font-semibold text-gray-900 mb-2">{t.results.compoundInterest.formulaDetailed.example.title}</p>
                    <p className="text-gray-700 mb-2">{t.results.compoundInterest.formulaDetailed.example.scenario}</p>
                    <ol className="space-y-1 text-gray-700 text-xs">
                      {t.results.compoundInterest.formulaDetailed.example.steps.map((step, idx) => (
                        <li key={idx}>• {step}</li>
                      ))}
                    </ol>
                  </div>
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded p-3">
                    <p className="text-gray-800 text-xs"><strong>{language === 'it' ? 'Nota:' : 'Note:'}</strong> {t.results.compoundInterest.formulaDetailed.note}</p>
                  </div>
                </div>
              )}
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-lg">
                  <span className="text-sm text-gray-700 block mb-1">{t.results.compoundInterest.totalInterest}</span>
                  <span className="text-2xl font-bold text-emerald-600">{formatCurrency(results.compoundInterestTotal)}</span>
                  <span className="text-xs text-gray-600 block mt-1">
                    ({formatPercentage((results.compoundInterestTotal / results.totalDeposits) * 100)})
                  </span>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <span className="text-sm text-gray-700 block mb-1">{t.results.compoundInterest.finalAmount}</span>
                  <span className="text-2xl font-bold text-emerald-600">{formatCurrency(results.compoundTotal)}</span>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-emerald-100 rounded-lg">
                <p className="text-sm font-semibold text-emerald-900">
                  💡 {language === 'it' ? 'Differenza' : 'Difference'}: {formatCurrency(results.compoundInterestTotal - results.simpleInterestTotal)}
                </p>
                <p className="text-xs text-emerald-800 mt-1">
                  {language === 'it' 
                    ? 'Guadagno aggiuntivo con interesse composto rispetto all\'interesse semplice'
                    : 'Additional earnings with compound interest compared to simple interest'}
                </p>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{t.results.chart.title}</h2>
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
            <div className="w-full">
              {/* Chart Legend */}
              <div className="flex gap-6 mb-6 justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span className="text-sm font-medium text-gray-700">{t.results.chart.simpleInterest}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-emerald-500 rounded"></div>
                  <span className="text-sm font-medium text-gray-700">{t.results.chart.compoundInterest}</span>
                </div>
              </div>
              
              {/* SVG Bar Chart - Responsive */}
              <svg 
                id="investment-chart"
                viewBox="0 0 1000 500" 
                className="w-full h-auto" 
                style={{ maxHeight: '500px' }}
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Y-axis */}
                <line x1="80" y1="20" x2="80" y2="420" stroke="#9ca3af" strokeWidth="2" />
                
                {/* X-axis */}
                <line x1="80" y1="420" x2="950" y2="420" stroke="#9ca3af" strokeWidth="2" />
                
                {/* Y-axis labels and grid lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((factor, i) => {
                  const maxValue = Math.max(results.simpleTotal, results.compoundTotal);
                  const value = maxValue * (1 - factor);
                  const y = 20 + (400 * factor);
                  
                  return (
                    <g key={i}>
                      <line x1="75" y1={y} x2="80" y2={y} stroke="#9ca3af" strokeWidth="1" />
                      <line x1="80" y1={y} x2="950" y2={y} stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4,4" opacity="0.5" />
                      <text x="70" y={y + 5} textAnchor="end" fontSize="12" fill="#6b7280" fontWeight="500">
                        {new Intl.NumberFormat(language === 'it' ? 'it-IT' : 'en-US', {
                          style: 'currency',
                          currency: 'EUR',
                          notation: 'compact',
                          maximumFractionDigits: 0
                        }).format(value)}
                      </text>
                    </g>
                  );
                })}
                
                {/* Bars */}
                {chartData.map((data, index) => {
                  const maxValue = Math.max(results.simpleTotal, results.compoundTotal);
                  const totalWidth = 870;
                  const barGroupWidth = totalWidth / chartData.length;
                  const barWidth = Math.max(3, Math.min(20, (barGroupWidth - 4) / 2));
                  
                  const x = 80 + (index * barGroupWidth) + (barGroupWidth - barWidth * 2 - 2) / 2;
                  
                  const simpleHeight = maxValue > 0 ? Math.max((data.simple / maxValue) * 400, 2) : 0;
                  const compoundHeight = maxValue > 0 ? Math.max((data.compound / maxValue) * 400, 2) : 0;
                  
                  const simpleY = 420 - simpleHeight;
                  const compoundY = 420 - compoundHeight;
                  
                  let showLabel = false;
                  if (chartData.length <= 12) showLabel = true;
                  else if (chartData.length <= 24) showLabel = index % 2 === 0 || index === chartData.length - 1;
                  else if (chartData.length <= 40) showLabel = index % 5 === 0 || index === chartData.length - 1;
                  else if (chartData.length <= 60) showLabel = index % 10 === 0 || index === chartData.length - 1;
                  else showLabel = index % 20 === 0 || index === chartData.length - 1;
                  
                  return (
                    <g key={index}>
                      <rect
                        x={x}
                        y={simpleY}
                        width={barWidth}
                        height={simpleHeight}
                        fill="#3b82f6"
                        className="hover:opacity-80 cursor-pointer transition-opacity"
                        rx="1"
                      >
                        <title>{`${language === 'it' ? 'Anno' : 'Year'} ${data.year}: ${formatCurrency(data.simple)}`}</title>
                      </rect>
                      
                      <rect
                        x={x + barWidth + 2}
                        y={compoundY}
                        width={barWidth}
                        height={compoundHeight}
                        fill="#10b981"
                        className="hover:opacity-80 cursor-pointer transition-opacity"
                        rx="1"
                      >
                        <title>{`${language === 'it' ? 'Anno' : 'Year'} ${data.year}: ${formatCurrency(data.compound)}`}</title>
                      </rect>
                      
                      {showLabel && (
                        <text
                          x={x + barWidth + 1}
                          y="440"
                          textAnchor="middle"
                          fontSize="11"
                          fill="#374151"
                          fontWeight="600"
                        >
                          {data.year}
                        </text>
                      )}
                    </g>
                  );
                })}
                
                <text
                  x="515"
                  y="475"
                  textAnchor="middle"
                  fontSize="14"
                  fill="#374151"
                  fontWeight="600"
                >
                  {t.results.chart.year}
                </text>
              </svg>
            </div>
            
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
                      <td className="py-3 px-4 text-right text-blue-600">{formatCurrency(data.simple)}</td>
                      <td className="py-3 px-4 text-right text-emerald-600">{formatCurrency(data.compound)}</td>
                      <td className="py-3 px-4 text-right font-semibold">{formatCurrency(data.compound - data.simple)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </ToolPageLayout>
  );
}