import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

const schema = yup.object().shape({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  role: yup.string().oneOf(['user', 'admin'], 'Role must be either user or admin').required('Role is required'),
});

const Register = () => {
  const { register: registerUser, isAuthenticated } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      role: 'user' // Default role is 'user'
    }
  });

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError('');
    
    const result = await registerUser({
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      role: data.role
    });
    
    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.error);
    }
    
    setIsLoading(false);
  };

  if (success) {
    return (
      <div className="auth-layout">
        <div className="auth-container">
          <div className="glass-card">
            <div className="text-center" style={{ padding: '2rem' }}>
              <div className="success-icon" style={{
                margin: '0 auto 1.5rem',
                width: '4rem',
                height: '4rem',
                borderRadius: '50%',
                background: 'rgba(34, 197, 94, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg style={{ width: '2rem', height: '2rem', color: '#22c55e' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: 'white',
                marginBottom: '0.5rem'
              }}>
                Registration Successful!
              </h2>
              <p style={{
                fontSize: '0.875rem',
                color: 'rgba(255, 255, 255, 0.7)',
                marginBottom: '1.5rem'
              }}>
                Your account has been created successfully. Please{' '}
                <Link to="/login" style={{
                  color: '#60a5fa',
                  textDecoration: 'none',
                  fontWeight: '500'
                }}>
                  sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-layout">
      <div className="auth-container">
        <div className="auth-logo">
        
        </div>
        
        <div className="glass-card">
          <h2>Create your account</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="glass-form">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  className={`form-control ${errors.fullName ? 'error' : ''}`}
                  style={{ paddingLeft: '40px' }}
                  {...register('fullName')}
                />
                <User style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(255, 255, 255, 0.6)'
                }} />
              </div>
              {errors.fullName && <span className="error-message" style={{ color: 'var(--color-error)', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.fullName.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className={`form-control ${errors.email ? 'error' : ''}`}
                  style={{ paddingLeft: '40px' }}
                  {...register('email')}
                />
                <Mail style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(255, 255, 255, 0.6)'
                }} />
              </div>
              {errors.email && <span className="error-message" style={{ color: 'var(--color-error)', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.email.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  className={`form-control ${errors.password ? 'error' : ''}`}
                  style={{ paddingLeft: '40px' }}
                  {...register('password')}
                />
                <Lock style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(255, 255, 255, 0.6)'
                }} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255, 255, 255, 0.6)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4px'
                  }}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <span className="error-message" style={{ color: 'var(--color-error)', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.password.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  className={`form-control ${errors.confirmPassword ? 'error' : ''}`}
                  style={{ paddingLeft: '40px' }}
                  {...register('confirmPassword')}
                />
                <Lock style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(255, 255, 255, 0.6)'
                }} />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255, 255, 255, 0.6)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4px'
                  }}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && <span className="error-message" style={{ color: 'var(--color-error)', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.confirmPassword.message}</span>}
            </div>

            <div className="form-group">
              <label>Role</label>
              <div style={{ 
                display: 'flex', 
                gap: '1rem',
                marginTop: '0.5rem'
              }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  color: 'rgba(255, 255, 255, 0.9)'
                }}>
                  <input
                    type="radio"
                    value="user"
                    style={{
                      width: '1rem',
                      height: '1rem',
                      accentColor: 'var(--color-primary)'
                    }}
                    {...register('role')}
                  />
                  <span>User</span>
                </label>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  color: 'rgba(255, 255, 255, 0.9)'
                }}>
                  <input
                    type="radio"
                    value="admin"
                    style={{
                      width: '1rem',
                      height: '1rem',
                      accentColor: 'var(--color-primary)'
                    }}
                    {...register('role')}
                  />
                  <span>Admin</span>
                </label>
              </div>
              {errors.role && <span className="error-message" style={{ color: 'var(--color-error)', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.role.message}</span>}
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
              style={{
                marginTop: '1rem',
                width: '100%',
                padding: '0.75rem',
                fontSize: '1rem',
                fontWeight: '500',
                borderRadius: '0.5rem',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
          
          <div className="form-footer">
            Already have an account?{' '}
            <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
