# Public APIs Explorer

A modern, responsive web application built with Next.js that allows users to explore and search through APIs from the APIs.guru directory. The application provides an intuitive interface for discovering APIs, with detailed information about each API's features, documentation, and more.

## Screenshots

### API List View
![Dashboard View](public/screenshot2.png)

### Dashboard View
![API List View](public/screenshot1.png)

## Features

- 🔍 **Smart Search**: Search APIs by name, description, or category
- 🏷️ **Category Filtering**: Filter APIs by their categories
- 📊 **Dashboard View**: Visual representation of API statistics including:
  - Total number of APIs and Categories
  - Recently Added/Updated APIs
  - APIs with Logos and Contact Information
  - APIs with External Documentation
  - OpenAPI Version Distribution
- 📱 **Responsive Design**: Fully responsive layout that works on desktop and mobile devices
- 🌓 **Dark Mode Support**: Built-in dark mode for better viewing experience
- 📄 **Pagination**: Efficient pagination system for handling large datasets
- 🔗 **API Details**: Detailed view for each API with comprehensive information

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Data Source**: APIs.guru Directory
- **Testing**: Jest & React Testing Library
- **Type Safety**: TypeScript
## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd public-apis-explorer
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
public-apis-explorer/
├── src/
│   ├── app/                 # Next.js app router pages
│   │   ├── page.tsx        # Home page
│   │   ├── layout.tsx      # Root layout
│   │   ├── api/
│   │   │   └── [name]/     # API details page
│   │   └── dashboard/      # Dashboard page
│   ├── components/         # React components
│   │   ├── APIDetails.tsx  # API details component
│   │   ├── APIList.tsx     # API list component
│   │   ├── Dashboard.tsx   # Dashboard component
│   │   ├── SearchBar.tsx   # Search component
│   │   └── TabsContainer.tsx # Navigation tabs
│   │   └── CategoryFilter.tsx # Category filter

│   ├── types/             # TypeScript type definitions
│   │   └── api.ts         # API interface definitions
│   └── utils/             # Utility functions
│       ├── formatDate.ts  # Date formatting utility
│       └── parseAPIs.ts   # APIs.guru data transformation
├── public/                # Static assets
├── tailwind.config.js    # Tailwind CSS configuration
├── next.config.js        # Next.js configuration
├── tsconfig.json         # TypeScript configuration
├── package.json          # Project dependencies and scripts
└── jest.config.js        # Jest test configuration
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Testing

The project uses Jest and React Testing Library for testing. The test suite includes unit tests and integration tests for components and utilities.

### Test Structure

```
src/
├── __tests__/
│   ├── components/
│   │   ├── APIDetails.test.tsx
│   │   ├── APIList.test.tsx
│   │   ├── CategoryFilter.test.tsx
│   │   ├── Dashboard.test.tsx
│   │   └── TabsContainer.test.tsx
│   └── utils/
│       └── parseAPIs.test.ts
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Coverage Requirements

The project maintains high test coverage requirements:
- Statements: 80%
- Branches: 80%
- Functions: 80%
- Lines: 80%

Current coverage meets or exceeds these thresholds for all components and utilities.

### Test Configuration

- **Jest**: Configured for Next.js with TypeScript support
- **React Testing Library**: Used for component testing
- **Mocks**:
  - `next/navigation`: Router and navigation functions
  - `next/link`: Link component
  - Child components in integration tests

### Writing Tests

Each test file follows these conventions:
1. Mock setup at the top
2. Test data/fixtures
3. Describe block with related test cases
4. Clear test descriptions
5. Proper cleanup in beforeEach when needed

Example:
```typescript
import { render, screen, fireEvent } from '@testing-library/react'

describe('ComponentName', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render correctly', () => {
    render(<Component />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })
})
```

