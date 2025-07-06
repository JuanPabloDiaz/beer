# Craft Beer

A premium, responsive web application built with Nuxt 3, TypeScript, and Tailwind CSS that integrates with the OpenBreweryDB API to showcase breweries around the world.

## Features

- 🍺 Browse, search, and filter breweries from the OpenBreweryDB API
- 🔍 Autocomplete search functionality with instant results
- 📱 Fully responsive design optimized for all devices
- 🌙 Dark mode support with toggle and system preference detection
- 📊 Metadata visualization with statistics about breweries
- 🗺️ Detailed brewery information with location data
- 🎲 Random brewery discovery feature
- 📝 Comprehensive documentation of the OpenBreweryDB API
- 📈 Google Analytics integration
- 🚀 Multi-platform deployment support (Vercel, Netlify, Cloudflare)

## Tech Stack

- **Framework**: [Nuxt 3](https://nuxt.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Testing**: [Vitest](https://vitest.dev/)
- **API**: [OpenBreweryDB](https://www.openbrewerydb.org/)
- **Fonts**: [Google Fonts (Inter)](https://fonts.google.com/specimen/Inter)

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/craft-beer-explorer.git
cd craft-beer-explorer

# Install dependencies
npm install
# or
yarn install

# Start development server
npm run dev
# or
yarn dev
```

Visit `http://localhost:3000` to see the application running.

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
NUXT_PUBLIC_API_BASE=https://api.openbrewerydb.org/v1
NUXT_PUBLIC_GOOGLE_ANALYTICS_ID=your-ga-id
```

## Project Structure

```
├── components/          # Vue components
├── composables/         # Reusable Vue composables
├── layouts/             # Page layouts
├── pages/               # Application pages
├── plugins/             # Nuxt plugins
├── public/              # Static assets
├── test/                # Unit tests
├── types/               # TypeScript type definitions
├── nuxt.config.ts       # Nuxt configuration
└── tailwind.config.js   # Tailwind CSS configuration
```

## Deployment

### Vercel

The project includes a `vercel.json` configuration file for easy deployment to Vercel.

```bash
npm run build
vercel
```

### Netlify

The project includes a `netlify.toml` configuration file for easy deployment to Netlify.

```bash
npm run build
netlify deploy
```

### Cloudflare Pages

The project includes a `_workers.js` file for deployment to Cloudflare Pages.

## Testing

```bash
# Run unit tests
npm run test
# or
yarn test
```

## API Documentation

This project uses the OpenBreweryDB API. Full documentation is available at [https://www.openbrewerydb.org/](https://www.openbrewerydb.org/).

Key endpoints used:
- `/breweries` - List breweries
- `/breweries/{id}` - Get a single brewery
- `/breweries/random` - Get a random brewery
- `/breweries/search` - Search breweries
- `/breweries/autocomplete` - Get autocomplete suggestions
- `/breweries/meta` - Get metadata about breweries

## License

MIT

## Acknowledgements

- [OpenBreweryDB](https://www.openbrewerydb.org/) for providing the free API
- [Nuxt.js Team](https://nuxtjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
