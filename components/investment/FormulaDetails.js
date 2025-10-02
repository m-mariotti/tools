/**
 * FormulaDetails Component
 * Displays detailed formula explanations for simple or compound interest
 */

export default function FormulaDetails({ formulaDetailed, language, type = "simple" }) {
  const bgColor = type === "simple" ? "bg-blue-100" : "bg-emerald-100";
  const accentBgColor = type === "simple" ? "bg-blue-50" : "bg-emerald-50";
  const textColor = type === "simple" ? "text-gray-900" : "text-emerald-900";

  return (
    <div className={`${bgColor} rounded-lg p-4 mb-4 text-sm space-y-3`}>
      <h4 className="font-semibold text-gray-900">{formulaDetailed.title}</h4>

      <div className="bg-white rounded p-3 font-mono text-gray-800 overflow-x-auto">
        {formulaDetailed.mainFormula}
      </div>

      <div>
        <p className="font-semibold text-gray-900 mb-2">{formulaDetailed.where}</p>
        <ul className="space-y-1 text-gray-700">
          {type === "simple" ? (
            <>
              <li>• {formulaDetailed.params.p}</li>
              <li>• {formulaDetailed.params.r}</li>
              <li>• {formulaDetailed.params.t}</li>
              <li>• {formulaDetailed.params.pmt}</li>
              <li>• {formulaDetailed.params.tRemaining}</li>
            </>
          ) : (
            <>
              <li>• {formulaDetailed.params.fv}</li>
              <li>• {formulaDetailed.params.p}</li>
              <li>• {formulaDetailed.params.r}</li>
              <li>• {formulaDetailed.params.n}</li>
              <li>• {formulaDetailed.params.t}</li>
              <li>• {formulaDetailed.params.pmt}</li>
              <li>• {formulaDetailed.params.remainingPeriods}</li>
              <li>• {formulaDetailed.params.sigma}</li>
            </>
          )}
        </ul>
      </div>

      {type === "compound" && formulaDetailed.breakdown && (
        <div>
          <p className="font-semibold text-gray-900 mb-2">{formulaDetailed.breakdown.title}</p>
          <div className="space-y-2">
            <div className="bg-white rounded p-3">
              <p className={`font-semibold ${textColor}`}>{formulaDetailed.breakdown.part1.title}</p>
              <p className="text-gray-700 text-xs mt-1">{formulaDetailed.breakdown.part1.desc}</p>
            </div>
            <div className="bg-white rounded p-3">
              <p className={`font-semibold ${textColor}`}>{formulaDetailed.breakdown.part2.title}</p>
              <p className="text-gray-700 text-xs mt-1">{formulaDetailed.breakdown.part2.desc}</p>
            </div>
          </div>
        </div>
      )}

      <div className={`${accentBgColor} rounded p-3`}>
        {type === "simple" ? (
          <p className="text-gray-700">{formulaDetailed.example}</p>
        ) : (
          <>
            <p className="font-semibold text-gray-900 mb-2">{formulaDetailed.example.title}</p>
            <p className="text-gray-700 mb-2">{formulaDetailed.example.scenario}</p>
            <ol className="space-y-1 text-gray-700 text-xs">
              {formulaDetailed.example.steps.map((step, idx) => (
                <li key={idx}>• {step}</li>
              ))}
            </ol>
          </>
        )}
      </div>

      {type === "compound" && formulaDetailed.note && (
        <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded p-3">
          <p className="text-gray-800 text-xs">
            <strong>{language === 'it' ? 'Nota:' : 'Note:'}</strong> {formulaDetailed.note}
          </p>
        </div>
      )}
    </div>
  );
}
