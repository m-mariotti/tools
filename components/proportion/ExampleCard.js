export default function ExampleCard({ example }) {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {example.title}
      </h3>
      <div className="space-y-3 text-gray-700">
        <p className="font-medium text-indigo-900">
          {example.problem}
        </p>
        <p className="pl-4 border-l-2 border-indigo-300">
          {example.setup}
        </p>
        <p className="pl-4 border-l-2 border-blue-300">
          {example.solution}
        </p>
        <p className="pl-4 border-l-2 border-green-300 font-mono text-sm">
          {example.calculation}
        </p>
        <p className="pl-4 bg-emerald-50 rounded p-3 font-medium text-emerald-900">
          {example.answer}
        </p>
      </div>
    </div>
  );
}
