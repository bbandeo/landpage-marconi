export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header skeleton */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="h-10 bg-gray-700 rounded-lg w-96 mx-auto animate-pulse" />
            <div className="h-6 bg-gray-700 rounded-lg w-64 mx-auto animate-pulse" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters skeleton */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-5 w-5 bg-gray-700 rounded animate-pulse" />
            <div className="h-6 bg-gray-700 rounded w-48 animate-pulse" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="lg:col-span-2">
              <div className="h-10 bg-gray-700 rounded animate-pulse" />
            </div>
            <div className="h-10 bg-gray-700 rounded animate-pulse" />
            <div className="h-10 bg-gray-700 rounded animate-pulse" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-10 bg-gray-700 rounded animate-pulse" />
            ))}
          </div>
        </div>

        {/* Results count skeleton */}
        <div className="flex justify-between items-center mb-6">
          <div className="h-5 bg-gray-700 rounded w-48 animate-pulse" />
        </div>

        {/* Properties grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
              <div className="aspect-video bg-gray-700 animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="space-y-2">
                  <div className="h-5 bg-gray-700 rounded animate-pulse" />
                  <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse" />
                </div>
                <div className="flex justify-between items-center">
                  <div className="h-6 bg-gray-700 rounded w-20 animate-pulse" />
                  <div className="flex gap-3">
                    <div className="h-4 bg-gray-700 rounded w-8 animate-pulse" />
                    <div className="h-4 bg-gray-700 rounded w-8 animate-pulse" />
                    <div className="h-4 bg-gray-700 rounded w-12 animate-pulse" />
                  </div>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-700">
                  <div className="h-4 bg-gray-700 rounded w-16 animate-pulse" />
                  <div className="h-8 bg-gray-700 rounded w-24 animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
