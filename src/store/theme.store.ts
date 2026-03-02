import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Appearance = 'light' | 'dark';

type ThemeState = {
  appearance: Appearance;
  toggle: () => void;
  setAppearance: (value: Appearance) => void;
};

// Sync theme with document class
const syncThemeClass = (appearance: Appearance) => {
  if (typeof document !== 'undefined') {
    if (appearance === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }
};

const initialAppearance: Appearance = 'dark';
syncThemeClass(initialAppearance);

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      appearance: initialAppearance,
      toggle: () =>
        set((state) => {
          const newAppearance = state.appearance === 'light' ? 'dark' : 'light';
          syncThemeClass(newAppearance);
          return { appearance: newAppearance };
        }),
      setAppearance: (value) => {
        syncThemeClass(value);
        set({ appearance: value });
      },
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          syncThemeClass(state.appearance);
        }
      },
    },
  ),
);
