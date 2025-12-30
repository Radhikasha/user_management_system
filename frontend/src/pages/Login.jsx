import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import './Login.css';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError('');
    
    const result = await login(data.email, data.password);
    
    if (result.success) {
      // Redirect based on user role
      if (result.user?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } else {
      setError(result.error);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="auth-layout">
      <div className="auth-container">
        <div className="auth-logo">
          <h1>Login to Continue</h1>
        </div>
        
        <div className="glass-card">
          <h2>Welcome back</h2>
          <p>Sign in to your account to continue</p>
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="glass-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className={`form-control ${errors.email ? 'error' : ''}`}
                  {...register('email')}
                />
                <Mail className="input-icon" />
              </div>
              {errors.email && <span className="error-message">{errors.email.message}</span>}
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label htmlFor="password">Password</label>
                <Link to="/forgot-password">
                  Forgot password?
                </Link>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className={`form-control ${errors.password ? 'error' : ''}`}
                  {...register('password')}
                />
                <Lock className="input-icon" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <span className="error-message">{errors.password.message}</span>}
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          
          <div className="form-footer">
            Don't have an account?{' '}
            <Link to="/register">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
