import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { APIDetails } from '@/components/APIDetails'
import { useRouter } from 'next/navigation'
import type { API } from '@/types/api'
import { formatDate } from '@/utils/formatDate'

const mockRouter = { back: jest.fn() }

jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter
}))

jest.mock('@/utils/formatDate', () => ({
  formatDate: jest.fn((date) => `Formatted: ${date}`)
}))

const mockAPI = {
  name: 'Test API',
  description: 'A test API description',
  version: '1.0.0',
  added: '2024-01-01',
  updated: '2024-01-01',
  url: 'https://test-api.com',
  category: 'Test',
  openapiVersion: '3.0.0',
  swaggerUrl: 'https://test-api.com/swagger.json',
  swaggerYamlUrl: 'https://test-api.com/swagger.yaml',
  logo: 'https://test-api.com/logo.png',
  contact: {
    name: 'Test Contact' as const,
    email: 'test@test.com' as const
  },
  externalDocs: {
    url: 'https://test-api.com/docs'
  }
} satisfies API

describe('APIDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders API details correctly', () => {
    render(<APIDetails api={mockAPI} />)
    
    expect(screen.getByText(mockAPI.name)).toBeInTheDocument()
    expect(screen.getByText(mockAPI.description)).toBeInTheDocument()
    expect(screen.getByText('Test')).toBeInTheDocument() // Category
    expect(screen.getByText(`Version ${mockAPI.version}`)).toBeInTheDocument()
    
    expect(screen.getByRole('link', { name: 'Visit API' })).toHaveAttribute('href', mockAPI.url)
    expect(screen.getByText('Back to List')).toBeInTheDocument()
    expect(screen.getByText('Public APIs Explorer')).toHaveAttribute('href', '/')
  })

  it('displays dates correctly', () => {
    render(<APIDetails api={mockAPI} />)
    
    expect(formatDate).toHaveBeenCalledWith(mockAPI.added)
    expect(formatDate).toHaveBeenCalledWith(mockAPI.updated)
    expect(screen.getByText('Added:', { exact: false })).toBeInTheDocument()
    expect(screen.getByText('Updated:', { exact: false })).toBeInTheDocument()
  })

  it('displays contact information correctly', () => {
    render(<APIDetails api={mockAPI} />)
    
    const { contact } = mockAPI
    expect(screen.getByText('Contact:', { exact: false })).toBeInTheDocument()
    expect(screen.getByText(contact.name, { exact: false })).toBeInTheDocument()
  })

  it('displays OpenAPI information correctly', () => {
    render(<APIDetails api={mockAPI} />)
    
    expect(screen.getByText('OpenAPI Version:', { exact: false })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /OpenAPI Spec \(JSON\)/ })).toHaveAttribute('href', mockAPI.swaggerUrl)
    expect(screen.getByRole('link', { name: /OpenAPI Spec \(YAML\)/ })).toHaveAttribute('href', mockAPI.swaggerYamlUrl)
  })

  it('displays external documentation link when available', () => {
    render(<APIDetails api={mockAPI} />)
    
    const { externalDocs } = mockAPI
    const docsLink = screen.getByRole('link', { name: 'Documentation' })
    expect(docsLink).toHaveAttribute('href', externalDocs.url)
  })

  it('handles missing optional fields gracefully', () => {
    const apiWithoutOptionals: API = {
      name: 'Test API',
      description: 'A test API description',
      version: '1.0.0',
      added: '2024-01-01',
      updated: '2024-01-01',
      url: 'https://test-api.com',
      category: 'Test',
      openapiVersion: '3.0.0',
      swaggerUrl: 'https://test-api.com/swagger.json',
      swaggerYamlUrl: 'https://test-api.com/swagger.yaml'
    }

    render(<APIDetails api={apiWithoutOptionals} />)
    
    expect(screen.queryByText('Contact:', { exact: false })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Documentation' })).not.toBeInTheDocument()
  })

  it('handles back button click', () => {
    render(<APIDetails api={mockAPI} />)
    
    const backButton = screen.getByText('Back to List')
    fireEvent.click(backButton)
    
    expect(mockRouter.back).toHaveBeenCalled()
  })
}) 
