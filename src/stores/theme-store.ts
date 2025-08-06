import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Theme } from '@/types'

interface ThemeStore {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
  hydrated: boolean
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'dark', // Default to dark theme as specified in requirements
      hydrated: false,
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => () => {
        // Hydration completed
      },
    }
  )
)