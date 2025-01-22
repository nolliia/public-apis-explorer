import React from 'react'
import fs from 'fs/promises'
import path from 'path'
import { parseAPIs } from '@/utils/parseAPIs'
import { notFound } from 'next/navigation'
import { APIDetails } from '@/components/APIDetails'

interface APIDetailsPageProps {
  params: {
    name: string
  }
}

export default async function APIDetailsPage({ params }: APIDetailsPageProps) {
  const markdownPath = path.join(process.cwd(), 'test.md')
  const markdown = await fs.readFile(markdownPath, 'utf-8')
  const allAPIs = parseAPIs(markdown)
  
  const { name } = await params
  const decodedName = decodeURIComponent(name)

  const api = allAPIs.find(api => api.name === decodedName)

  if (!api) {
    notFound()
  }

  return <APIDetails api={api} />
} 