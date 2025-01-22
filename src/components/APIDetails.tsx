'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ArrowLeftIcon, GlobeAltIcon, DocumentIcon, CalendarIcon, UserIcon } from '@heroicons/react/24/outline'
import type { API } from '@/types/api'
import { formatDate } from '@/utils/formatDate'

interface APIDetailsProps {
  api: API
}

export function APIDetails({ api }: APIDetailsProps) {
  const router = useRouter()

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 flex items-center gap-4">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-primary-light hover:text-primary-peach transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to List
        </button>
        <span className="text-primary-light/40">|</span>
        <Link href="/" className="text-primary-light hover:text-primary-peach transition-colors">
          Public APIs Explorer
        </Link>
      </div>

      <div className="bg-primary-purple/10 rounded-lg p-8 dark:bg-white/5">
        <div className="flex justify-between items-start gap-8 mb-8">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 relative">
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
              <div>
                <h1 className="text-4xl font-bold text-primary-light">{api.name}</h1>
                <p className="text-primary-light/60">Version {api.version}</p>
              </div>
            </div>
            <p className="text-xl text-primary-light/80 mb-6 whitespace-pre-wrap">{api.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2 text-primary-light/80">
                <CalendarIcon className="w-5 h-5" />
                <span>Added: {formatDate(api.added)}</span>
              </div>
              <div className="flex items-center gap-2 text-primary-light/80">
                <CalendarIcon className="w-5 h-5" />
                <span>Updated: {formatDate(api.updated)}</span>
              </div>
              {api.contact && (
                <div className="flex items-center gap-2 text-primary-light/80">
                  <UserIcon className="w-5 h-5" />
                  <span>Contact: {api.contact.name || api.contact.email}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-primary-light/80">
                <DocumentIcon className="w-5 h-5" />
                <span>OpenAPI Version: {api.openapiVersion}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href={api.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-peach text-primary-dark rounded-lg hover:bg-primary-peach/90 transition-colors"
              >
                <GlobeAltIcon className="w-5 h-5" />
                Visit API
              </a>
              <a
                href={api.swaggerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-purple/20 rounded-lg hover:bg-primary-purple/30 transition-colors dark:bg-white/10 dark:hover:bg-white/20"
              >
                <DocumentIcon className="w-5 h-5" />
                OpenAPI Spec (JSON)
              </a>
              <a
                href={api.swaggerYamlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-purple/20 rounded-lg hover:bg-primary-purple/30 transition-colors dark:bg-white/10 dark:hover:bg-white/20"
              >
                <DocumentIcon className="w-5 h-5" />
                OpenAPI Spec (YAML)
              </a>
              {api.externalDocs && (
                <a
                  href={api.externalDocs.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-purple/20 rounded-lg hover:bg-primary-purple/30 transition-colors dark:bg-white/10 dark:hover:bg-white/20"
                >
                  <DocumentIcon className="w-5 h-5" />
                  Documentation
                </a>
              )}
            </div>
          </div>
          <span className="text-sm text-primary-light/60 bg-primary-purple/20 px-3 py-1 rounded-full dark:bg-white/10">
            {api.category}
          </span>
        </div>
      </div>
    </div>
  )
} 