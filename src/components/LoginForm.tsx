import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { KeyRound, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

export const LoginForm: React.FC<{ onToggleForm: () => void }> = ({ onToggleForm }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      toast.success('Login successful!');
    } else {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="text-sm font-medium text-gray-200">Username</label>
          <div className="relative mt-1">
            <span className="absolute left-3 inset-y-0 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
              placeholder="Enter your username"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-200">Password</label>
          <div className="relative mt-1">
            <span className="absolute left-3 inset-y-0 flex items-center pointer-events-none">
              <KeyRound className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="Enter your password"
            />
          </div>
        </div>

        <button type="submit" className="btn-primary w-full">
          Sign in
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-400">
          Don't have an account?{' '}
          <button
            onClick={onToggleForm}
            className="font-medium text-purple-400 hover:text-purple-300"
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  );
};