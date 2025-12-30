import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Lock, Save, Eye, EyeOff } from 'lucide-react';
import '../styles/Profile.css';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
});

const passwordSchema = yup.object().shape({
  currentPassword: yup.string().required('Current password is required'),
  newPassword: yup.string().min(6, 'Password must be at least 6 characters').required('New password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
});

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
    reset: resetProfile,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPassword,
  } = useForm({
    resolver: yupResolver(passwordSchema),
  });

  const onProfileSubmit = async (data) => {
    setIsLoading(true);
    setMessage('');
    
    try {
      // Simulate API call - in real app, this would call your API
      await new Promise(resolve => setTimeout(resolve, 1000));
      updateUser({ ...user, ...data });
      setMessage('Profile updated successfully!');
    } catch (error) {
      setMessage('Failed to update profile');
    }
    
    setIsLoading(false);
  };

  const onPasswordSubmit = async (data) => {
    setIsLoading(true);
    setMessage('');
    
    try {
      // Simulate API call - in real app, this would call your API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage('Password changed successfully!');
      setShowPasswordForm(false);
      resetPassword();
    } catch (error) {
      setMessage('Failed to change password');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1 className="profile-title">Profile Settings</h1>
        <p className="profile-subtitle">
          Manage your account information and security settings
        </p>
      </div>

      {message && (
        <div className={`alert ${
          message.includes('success') ? 'alert-success' : 'alert-error'
        }`}>
          {message}
        </div>
      )}

      <div className="profile-sections">
        {/* Profile Information */}
        <div className="profile-section">
          <div className="profile-section-header">
            <h2 className="profile-section-title">Profile Information</h2>
          </div>
          <div className="profile-section-content">
            <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="profile-form">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  {...registerProfile('name')}
                  type="text"
                  className="form-input"
                  placeholder="Enter your full name"
                />
                {profileErrors.name && (
                  <p className="text-red-400 text-sm mt-1">{profileErrors.name.message}</p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  {...registerProfile('email')}
                  type="email"
                  className="form-input"
                  placeholder="Enter your email"
                />
                {profileErrors.email && (
                  <p className="text-red-400 text-sm mt-1">{profileErrors.email.message}</p>
                )}
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Change Password */}
        <div className="profile-section">
          <div className="profile-section-header">
            <div className="flex items-center justify-between w-full">
              <h2 className="profile-section-title">Change Password</h2>
              <button
                type="button"
                onClick={() => setShowPasswordForm(!showPasswordForm)}
                className="btn btn-secondary"
              >
                {showPasswordForm ? 'Cancel' : 'Change Password'}
              </button>
            </div>
          </div>
          <div className="profile-section-content">
            {showPasswordForm && (
              <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="profile-form">
                <div className="form-group">
                  <label className="form-label">Current Password</label>
                  <div className="password-input-wrapper">
                    <input
                      {...registerPassword('currentPassword')}
                      type={showCurrentPassword ? 'text' : 'password'}
                      className="form-input"
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {passwordErrors.currentPassword && (
                    <p className="text-red-400 text-sm mt-1">{passwordErrors.currentPassword.message}</p>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">New Password</label>
                  <div className="password-input-wrapper">
                    <input
                      {...registerPassword('newPassword')}
                      type={showNewPassword ? 'text' : 'password'}
                      className="form-input"
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {passwordErrors.newPassword && (
                    <p className="text-red-400 text-sm mt-1">{passwordErrors.newPassword.message}</p>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Confirm New Password</label>
                  <div className="password-input-wrapper">
                    <input
                      {...registerPassword('confirmPassword')}
                      type={showConfirmPassword ? 'text' : 'password'}
                      className="form-input"
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {passwordErrors.confirmPassword && (
                    <p className="text-red-400 text-sm mt-1">{passwordErrors.confirmPassword.message}</p>
                  )}
                </div>

                <div className="form-actions">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    {isLoading ? 'Updating...' : 'Update Password'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Account Information */}
        <div className="profile-section">
          <div className="profile-section-header">
            <h2 className="profile-section-title">Account Information</h2>
          </div>
          <div className="profile-section-content">
            <div className="profile-info-grid">
              <div className="profile-info-item">
                <dt className="profile-info-label">Account Type</dt>
                <dd className="profile-info-value">
                  <span className="user-role-badge">
                    {user?.role}
                  </span>
                </dd>
              </div>
              <div className="profile-info-item">
                <dt className="profile-info-label">Account Status</dt>
                <dd className="profile-info-value">
                  <span className="user-role-badge">
                    Active
                  </span>
                </dd>
              </div>
              <div className="profile-info-item">
                <dt className="profile-info-label">Member Since</dt>
                <dd className="profile-info-value">
                  {new Date().toLocaleDateString()}
                </dd>
              </div>
              <div className="profile-info-item">
                <dt className="profile-info-label">Last Login</dt>
                <dd className="profile-info-value">
                  {new Date().toLocaleString()}
                </dd>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
