export default function ResultCard({ result, translations }) {
  const t = translations;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t.results.title}</h2>

      <div className="space-y-6">
        {/* Main Result */}
        <div className="p-8 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl border-2 border-emerald-300 shadow-md">
          <span className="text-sm font-semibold text-emerald-700 block mb-3 uppercase tracking-wide">
            {t.results.solution}
          </span>
          <div className="text-3xl font-bold text-emerald-700 mb-2">
            {result.unknown} = {result.solution}
          </div>
          <div className="text-base text-emerald-600 mt-4 font-medium">
            {t.results.proportion}
          </div>
          <div className="text-xl font-semibold text-emerald-700 mt-2">
            {result.proportion}
          </div>
        </div>

        {/* Calculation Steps */}
        <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
          <span className="text-sm font-semibold text-gray-700 block mb-3">
            {t.results.calculation}
          </span>
          <pre className="text-blue-900 font-mono text-base whitespace-pre-wrap leading-relaxed">
            {result.calculation}
          </pre>
        </div>

        {/* Verification */}
        <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
          <span className="text-sm font-semibold text-gray-700 block mb-3">
            {t.results.verification}
          </span>
          <pre className="text-gray-900 font-mono text-base whitespace-pre-wrap leading-relaxed">
            {result.verification}
          </pre>
          <p className="text-sm text-gray-600 mt-3 italic">
            {t.results.explanation}
          </p>
        </div>
      </div>
    </div>
  );
}
