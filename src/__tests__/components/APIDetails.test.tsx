import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { APIDetails } from '@/components/APIDetails'
import { useRouter } from 'next/navigation'
import type { API } from '@/types/api'

const mockRouter = { back: jest.fn() }

jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter
}))

const mockAPI: API = {
  name: 'Test API',
  description: 'A test API description',
  auth: 'apiKey',
  https: true,
  cors: 'yes',
  url: 'https://test-api.com',
  category: 'Test'
}

const mockAPINoAuth: API = {
  ...mockAPI,
  auth: ''
}

describe('APIDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders API details correctly', () => {
    render(<APIDetails api={mockAPI} />)
    
    expect(screen.getByText(mockAPI.name)).toBeInTheDocument()
    expect(screen.getByText(mockAPI.description)).toBeInTheDocument()
    expect(screen.getByText(mockAPI.category)).toBeInTheDocument()
    
    expect(screen.getByText('Visit API')).toHaveAttribute('href', mockAPI.url)
    expect(screen.getByText('Back to List')).toBeInTheDocument()
    expect(screen.getByText('Public APIs Explorer')).toHaveAttribute('href', '/')
  })

  it('displays security information correctly', () => {
    render(<APIDetails api={mockAPI} />)
    
    expect(screen.getByText('HTTPS: Required')).toBeInTheDocument()
    expect(screen.getByText(`CORS: ${mockAPI.cors}`)).toBeInTheDocument()
  })

  it('displays authentication information correctly with auth', () => {
    render(<APIDetails api={mockAPI} />)
    expect(screen.getByText(`Auth: ${mockAPI.auth}`)).toBeInTheDocument()
    expect(screen.getByText(`Authentication required (${mockAPI.auth})`)).toBeInTheDocument()
  })

  it('displays authentication information correctly without auth', () => {
    render(<APIDetails api={mockAPINoAuth} />)
    expect(screen.getByText('Auth: None')).toBeInTheDocument()
    expect(screen.getByText('No authentication required')).toBeInTheDocument()
  })

  it('handles back button click', () => {
    render(<APIDetails api={mockAPI} />)
    
    const backButton = screen.getByText('Back to List')
    fireEvent.click(backButton)
    
    expect(mockRouter.back).toHaveBeenCalled()
  })

  it('displays HTTPS not required when https is false', () => {
    render(<APIDetails api={{ ...mockAPI, https: false }} />)
    expect(screen.getByText('HTTPS: Not Required')).toBeInTheDocument()
  })
}) 