import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { User } from "@/types";
import { RegisterData } from "@/types/authTypes";
import authService from "@/service/auth";
import api from "@/service/api";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  signup: (userData: RegisterData) => Promise<string>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

const refreshUser = useCallback(async () => {
  try {
    console.log("refersh user is triggered")
    const resp = await api.get("/auth/me", { _silent: true }as any);
    console.log("RefreshUser : ",resp)
    setUser(resp.data.user);
  } catch {
    setUser(null);
  }
}, []);
  const login = useCallback(async(email: string, password: string) => {
    try{
      const resp = await authService.login(email,password)
      setUser(resp.user)
    }catch(error:any){
      const message = error.response?.data?.message || "Login failed"
      throw new Error(message)
    }
  }, [refreshUser]);

  const signup = useCallback(async (userData: RegisterData) => {
    try {
      const resp = await authService.register(userData);
      return resp.message
    } catch (error: any) {
      const message = error.response?.data?.message || "Signup failed";
      throw new Error(message);
    }
  }, []);

   const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
    } catch {
      setUser(null);
    }
  }, []);

  const updateProfile = useCallback((data: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : null));
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateProfile,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
