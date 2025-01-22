import React from 'react'
import { notFound } from 'next/navigation'
import { APIDetails } from '@/components/APIDetails'
import type { APIsGuruResponse } from '@/types/api'
import { transformAPIsGuruData } from '@/utils/parseAPIs'
import { unstable_noStore as noStore } from 'next/cache'

interface APIDetailsPageProps {
  params: Promise<{
    name: string
  }>
}

export default async function APIDetailsPage({ params }: APIDetailsPageProps) {
  noStore()

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
  
  const { name } = await params
  const decodedName = decodeURIComponent(name)

  const api = allAPIs.find(api => api.name === decodedName)

  if (!api) {
    notFound()
  }

  return <APIDetails api={api} />
} 