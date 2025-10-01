![Screenshot (191)](https://github.com/omarfarquek05/JOBSPORTAL/assets/89341479/45c1cb41-49ac-4a14-8c21-6370ebfb99cb)

# 🚀 Job Portal - Online Job Board Platform

A comprehensive full-stack job portal application that connects employers with job seekers. Features advanced job search capabilities, role-based dashboards, real-time notifications, and complete job management functionality.

## 🌐 Live Demo

**[View Live Application](https://jobsportal-cjua9dmcv-omarfarquek05.vercel.app/register)**

## ✨ Features

### 🔍 Job Search & Discovery
- **Advanced Filtering System**
  - Location-based search
  - Salary range filtering
  - Job type and category filters
  - Keyword-based search
- Real-time search results
- Responsive job listings

### 👥 Role-Based Access Control

#### For Employers
- **Dedicated Employer Dashboard**
  - Post new job openings
  - Update existing job listings
  - Delete job postings
  - View applications received
  - Manage company profile
- Application tracking and management
- Candidate review system

#### For Job Seekers (Employees)
- **Dedicated Employee Dashboard**
  - Create and manage CV/Resume
  - Browse and apply for jobs
  - Track application status
  - Save favorite jobs
  - Manage personal profile
- Application history tracking
- Profile customization

### 📧 Real-Time Notifications
- Email notifications via Nodemailer
- Application status updates
- New job posting alerts
- Application confirmations
- Profile update notifications

### 🎨 User Experience
- Responsive design for all devices
- Intuitive user interface
- Fast and seamless navigation
- Profile image uploads via Cloudinary
- Form validation with React Hook Form

## 🛠️ Tech Stack

### Frontend
- **Next.js** - React framework for production
- **React** - UI library
- **Redux** - State management
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Form handling and validation

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database

### Additional Services
- **Cloudinary** - Image and media management
- **Nodemailer** - Email notification service

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or Atlas)
- Cloudinary account
- SMTP email service credentials

## 🚀 Installation & Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd job-portal
```

### 2. Install dependencies

#### Install frontend dependencies
```bash
npm install
```

#### Install backend dependencies
```bash
cd backend
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Frontend Environment Variables
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

Create a `.env` file in the backend directory:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=noreply@jobportal.com

# Server
PORT=5000
NODE_ENV=development
```

### 4. Run the application

#### Start the backend server
```bash
cd backend
npm run dev
```

#### Start the frontend development server
```bash
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

## 📁 Project Structure

```
job-portal/
├── components/          # Reusable React components
├── pages/              # Next.js pages and routing
├── public/             # Static assets
├── styles/             # Global styles
├── redux/              # Redux store and slices
├── utils/              # Utility functions
├── backend/            # Node.js backend
│   ├── controllers/    # Route controllers
│   ├── models/         # MongoDB models
│   ├── routes/         # API routes
│   ├── middleware/     # Custom middleware
│   └── config/         # Configuration files
└── README.md
```

## 🔑 Key Functionalities

### Authentication & Authorization
- Secure user registration and login
- JWT-based authentication
- Role-based access control (Employer/Employee)
- Password encryption

### Job Management
- CRUD operations for job postings
- Advanced search and filtering
- Job categorization
- Application tracking

### Profile Management
- User profile creation and updates
- CV/Resume builder
- Image uploads
- Company profile management

### Communication
- Email notifications for job applications
- Application status updates
- Welcome emails
- Password reset emails

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Jobs
- `GET /api/jobs` - Get all jobs (with filters)
- `GET /api/jobs/:id` - Get single job
- `POST /api/jobs` - Create job (Employer only)
- `PUT /api/jobs/:id` - Update job (Employer only)
- `DELETE /api/jobs/:id` - Delete job (Employer only)

### Applications
- `POST /api/applications` - Apply for job
- `GET /api/applications` - Get user applications
- `PUT /api/applications/:id` - Update application status

### Profile
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update profile
- `POST /api/profile/cv` - Upload CV

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@omarfarquek05](https://github.com/omarfarquek05)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- MongoDB for the database solution
- Cloudinary for media management
- All contributors and supporters


