import type { API, APIsGuruResponse } from '@/types/api'

export function transformAPIsGuruData(data: APIsGuruResponse): API[] {
  const apis: API[] = []

  for (const [apiId, apiData] of Object.entries(data)) {
    const preferredVersion = apiData.versions[apiData.preferred]
    if (!preferredVersion) continue

    const [provider] = apiId.split(':')
    
    const api: API = {
      name: preferredVersion.info.title,
      description: preferredVersion.info.description || 'No description available',
      version: preferredVersion.info.version,
      added: apiData.added,
      updated: preferredVersion.updated,
      url: preferredVersion.info.contact?.url || preferredVersion.swaggerUrl,
      category: provider,
      logo: preferredVersion.info['x-logo']?.url,
      contact: preferredVersion.info.contact,
      openapiVersion: preferredVersion.openapiVer || 'Unknown',
      swaggerUrl: preferredVersion.swaggerUrl,
      swaggerYamlUrl: preferredVersion.swaggerYamlUrl,
      externalDocs: preferredVersion.externalDocs
    }

    apis.push(api)
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