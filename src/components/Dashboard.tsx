'use client'

import React from 'react'
import { ChartBarIcon, KeyIcon, GlobeAltIcon, LockClosedIcon, TagIcon } from '@heroicons/react/24/outline'
import type { API } from '@/types/api'

interface DashboardProps {
  apis: API[]
}

export function Dashboard({ apis }: DashboardProps) {
  const totalApis = apis.length
  
  const authTypes = apis.reduce((acc, api) => {
    const auth = api.auth || 'None'
    acc[auth] = (acc[auth] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const corsSupport = apis.reduce((acc, api) => {
    acc[api.cors] = (acc[api.cors] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const categories = apis.reduce((acc, api) => {
    acc[api.category] = (acc[api.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const httpsCount = apis.filter(api => api.https).length
  const httpsPercentage = totalApis === 0 ? 0 : Math.round((httpsCount / totalApis) * 100)

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-primary-purple/10 rounded-lg p-6 dark:bg-white/5">
          <div className="flex items-center gap-4">
            <ChartBarIcon className="w-8 h-8 text-primary-peach" />
            <div>
              <h3 className="text-sm font-medium text-primary-light/60">Total APIs</h3>
              <p className="text-2xl font-bold text-primary-light">{totalApis}</p>
            </div>
          </div>
        </div>
        <div className="bg-primary-purple/10 rounded-lg p-6 dark:bg-white/5">
          <div className="flex items-center gap-4">
            <TagIcon className="w-8 h-8 text-primary-peach" />
            <div>
              <h3 className="text-sm font-medium text-primary-light/60">Categories</h3>
              <p className="text-2xl font-bold text-primary-light">{Object.keys(categories).length}</p>
            </div>
          </div>
        </div>
        <div className="bg-primary-purple/10 rounded-lg p-6 dark:bg-white/5">
          <div className="flex items-center gap-4">
            <KeyIcon className="w-8 h-8 text-primary-peach" />
            <div>
              <h3 className="text-sm font-medium text-primary-light/60">Auth Types</h3>
              <p className="text-2xl font-bold text-primary-light">{Object.keys(authTypes).length}</p>
            </div>
          </div>
        </div>
        <div className="bg-primary-purple/10 rounded-lg p-6 dark:bg-white/5">
          <div className="flex items-center gap-4">
            <GlobeAltIcon className="w-8 h-8 text-primary-peach" />
            <div>
              <h3 className="text-sm font-medium text-primary-light/60">CORS Support</h3>
              <p className="text-2xl font-bold text-primary-light">
                {corsSupport['Yes'] || 0} APIs
              </p>
            </div>
          </div>
        </div>
        <div className="bg-primary-purple/10 rounded-lg p-6 dark:bg-white/5">
          <div className="flex items-center gap-4">
            <LockClosedIcon className="w-8 h-8 text-primary-peach" />
            <div>
              <h3 className="text-sm font-medium text-primary-light/60">HTTPS Usage</h3>
              <p className="text-2xl font-bold text-primary-light">{httpsPercentage}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-primary-purple/10 rounded-lg p-6 dark:bg-white/5">
          <h3 className="text-xl font-semibold text-primary-light mb-4">APIs by Category</h3>
          <div className="space-y-3">
            {Object.entries(categories)
              .sort(([, a], [, b]) => b - a)
              .map(([category, count]) => (
                <div key={category} className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-primary-light/80">{category}</span>
                      <span className="text-sm text-primary-light/60">{count}</span>
                    </div>
                    <div className="h-2 bg-primary-light/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-peach rounded-full"
                        style={{ width: `${(count / totalApis) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-primary-purple/10 rounded-lg p-6 dark:bg-white/5">
          <h3 className="text-xl font-semibold text-primary-light mb-4">Authentication Types</h3>
          <div className="space-y-3">
            {Object.entries(authTypes)
              .sort(([, a], [, b]) => b - a)
              .map(([auth, count]) => (
                <div key={auth} className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-primary-light/80">{auth}</span>
                      <span className="text-sm text-primary-light/60">{count}</span>
                    </div>
                    <div className="h-2 bg-primary-light/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-peach rounded-full"
                        style={{ width: `${(count / totalApis) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
} 