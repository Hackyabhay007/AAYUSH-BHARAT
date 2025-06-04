"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import authService from '@/appwrite/auth';
import toast from 'react-hot-toast';

interface User {
  $id: string;
  name: string;
  email: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  register: (fullName: string, email: string, password: string, phone: string) => Promise<void>;
  logout: () => Promise<void>;
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
  } catch (error) {
    // No active session or error getting session
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
            // Get current user data
            const userData = await authService.getCurrentUser();
            if (userData) {
              setUser({
                $id: userData.$id,
                name: userData.name,
                email: userData.email
              });
              setIsAuthenticated(true);
            }
          } catch (error) {
            console.error("Auth check error:", error);
            // Clear invalid tokens
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

  const login = async (email: string, password: string, rememberMe: boolean) => {
    try {
      setLoading(true);
      
      // For development testing - mock user login
      if (email === "test@gmail.com" && password === "testpassword") {
        const mockUser = {
          $id: "test-user-id",
          name: "Test User",
          email: "test@gmail.com"
        };
        
        localStorage.setItem('user', mockUser.$id);
        localStorage.setItem('userid', mockUser.$id);
        setUser(mockUser);
        setIsAuthenticated(true);
        toast.success('Logged in successfully!');
        
        // Use replace instead of push to prevent history issues
        router.replace('/profile');
        return;
      }
      
      // Check if there's an existing session and log it out
      await logoutExistingSession();
      
      const session = await authService.login({ email, password });
      
      if (session) {
        // Store auth token
        localStorage.setItem('user', session.userId);
        localStorage.setItem('userid', session.userId);
        
        // Get user data
        const userData = await authService.getCurrentUser();
        setUser({
          $id: userData.$id,
          name: userData.name,
          email: userData.email
        });
        
        setIsAuthenticated(true);
        toast.success('Logged in successfully!');
        
        // Use replace instead of push to prevent history issues
        router.replace('/profile');
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error('Login failed. Please check your credentials.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (fullName: string, email: string, password: string, phone: string) => {
    try {
      setLoading(true);
      
      // Check if password is at least 8 characters
      if (password.length < 8) {
        toast.error('Password must be at least 8 characters long');
        throw new Error('Password must be at least 8 characters long');
      }
      
      // Check for and logout any existing session
      await logoutExistingSession();
      
      const userData = await authService.createAccount({
        email,
        password,
        fullname: fullName,
        phone: Number(phone)
      });
      
      if (userData) {
        localStorage.setItem('user', userData.userId);
        localStorage.setItem('userid', userData.userId);
        
        setUser({
          $id: userData.$id,
          name: fullName,
          email,
          phone
        });
        
        setIsAuthenticated(true);
        toast.success('Registration successful!');
        
        // Use replace instead of push to prevent history issues
        router.replace('/profile');
      }
    } catch (error) {
      console.error("Registration error:", error);
      let errorMessage = 'Registration failed. Please try again.';
      
      // Check for specific Appwrite errors
      if (error instanceof Error) {
        if (error.message.includes("session is active")) {
          errorMessage = 'Please logout first before registering a new account.';
        }
      }
      
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // If using the mock user, just clear local storage
      const userId = localStorage.getItem('user');
      if (userId === 'test-user-id') {
        localStorage.removeItem('user');
        localStorage.removeItem('userid');
        setUser(null);
        setIsAuthenticated(false);
        router.replace('/login');
        return;
      }
      
      // Otherwise, try to delete the actual session
      try {
        // Get current session ID
        const session = await authService.account.getSession('current');
        if (session) {
          await authService.account.deleteSession(session.$id);
        }
      } catch (error) {
        console.error("Error deleting session:", error);
      } finally {
        // Always clear local storage and state
        localStorage.removeItem('user');
        localStorage.removeItem('userid');
        setUser(null);
        setIsAuthenticated(false);
        router.replace('/login');
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error('Logout failed');
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
