import type { API } from '@/types/api'

export function parseAPIs(markdown: string): API[] {
  const apis: API[] = []
  const lines = markdown.split('\n')
  let currentCategory = ''

  for (const line of lines) {
    if (line.startsWith('### ')) {
      currentCategory = line.replace('### ', '').trim()
      continue
    }

    if (line.startsWith('| [')) {
      const parts = line.split('|').map(part => part.trim())
      if (parts.length >= 6) {
        const nameMatch = parts[1].match(/\[(.*?)\]\((.*?)\)/)
        if (nameMatch) {
          const api: API = {
            name: nameMatch[1],
            url: nameMatch[2],
            description: parts[2],
            auth: parts[3].replace('`', '').replace('`', ''),
            https: parts[4].toLowerCase() === 'yes',
            cors: parts[5],
            category: currentCategory
          }
          apis.push(api)
        }
      }
    }
  }

  return apis
}

export function paginateAPIs(apis: API[], page: number, pageSize: number) {
  const start = (page - 1) * pageSize
  const end = start + pageSize
  return {
    apis: apis.slice(start, end),
    total: apis.length,
    page,
    pageSize,
    totalPages: Math.ceil(apis.length / pageSize)
  }
} 