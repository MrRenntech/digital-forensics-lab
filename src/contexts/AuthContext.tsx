import { createContext, useContext, useState, ReactNode } from 'react';

type UserRole = 'student' | 'instructor';

type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for the simulator
const demoUsers = {
  'student@krmangalam.edu.in': {
    id: '1',
    name: 'Aarav Sharma',
    email: 'student@krmangalam.edu.in',
    role: 'student' as const,
    password: 'student123'
  },
  'instructor@krmangalam.edu.in': {
    id: '2',
    name: 'Dr. Priya Gupta',
    email: 'instructor@krmangalam.edu.in',
    role: 'instructor' as const,
    password: 'instructor123'
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = demoUsers[email as keyof typeof demoUsers];
    
    if (foundUser && foundUser.password === password) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('forensics_lab_user', JSON.stringify(userWithoutPassword));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('forensics_lab_user');
  };

  // Check for existing session on mount
  useState(() => {
    const savedUser = localStorage.getItem('forensics_lab_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  });

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};