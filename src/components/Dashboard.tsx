'use client'

import React from 'react'
import { TagIcon, DocumentTextIcon, ClockIcon, CodeBracketIcon, GlobeAltIcon } from '@heroicons/react/24/outline'
import type { API } from '@/types/api'
import { formatDate } from '@/utils/formatDate'

interface DashboardProps {
  apis: API[]
}

export function Dashboard({ apis }: DashboardProps) {
  const categories = Array.from(new Set(apis.map(api => api.category))).sort()
  const openAPIVersions = Array.from(new Set(apis.map(api => api.openapiVersion))).sort()
  
  const recentlyUpdated = apis.filter(api => {
    const updatedDate = new Date(api.updated)
    const oneMonthAgo = new Date()
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
    return updatedDate > oneMonthAgo
  }).length

  const hasContactInfo = apis.filter(api => api.contact).length
  const hasLogo = apis.filter(api => api.logo).length
  const hasExternalDocs = apis.filter(api => api.externalDocs).length

  const recentlyAdded = apis.filter(api => {
    const addedDate = new Date(api.added)
    const oneMonthAgo = new Date()
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
    return addedDate > oneMonthAgo
  }).length

  const categoryCounts = categories
    .map(category => ({
      name: category,
      count: apis.filter(api => api.category === category).length
    }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))


  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-primary-purple/10 rounded-lg p-6 dark:bg-white/5">
          <div className="flex items-center gap-4">
            <DocumentTextIcon className="w-8 h-8 text-primary-peach" />
            <div>
              <h3 className="text-sm font-medium text-primary-light/60">Total APIs</h3>
              <p className="text-2xl font-bold text-primary-light">{apis.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-primary-purple/10 rounded-lg p-6 dark:bg-white/5">
          <div className="flex items-center gap-4">
            <TagIcon className="w-8 h-8 text-primary-peach" />
            <div>
              <h3 className="text-sm font-medium text-primary-light/60">Categories</h3>
              <p className="text-2xl font-bold text-primary-light">{categories.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-primary-purple/10 rounded-lg p-4 dark:bg-white/5">
          <div className="flex flex-col items-center text-center">
            <ClockIcon className="w-6 h-6 text-primary-peach mb-2" />
            <h3 className="text-sm font-medium text-primary-light/60">Added (30d)</h3>
            <p className="text-xl font-bold text-primary-light">{recentlyAdded}</p>
          </div>
        </div>
        <div className="bg-primary-purple/10 rounded-lg p-4 dark:bg-white/5">
          <div className="flex flex-col items-center text-center">
            <ClockIcon className="w-6 h-6 text-primary-peach mb-2" />
            <h3 className="text-sm font-medium text-primary-light/60">Updated (30d)</h3>
            <p className="text-xl font-bold text-primary-light">{recentlyUpdated}</p>
          </div>
        </div>
        <div className="bg-primary-purple/10 rounded-lg p-4 dark:bg-white/5">
          <div className="flex flex-col items-center text-center">
            <GlobeAltIcon className="w-6 h-6 text-primary-peach mb-2" />
            <h3 className="text-sm font-medium text-primary-light/60">With Logo</h3>
            <p className="text-xl font-bold text-primary-light">{hasLogo}</p>
          </div>
        </div>
        <div className="bg-primary-purple/10 rounded-lg p-4 dark:bg-white/5">
          <div className="flex flex-col items-center text-center">
            <TagIcon className="w-6 h-6 text-primary-peach mb-2" />
            <h3 className="text-sm font-medium text-primary-light/60">Contact Info</h3>
            <p className="text-xl font-bold text-primary-light">{hasContactInfo}</p>
          </div>
        </div>
        <div className="bg-primary-purple/10 rounded-lg p-4 dark:bg-white/5">
          <div className="flex flex-col items-center text-center">
            <CodeBracketIcon className="w-6 h-6 text-primary-peach mb-2" />
            <h3 className="text-sm font-medium text-primary-light/60">Documentation</h3>
            <p className="text-xl font-bold text-primary-light">{hasExternalDocs}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-primary-purple/10 rounded-lg p-6 dark:bg-white/5">
          <h3 className="text-xl font-semibold text-primary-light mb-4">APIs by Category</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categoryCounts.map(({ name, count }) => (
              <div
                key={name}
                className="flex items-center justify-between p-3 bg-primary-purple/20 rounded dark:bg-white/10"
              >
                <span className="text-primary-light/80">{name}</span>
                <span className="text-primary-peach font-medium">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-primary-purple/10 rounded-lg p-6 dark:bg-white/5">
            <h3 className="text-xl font-semibold text-primary-light mb-4">OpenAPI Versions</h3>
            <div className="space-y-3">
              {openAPIVersions.map(version => {
                const count = apis.filter(api => api.openapiVersion === version).length
                return (
                  <div
                    key={version}
                    className="flex items-center justify-between p-3 bg-primary-purple/20 rounded dark:bg-white/10"
                  >
                    <span className="text-primary-light/80">v{version}</span>
                    <span className="text-primary-peach font-medium">{count}</span>
                  </div>
                )
              })}
            </div>
          </div>

         
          <div className="bg-primary-purple/10 rounded-lg p-6 dark:bg-white/5">
            <h3 className="text-xl font-semibold text-primary-light mb-4">Recent Updates</h3>
            <div className="space-y-3">
              {apis
                .sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime())
                .slice(0, 5)
                .map(api => (
                  <div
                    key={api.name}
                    className="flex items-center justify-between p-3 bg-primary-purple/20 rounded dark:bg-white/10"
                  >
                    <span className="text-primary-light/80 truncate flex-1 mr-4">{api.name}</span>
                    <span className="text-primary-peach font-medium whitespace-nowrap">
                      {formatDate(api.updated)}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 