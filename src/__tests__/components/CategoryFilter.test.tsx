import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { CategoryFilter } from '@/components/CategoryFilter'

const mockRouter = { push: jest.fn() }
const mockSearchParams = { get: jest.fn() }

jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
  useSearchParams: () => mockSearchParams
}))

const mockCategories = ['Animals', 'Books', 'Development']

describe('CategoryFilter', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockSearchParams.get.mockImplementation(() => null)
  })

  it('renders with categories', () => {
    render(<CategoryFilter categories={mockCategories} />)
    expect(screen.getByText('Filter by Category')).toBeInTheDocument()
  })

  it('shows all categories in dropdown', async () => {
    render(<CategoryFilter categories={mockCategories} />)
    const trigger = screen.getByRole('combobox')
    fireEvent.click(trigger)
    
    expect(screen.getByText('All Categories')).toBeInTheDocument()
    mockCategories.forEach(category => {
      expect(screen.getByText(category)).toBeInTheDocument()
    })
  })

  it('displays selected category', () => {
    mockSearchParams.get.mockImplementation((param: string) => 
      param === 'category' ? 'Animals' : null
    )

    render(<CategoryFilter categories={mockCategories} />)
    expect(screen.getByText('Category: Animals')).toBeInTheDocument()
  })

  it('handles category selection', () => {
    render(<CategoryFilter categories={mockCategories} />)
    const trigger = screen.getByRole('combobox')
    fireEvent.click(trigger)
    fireEvent.click(screen.getByText('Animals'))

    expect(mockRouter.push).toHaveBeenCalledWith('/?page=1&category=Animals')
  })
}) 