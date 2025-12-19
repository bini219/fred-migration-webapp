# Client Migration Tool - Web Application

Modern web interface for managing client migrations from legacy systems to the new platform. Built with Vue.js 3 and Vuetify Material Design.

## Tech Stack

- **Vue.js 3** - Progressive JavaScript framework
- **Vuetify 3** - Material Design component library
- **Axios** - HTTP client for API communication
- **Material Design Icons** - Icon library

## Features

- ✅ View all legacy system clients
- ✅ One-click client migration
- ✅ Real-time migration feedback
- ✅ View migrated clients
- ✅ Responsive Material Design UI
- ✅ Error handling with user-friendly messages

## Prerequisites

- Node.js 16+ 
- npm or yarn
- Backend API running on `http://localhost:8080`

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd webapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run serve
   ```

The application will be available at `http://localhost:3000`

## Available Scripts

### Development
```bash
npm run serve
```
Starts the development server with hot-reload at `http://localhost:3000`

### Production Build
```bash
npm run build
```
Builds the app for production to the `dist/` folder

### Linting
```bash
npm run lint
```
Lints and fixes files

## Project Structure

```
webapp/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── App.vue                 # Root component
│   ├── main.js                 # Application entry point
│   ├── plugins/
│   │   └── vuetify.js          # Vuetify configuration
│   └── services/
│       └── api.js              # API service layer
├── package.json
└── vue.config.js               # Vue CLI configuration
```

## Configuration

### API Base URL

The API URL is configured in `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:8080/api'
```

**For production**, update this to your production API URL.

### Proxy Configuration

Development proxy is configured in `vue.config.js`:

```javascript
devServer: {
  port: 3000,
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    },
  },
}
```

## Components Overview

### App.vue (Main Component)

The main application component contains:

- **Legacy Clients Table** - Displays clients to be migrated
- **Migrated Clients Table** - Shows successfully migrated clients
- **Migration Actions** - One-click migration buttons
- **Notifications** - Success/error feedback via snackbars

### Key Features

#### Data Tables
- Sortable columns
- Loading states
- Empty states with helpful messages
- Responsive design

#### Migration Flow
1. User clicks "Migrate" button
2. Loading indicator appears
3. API call to backend
4. Success/error notification
5. Tables refresh automatically

#### Error Handling
- Network errors
- Client not found
- Already migrated clients
- Generic error fallback

## API Integration

### API Service (`src/services/api.js`)

Centralized API calls using Axios:

```javascript
export default {
  getLegacyClients() {
    return apiClient.get('/legacy/clients')
  },
  
  getNewClients() {
    return apiClient.get('/new/clients')
  },
  
  migrateClient(clientId) {
    return apiClient.post(`/migrate/${clientId}`)
  },
}
```

### Usage in Component

```javascript
import api from './services/api'

// Fetch clients
const response = await api.getLegacyClients()
this.legacyClients = response.data

// Migrate client
await api.migrateClient(clientId)
```

## Styling

### Theme Configuration

Vuetify theme is configured in `src/plugins/vuetify.js`:

```javascript
theme: {
  defaultTheme: 'light',
  themes: {
    light: {
      colors: {
        primary: '#1976D2',
        secondary: '#424242',
        success: '#4CAF50',
        error: '#FF5252',
      },
    },
  },
}
```

### Custom Styles

Additional styles in `App.vue`:

```css
.bg-orange {
  background-color: #FF9800 !important;
}

.bg-success {
  background-color: #4CAF50 !important;
}
```

## User Interface

### Legacy Clients Section (Orange)
- Lists all clients in the legacy system
- Shows: ID, Name, Email
- "Migrate" action button for each client
- Count badge showing remaining clients

### Migrated Clients Section (Green)
- Lists all successfully migrated clients
- Shows: ID, Name, Email, Status badge
- Count badge showing total migrated

### Notifications
- **Success** - Green snackbar with success message
- **Error** - Red snackbar with error details
- Auto-dismiss after 3 seconds
- Manual close button

## Development Guidelines

### Code Style
- Use Vue 3 Composition API patterns
- Component-scoped styles
- Async/await for API calls
- Proper error handling

### Best Practices
- Keep components focused and reusable
- Centralize API calls in service layer
- Use Vuetify components for consistency
- Implement proper loading states
- Provide user feedback for all actions

## Building for Production

### 1. Build the application
```bash
npm run build
```

### 2. Preview the build locally
```bash
npm install -g serve
serve -s dist
```

### 3. Deploy
Upload the `dist/` folder to your web server or hosting platform.

### Environment Variables

For different environments, create `.env` files:

**.env.development**
```
VUE_APP_API_URL=http://localhost:8080/api
```

**.env.production**
```
VUE_APP_API_URL=https://api.yourcompany.com/api
```

Update `api.js`:
```javascript
const API_BASE_URL = process.env.VUE_APP_API_URL
```

## Troubleshooting

### Port Already in Use
If port 3000 is already in use:
```bash
# Change port in vue.config.js
devServer: {
  port: 8081, // Use different port
}
```

### API Connection Issues
- Verify backend is running on `http://localhost:8080`
- Check CORS configuration in backend
- Check browser console for errors

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- **Initial Load**: ~200ms
- **API Calls**: ~50-100ms (local)
- **Bundle Size**: ~500KB (gzipped)

## Future Enhancements

- [ ] Add pagination for large client lists
- [ ] Implement search/filter functionality
- [ ] Add batch migration support
- [ ] Add export functionality (CSV/Excel)
- [ ] Implement undo migration
- [ ] Add migration history view
- [ ] Add dark mode toggle
- [ ] Add client details modal
- [ ] Implement state management (Pinia)
- [ ] Add comprehensive unit tests

## Testing

### Unit Tests (Future)
```bash
npm run test:unit
```

### E2E Tests (Future)
```bash
npm run test:e2e
```

## License

Proprietary - All rights reserved

## Support

For questions or issues, please contact the development team.