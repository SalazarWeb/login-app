import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Calendar } from 'lucide-react';

export const UserProfile: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="card p-6 max-w-lg mx-auto">
      <div className="profile-header text-center mb-8">
        <div className="avatar w-24 h-24 bg-purple-600 rounded-full mx-auto flex items-center justify-center mb-4">
          <span className="text-4xl font-bold text-white">
            {user.username[0].toUpperCase()}
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-100">{user.username}</h2>
      </div>

      <div className="profile-details space-y-4">
        <div className="info-card flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
          <User className="icon w-5 h-5 text-purple-400" />
          <div>
            <p className="label text-sm text-gray-400">Username</p>
            <p className="value text-gray-200">{user.username}</p>
          </div>
        </div>

        <div className="info-card flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
          <Mail className="icon w-5 h-5 text-purple-400" />
          <div>
            <p className="label text-sm text-gray-400">Email</p>
            <p className="value text-gray-200">{user.email}</p>
          </div>
        </div>

        <div className="info-card flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
          <Calendar className="icon w-5 h-5 text-purple-400" />
          <div>
            <p className="label text-sm text-gray-400">Member Since</p>
            <p className="value text-gray-200">
              {new Date(user.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};