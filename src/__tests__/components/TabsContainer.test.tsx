import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { TabsContainer } from '@/components/TabsContainer'
import type { API } from '@/types/api'

jest.mock('@/components/APIList', () => ({
  APIList: ({ apis, currentPage, totalPages, onPageChange }: any) => (
    <div data-testid="api-list">
      {apis.map((api: API) => (
        <div key={api.name}>{api.name}</div>
      ))}
      <button onClick={() => onPageChange(currentPage + 1)}>Next Page</button>
      <span>Page {currentPage} of {totalPages}</span>
    </div>
  )
}))

jest.mock('@/components/Dashboard', () => ({
  Dashboard: ({ apis }: any) => (
    <div data-testid="dashboard">
      {apis.map((api: API) => (
        <div key={api.name}>{api.name}</div>
      ))}
    </div>
  )
}))

jest.mock('@/components/CategoryFilter', () => ({
  CategoryFilter: ({ categories }: any) => (
    <div data-testid="category-filter">
      {categories.map((category: string) => (
        <div key={category}>{category}</div>
      ))}
    </div>
  )
}))

const mockRouter = { push: jest.fn() }
const mockSearchParams = { get: jest.fn() }
let mockPathname = '/'

jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
  usePathname: () => mockPathname,
  useSearchParams: () => mockSearchParams
}))

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

describe('TabsContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockSearchParams.get.mockImplementation(() => null)
    mockPathname = '/'
  })

  it('renders both tabs', () => {
    render(
      <TabsContainer
        allApis={mockApis}
        paginatedApis={mockApis}
        currentPage={1}
        totalPages={1}
        categories={['Test', 'Development']}
      />
    )

    expect(screen.getByText('API List')).toBeInTheDocument()
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  it('shows API list by default on home page', () => {
    render(
      <TabsContainer
        allApis={mockApis}
        paginatedApis={mockApis}
        currentPage={1}
        totalPages={1}
        categories={['Test', 'Development']}
      />
    )

    expect(screen.getByTestId('api-list')).toBeInTheDocument()
    expect(screen.getByTestId('category-filter')).toBeInTheDocument()
  })

  it('shows dashboard when on dashboard path', () => {
    mockPathname = '/dashboard'
    
    render(
      <TabsContainer
        allApis={mockApis}
        paginatedApis={mockApis}
        currentPage={1}
        totalPages={1}
        categories={['Test', 'Development']}
      />
    )

    expect(screen.getByTestId('dashboard')).toBeInTheDocument()
    expect(screen.queryByTestId('category-filter')).not.toBeInTheDocument()
  })

  it('handles tab changes correctly', async () => {
    render(
      <TabsContainer
        allApis={mockApis}
        paginatedApis={mockApis}
        currentPage={1}
        totalPages={1}
        categories={['Test', 'Development']}
      />
    )

    })

  it('handles page changes correctly', () => {
    render(
      <TabsContainer
        allApis={mockApis}
        paginatedApis={mockApis}
        currentPage={1}
        totalPages={2}
        categories={['Test', 'Development']}
      />
    )

    fireEvent.click(screen.getByText('Next Page'))
    expect(mockRouter.push).toHaveBeenCalledWith('/?page=2')
  })

  it('preserves search query when changing tabs', () => {
    mockSearchParams.get.mockImplementation((param) => 
      param === 'search' ? 'test query' : null
    )

    render(
      <TabsContainer
        allApis={mockApis}
        paginatedApis={mockApis}
        currentPage={1}
        totalPages={1}
        categories={['Test', 'Development']}
      />
    )

  })

  it('preserves search query when changing pages', () => {
    mockSearchParams.get.mockImplementation((param) => 
      param === 'search' ? 'test query' : null
    )

    render(
      <TabsContainer
        allApis={mockApis}
        paginatedApis={mockApis}
        currentPage={1}
        totalPages={2}
        categories={['Test', 'Development']}
      />
    )

    fireEvent.click(screen.getByText('Next Page'))
    expect(mockRouter.push).toHaveBeenCalledWith('/?page=2&search=test%20query')
  })
}) 