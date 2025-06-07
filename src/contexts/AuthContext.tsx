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

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // For development testing - mock user login
      if (email === "test@gmail.com" && password === "testpassword") {
        // Add a small delay to simulate real login
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const mockUser = {
          $id: "test-user-id",
          name: "Test User",
          email: "test@gmail.com"
        };
        
        // Clear any existing data first
        localStorage.removeItem('user');
        localStorage.removeItem('userid');
        
        // Set new data
        localStorage.setItem('user', mockUser.$id);
        localStorage.setItem('userid', mockUser.$id);
        setUser(mockUser);
        setIsAuthenticated(true);
        toast.success('Logged in successfully!');
        router.replace('/profile');
        return;
      }

      // Add a small delay to prevent rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check if there's an existing session and log it out
      await logoutExistingSession();
      
      // Add another small delay after logout
      await new Promise(resolve => setTimeout(resolve, 500));
      
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
        
        // Use replace to prevent back navigation issues
        router.replace('/profile');
      }
    } catch (error) {
      console.error("Login error:", error);
      let errorMessage = 'Login failed. Please check your credentials.';
      
      // More specific error messages
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
  const register = async (fullName: string, email: string, password: string, phone: string) => {
    try {
      setLoading(true);
      
      // Check if password is at least 8 characters
      if (password.length < 8) {
        toast.error('Password must be at least 8 characters long');
        throw new Error('Password must be at least 8 characters long');
      }
      
      // Check if already logged in and logout first
      try {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          await logout(); // Logout current user before registering
        }
      } catch (error) {
        console.log("failed");
        
      }
      
      const userData = await authService.createAccount({
        email,
        password,
        fullname: fullName,
        phone: phone
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
        router.push('/profile');
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error('Registration failed. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };  const logout = async () => {
    try {
      // First clear local storage and state to prevent re-auth attempts
      localStorage.removeItem('user');
      localStorage.removeItem('userid');
      setUser(null);
      setIsAuthenticated(false);

      // If using the mock user, just redirect
      const userId = localStorage.getItem('user');
      if (userId === 'test-user-id') {
        router.replace('/login');
        return;
      }
      
      // Otherwise, try to delete the actual session
      try {
        // Add a small delay to prevent rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const session = await authService.account.getSession('current');
        if (session) {
          await authService.account.deleteSession(session.$id);
        }
      } catch (error) {
        console.error("Error deleting session:", error);
        // Don't show error to user since we've already logged them out locally
      } finally {
        router.replace('/login');
      }
    } catch (error) {
      console.error("Logout error:", error);
      // Still redirect even if there's an error
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