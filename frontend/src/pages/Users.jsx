import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Edit2, Trash2, Search, UserPlus, Shield, User } from 'lucide-react';
import '../styles/Users.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchUsers = async (page = 1) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/users?page=${page}&limit=10`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUsers(response.data.data);
      setTotalPages(response.data.pagination?.pages || 1);
      setCurrentPage(page);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user => 
    user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageChange = (page) => {
    fetchUsers(page);
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/users/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        fetchUsers(currentPage);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete user');
      }
    }
  };

  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/users/${userId}`,
        { isActive: !currentStatus },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      fetchUsers(currentPage);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update user status');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading users...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

  const handleEdit = (user) => {
    navigate(`/users/edit/${user._id}`);
  };

  return (
    <div className="users-page">
      <div className="users-header">
        <div className="users-header-content">
          <div>
            <h1 className="users-title">User Management</h1>
            <p className="users-subtitle">
              Manage system users and their roles
            </p>
          </div>
          <button
            onClick={() => navigate('/users/new')}
            className="add-user-btn"
          >
            <UserPlus className="add-user-icon" />
            Add User
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-section">
        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* Users List */}
      <div className="users-list">
        <ul>
          {filteredUsers.map((user) => (
            <li key={user._id} className="user-item">
              <div className="user-item-content">
                <div className="user-info">
                  <div className="user-avatar">
                    <User className="user-avatar-icon" />
                  </div>
                  <div className="user-details">
                    <div className="user-name">{user.fullName}</div>
                    <div className="user-email">{user.email}</div>
                  </div>
                </div>
                <div className="user-actions">
                  <span 
                    onClick={() => toggleUserStatus(user._id, user.isActive)}
                    className={`user-badge ${user.role}`}
                  >
                    {user.role}
                  </span>
                  <span 
                    onClick={() => toggleUserStatus(user._id, user.isActive)}
                    className={`user-badge ${user.isActive ? 'active' : 'inactive'}`}
                  >
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <div className="user-buttons">
                    <button
                      onClick={() => handleEdit(user)}
                      className="user-btn edit"
                    >
                      <Edit2 className="user-btn-icon" />
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="user-btn delete"
                    >
                      <Trash2 className="user-btn-icon" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination-section">
          <div className="pagination">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
