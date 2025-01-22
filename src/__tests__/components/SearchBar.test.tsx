import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { SearchBar } from '@/components/SearchBar'

describe('SearchBar', () => {
  it('renders with default value', () => {
    render(<SearchBar defaultValue="test" />)
    expect(screen.getByRole('searchbox')).toHaveValue('test')
  })

  it('renders with placeholder text', () => {
    render(<SearchBar />)
    expect(screen.getByPlaceholderText('Search APIs by name, description, or category...')).toBeInTheDocument()
  })

  it('renders with search icon', () => {
    render(<SearchBar />)
    expect(screen.getByTestId('search-icon')).toBeInTheDocument()
  })

  it('handles input changes', () => {
    render(<SearchBar />)
    const input = screen.getByRole('searchbox')
    fireEvent.change(input, { target: { value: 'test search' } })
    expect(input).toHaveValue('test search')
  })
}) 