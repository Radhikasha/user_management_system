import React, { useState, useEffect } from 'react';
import { Activity, User, Shield, Settings, Calendar, Clock } from 'lucide-react';
import axios from 'axios';
import '../styles/ActivityLog.css';

const ActivityLog = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    days: '7',
    action: '',
    user: ''
  });

  const fetchActivities = async (page = 1) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        days: filters.days,
        ...(filters.action && { action: filters.action }),
        ...(filters.user && { user: filters.user })
      });

      const response = await axios.get(`http://localhost:5000/api/activity?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setActivities(response.data.data);
      setTotalPages(response.data.pagination?.pages || 1);
      setCurrentPage(page);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch activities');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    fetchActivities(page);
  };

  const getActivityIcon = (action) => {
    switch (action) {
      case 'login':
        return <User className="w-4 h-4 activity-icon green" />;
      case 'logout':
        return <User className="w-4 h-4 activity-icon gray" />;
      case 'create_user':
        return <Settings className="w-4 h-4 activity-icon blue" />;
      case 'update_user':
        return <Settings className="w-4 h-4 activity-icon yellow" />;
      case 'delete_user':
        return <Settings className="w-4 h-4 activity-icon red" />;
      case 'activate_user':
        return <Shield className="w-4 h-4 activity-icon green" />;
      case 'deactivate_user':
        return <Shield className="w-4 h-4 activity-icon red" />;
      case 'change_password':
        return <Shield className="w-4 h-4 activity-icon orange" />;
      default:
        return <Activity className="w-4 h-4 activity-icon gray" />;
    }
  };

  const getActivityColor = (action) => {
    switch (action) {
      case 'login':
        return 'login';
      case 'logout':
        return 'logout';
      case 'create_user':
        return 'create_user';
      case 'update_user':
        return 'update_user';
      case 'delete_user':
        return 'delete_user';
      case 'activate_user':
        return 'activate_user';
      case 'deactivate_user':
        return 'deactivate_user';
      case 'change_password':
        return 'change_password';
      default:
        return 'logout';
    }
  };

  const formatAction = (action) => {
    return action.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  if (loading && currentPage === 1) {
    return <div className="loading">Loading activities...</div>;
  }

  return (
    <div className="activity-log-page">
      <div className="activity-header">
        <h1 className="activity-title">Activity Log</h1>
        <p className="activity-subtitle">
          Monitor and review recent system activities and user actions
        </p>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="filters-grid">
          <div className="filter-group">
            <Calendar className="filter-icon" />
            <select 
              value={filters.days}
              onChange={(e) => handleFilterChange('days', e.target.value)}
              className="filter-select"
            >
              <option value="1">Last 24 hours</option>
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 3 months</option>
            </select>
          </div>
          <div className="filter-group">
            <Activity className="filter-icon" />
            <select 
              value={filters.action}
              onChange={(e) => handleFilterChange('action', e.target.value)}
              className="filter-select"
            >
              <option value="">All Activities</option>
              <option value="login">Login/Logout</option>
              <option value="create_user">User Creation</option>
              <option value="update_user">User Updates</option>
              <option value="delete_user">User Deletion</option>
              <option value="change_password">Security</option>
            </select>
          </div>
          <div className="filter-group">
            <User className="filter-icon" />
            <input
              type="text"
              placeholder="Filter by user..."
              value={filters.user}
              onChange={(e) => handleFilterChange('user', e.target.value)}
              className="filter-input"
            />
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* Activity List */}
      <div className="activity-list">
        <div className="activity-list-header">
          <h2 className="activity-list-title">Recent Activities</h2>
        </div>
        <div className="activity-items">
          {activities.length === 0 ? (
            <div className="empty-state">
              <Activity className="w-12 h-12" />
              <h3>No activities found</h3>
              <p>No activities match your current filters.</p>
            </div>
          ) : (
            activities.map((activity) => (
              <div
                key={activity._id}
                className={`activity-item ${getActivityColor(activity.action)}`}
              >
                <div className="activity-content">
                  <div className="activity-main">
                    <div className="activity-icon-wrapper">
                      {getActivityIcon(activity.action)}
                    </div>
                    <div className="activity-details">
                      <div className="activity-header-info">
                        <p className="activity-user">
                          {activity.user?.fullName || 'Unknown User'}
                        </p>
                        <span className="activity-separator">•</span>
                        <p className="activity-action">{formatAction(activity.action)}</p>
                      </div>
                      {activity.details && (
                        <p className="activity-description">{activity.details}</p>
                      )}
                      <div className="activity-meta">
                        <div className="activity-time">
                          <Clock className="w-3 h-3" />
                          <span>{new Date(activity.timestamp).toLocaleString()}</span>
                        </div>
                        {activity.ipAddress && (
                          <div className="activity-ip">
                            IP: {activity.ipAddress}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination-section">
            <div className="pagination-info">
              <p>
                Showing <span className="font-medium">{(currentPage - 1) * 20 + 1}</span> to{' '}
                <span className="font-medium">{Math.min(currentPage * 20, (currentPage - 1) * 20 + activities.length)}</span> of{' '}
                <span className="font-medium">{totalPages * 20}</span> results
              </p>
              </div>
              <div className="pagination-controls">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="pagination-btn first"
                >
                  Previous
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = currentPage <= 3 ? i + 1 : currentPage + i - 2;
                  if (page > totalPages) return null;
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                    >
                      {page}
                    </button>
                  );
                })}
                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="pagination-btn last"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityLog;
