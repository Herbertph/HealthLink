# HealthLink 🏥
A modern healthcare appointment management system built with Vue.js and Strapi.

![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Strapi](https://img.shields.io/badge/Strapi-2F2E8B?style=for-the-badge&logo=strapi&logoColor=white)

## 🌟 Features

### For Patients
- Schedule and manage medical appointments
- View detailed appointment history
- Update personal and medical information
- Receive appointment reminders and notifications
- Real-time appointment status tracking
- Secure authentication and data protection

### For Healthcare Providers
- Comprehensive patient appointment management
- Access to patient medical records and history
- Real-time appointment status updates
- Schedule and availability management
- Patient communication tools
- Analytics and reporting dashboard

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation and Setup

#### Frontend Setup (Vue.js)
1. Navigate to frontend directory
```bash
cd health-frontend
```

2. Install dependencies
```bash
npm install
```

3. Create environment file
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`
```env
VITE_API_URL=http://localhost:1337
```

5. Start development server
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

#### Backend Setup (Strapi)
1. Navigate to backend directory
```bash
cd health-backend
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables in `.env`
```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-app-keys
API_TOKEN_SALT=your-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
JWT_SECRET=your-jwt-secret
```

4. Start development server
```bash
npm run develop
```

The Strapi admin panel will be available at `http://localhost:1337/admin`

## 📁 Project Structure

### Frontend Structure (Vue.js)
```
health-frontend/
├── src/
│   ├── assets/      # Static assets and global styles
│   ├── components/  # Reusable Vue components
│   ├── router/      # Vue router configuration
│   ├── views/       # Page components
│   ├── stores/      # Pinia stores for state management
│   ├── utils/       # Utility functions
│   ├── App.vue      # Root component
│   └── main.js      # Application entry point
├── public/          # Public static assets
└── config files     # Various configuration files
```

### Backend Structure (Strapi)
```
health-backend/
├── src/
│   ├── api/         # API endpoints and controllers
│   ├── config/      # Configuration files
│   └── plugins/     # Custom plugins
├── public/          # Public assets
├── database/        # Database configuration
└── config/          # Strapi configuration files
```

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/local/register` | Register new user |
| POST | `/api/auth/local` | User login |
| GET | `/api/users/me` | Get current user |

### Appointments
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/appointments` | List all appointments |
| GET | `/api/appointments/:id` | Get single appointment |
| POST | `/api/appointments` | Create appointment |
| PUT | `/api/appointments/:id` | Update appointment |
| DELETE | `/api/appointments/:id` | Delete appointment |

## 🔧 Available Scripts

### Frontend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test:unit` - Run unit tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Backend Scripts
- `npm run develop` - Start development server
- `npm run start` - Start production server
- `npm run build` - Build for production
- `npm run strapi` - Run Strapi CLI commands

## 🔒 Security

- JWT-based authentication
- Role-based access control
- Encrypted data transmission
- Secure password hashing
- Rate limiting and API protection
- CORS configuration

## 🚨 Error Handling

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

---
