import { create } from "zustand";

interface User {
  id: number;
  email: string;
  name: string;
}

interface AppStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  logout: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  user: null,
  token: localStorage.getItem("auth_token"),
  isLoading: false,
  setUser: (user) => set({ user }),
  setToken: (token) => {
    if (token) {
      localStorage.setItem("auth_token", token);
    } else {
      localStorage.removeItem("auth_token");
    }
    set({ token });
  },
  setIsLoading: (isLoading) => set({ isLoading }),
  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem("auth_token");
  },
}));
