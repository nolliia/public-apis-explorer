import React from 'react'
import fs from 'fs/promises'
import path from 'path'
import Link from 'next/link'
import { parseAPIs, paginateAPIs } from '@/utils/parseAPIs'
import { SearchBar } from '@/components/SearchBar'
import { TabsContainer } from '@/components/TabsContainer'

const PAGE_SIZE = 10

interface DashboardPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const params = await searchParams
  const currentPage = Math.max(1, Number(typeof params.page === 'string' ? params.page : 1))
  const searchQuery = typeof params.search === 'string' ? params.search : ''

  const markdownPath = path.join(process.cwd(), 'test.md')
  const markdown = await fs.readFile(markdownPath, 'utf-8')
  const allAPIs = parseAPIs(markdown)

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
        totalPages={totalPages} categories={[]}        />
      </div>
  )
}