import { parseAPIs, paginateAPIs } from '@/utils/parseAPIs'

describe('parseAPIs', () => {
  const mockMarkdown = `
### Animals
| [Cat Facts](https://catfact.ninja/) | Daily cat facts | \`apiKey\` | Yes | Yes |
| [Dog API](https://dog.ceo/dog-api/) | Pictures of dogs | No | Yes | Yes |

### Books
| [Open Library](https://openlibrary.org/developers/api) | Books, book covers and related data | No | Yes | Yes |
`

  it('parses APIs correctly from markdown', () => {
    const apis = parseAPIs(mockMarkdown)
    expect(apis).toHaveLength(3)
    
    expect(apis[0]).toEqual({
      name: 'Cat Facts',
      url: 'https://catfact.ninja/',
      description: 'Daily cat facts',
      auth: 'apiKey',
      https: true,
      cors: 'Yes',
      category: 'Animals'
    })
  })

  it('handles empty markdown', () => {
    const apis = parseAPIs('')
    expect(apis).toHaveLength(0)
  })
})

describe('paginateAPIs', () => {
  const mockAPIs = Array.from({ length: 25 }, (_, i) => ({
    name: `API ${i + 1}`,
    url: `https://api${i + 1}.com`,
    description: `Description ${i + 1}`,
    auth: 'No',
    https: true,
    cors: 'Yes',
    category: 'Test'
  }))

  it('paginates APIs correctly', () => {
    const { apis, totalPages } = paginateAPIs(mockAPIs, 1, 10)
    expect(apis).toHaveLength(10)
    expect(totalPages).toBe(3)
  })

  it('returns correct page', () => {
    const { apis } = paginateAPIs(mockAPIs, 2, 10)
    expect(apis[0].name).toBe('API 11')
    expect(apis).toHaveLength(10)
  })

  it('handles last page with fewer items', () => {
    const { apis } = paginateAPIs(mockAPIs, 3, 10)
    expect(apis).toHaveLength(5)
  })

  it('handles empty array', () => {
    const { apis, totalPages } = paginateAPIs([], 1, 10)
    expect(apis).toHaveLength(0)
    expect(totalPages).toBe(0)
  })
}) 