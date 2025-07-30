import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function PropertyCardSkeleton() {
  return (
    <Card className="bg-gray-900/50 border-gray-700/50 overflow-hidden backdrop-blur-sm shadow-lg">
      <div className="relative">
        {/* Image skeleton */}
        <div className="aspect-[4/3] bg-gray-800">
          <Skeleton className="w-full h-full bg-gray-700" />
        </div>
        
        {/* Badge skeletons */}
        <div className="absolute top-4 left-4 flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full bg-gray-600" />
          <Skeleton className="h-6 w-20 rounded-full bg-gray-600" />
        </div>
        
        {/* Heart icon skeleton */}
        <div className="absolute top-4 right-4">
          <Skeleton className="h-9 w-9 rounded-full bg-gray-600" />
        </div>
      </div>
      
      <CardContent className="p-md">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            {/* Title skeleton */}
            <Skeleton className="h-6 w-3/4 mb-2 bg-gray-700" />
            {/* Location skeleton */}
            <Skeleton className="h-4 w-1/2 bg-gray-700" />
          </div>
          {/* Price skeleton */}
          <Skeleton className="h-6 w-24 ml-4 bg-gray-700" />
        </div>
        
        {/* Property details skeleton */}
        <div className="flex items-center gap-x-6 my-4 border-y border-gray-700/50 py-3">
          <Skeleton className="h-4 w-16 bg-gray-700" />
          <Skeleton className="h-4 w-16 bg-gray-700" />
          <Skeleton className="h-4 w-12 bg-gray-700" />
        </div>
        
        {/* Button skeleton */}
        <Skeleton className="h-12 w-full rounded-md bg-gray-700" />
      </CardContent>
    </Card>
  )
}

export function PropertyGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-lg">
      {Array.from({ length: count }).map((_, i) => (
        <PropertyCardSkeleton key={i} />
      ))}
    </div>
  )
}