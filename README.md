# Mini Blog Viewer

A small React application that allows users to browse blog posts, view detailed post information, and see author profiles. The application fetches data from the [DUmmy JSON API](https://dummyjson.com).

## Features

*   Browse a list of blog posts.
*   View detailed content for individual posts.
*   See author information associated with each post.
*   Responsive design for various screen sizes.

## Technologies Used

*   **Frontend:** React 19
*   **Styling:** Tailwind CSS 4
*   **State Management/Data Fetching:** React Query (TanStack Query)
*   **Routing:** React Router DOM
*   **Icons:** Lucide React
*   **Build Tool:** Vite 6
*   **Type Checking:** TypeScript 5
*   **Testing:** Vitest 3, React Testing Library, Vitest-axe, JSDOM
*   **Linting & Formatting:** Biome, Ultracite
*   **Version Control Hooks:** Husky, lint-staged

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed:

*   Node.js (LTS recommended)
*   npm (comes with Node.js)

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/your-username/mini-blog-viewer.git
    cd mini-blog-viewer
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

### Running the Development Server

To start the development server with hot-reloading:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal) in your browser.

### Building for Production

To build the application for production:

```bash
npm run build
```

This will create a `dist` directory with the optimized production build.

### Previewing the Production Build

To preview the production build locally:

```bash
npm run preview
```

## Testing

### Run all tests

```bash
npm test
```

### Run tests with coverage report

```bash
npm run test:coverage
```

### Run tests in UI mode

```bash
npm run test:ui
```

### Run tests in watch mode

```bash
npm run test:watch
```

## Linting and Formatting

### Run lint checks

```bash
npm run lint
```

### Automatically format code

```bash
npm run format
```

## Project Structure

```
mini-blog-viewer/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/             # Static assets like images
│   ├── components/         # Reusable React components
│   ├── pages/              # Top-level page components
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Entry point of the application
│   ├── constants.ts        # Application-wide constants
│   ├── query-client.ts     # TanStack Query client configuration
│   ├── types.ts            # TypeScript type definitions
│   ├── utils.ts            # Utility functions
│   └── ...                 # Other source files
├── .github/                # GitHub Actions workflows (if any)
├── .husky/                 # Git hooks configuration
├── .qlty/                  # Quality tool configurations
├── .vscode/                # VS Code specific settings
├── biome.jsonc             # Biome linter/formatter configuration
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite build configuration
├── vitest.config.ts        # Vitest test configuration
└── ...                     # Other configuration files and directories
```

## Contributing

Contributions are welcome! Please ensure your code adheres to the existing style and passes all tests and lint checks.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details. (Note: A `LICENSE` file is not included in the provided directory structure. You may want to add one.)