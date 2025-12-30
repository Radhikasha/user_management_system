import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Home, Users, User, LogOut, Menu, X, Settings, ChevronDown } from 'lucide-react';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Users', href: '/users', icon: Users, adminOnly: true },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  const filteredNavigation = navigation.filter(item => 
    !item.adminOnly || user?.role === 'admin'
  );

  return (
    <div className="layout">
      {/* Mobile sidebar */}
      <div className={`mobile-menu-overlay ${sidebarOpen ? 'active' : ''}`} onClick={() => setSidebarOpen(false)} />
      <div className={`sidebar ${sidebarOpen ? 'active' : ''}`}>
        <div className="sidebar-header">
          <h1 className="sidebar-logo">
            <div className="sidebar-logo-icon">UM</div>
            User Management
          </h1>
        </div>
        <nav className="sidebar-nav">
          <div className="nav-section">
            {filteredNavigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="nav-icon" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>
        <div className="user-menu">
          <div className="user-info">
            <div className="user-avatar">{user?.fullName?.charAt(0) || 'U'}</div>
            <div className="user-details">
              <div className="user-name">{user?.fullName || 'User'}</div>
              <div className="user-email">{user?.email}</div>
            </div>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            <LogOut className="logout-icon" />
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="main-content">
        <div className="top-bar">
          <button
            onClick={() => setSidebarOpen(true)}
            className="menu-toggle"
          >
            <Menu className="menu-toggle-icon" />
          </button>
          <div className="navbar-user-info">
            <span className="navbar-welcome-text">
              Welcome, {user?.fullName}
            </span>
            
          </div>
          <div className="navbar-dropdown">
            <button 
              className="navbar-dropdown-toggle"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              <User className="navbar-user-icon" />
              <ChevronDown className={`navbar-dropdown-arrow ${userMenuOpen ? 'open' : ''}`} />
            </button>
            <div className={`navbar-dropdown-menu ${userMenuOpen ? 'active' : ''}`}>
              <Link to="/profile" className="navbar-dropdown-item">
                <User className="navbar-dropdown-icon" />
                Profile
              </Link>
              <Link to="/security-settings" className="navbar-dropdown-item">
                <Settings className="navbar-dropdown-icon" />
                Security Settings
              </Link>
              <div className="navbar-dropdown-divider"></div>
              <button onClick={handleLogout} className="navbar-dropdown-item navbar-dropdown-logout">
                <LogOut className="navbar-dropdown-icon" />
                Logout
              </button>
            </div>
          </div>
        </div>
        <div className="page-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
