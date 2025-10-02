export default function PropertyCard({ property, borderColor, bgColor }) {
  return (
    <div className={`border-l-4 ${borderColor} ${bgColor} rounded-r-lg p-6`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-3">
        {property.title}
      </h3>
      <p className="text-gray-700 mb-4 leading-relaxed">
        {property.description}
      </p>
      <div className="bg-white rounded-lg p-4 font-mono text-base mb-3 leading-relaxed">
        {property.formula}
      </div>
      <p className="text-sm text-gray-600 italic">
        {property.explanation}
      </p>
    </div>
  );
}
