import React from 'react'
import { render, screen } from '@testing-library/react'
import { Dashboard } from '@/components/Dashboard'
import type { API } from '@/types/api'

const mockApis: API[] = [
  {
    name: 'API 1',
    description: 'Test API 1',
    version: '1.0.0',
    added: '2024-01-01',
    updated: '2024-01-01',
    url: 'https://test1.com',
    category: 'Test',
    openapiVersion: '3.0.0',
    swaggerUrl: 'https://test1.com/swagger.json',
    swaggerYamlUrl: 'https://test1.com/swagger.yaml',
    logo: 'https://test1.com/logo.png',
    contact: {
      name: 'Test Contact',
      email: 'test@test.com'
    },
    externalDocs: {
      url: 'https://test1.com/docs'
    }
  },
  {
    name: 'API 2',
    description: 'Test API 2',
    version: '1.0.0',
    added: '2024-01-01',
    updated: '2024-01-01',
    url: 'https://test2.com',
    category: 'Development',
    openapiVersion: '3.1.0',
    swaggerUrl: 'https://test2.com/swagger.json',
    swaggerYamlUrl: 'https://test2.com/swagger.yaml'
  },
  {
    name: 'API 3',
    description: 'Test API 3',
    version: '1.0.0',
    added: '2024-01-01',
    updated: '2024-01-01',
    url: 'https://test3.com',
    category: 'Test',
    openapiVersion: '3.0.0',
    swaggerUrl: 'https://test3.com/swagger.json',
    swaggerYamlUrl: 'https://test3.com/swagger.yaml',
    logo: 'https://test3.com/logo.png'
  }
]

describe('Dashboard', () => {
  const findMetricValue = (labelText: string) => {
    const label = screen.getByText(labelText)
    return label.parentElement?.querySelector('p')?.textContent
  }

  const findCategoryValue = (categoryName: string) => {
    const spans = Array.from(document.querySelectorAll('span'))
    const categorySpan = spans.find(span => span.textContent === categoryName)
    return categorySpan?.nextElementSibling?.textContent
  }

  it('displays correct total number of APIs', () => {
    render(<Dashboard apis={mockApis} />)
    expect(findMetricValue('Total APIs')).toBe('3')
  })

  it('displays correct number of categories', () => {
    render(<Dashboard apis={mockApis} />)
    expect(findMetricValue('Categories')).toBe('2')
  })

  it('displays correct statistics', () => {
    render(<Dashboard apis={mockApis} />)
    expect(findMetricValue('With Logo')).toBe('2')
    expect(findMetricValue('Contact Info')).toBe('1')
    expect(findMetricValue('Documentation')).toBe('1')
  })

  it('displays categories breakdown in descending order', () => {
    render(<Dashboard apis={mockApis} />)
    expect(screen.getByText('APIs by Category')).toBeInTheDocument()
    
    const categoryElements = screen.getAllByText(/Test|Development/)
    expect(categoryElements[0].textContent).toBe('Test') // Category with 2 APIs should be first
    expect(categoryElements[1].textContent).toBe('Development') // Category with 1 API should be second
    
    expect(findCategoryValue('Test')).toBe('2')
    expect(findCategoryValue('Development')).toBe('1')
  })

  it('displays OpenAPI versions breakdown', () => {
    render(<Dashboard apis={mockApis} />)
    expect(screen.getByText('OpenAPI Versions')).toBeInTheDocument()
    expect(screen.getByText('v3.0.0')).toBeInTheDocument()
    expect(screen.getByText('v3.1.0')).toBeInTheDocument()
  })

  it('displays recent updates section', () => {
    render(<Dashboard apis={mockApis} />)
    expect(screen.getByText('Recent Updates')).toBeInTheDocument()
    expect(screen.getAllByText(/API \d/).length).toBe(3) // Should show all 3 APIs in recent updates
  })

  it('handles empty APIs array', () => {
    render(<Dashboard apis={[]} />)
    expect(findMetricValue('Total APIs')).toBe('0')
    expect(findMetricValue('Categories')).toBe('0')
    expect(findMetricValue('With Logo')).toBe('0')
    expect(findMetricValue('Contact Info')).toBe('0')
    expect(findMetricValue('Documentation')).toBe('0')
  })
}) 