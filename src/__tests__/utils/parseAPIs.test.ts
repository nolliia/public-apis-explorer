import { transformAPIsGuruData, paginateAPIs } from '@/utils/parseAPIs'
import type { APIsGuruResponse } from '@/types/api'

describe('transformAPIsGuruData', () => {
  const mockResponse: APIsGuruResponse = {
    'test:v1': {
      added: '2024-01-01',
      preferred: '1.0.0',
      versions: {
        '1.0.0': {
          added: '2024-01-01',
          info: {
            title: 'Test API',
            version: '1.0.0',
            description: 'A test API',
            contact: {
              name: 'Test Contact',
              email: 'test@test.com'
            },
            'x-logo': {
              url: 'https://test.com/logo.png'
            }
          },
          swaggerUrl: 'https://test.com/swagger.json',
          swaggerYamlUrl: 'https://test.com/swagger.yaml',
          updated: '2024-01-01',
          openapiVer: '3.0.0'
        }
      }
    },
    'example:v1': {
      added: '2024-01-01',
      preferred: '2.0.0',
      versions: {
        '2.0.0': {
          added: '2024-01-01',
          info: {
            title: 'Example API',
            version: '2.0.0',
            description: 'An example API'
          },
          swaggerUrl: 'https://example.com/swagger.json',
          swaggerYamlUrl: 'https://example.com/swagger.yaml',
          updated: '2024-01-01',
          openapiVer: '3.1.0'
        }
      }
    }
  }

  it('transforms APIs.guru response correctly', () => {
    const apis = transformAPIsGuruData(mockResponse)
    expect(apis).toHaveLength(2)
    
    expect(apis[0]).toEqual({
      name: 'Test API',
      description: 'A test API',
      version: '1.0.0',
      added: '2024-01-01',
      updated: '2024-01-01',
      url: 'https://test.com/swagger.json',
      category: 'test',
      logo: 'https://test.com/logo.png',
      contact: {
        name: 'Test Contact',
        email: 'test@test.com'
      },
      openapiVersion: '3.0.0',
      swaggerUrl: 'https://test.com/swagger.json',
      swaggerYamlUrl: 'https://test.com/swagger.yaml'
    })

    expect(apis[1]).toEqual({
      name: 'Example API',
      description: 'An example API',
      version: '2.0.0',
      added: '2024-01-01',
      updated: '2024-01-01',
      url: 'https://example.com/swagger.json',
      category: 'example',
      openapiVersion: '3.1.0',
      swaggerUrl: 'https://example.com/swagger.json',
      swaggerYamlUrl: 'https://example.com/swagger.yaml'
    })
  })

  it('handles empty response', () => {
    const apis = transformAPIsGuruData({})
    expect(apis).toHaveLength(0)
  })

  it('handles missing preferred version', () => {
    const response: APIsGuruResponse = {
      'test:v1': {
        added: '2024-01-01',
        preferred: 'non-existent',
        versions: {}
      }
    }
    const apis = transformAPIsGuruData(response)
    expect(apis).toHaveLength(0)
  })
})

describe('paginateAPIs', () => {
  const mockAPIs = Array.from({ length: 25 }, (_, i) => ({
    name: `API ${i + 1}`,
    description: `Description ${i + 1}`,
    version: '1.0.0',
    added: '2024-01-01',
    updated: '2024-01-01',
    url: `https://api${i + 1}.com`,
    category: 'Test',
    openapiVersion: '3.0.0',
    swaggerUrl: `https://api${i + 1}.com/swagger.json`,
    swaggerYamlUrl: `https://api${i + 1}.com/swagger.yaml`
  }))

  it('paginates APIs correctly', () => {
    const result = paginateAPIs(mockAPIs, 1, 10)
    expect(result.apis).toHaveLength(10)
    expect(result.totalPages).toBe(3)
    expect(result.page).toBe(1)
    expect(result.pageSize).toBe(10)
  })

  it('returns correct page', () => {
    const result = paginateAPIs(mockAPIs, 2, 10)
    expect(result.apis[0].name).toBe('API 11')
    expect(result.apis).toHaveLength(10)
    expect(result.page).toBe(2)
  })

  it('handles last page with fewer items', () => {
    const result = paginateAPIs(mockAPIs, 3, 10)
    expect(result.apis).toHaveLength(5)
    expect(result.page).toBe(3)
  })

  it('handles empty array', () => {
    const result = paginateAPIs([], 1, 10)
    expect(result.apis).toHaveLength(0)
    expect(result.totalPages).toBe(0)
    expect(result.page).toBe(1)
    expect(result.pageSize).toBe(10)
  })
}) 