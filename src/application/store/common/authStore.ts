import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthStateType } from '@/shared/types/common/auth';

export const useAuthStore = create<AuthStateType>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updateUser: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),
    }),
    {
      name: 'auth-storage',
    },
  ),
);
