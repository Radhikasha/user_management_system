import React from 'react';
import { Shield, Key, Eye, EyeOff, Lock } from 'lucide-react';
import '../styles/SecuritySettings.css';

const SecuritySettings = () => {
  return (
    <div className="security-settings-page">
      <div className="security-header">
        <h1 className="security-title">Security Settings</h1>
        <p className="security-subtitle">
          Manage your account security preferences and settings
        </p>
      </div>

      <div className="security-sections">
        {/* Password Section */}
        <div className="security-section">
          <div className="security-section-header">
            <h2 className="security-section-title">Password</h2>
            <p className="security-section-description">
              Manage your password and authentication settings
            </p>
          </div>
          <div className="security-section-content">
            <div className="password-item">
              <div className="password-info">
                <h4>Change Password</h4>
                <p>Last changed 30 days ago</p>
              </div>
              <button className="password-btn">
                Change Password
              </button>
            </div>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="security-section">
          <div className="security-section-header">
            <h2 className="security-section-title">Two-Factor Authentication</h2>
            <p className="security-section-description">
              Add an extra layer of security to your account
            </p>
          </div>
          <div className="security-section-content">
            <div className="two-factor-item">
              <div className="two-factor-info">
                <h4>Enable 2FA</h4>
                <p>Add an extra layer of security to your account</p>
              </div>
              <button className="two-factor-btn">
                Enable
              </button>
            </div>
          </div>
        </div>

        {/* Session Management */}
        <div className="security-section">
          <div className="security-section-header">
            <h2 className="security-section-title">Session Management</h2>
            <p className="security-section-description">
              View and manage your active sessions
            </p>
          </div>
          <div className="security-section-content">
            <div className="sessions-list">
              <div className="session-item">
                <div className="session-info">
                  <h4>Current Session</h4>
                  <p>Chrome on Windows • Active now</p>
                </div>
                <span className="session-badge">Current</span>
              </div>
              <div className="session-item">
                <div className="session-info">
                  <h4>Mobile Session</h4>
                  <p>Safari on iPhone • 2 hours ago</p>
                </div>
                <span className="session-badge">Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="security-section">
          <div className="security-section-header">
            <h2 className="security-section-title">Privacy Settings</h2>
            <p className="security-section-description">
              Control your privacy and data sharing preferences
            </p>
          </div>
          <div className="security-section-content">
            <div className="privacy-item">
              <div className="privacy-info">
                <h4>Profile Visibility</h4>
                <p>Control who can see your profile information</p>
              </div>
              <select className="privacy-select">
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="friends">Friends Only</option>
              </select>
            </div>
            <div className="privacy-item">
              <div className="privacy-info">
                <h4>Data Sharing</h4>
                <p>Manage how your data is shared with third parties</p>
              </div>
              <select className="privacy-select">
                <option value="minimal">Minimal</option>
                <option value="standard">Standard</option>
                <option value="full">Full</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
