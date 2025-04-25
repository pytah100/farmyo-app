import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  id: string;
  name: string;
  email: string;
  isVerified: boolean;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Partial<User>) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: async (email, password) => {
        // In a real app, you would validate credentials with a backend
        // This is just a mock implementation
        if (email && password) {
          set({
            isAuthenticated: true,
            user: {
              id: "1",
              name: "Gerald Magala",
              email: email,
              isVerified: true
            }
          });
          return true;
        }
        return false;
      },
      logout: () => {
        set({
          isAuthenticated: false,
          user: null
        });
      },
      register: async (userData) => {
        // In a real app, you would send registration data to a backend
        // This is just a mock implementation
        if (userData.email) {
          set({
            isAuthenticated: true,
            user: {
              id: Date.now().toString(),
              name: userData.name || "New User",
              email: userData.email,
              isVerified: false
            }
          });
          return true;
        }
        return false;
      }
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
