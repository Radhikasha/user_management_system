import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Users, UserCheck, Shield, Activity, TrendingUp, Calendar, Filter, Search, Bell, Settings, ChevronDown, Download, RefreshCw } from 'lucide-react';
import axios from 'axios';
import '../styles/Dashboard.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    adminUsers: 0,
    regularUsers: 0,
    recentUsers: 0,
    inactiveUsers: 0
  });
  const [loadingStats, setLoadingStats] = useState(false);
  const [statsError, setStatsError] = useState('');
  
  // Filter states
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [selectedUserType, setSelectedUserType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (user?.role !== 'admin') {
      return;
    }

    const controller = new AbortController();

    const fetchStats = async () => {
      try {
        setLoadingStats(true);
        setStatsError('');
        const response = await axios.get(`${API_URL}/api/users/stats`, {
          signal: controller.signal
        });
        setStats(response.data.data);
      } catch (error) {
        if (error.name === 'CanceledError') return;
        setStatsError(error.response?.data?.message || 'Failed to load user statistics');
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();

    return () => controller.abort();
  }, [user?.role]);

  // Admin dashboard stats with enhanced data
  const adminStats = [
    {
      name: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'blue',
      trend: '+12%',
      trendDirection: 'up',
      description: 'Total registered users'
    },
    {
      name: 'Active Users',
      value: stats.activeUsers,
      icon: UserCheck,
      color: 'green',
      trend: '+5%',
      trendDirection: 'up',
      description: 'Users active in last 30 days'
    },
    {
      name: 'Admin Users',
      value: stats.adminUsers,
      icon: Shield,
      color: 'purple',
      trend: '0%',
      trendDirection: 'stable',
      description: 'Administrator accounts'
    },
    {
      name: 'Recent Activity',
      value: stats.recentUsers,
      icon: Activity,
      color: 'orange',
      trend: '+8%',
      trendDirection: 'up',
      description: 'New registrations this week'
    },
  ];

  // User dashboard stats with enhanced data
  const userStats = [
    {
      name: 'Profile Status',
      value: 'Active',
      icon: UserCheck,
      color: 'green',
      status: 'active',
      description: 'Your account is active'
    },
    {
      name: 'Account Created',
      value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A',
      icon: Calendar,
      color: 'blue',
      description: 'Member since'
    },
    {
      name: 'Last Login',
      value: user?.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'N/A',
      icon: Activity,
      color: 'purple',
      description: 'Last active'
    },
    {
      name: 'Security Score',
      value: '92%',
      icon: Shield,
      color: 'orange',
      trend: '+2%',
      trendDirection: 'up',
      description: 'Account security rating'
    }
  ];

  const statsCards = user?.role === 'admin' ? adminStats : userStats;

  const handleRefresh = async () => {
    setRefreshing(true);
    if (user?.role === 'admin') {
      try {
        const response = await axios.get(`${API_URL}/api/users/stats`);
        setStats(response.data.data);
      } catch (error) {
        console.error('Failed to refresh stats:', error);
      }
    }
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <div className="dashboard">
      {/* Animated Background Elements */}
      <div className="dashboard-bg-animation">
        <div className="bg-blob blob-1"></div>
        <div className="bg-blob blob-2"></div>
        <div className="bg-blob blob-3"></div>
      </div>

      {/* Dashboard Header with Filters */}
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-text">
            <h1 className="dashboard-title">
              {user?.role === 'admin' ? 'Admin Dashboard' : 'User Dashboard'}
            </h1>
            <p className="dashboard-subtitle">
              Welcome back, {user?.fullName}! Here's an overview of your user management system.
            </p>
          </div>
          <div className="header-actions">
            <button 
              onClick={handleRefresh}
              className={`header-button ${refreshing ? 'spinning' : ''}`}
            >
              <RefreshCw className="icon" />
              Refresh
            </button>
            <button className="header-button">
              <Download className="icon" />
              Export
            </button>
            <button className="header-button">
              <Bell className="icon" />
              <span className="notification-badge">3</span>
            </button>
            <button className="header-button">
              <Settings className="icon" />
            </button>
          </div>
        </div>

        {/* Filters Section */}
        {user?.role === 'admin' && (
          <div className="filters-section">
            <div className="filters-header">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="filter-toggle"
              >
                <Filter className="icon" />
                Filters
                <ChevronDown className={`icon ${showFilters ? 'rotated' : ''}`} />
              </button>
            </div>
            
            {showFilters && (
              <div className="filters-content">
                <div className="filter-group">
                  <label>Time Range</label>
                  <select 
                    value={selectedTimeRange} 
                    onChange={(e) => setSelectedTimeRange(e.target.value)}
                    className="filter-select"
                  >
                    <option value="24h">Last 24 hours</option>
                    <option value="7d">Last 7 days</option>
                    <option value="30d">Last 30 days</option>
                    <option value="90d">Last 90 days</option>
                  </select>
                </div>
                
                <div className="filter-group">
                  <label>User Type</label>
                  <select 
                    value={selectedUserType} 
                    onChange={(e) => setSelectedUserType(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Users</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="admin">Admins</option>
                  </select>
                </div>
                
                <div className="filter-group search-group">
                  <label>Search</label>
                  <div className="search-input">
                    <Search className="search-icon" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {statsCards.map((stat) => (
          <div key={stat.name} className="stat-card">
            <div className="stat-content">
              <div className="stat-icon-wrapper">
                <div className={`stat-icon ${stat.color}`}>
                  <stat.icon className="stat-icon-svg" />
                </div>
              </div>
              <div className="stat-details">
                <dl>
                  <dt className="stat-label">{stat.name}</dt>
                  <dd className="flex items-baseline">
                    <div className="stat-value">
                      {loadingStats && user?.role === 'admin' ? '...' : stat.value}
                    </div>
                    {stat.trend && (
                      <div className={`stat-trend ${stat.trendDirection}`}>
                        <TrendingUp className="trend-icon" />
                        {stat.trend}
                      </div>
                    )}
                  </dd>
                  {stat.description && (
                    <p className="stat-description">{stat.description}</p>
                  )}
                </dl>
              </div>
            </div>
            {stat.status === 'active' && (
              <div className="status-indicator active"></div>
            )}
          </div>
        ))}
      </div>

      {statsError && (
        <div className="error-message">
          {statsError}
        </div>
      )}

      {/* User Info Card */}
      <div className="user-info-card">
        <div className="user-info-header">
          <h3 className="user-info-title">Your Profile Information</h3>
          <dl className="user-info-grid">
            <div className="user-info-item">
              <dt className="user-info-label">Full Name</dt>
              <dd className="user-info-value">{user?.fullName}</dd>
            </div>
            <div className="user-info-item">
              <dt className="user-info-label">Email Address</dt>
              <dd className="user-info-value">{user?.email}</dd>
            </div>
            <div className="user-info-item">
              <dt className="user-info-label">Role</dt>
              <dd className="user-info-value">
                <span className="badge badge-primary">{user?.role}</span>
              </dd>
            </div>
            <div className="user-info-item">
              <dt className="user-info-label">Account Status</dt>
              <dd className="user-info-value">
                <span className="badge badge-success">Active</span>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions-card">
        <div className="quick-actions-header">
          <h3 className="quick-actions-title">Quick Actions</h3>
          <div className="quick-actions-grid">
            {user?.role === 'admin' && (
              <button
                type="button"
                onClick={() => navigate('/users')}
                className="quick-action-button"
              >
                <div className="quick-action-content">
                  <Users className="quick-action-icon blue" />
                  <div>
                    <h4>Manage Users</h4>
                    <p>View and manage all users</p>
                  </div>
                </div>
              </button>
            )}
            <button
              type="button"
              onClick={() => navigate('/security')}
              className="quick-action-button"
            >
              <div className="quick-action-content">
                <Shield className="quick-action-icon purple" />
                <div>
                  <h4>Security Settings</h4>
                  <p>Manage security preferences</p>
                </div>
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/activity')}
              className="quick-action-button"
            >
              <div className="quick-action-content">
                <Activity className="quick-action-icon orange" />
                <div>
                  <h4>Activity Log</h4>
                  <p>View recent activities</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
