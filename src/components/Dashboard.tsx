import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Trash2, LogOut, Users, User as UserIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { UserProfile } from './UserProfile';

export const Dashboard: React.FC = () => {
  const { user, users, logout, deleteUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'users'>('profile');

  const handleDeleteUser = (id: string) => {
    if (user?.id === id) {
      toast.error("You can't delete your own account while logged in");
      return;
    }
    deleteUser(id);
    toast.success('User deleted successfully');
  };

  return (
    <div className="dashboard min-h-screen p-6">
      <div className="container max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-100">Welcome, {user?.username}!</h1>
          <button onClick={logout} className="btn-danger">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </header>

        <nav className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('profile')}
            className={`tab-button ${
              activeTab === 'profile' ? 'tab-button-active' : 'tab-button-inactive'
            }`}
          >
            <UserIcon className="w-4 h-4 mr-2" />
            Profile
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`tab-button ${
              activeTab === 'users' ? 'tab-button-active' : 'tab-button-inactive'
            }`}
          >
            <Users className="w-4 h-4 mr-2" />
            User Management
          </button>
        </nav>

        {activeTab === 'profile' ? (
          <UserProfile />
        ) : (
          <div className="card">
            <header className="px-6 py-4 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-gray-100">User Management</h2>
            </header>
            <div className="user-list divide-y divide-gray-700">
              {users.map((u) => (
                <div key={u.id} className="user-item px-6 py-4 flex justify-between items-center">
                  <div className="user-info">
                    <p className="text-gray-200 font-medium">{u.username}</p>
                    <p className="text-sm text-gray-400">{u.email}</p>
                  </div>
                  <div className="user-actions flex items-center space-x-4">
                    <span className="text-sm text-gray-400">
                      Joined: {new Date(u.createdAt).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => handleDeleteUser(u.id)}
                      className="delete-btn p-2 text-gray-400 hover:text-red-400 rounded-full hover:bg-gray-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};