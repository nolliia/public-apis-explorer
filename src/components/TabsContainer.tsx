'use client'

import React from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { ListBulletIcon, ChartBarIcon } from '@heroicons/react/24/outline'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { APIList } from './APIList'
import { Dashboard } from './Dashboard'
import { CategoryFilter } from './CategoryFilter'
import type { API } from '@/types/api'

interface TabsContainerProps {
  allApis: API[]
  paginatedApis: API[]
  currentPage: number
  totalPages: number
  categories: string[]
}

export function TabsContainer({ allApis, paginatedApis, currentPage, totalPages, categories }: TabsContainerProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('search')
  const isOnDashboard = pathname === '/dashboard'

  const handleTabChange = (value: string) => {
    const searchPart = searchQuery ? `?search=${searchQuery}` : ''
    if (value === 'dashboard') {
      router.push(`/dashboard${searchPart}`)
    } else {
      router.push(`/${searchPart}`)
    }
  }

  const handlePageChange = (newPage: number) => {
    const searchPart = searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ''
    const categoryFilter = searchParams.get('category')
    const categoryPart = categoryFilter ? `&category=${encodeURIComponent(categoryFilter)}` : ''
    router.push(`/?page=${newPage}${searchPart}${categoryPart}`)
  }

  return (
    <Tabs.Root defaultValue={isOnDashboard ? 'dashboard' : 'list'} onValueChange={handleTabChange} className="flex flex-col gap-8">
      <div className="flex justify-between items-center border-b border-primary-purple">
        <Tabs.List className="flex gap-4">
          <Tabs.Trigger
            value="list"
            className="flex items-center gap-2 px-4 py-2 text-primary-light hover:text-white data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-primary-peach"
          >
            <ListBulletIcon className="w-5 h-5" />
            API List
          </Tabs.Trigger>
          <Tabs.Trigger
            value="dashboard"
            className="flex items-center gap-2 px-4 py-2 text-primary-light hover:text-white data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-primary-peach"
          >
            <ChartBarIcon className="w-5 h-5" />
            Dashboard
          </Tabs.Trigger>
        </Tabs.List>

        {!isOnDashboard && <CategoryFilter categories={categories} />}
      </div>

      <Tabs.Content value="list" className="focus:outline-none">
        <APIList
          apis={paginatedApis}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Tabs.Content>

      <Tabs.Content value="dashboard" className="focus:outline-none">
        <Dashboard apis={allApis} />
      </Tabs.Content>
    </Tabs.Root>
  )
} 