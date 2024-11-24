import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { User } from '../types/user';
import { storage } from '../utils/storage';

interface AuthContextType {
  user: User | null;
  users: User[];
  login: (username: string, password: string) => boolean;
  register: (username: string, email: string, password: string) => boolean;
  logout: () => void;
  deleteUser: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => storage.getCurrentUser());
  const [users, setUsers] = useState<User[]>(() => {
    const storedUsers = storage.getUsers();
    return storedUsers.length > 0 ? storedUsers : [{
      id: '1',
      username: 'admin',
      password: 'admin123',
      email: 'admin@example.com',
      createdAt: new Date(),
    }];
  });

  useEffect(() => {
    storage.setUsers(users);
  }, [users]);

  const login = useCallback((username: string, password: string) => {
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );
    if (foundUser) {
      setUser(foundUser);
      storage.setCurrentUser(foundUser);
      return true;
    }
    return false;
  }, [users]);

  const register = useCallback((username: string, email: string, password: string) => {
    if (users.some((u) => u.username === username || u.email === email)) {
      return false;
    }

    const newUser: User = {
      id: Date.now().toString(),
      username,
      email,
      password,
      createdAt: new Date(),
    };

    setUsers((prev) => [...prev, newUser]);
    return true;
  }, [users]);

  const logout = useCallback(() => {
    setUser(null);
    storage.setCurrentUser(null);
  }, []);

  const deleteUser = useCallback((id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }, []);

  return (
    <AuthContext.Provider value={{ user, users, login, register, logout, deleteUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};