'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeftIcon, GlobeAltIcon, KeyIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import type { API } from '@/types/api'

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
          <div>
            <h1 className="text-4xl font-bold text-primary-light mb-4">{api.name}</h1>
            <p className="text-xl text-primary-light/80 mb-6">{api.description}</p>
            <div className="flex gap-4 text-sm">
              <a
                href={api.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-peach text-primary-dark rounded-lg hover:bg-primary-peach/90 transition-colors"
              >
                <GlobeAltIcon className="w-5 h-5" />
                Visit API
              </a>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-purple/20 rounded-lg dark:bg-white/10">
                <KeyIcon className="w-5 h-5" />
                Auth: {api.auth || 'None'}
              </span>
            </div>
          </div>
          <span className="text-sm text-primary-light/60 bg-primary-purple/20 px-3 py-1 rounded-full dark:bg-white/10">
            {api.category}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-primary-purple/20 rounded-lg p-6 dark:bg-white/10">
            <h2 className="text-xl font-semibold text-primary-light mb-4">Security</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <LockClosedIcon className="w-5 h-5 text-primary-peach" />
                <span className="text-primary-light/80">
                  HTTPS: {api.https ? 'Required' : 'Not Required'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <GlobeAltIcon className="w-5 h-5 text-primary-peach" />
                <span className="text-primary-light/80">
                  CORS: {api.cors}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-primary-purple/20 rounded-lg p-6 dark:bg-white/10">
            <h2 className="text-xl font-semibold text-primary-light mb-4">Authentication</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <KeyIcon className="w-5 h-5 text-primary-peach" />
                <span className="text-primary-light/80">
                  {api.auth ? `Authentication required (${api.auth})` : 'No authentication required'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 