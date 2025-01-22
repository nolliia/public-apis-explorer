'use client'

import React from 'react'
import * as Select from '@radix-ui/react-select'
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/24/outline'
import { useRouter, useSearchParams } from 'next/navigation'

interface CategoryFilterProps {
  categories: string[]
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get('category') || ''
  const currentSearch = searchParams.get('search') || ''
  const currentPage = searchParams.get('page') || '1'

  const handleValueChange = (value: string) => {
    const searchPart = currentSearch ? `&search=${encodeURIComponent(currentSearch)}` : ''
    if (value === 'all') {
      router.push(`/?page=1${searchPart}`)
    } else {
      router.push(`/?page=1&category=${encodeURIComponent(value)}${searchPart}`)
    }
  }

  return (
    <Select.Root value={currentCategory || 'all'} onValueChange={handleValueChange}>
      <Select.Trigger
        className="inline-flex items-center justify-between gap-2 px-4 py-2 text-primary-light hover:text-white focus:outline-none min-w-[180px] max-w-[300px]"
        aria-label="Category"
      >
        <span className="text-sm truncate">
          {currentCategory ? `Category: ${currentCategory}` : 'Filter by Category'}
        </span>
        <Select.Icon className="flex-shrink-0">
          <ChevronDownIcon className="w-4 h-4" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className="overflow-hidden bg-primary-dark border border-primary-purple/20 rounded-lg shadow-lg min-w-[180px] max-w-[300px] w-fit"
          position="popper"
          sideOffset={5}
        >
          <Select.Viewport className="p-2 max-h-[300px] overflow-y-auto">
            <Select.Item
              value="all"
              className="flex items-center gap-2 px-4 py-2 text-sm text-primary-light hover:text-white hover:bg-primary-purple/20 rounded cursor-pointer outline-none data-[highlighted]:bg-primary-purple/20 data-[highlighted]:text-white"
            >
              <Select.ItemText>All Categories</Select.ItemText>
              <Select.ItemIndicator className="ml-auto">
                <CheckIcon className="w-4 h-4" />
              </Select.ItemIndicator>
            </Select.Item>

            {categories.map((category) => (
              <Select.Item
                key={category}
                value={category}
                className="flex items-center gap-2 px-4 py-2 text-sm text-primary-light hover:text-white hover:bg-primary-purple/20 rounded cursor-pointer outline-none data-[highlighted]:bg-primary-purple/20 data-[highlighted]:text-white"
              >
                <Select.ItemText>{category}</Select.ItemText>
                <Select.ItemIndicator className="ml-auto">
                  <CheckIcon className="w-4 h-4" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
} 