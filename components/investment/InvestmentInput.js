/**
 * InvestmentInput Component
 * Reusable input field for investment calculator with validation error display
 */

export default function InvestmentInput({
  label,
  value,
  onChange,
  placeholder,
  type = "number",
  min,
  max,
  step,
  error
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <input
        type={type}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors text-gray-900 placeholder:text-gray-500 ${
          error
            ? 'border-red-500 focus:border-red-600'
            : 'border-gray-200 focus:border-indigo-500'
        }`}
      />
      {error && (
        <p className="text-red-600 text-xs mt-1">{error}</p>
      )}
    </div>
  );
}
