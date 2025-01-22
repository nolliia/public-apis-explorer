'use client'

import React from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

interface SearchBarProps {
  defaultValue?: string
}

export function SearchBar({ defaultValue = '' }: SearchBarProps) {
  return (
    <div className="mb-8">
      <form className="relative">
        <MagnifyingGlassIcon 
          data-testid="search-icon"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-light/60" 
        />
        <input
          type="search"
          name="search"
          placeholder="Search APIs by name, description, or category..."
          defaultValue={defaultValue}
          className="w-full pl-10 pr-4 py-3 bg-primary-purple/10 dark:bg-white/5 rounded-lg text-primary-light placeholder-primary-light/60 focus:outline-none focus:ring-2 focus:ring-primary-peach"
        />
      </form>
    </div>
  )
} 