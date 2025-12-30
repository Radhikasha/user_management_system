# User Management System

A modern, responsive user management system built with React and Node.js, featuring a beautiful dark gradient theme with glassmorphism effects and smooth animations.

## 🌟 Features

### 🎨 **Modern UI/UX Design**
- **Dark Gradient Theme**: Beautiful purple/blue gradient backgrounds
- **Glassmorphism Effects**: Modern frosted glass design with backdrop blur
- **Animated Elements**: Floating background blobs, shimmer effects, and smooth transitions
- **Responsive Design**: Fully responsive layout that works on all devices
- **Interactive Components**: Hover effects, focus states, and micro-interactions

### 👥 **User Management**
- **User Authentication**: Secure login and registration system
- **Role-Based Access**: Admin and user role management
- **User CRUD Operations**: Create, read, update, and delete users
- **Profile Management**: Update user information and change passwords
- **Activity Logging**: Track and monitor user activities

### 🔐 **Security Features**
- **Password Security**: Secure password handling and validation
- **Two-Factor Authentication**: Enhanced security with 2FA support
- **Session Management**: Track and manage active user sessions
- **Privacy Controls**: User privacy settings and data sharing preferences

### 📊 **Dashboard & Analytics**
- **User Statistics**: Real-time user count and activity metrics
- **Quick Actions**: Easy access to common administrative tasks
- **Activity Monitoring**: Comprehensive activity log with filtering
- **Search & Pagination**: Efficient data navigation and filtering

## 🛠️ Technology Stack

### **Frontend**
- **React 18**: Modern React with hooks and functional components
- **React Router**: Client-side routing and navigation
- **Axios**: HTTP client for API communication
- **Lucide React**: Beautiful icon library
- **React Hook Form**: Form handling and validation
- **Yup**: Schema validation for forms

### **Backend**
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database for data storage
- **JWT**: JSON Web Tokens for authentication
- **bcrypt**: Password hashing and security

### **Styling**
- **Custom CSS**: Handcrafted CSS with modern techniques
- **CSS Animations**: Smooth transitions and keyframe animations
- **Glassmorphism**: Modern design with backdrop-filter
- **Gradient Effects**: Beautiful color gradients throughout

## 🚀 Getting Started

### **Prerequisites**
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/Radhikasha/user_management_system.git
   cd user_management_system
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   npm install

   # Install frontend dependencies
   cd frontend
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/user_management
   JWT_SECRET=your_jwt_secret_key_here
   ```

4. **Start the application**
   ```bash
   # Start the backend server
   npm start

   # In a new terminal, start the frontend
   cd frontend
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
user_management_system/
├── backend/                 # Node.js/Express backend
│   ├── controllers/         # Route controllers
│   ├── middleware/          # Custom middleware
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   └── server.js         # Main server file
├── frontend/              # React frontend
│   ├── public/           # Static assets
│   ├── src/
│   │   ├── components/   # Reusable React components
│   │   ├── contexts/     # React contexts
│   │   ├── pages/        # Page components
│   │   ├── styles/       # CSS stylesheets
│   │   └── App.jsx       # Main App component
│   └── package.json
├── README.md
└── package.json
```

## 🎨 Design System

### **Color Palette**
- **Primary**: Purple gradients (#8b5cf6, #7c3aed)
- **Secondary**: Pink accents (#ec4899, #f472b6)
- **Accent**: Blue highlights (#60a5fa)
- **Background**: Dark gradients (#1e3c72, #2a5298, #7e22ce)

### **Design Principles**
- **Glassmorphism**: Backdrop blur and transparency
- **Micro-interactions**: Hover states and smooth transitions
- **Responsive Design**: Mobile-first approach
- **Accessibility**: Focus states and keyboard navigation

## 📱 Pages & Features

### **Dashboard**
- User statistics and metrics
- Quick action buttons
- Recent activity overview
- Beautiful gradient cards

### **User Management**
- User list with search and filtering
- Add/edit/delete user operations
- Role-based access control
- Pagination for large datasets

### **Profile Management**
- Update personal information
- Change password functionality
- Account information display
- Profile picture upload

### **Activity Log**
- Comprehensive activity tracking
- Filter by date, action, and user
- Real-time activity monitoring
- IP address tracking

### **Security Settings**
- Password management
- Two-factor authentication
- Session management
- Privacy controls

## 🔧 API Endpoints

### **Authentication**
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### **Users**
- `GET /api/users` - Get all users
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### **Profile**
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update profile
- `PUT /api/profile/password` - Change password

### **Activity**
- `GET /api/activity` - Get activity log
- `POST /api/activity` - Log new activity

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing React framework
- **Lucide Icons** - For the beautiful icon library
- **Glassmorphism Community** - For design inspiration
- **Open Source Contributors** - For making this project possible

## 📞 Support

If you have any questions or need support, please:
- Create an issue on GitHub
- Email: [your-email@example.com]
- Check the documentation

---

**Built with ❤️ using React, Node.js, and modern web technologies**
