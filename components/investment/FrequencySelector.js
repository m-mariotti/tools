/**
 * FrequencySelector Component
 * Dropdown selector for deposit frequency
 */

export default function FrequencySelector({ label, value, onChange, frequencies }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors text-gray-900"
      >
        <option value="weekly">{frequencies.weekly}</option>
        <option value="monthly">{frequencies.monthly}</option>
        <option value="yearly">{frequencies.yearly}</option>
      </select>
    </div>
  );
}
