import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// For GitHub Pages project pages, set VITE_BASE_PATH to /your-repo-name/
// For a user/org page (username.github.io), leave it unset or use '/'
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || '/',
});
