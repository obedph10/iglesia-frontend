import { useAppStore } from "../store";

export const useAuth = () => {
  const user = useAppStore((state) => state.user);
  const token = useAppStore((state) => state.token);
  const setUser = useAppStore((state) => state.setUser);
  const setToken = useAppStore((state) => state.setToken);
  const logout = useAppStore((state) => state.logout);

  return {
    user,
    token,
    isAuthenticated: !!user && !!token,
    setUser,
    setToken,
    logout,
  };
};
