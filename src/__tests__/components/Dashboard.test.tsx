import React from 'react'
import { render, screen } from '@testing-library/react'
import { Dashboard } from '@/components/Dashboard'
import type { API } from '@/types/api'

const mockApis: API[] = [
  {
    name: 'API 1',
    description: 'Test API 1',
    auth: 'apiKey',
    https: true,
    cors: 'yes',
    url: 'https://test1.com',
    category: 'Test'
  },
  {
    name: 'API 2',
    description: 'Test API 2',
    auth: 'OAuth',
    https: true,
    cors: 'no',
    url: 'https://test2.com',
    category: 'Development'
  },
  {
    name: 'API 3',
    description: 'Test API 3',
    auth: '',
    https: false,
    cors: 'yes',
    url: 'https://test3.com',
    category: 'Test'
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

  const findAuthTypeValue = (authType: string) => {
    const spans = Array.from(document.querySelectorAll('span'))
    const authSpan = spans.find(span => span.textContent === authType)
    return authSpan?.nextElementSibling?.textContent
  }

  it('displays correct total number of APIs', () => {
    render(<Dashboard apis={mockApis} />)
    expect(findMetricValue('Total APIs')).toBe('3')
  })

  it('displays correct number of categories', () => {
    render(<Dashboard apis={mockApis} />)
    expect(findMetricValue('Categories')).toBe('2')
  })

  it('displays correct number of auth types', () => {
    render(<Dashboard apis={mockApis} />)
    expect(findMetricValue('Auth Types')).toBe('3')
  })

  it('displays correct CORS support count', () => {
    render(<Dashboard apis={mockApis} />)
    expect(findMetricValue('CORS Support')).toBe('0 APIs')
  })

  it('displays correct HTTPS usage percentage', () => {
    render(<Dashboard apis={mockApis} />)
    expect(findMetricValue('HTTPS Usage')).toBe('67%')
  })

  it('displays categories breakdown', () => {
    render(<Dashboard apis={mockApis} />)
    expect(screen.getByText('APIs by Category')).toBeInTheDocument()
    expect(screen.getByText('Test')).toBeInTheDocument()
    expect(screen.getByText('Development')).toBeInTheDocument()
  })

  it('displays authentication types breakdown', () => {
    render(<Dashboard apis={mockApis} />)
    expect(screen.getByText('Authentication Types')).toBeInTheDocument()
    expect(screen.getByText('apiKey')).toBeInTheDocument()
    expect(screen.getByText('OAuth')).toBeInTheDocument()
    expect(screen.getByText('None')).toBeInTheDocument()
  })

  it('shows correct category counts', () => {
    render(<Dashboard apis={mockApis} />)
    expect(findCategoryValue('Test')).toBe('2')
    expect(findCategoryValue('Development')).toBe('1')
  })

  it('shows correct auth type counts', () => {
    render(<Dashboard apis={mockApis} />)
    expect(findAuthTypeValue('apiKey')).toBe('1')
    expect(findAuthTypeValue('OAuth')).toBe('1')
    expect(findAuthTypeValue('None')).toBe('1')
  })

  it('handles empty APIs array', () => {
    render(<Dashboard apis={[]} />)
    expect(findMetricValue('Total APIs')).toBe('0')
    expect(findMetricValue('Categories')).toBe('0')
    expect(findMetricValue('HTTPS Usage')).toBe('0%')
  })
}) 