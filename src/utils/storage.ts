export const StorageKeys = {
  USERS: 'app_users',
  CURRENT_USER: 'current_user',
} as const;

export const storage = {
  getUsers: () => {
    const users = localStorage.getItem(StorageKeys.USERS);
    return users ? JSON.parse(users) : [];
  },
  
  setUsers: (users: any[]) => {
    localStorage.setItem(StorageKeys.USERS, JSON.stringify(users));
  },
  
  getCurrentUser: () => {
    const user = localStorage.getItem(StorageKeys.CURRENT_USER);
    return user ? JSON.parse(user) : null;
  },
  
  setCurrentUser: (user: any | null) => {
    if (user) {
      localStorage.setItem(StorageKeys.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(StorageKeys.CURRENT_USER);
    }
  },
};