/**
 * ResultsCard Component
 * Displays calculation results for simple or compound interest
 */

import { formatCurrency, formatPercentage } from '../../utils/investmentCalculator';

export default function ResultsCard({
  title,
  explanation,
  formula,
  totalInterest,
  finalAmount,
  totalDeposits,
  difference,
  language,
  bgColor = "bg-blue-50",
  borderColor = "border-blue-200",
  textColor = "text-blue-600",
  showFormulaDetails,
  onToggleFormulaDetails,
  formulaDetailsComponent
}) {
  return (
    <div className={`p-6 ${bgColor} rounded-xl border ${borderColor}`}>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-700 leading-relaxed mb-4">{explanation}</p>

      <div className="bg-white rounded-lg p-3 mb-2 font-mono text-sm text-gray-800">
        {formula}
      </div>

      {onToggleFormulaDetails && (
        <button
          onClick={onToggleFormulaDetails}
          className={`flex items-center gap-2 ${textColor.replace('text-', 'text-').replace('-600', '-700')} hover:${textColor.replace('-600', '-800')} font-semibold text-sm mb-4 transition-colors`}
        >
          {showFormulaDetails ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
          {language === 'it' ? 'Mostra spiegazione dettagliata' : 'Show detailed explanation'}
        </button>
      )}

      {showFormulaDetails && formulaDetailsComponent}

      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-lg">
          <span className="text-sm text-gray-700 block mb-1">
            {language === 'it' ? 'Interessi totali' : 'Total Interest'}
          </span>
          <span className={`text-2xl font-bold ${textColor}`}>
            {formatCurrency(totalInterest, language)}
          </span>
          <span className="text-xs text-gray-600 block mt-1">
            ({formatPercentage((totalInterest / totalDeposits) * 100)})
          </span>
        </div>
        <div className="p-4 bg-white rounded-lg">
          <span className="text-sm text-gray-700 block mb-1">
            {language === 'it' ? 'Valore finale' : 'Final Amount'}
          </span>
          <span className={`text-2xl font-bold ${textColor}`}>
            {formatCurrency(finalAmount, language)}
          </span>
        </div>
      </div>

      {difference !== undefined && (
        <div className={`mt-4 p-4 ${bgColor.replace('-50', '-100')} rounded-lg`}>
          <p className={`text-sm font-semibold ${textColor.replace('-600', '-900')}`}>
            💡 {language === 'it' ? 'Differenza' : 'Difference'}: {formatCurrency(difference, language)}
          </p>
          <p className={`text-xs ${textColor.replace('-600', '-800')} mt-1`}>
            {language === 'it'
              ? 'Guadagno aggiuntivo con interesse composto rispetto all\'interesse semplice'
              : 'Additional earnings with compound interest compared to simple interest'}
          </p>
        </div>
      )}
    </div>
  );
}
