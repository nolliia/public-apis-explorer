import React from 'react'
import Link from 'next/link'
import fs from 'fs/promises'
import path from 'path'
import { TabsContainer } from '@/components/TabsContainer'
import { parseAPIs, paginateAPIs } from '@/utils/parseAPIs'
import { SearchBar } from '@/components/SearchBar'

const PAGE_SIZE = 10

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams
  const currentPage = Math.max(1, Number(typeof params.page === 'string' ? params.page : 1))
  const searchQuery = typeof params.search === 'string' ? params.search : ''
  const categoryFilter = typeof params.category === 'string' ? params.category : ''
  
  const markdownPath = path.join(process.cwd(), 'test.md')
  const markdown = await fs.readFile(markdownPath, 'utf-8')
  const allAPIs = parseAPIs(markdown)
  
  const categories = Array.from(new Set(allAPIs.map(api => api.category))).sort()
  
  const filteredAPIs = allAPIs.filter(api => {
    const matchesSearch = !searchQuery || 
      api.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      api.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      api.category.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = !categoryFilter || api.category === categoryFilter
    
    return matchesSearch && matchesCategory
  })
    
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
        categories={categories}
      />
    </div>
  )
}
