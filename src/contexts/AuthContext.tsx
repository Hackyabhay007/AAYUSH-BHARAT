"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import authService from '@/appwrite/auth';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

interface User {
  $id: string;
  id: string;
  name: string;
  email: string;
  full_name: string;
  created_at: string;
  role: boolean;
  email_verified: boolean;
  phone?: string;
  userId?: string;
  emailVerification?: boolean;
  $createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  register: (fullName: string, email: string, password: string, phone: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Handle logout of any existing session before registration or login
const logoutExistingSession = async () => {
  try {
    const session = await authService.account.getSession('current');
    if (session) {
      await authService.account.deleteSession(session.$id);
    }
  } catch (err) {
    // No active session or error getting session
    if (err instanceof Error) {
      console.error("Error during logout:", err.message);
    }
    console.log("No active session to logout");
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('user');
        if (token) {
          try {
            const userData = await authService.getCurrentUser();
            if (userData) {
              const user: User = {
                $id: userData.$id,
                id: userData.$id,
                name: userData.name,
                email: userData.email,
                full_name: userData.name,
                created_at: userData.$createdAt || new Date().toISOString(),
                role: false,
                email_verified: userData.emailVerification || false
              };
              setUser(user);
              setIsAuthenticated(true);
            }
          } catch (error) {
            console.error("Auth check error:", error);
            localStorage.removeItem('user');
            localStorage.removeItem('userid');
            setIsAuthenticated(false);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string, rememberMe: boolean = false): Promise<void> => {
    try {
      setLoading(true);
      
      // For development testing - mock user login
      if (email === "test@gmail.com" && password === "testpassword") {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const mockUser: User = {
          $id: "test-user-id",
          id: "test-user-id",
          name: "Test User",
          email: "test@gmail.com",
          full_name: "Test User",
          created_at: new Date().toISOString(),
          role: false,
          email_verified: true
        };
        
        localStorage.removeItem('user');
        localStorage.removeItem('userid');
        
        localStorage.setItem('user', JSON.stringify(mockUser));
        localStorage.setItem('userid', mockUser.$id);
        Cookies.set('auth_token', 'test-token', {
          expires: rememberMe ? 30 : 1,
          sameSite: 'strict'
        });
        
        setUser(mockUser);
        setIsAuthenticated(true);
        toast.success('Logged in successfully!');
        router.replace('/profile');
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 500));
      await logoutExistingSession();
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const session = await authService.login({ email, password });
      
      if (session) {
        localStorage.setItem('user', session.userId);
        localStorage.setItem('userid', session.userId);
        
        const userData = await authService.getCurrentUser();
        if (userData) {
          const user: User = {
            $id: userData.$id,
            id: userData.$id,
            name: userData.name,
            email: userData.email,
            full_name: userData.name,
            created_at: userData.$createdAt || new Date().toISOString(),
            role: false,
            email_verified: userData.emailVerification || false
          };
          setUser(user);
          setIsAuthenticated(true);
          toast.success('Logged in successfully!');
          router.replace('/profile');
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      let errorMessage = 'Login failed. Please check your credentials.';
      
      if (error instanceof Error) {
        if (error.message.includes("Rate limit")) {
          errorMessage = 'Too many attempts. Please try again in a moment.';
        }
      }
      
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const register = async (fullName: string, email: string, password: string, phone: string): Promise<void> => {
    try {
      setLoading(true);
        if (password.length < 8) {
        toast.error('Password must be at least 8 characters long');
        throw new Error('Password must be at least 8 characters long');
      }
      
      // Validate phone number
      const phoneStr = phone.replace(/\D/g, '');
      if (phoneStr.length !== 10) {
        toast.error('Phone number must be exactly 10 digits');
        throw new Error('Phone number must be exactly 10 digits');
      }
      
      // Convert phone to integer
      const phoneNumber = parseInt(phoneStr);
      
      try {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          await logout();
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error checking current user:", error.message);
        }
      }
      
      const userData = await authService.createAccount({
        email,
        password,
        fullname: fullName,
        phone: phone
      });
        if (userData) {
        localStorage.setItem('user', userData.$id);
        localStorage.setItem('userid', userData.$id);
        
        const user: User = {
          $id: userData.$id,
          id: userData.$id,
          name: fullName,
          email,
          full_name: fullName,
          created_at: new Date().toISOString(),
          role: false,
          email_verified: false,
          phone
        };
        
        setUser(user);
        setIsAuthenticated(true);
        toast.success('Registration successful!');
        router.push('/profile');
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error('Registration failed. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem('user');
      localStorage.removeItem('userid');
      Cookies.remove('auth_token');
      setUser(null);
      setIsAuthenticated(false);

      const userId = localStorage.getItem('user');
      if (userId === 'test-user-id') {
        router.replace('/login');
        return;
      }
      
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const session = await authService.account.getSession('current');
        if (session) {
          await authService.account.deleteSession(session.$id);
        }
      } catch (error) {
        console.error("Error deleting session:", error);
      } finally {
        router.replace('/login');
      }
    } catch (error) {
      console.error("Logout error:", error);
      router.replace('/login');
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      register, 
      logout,
      isAuthenticated
    }}>
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

export default AuthContext;