import React from 'react'

export default function SkeletonLeaderboard() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-6 bg-gray-700 rounded w-1/3" />
      {[...Array(10)].map((_, i) => (
        <div key={i} className="flex justify-between items-center py-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-600 rounded-full" />
            <div className="w-24 h-4 bg-gray-700 rounded" />
          </div>
          <div className="w-10 h-4 bg-gray-700 rounded" />
          <div className="w-24 h-4 bg-gray-700 rounded" />
        </div>
      ))}
    </div>
  )
}
