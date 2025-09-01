//app/admin/loading.tsx
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminLoading() {
  return (
    <main className="flex-1 relative overflow-y-auto focus:outline-none">
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Page header */}
          <div className="mb-8">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-96" />
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Skeleton className="h-8 w-8 rounded" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <Skeleton className="h-4 w-16 mb-2" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Main dashboard grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Large chart card */}
            <Card className="lg:col-span-2 p-6">
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-8 w-24" />
              </div>
              <Skeleton className="h-64 w-full rounded" />
            </Card>

            {/* Side panel */}
            <Card className="p-6">
              <Skeleton className="h-6 w-28 mb-4" />
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-24 mb-1" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                    <Skeleton className="h-4 w-12" />
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Data table skeleton */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="h-6 w-32" />
              <div className="flex space-x-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-24" />
              </div>
            </div>
            <div className="space-y-3">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4 py-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                  <div className="flex-1" />
                  <Skeleton className="h-6 w-16" />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
