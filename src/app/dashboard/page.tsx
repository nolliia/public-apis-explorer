import React from 'react'
import Link from 'next/link'
import { transformAPIsGuruData, paginateAPIs } from '@/utils/parseAPIs'
import { SearchBar } from '@/components/SearchBar'
import { TabsContainer } from '@/components/TabsContainer'
import type { APIsGuruResponse } from '@/types/api'
import { unstable_noStore as noStore } from 'next/cache'

const PAGE_SIZE = 10

interface DashboardPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  noStore()

  const params = await searchParams
  const currentPage = Math.max(1, Number(typeof params.page === 'string' ? params.page : 1))
  const searchQuery = typeof params.search === 'string' ? params.search : ''

  const response = await fetch('https://api.apis.guru/v2/list.json', {
    cache: 'no-store',
    next: {
      revalidate: 0
    }
  })
  
  if (!response.ok) {
    throw new Error('Failed to fetch APIs')
  }

  const data: APIsGuruResponse = await response.json()
  const allAPIs = transformAPIsGuruData(data)

  const filteredAPIs = searchQuery
    ? allAPIs.filter(api => 
        api.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        api.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        api.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allAPIs

  const { apis: paginatedApis, totalPages } = paginateAPIs(filteredAPIs, currentPage, PAGE_SIZE)

  return (
    <div className="max-w-7xl mx-auto">
      <Link href="/" className="block">
        <h1 className="text-4xl font-bold mb-8 text-primary-light hover:text-primary-peach transition-colors">
          Public APIs Explorer
        </h1>
      </Link>

      <SearchBar defaultValue={searchQuery} />

      <TabsContainer
        allApis={filteredAPIs}
        paginatedApis={paginatedApis}
        currentPage={currentPage}
        totalPages={totalPages}
        categories={[]}
      />
    </div>
  )
}