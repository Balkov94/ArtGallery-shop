# Personal Painting E-commerce Site

A modern, mobile-first e-commerce platform for selling original paintings, built with React, TypeScript, and Supabase.

## 🎨 Features

- **Frontend**: React with TypeScript and React Router
- **Backend**: Supabase for database and authentication
- **Design**: Mobile-first responsive design with Tailwind CSS
- **Authentication**: User registration and login
- **Gallery**: Browse and view painting collections
- **Product Details**: Detailed painting information and purchasing
- **Artist Information**: About page with artist background

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account

### Installation

1. **Clone and install dependencies**:
   ```bash
   npm install
   ```

2. **Set up Supabase**:
   - Create a new project at [supabase.com](https://supabase.com)
   - Get your project URL and anon key from the project settings
   - Click "Connect to Supabase" button in the top right of Bolt
   
3. **Configure environment variables**:
   The `.env` file will be automatically configured when you connect to Supabase.

4. **Start development server**:
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Header, Footer components
│   └── ui/             # Loading, Error boundary components
├── contexts/           # React contexts (Auth)
├── hooks/              # Custom React hooks
├── lib/                # Third-party library configurations
├── pages/              # Page components (routes)
├── types/              # TypeScript type definitions
└── App.tsx             # Main application component
```

## 🎯 Core Components

### Pages
- **Home** (`/`): Landing page with featured paintings
- **Gallery** (`/gallery`): Browse all available paintings
- **Painting Detail** (`/painting/:id`): Individual painting details
- **About** (`/about`): Artist information and background
- **Auth** (`/auth`): User authentication (login/signup)

### Key Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Authentication**: Supabase Auth integration
- **State Management**: React Context for global state
- **Error Handling**: Error boundaries and loading states
- **TypeScript**: Full type safety throughout the application

## 🔧 Database Schema (To Be Created)

When you're ready to add functionality, you'll need these Supabase tables:

### Paintings Table
```sql
-- paintings table
id (uuid, primary key)
title (text)
description (text)
price (numeric)
image_url (text)
thumbnail_url (text)
dimensions (text)
medium (text)
is_available (boolean)
created_at (timestamp)
updated_at (timestamp)
```

### Cart Items Table
```sql
-- cart_items table
id (uuid, primary key)
user_id (uuid, foreign key)
painting_id (uuid, foreign key)
quantity (integer)
added_at (timestamp)
```

## 🛠️ Development Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run lint`: Run ESLint
- `npm run preview`: Preview production build

## 📱 Responsive Design

The application uses a mobile-first approach with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px  
- Desktop: > 1024px

## 🎨 Design System

### Colors
- Primary: Blue (#3B82F6)
- Secondary: Teal (#14B8A6)
- Accent: Orange (#F97316)
- Success: Green
- Warning: Yellow
- Error: Red
- Neutral: Gray scale

### Typography
- Headings: 120% line height
- Body text: 150% line height
- Font weights: Regular, Medium, Bold

### Spacing
- Consistent 8px spacing system
- Proper visual hierarchy
- Intentional white space

## 🔐 Authentication

The app includes a complete authentication system:
- User registration with email/password
- Login functionality
- Protected routes (ready for implementation)
- User session management

## 📦 Next Steps

This foundation provides:
- ✅ Complete project structure
- ✅ All routing and navigation
- ✅ Supabase integration setup
- ✅ Authentication system
- ✅ Responsive design components
- ✅ TypeScript configuration
- ✅ Error handling

To complete the application, you'll need to:
1. Connect to Supabase and create the database schema
2. Add real painting data and images
3. Implement cart and checkout functionality
4. Add payment processing
5. Create admin panel for managing paintings

## 📄 License

This project is licensed under the MIT License.

********************************
1.Clone repo
2.npm istall
3.Port - http://localhost:5173/
test user:
balkov_94@abv.bg
password: NikBal123!

or you can create your user - have to verify email address
