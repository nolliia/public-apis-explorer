import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { APIList } from '@/components/APIList'
import type { API } from '@/types/api'

const mockApis: API[] = [
  {
    name: 'Test API 1',
    description: 'First test API',
    version: '1.0.0',
    added: '2024-01-01',
    updated: '2024-01-01',
    url: 'https://test1.com',
    category: 'Test',
    openapiVersion: '3.0.0',
    swaggerUrl: 'https://test1.com/swagger.json',
    swaggerYamlUrl: 'https://test1.com/swagger.yaml'
  },
  {
    name: 'Test API 2',
    description: 'Second test API',
    version: '1.0.0',
    added: '2024-01-01',
    updated: '2024-01-01',
    url: 'https://test2.com',
    category: 'Development',
    openapiVersion: '3.0.0',
    swaggerUrl: 'https://test2.com/swagger.json',
    swaggerYamlUrl: 'https://test2.com/swagger.yaml'
  }
]

describe('APIList', () => {
  const mockOnPageChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders list of APIs correctly', () => {
    render(
      <APIList
        apis={mockApis}
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    )

    mockApis.forEach(api => {
      expect(screen.getByText(api.name)).toBeInTheDocument()
      expect(screen.getByText(api.description)).toBeInTheDocument()
      expect(screen.getByText(api.category)).toBeInTheDocument()
    })

  })

  it('renders pagination correctly', () => {
    render(
      <APIList
        apis={mockApis}
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    )

    expect(screen.getByLabelText('Previous page')).toBeInTheDocument()
    expect(screen.getByLabelText('Next page')).toBeInTheDocument()
    
    const currentPageButton = screen.getByLabelText('Page 3')
    expect(currentPageButton).toHaveAttribute('aria-current', 'page')
  })

  it('handles page navigation correctly', () => {
    render(
      <APIList
        apis={mockApis}
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    )

    fireEvent.click(screen.getByLabelText('Previous page'))
    expect(mockOnPageChange).toHaveBeenCalledWith(2)

    fireEvent.click(screen.getByLabelText('Next page'))
    expect(mockOnPageChange).toHaveBeenCalledWith(4)

    fireEvent.click(screen.getByText('1'))
    expect(mockOnPageChange).toHaveBeenCalledWith(1)
  })

  it('disables previous button on first page', () => {
    render(
      <APIList
        apis={mockApis}
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    )

    expect(screen.getByLabelText('Previous page')).toBeDisabled()
    expect(screen.getByLabelText('Next page')).not.toBeDisabled()
  })

  it('disables next button on last page', () => {
    render(
      <APIList
        apis={mockApis}
        currentPage={5}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    )

    expect(screen.getByLabelText('Previous page')).not.toBeDisabled()
    expect(screen.getByLabelText('Next page')).toBeDisabled()
  })

  it('renders ellipsis in pagination when needed', () => {
    render(
      <APIList
        apis={mockApis}
        currentPage={5}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    )

    const ellipses = screen.getAllByText('...')
    expect(ellipses.length).toBeGreaterThan(0)
  })

  it('creates correct links for API details', () => {
    render(
      <APIList
        apis={mockApis}
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    )

    mockApis.forEach(api => {
      const link = screen.getByText(api.name).closest('a')
      expect(link).toHaveAttribute('href', `/api/${encodeURIComponent(api.name)}`)
    })
  })
}) 