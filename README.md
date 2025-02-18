# DIPP

A SvelteKit application with TypeScript support.

## Prerequisites

- Node.js (v18 or higher recommended)
- pnpm (v8 or higher)

## Setup Instructions

1. Install pnpm if you haven't already:
   ```bash
   npm install -g pnpm
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

4. Build for production:
   ```bash
   pnpm build
   ```

5. Preview production build:
   ```bash
   pnpm preview
   ```

## Development

- The application uses SvelteKit as the framework
- TypeScript for type safety
- Local database configuration in `src/lib/server/db.local.ts`
- Dashboard routes available at `/dashboard`

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Create production build
- `pnpm preview` - Preview production build
- `pnpm check` - Run svelte-check
- `pnpm lint` - Run linter
- `pnpm format` - Format code with Prettier

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# Firebase Configuration
VITE_API_KEY=your_firebase_api_key
VITE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_PROJECT_ID=your_firebase_project_id
VITE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_APP_ID=your_firebase_app_id

# Database Configuration
VITE_DATABASE_HOST=localhost
VITE_DATABASE_USERNAME=your_database_username
VITE_DATABASE_PASSWORD=your_database_password
VITE_DATABASE_PORT=5432

# Constructed Database URL (used internally)
VITE_DB_URL=postgres://${VITE_DATABASE_USERNAME}:${VITE_DATABASE_PASSWORD}@${VITE_DATABASE_HOST}:${VITE_DATABASE_PORT}/your_database_name
```

### How to Get the Variables

1. **Firebase Configuration**:
   - Go to your Firebase Console (https://console.firebase.google.com/)
   - Select your project (or create a new one)
   - Go to Project Settings > General
   - Scroll down to "Your apps" and create or select a web app
   - The configuration variables will be shown in the Firebase SDK snippet

2. **Database Configuration**:
   - If using a local PostgreSQL database:
     - Set `VITE_DATABASE_HOST` to `localhost`
     - Use your local PostgreSQL username, password, and port
   - If using a hosted PostgreSQL service (like Supabase, Neon, etc.):
     - Get the connection details from your database provider's dashboard
     - Fill in the host, username, password, and port accordingly

Remember to never commit the `.env` file to version control. A `.env.example` file is provided as a template.

## Project Structure

```
src/
├── lib/
│   └── server/      # Server-side code including database
└── routes/          # SvelteKit routes
    └── dashboard/   # Dashboard related components
