# Student Management Frontend

A modern React + TypeScript + Vite application using Material UI (MUI) for a student management system.

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Linting & Formatting
- **Lint:**
  ```bash
  npm run lint
  ```
- **Auto-fix & Format:**
  ```bash
  npm run lint:fix
  ```
- Uses ESLint and Prettier for code quality and formatting.

## Folder Structure
- `src/components/` - Reusable UI components (Appbar, Sidebar, Layout, etc.)
- `src/pages/` - Route-level pages (Dashboard, Students, Login, etc.)
- `src/routes/` - Routing configuration and protected routes
- `src/state/` - Context and state management
- `src/theme/` - MUI theme configuration
- `src/services/` - API and storage services
- `src/repositories/` - Data fetching and repository pattern
- `src/types/` - TypeScript types
- `src/constants/` - App-wide constants
- `src/assets/` - Static assets (images, SVGs)

## Theming
- Uses MUI's ThemeProvider for consistent theming.
- Customize the theme in `src/theme/theme.ts`.

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## License
[MIT](LICENSE)
