'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import type { API } from '@/types/api'
import { formatDate } from '@/utils/formatDate'

interface APIListProps {
  apis: API[]
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

function truncateDescription(description: string, maxLines: number = 3): string {
  const words = description.split(' ')
  const averageWordsPerLine = 12
  const maxWords = averageWordsPerLine * maxLines
  
  if (words.length <= maxWords) {
    return description
  }
  
  return words.slice(0, maxWords).join(' ') + '...'
}

export function APIList({ apis, currentPage, totalPages, onPageChange }: APIListProps) {
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {apis.map((api, index) => (
          <Link
            key={`${api.name}-${api.category}-${index}-${currentPage}`}
            href={`/api/${encodeURIComponent(api.name)}`}
            className="block p-6 bg-primary-purple/10 rounded-lg hover:bg-primary-purple/20 transition-colors dark:bg-white/5 dark:hover:bg-white/10"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1 mr-4">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-8 h-8 relative">
                    <Image
                      src={api.logo || '/globe.svg'}
                      alt={`${api.name} logo`}
                      fill
                      className="object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/globe.svg';
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-primary-peach dark:text-primary-light">
                    {api.name}
                  </h3>
                </div>
                <p className="text-primary-light/80 mb-4 dark:text-white/80 line-clamp-3">
                  {truncateDescription(api.description)}
                </p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="px-2 py-1 bg-primary-purple/20 rounded dark:bg-white/10">
                    Version: {api.version}
                  </span>
                  <span className="px-2 py-1 bg-primary-purple/20 rounded dark:bg-white/10">
                    OpenAPI: {api.openapiVersion}
                  </span>
                  <span className="px-2 py-1 bg-primary-purple/20 rounded dark:bg-white/10">
                    Updated: {formatDate(api.updated)}
                  </span>
                </div>
              </div>
              <span className="text-sm text-primary-light/60 dark:text-white/40 whitespace-nowrap">
                {api.category}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <nav className="flex justify-center gap-2" aria-label="Pagination">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg bg-primary-purple/20 hover:bg-primary-purple/30 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-white/10 dark:hover:bg-white/20"
          aria-label="Previous page"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          {getPageNumbers().map((pageNum, index) => {
            if (pageNum === '...') {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="w-8 h-8 flex items-center justify-center text-primary-light/60"
                >
                  {pageNum}
                </span>
              );
            }
            return (
              <button
                key={`page-${pageNum}`}
                onClick={() => onPageChange(Number(pageNum))}
                className={`w-8 h-8 rounded-lg ${
                  currentPage === pageNum
                    ? 'bg-primary-peach text-primary-dark dark:bg-primary-light dark:text-primary-dark'
                    : 'bg-primary-purple/20 hover:bg-primary-purple/30 dark:bg-white/10 dark:hover:bg-white/20'
                }`}
                aria-label={`Page ${pageNum}`}
                aria-current={currentPage === pageNum ? 'page' : undefined}
              >
                {pageNum}
              </button>
            );
          })}
        </div>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg bg-primary-purple/20 hover:bg-primary-purple/30 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-white/10 dark:hover:bg-white/20"
          aria-label="Next page"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </nav>
    </div>
  )
} 