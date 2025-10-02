/**
 * ChartDisplay Component
 * Interactive bar chart displaying simple vs compound interest growth over time
 */

import { formatCurrency } from '../../utils/investmentCalculator';

export default function ChartDisplay({ chartData, results, language, translations }) {
  if (!chartData || chartData.length === 0) return null;

  const maxValue = Math.max(results.simpleTotal, results.compoundTotal);

  return (
    <div className="w-full">
      {/* Chart Legend */}
      <div className="flex gap-6 mb-6 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span className="text-sm font-medium text-gray-700">{translations.simpleInterest}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-emerald-500 rounded"></div>
          <span className="text-sm font-medium text-gray-700">{translations.compoundInterest}</span>
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
                <title>{`${language === 'it' ? 'Anno' : 'Year'} ${data.year}: ${formatCurrency(data.simple, language)}`}</title>
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
                <title>{`${language === 'it' ? 'Anno' : 'Year'} ${data.year}: ${formatCurrency(data.compound, language)}`}</title>
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
          {translations.year}
        </text>
      </svg>
    </div>
  );
}
