# Password Manager - Frontend Overview

## 🎯 Agent Skill Usage Instructions

**The coding agent MUST read this file when working on frontend tasks and automatically apply the following skills:**

| Skill | When to Apply | What it Ensures |
|-------|---------------|----------------|
| **frontend-design** | ✅ **ALWAYS** for any UI work | Distinctive, intentional visual design; non-generic UI; thoughtful micro-interactions |
| **tdd** | When creating new features or fixing bugs | Test-driven development with red-green-refactor workflow |

---

## Project Context

**What**: Password Manager web application to help users organize usernames and passwords for websites.

**Why**: Learn to use Node.js built-in encryption/decryption functions to encrypt data and bcrypt/JWT for authentication.

**Stack**: MERN-inspired (MongoDB, Express, **Vue 3**, Node) - Note: Not Nuxt, using Vite + Vue 3 with API routing.

**Technology Stack**

- **Frontend Framework**: Vue 3 (Composition API with `<script setup>`, TypeScript)
- **Build Tool**: Vite (not VitePress or Nuxt)
- **Routing**: Vue Router 4 (programmatic route guards disabled)
- **HTTP Client**: Axios (with credentials)
- **Styling**: SCSS with CSS Variables
- **Backend**: Node.js + Express + JWT + Bcrypt + crypto

## Project Workflow

### Authentication Flow

```
1. User enters email/password → 
2. POST to /users/login/ → 
3. Server hashes password, finds matching user → 
4. Server sets session with userID and userIV via JWT (JSON Web Token) → 
5. Server sends user's password objects to client → 
6. Client stores email in localStorage, redirects to dashboard
```

### Password Management Flow

```
1. Create New Password:
   Client sends data → Server encrypts with crypto module → Stores in MongoDB

2. Retrieve Password:
   Client fetches from /api/passwords/ → Server decrypts → Returns to client

3. View Password:
   Click ListItem → Set selectedItem → Console.log for debugging
```

### Data Encryption Flow

- **Storage**: Passwords encrypted server-side using Node.js `crypto` module
- **Decryption**: Same encryption/decryption functions reversed when retrieving
- **Auth**: Passwords hashed with bcrypt for user authentication
- **Session**: JWT tokens used for session management with userID and userIV

## API Endpoints Used

| Method | Endpoint | Purpose | Notes |
|--------|----------|---------|-------|
| GET | `/api/passwords/` | Fetch all passwords | Returns encrypted data |
| POST | `/users/login/` | User authentication | Server hashes password, returns JWT + password list |

### Planned Endpoints (from README)

- Routes for CRUD operations on passwords
- JWT-based session management
- Server-side encryption/decryption layer

## Project Structure

```
client/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   ├── icons/
│   │   │   └── cross.svg
│   │   └── styles/
│   │       ├── main.scss       # Entry point
│   │       ├── reset.scss      # CSS reset
│   │       ├── typography.scss # Typography styles
│   │       └── variables.scss  # CSS variables
│   ├── components/
│   │   ├── BaseModal.vue       # (not used yet)
│   │   ├── Form/
│   │   │   ├── Form.vue        # Form wrapper component
│   │   │   ├── LogIn.vue       # Login form
│   │   │   └── SignUp.vue      # Signup form
│   │   └── List/
│   │       ├── AllList.vue     # Lists all passwords
│   │       ├── ListItem.vue    # Single password card
│   │       └── SearchList.vue  # Search functionality
│   ├── router/
│   │   └── index.ts            # Route configuration
│   ├── types/
│   │   └── password.ts         # TypeScript interfaces
│   ├── views/
│   │   ├── DashboardView.vue   # Main dashboard
│   │   └── SignInView.vue      # Auth screen
│   ├── main.ts                 # App entry point
│   └── App.vue                 # Root component
├── index.html
└── vite.config.ts
```

## Routes

| Path | Component | Purpose |
|------|-----------|---------|
| `/` | DashboardView | Main password list view |
| `/dashboard` | DashboardView | Dashboard (alias of `/`) |
| `/sign-in` | SignInView | Authentication screen |

## Views

### SignInView.vue
Authentication view that toggles between two forms:

**Log In Form:**
- Email input
- Password input
- Login button (enabled only when both fields filled)
- Link to switch to Sign Up form

**Sign Up Form:**
- Username input
- Email input
- Password input
- Confirm Password input
- Create button
- Link to switch to Log In form

### DashboardView.vue
Main app view with three sections:

**Navigation Bar** (fixed, top):
- "ALL" button - shows all passwords
- "SEARCH" button - shows search functionality
- Active state styling changes button appearance

**Main Content Area**:
- Conditionally renders `AllList` or `SearchList`
- Scrollable (80vh height)

**Footer** (sticky, bottom):
- "+ ADD NEW" button for creating new passwords

## Components

### Form Components

**Form.vue**: Wrapper component with slot
- Full-width on mobile, max 350px
- Card styling with shadow
- Label + input pairs
- Button styling
- Link styling

**LogIn.vue**:
- Props: `checkIsMember` (function)
- Uses Form component
- Calls axios POST to `/users/login/`
- Stores email in localStorage
- Redirects to `/dashboard` on success

**SignUp.vue**:
- Props: `checkIsMember` (function)
- Uses Form component
- Username, email, password, confirm password fields

### List Components

**AllList.vue**:
- Fetches passwords from `/api/passwords/` on mount
- Renders list of `ListItem` components
- Shows password app_name

**ListItem.vue**:
- Displays password app name
- Clickable (triggers selection)
- White card with shadow
- 1.2x scale on hover

**SearchList.vue**:
- Search input field
- Search button
- Empty results section (not implemented)

## Styling Approach

### CSS Variables
```scss
--background-color: #e6e6e6
--button-green: #43b343
```

### Reset & Typography
- Box-sizing: border-box on all elements
- Open Sans for body text
- Arvo serif for headings (disabled)
- Line height: 1.4

### Common Patterns

**Buttons:**
- Green background with white text
- 6px border radius
- Hover: shadow effect
- Active: inset shadow
- Disabled: gray background

**Inputs:**
- No default borders
- White background
- 6px border radius
- Green outline on focus
- 2px outline width

**Cards:**
- White background
- Shadow effects
- Clickable with cursor pointer
- Hover scale transform

**Layouts:**
- Flexbox for most containers
- Vertical stacking with `flex-direction: column`
- Spacing with flex-grow or fixed dimensions

## Data Flow

### Authentication Flow
```
User Input → Validate Fields → POST /users/login/ →
    Store Email in localStorage → Redirect to /dashboard
```

### Password List Flow
```
Dashboard Mount → axios GET /api/passwords/ →
    Update passwordsList ref → Render ListItem components
```

### Selection Flow
```
Click ListItem → Call selectItem() →
    Set selectedItem → Console.log for debugging
```

## API Endpoints Used

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/passwords/` | Fetch all passwords |
| POST | `/users/login/` | User authentication |

## Environment

- Axios interceptors for credentials: `{ withCredentials: true }`
- LocalStorage for email storage (temporary auth state)
- No additional environment variables configured

## Key Features

1. **Responsive Design**: Mobile-first approach
2. **Dark/Light Theme**: Uses CSS variables (dark theme disabled)
3. **Authentication**: Email/password based
4. **Password Management**: List, search, create
5. **Navigation**: Tab-based (ALL vs SEARCH)
6. **Micro-interactions**: Hover effects, focus states, button presses

## Current Limitations

### Missing Core Features (from README)
1. ❌ **Password masking** - No eye toggle to hide/show password
2. ❌ **Copy to clipboard** - User can't copy passwords to clipboard
3. ❌ **Individual password view** - Clicking ListItem should reveal password (currently just logs to console)
4. ❌ **Password generation** - Auto-generate high-security passwords
5. ❌ **Edit/Delete UI** - Modify or remove stored passwords
6. ❌ **Dropdown menu** - README mentions dropdown for website selection

### Technical Limitations
7. ❌ **JWT session handling** - Auth flow commented out in router, localStorage stores email instead
8. ❌ **Server-side encryption UI** - Frontend doesn't show encryption/decryption in action
9. ❌ **Loading states** - No spinners or indicators during API calls
10. ❌ **Error handling UI** - Failed requests just console.error
11. ❌ **Password strength indicators** - Visual feedback for generated passwords

## Notes for Future Development

### Core Features (as per README)
- ✅ **Implement click-to-reveal** - Clicking ListItem should show/hide password
- ✅ **Add copy to clipboard** - One-click copy for password usage
- ✅ **Complete JWT auth** - Use server session (userID + userIV) instead of localStorage email
- ✅ **Password auto-generate** - Built-in high-security password generator
- ✅ **Dropdown menu** - Website selection UI for individual password management
- ✅ **Edit/Delete UI** - Modify or remove stored passwords

### Enhanced Functionality
- ❌ Password strength indicators
- ❌ QR code generation for quick login
- ❌ Import/export (CSV, JSON, encrypted formats)
- ❌ Dark mode toggle
- ❌ Biometric authentication (face/fingerprint)
- ❌ Two-factor authentication (2FA)
- ❌ Password sharing with trusted contacts
- ❌ Browser extension companion
