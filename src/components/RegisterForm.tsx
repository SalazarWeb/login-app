import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, KeyRound } from 'lucide-react';
import toast from 'react-hot-toast';

export const RegisterForm: React.FC<{ onToggleForm: () => void }> = ({ onToggleForm }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (register(username, email, password)) {
      toast.success('Registration successful! Please login.');
      onToggleForm();
    } else {
      toast.error('Username or email already exists');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="text-sm font-medium text-gray-200">Username</label>
          <div className="relative mt-1">
            <span className="absolute left-3 inset-y-0 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
              placeholder="Choose a username"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-200">Email</label>
          <div className="relative mt-1">
            <span className="absolute left-3 inset-y-0 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="Enter your email"
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
              placeholder="Choose a password"
            />
          </div>
        </div>

        <button type="submit" className="btn-primary w-full">
          Register
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-400">
          Already have an account?{' '}
          <button
            onClick={onToggleForm}
            className="font-medium text-purple-400 hover:text-purple-300"
          >
            Sign in here
          </button>
        </p>
      </div>
    </div>
  );
};