import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { APIList } from '@/components/APIList'
import type { API } from '@/types/api'

const mockApis: API[] = [
  {
    name: 'Test API 1',
    description: 'First test API',
    auth: 'apiKey',
    https: true,
    cors: 'yes',
    url: 'https://test1.com',
    category: 'Test'
  },
  {
    name: 'Test API 2',
    description: 'Second test API',
    auth: '',
    https: false,
    cors: 'no',
    url: 'https://test2.com',
    category: 'Development'
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

    expect(screen.getByText('Auth: apiKey')).toBeInTheDocument()
    expect(screen.getByText('Auth: None')).toBeInTheDocument()
    expect(screen.getByText('HTTPS: Yes')).toBeInTheDocument()
    expect(screen.getByText('HTTPS: No')).toBeInTheDocument()
    expect(screen.getByText('CORS: yes')).toBeInTheDocument()
    expect(screen.getByText('CORS: no')).toBeInTheDocument()
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