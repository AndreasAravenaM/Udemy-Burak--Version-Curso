import { create } from "zustand";

export const useThemeContext = create((set) => ({
  theme: localStorage.getItem("preferred-theme") || "forest",
  setTheme: (theme) => {
    localStorage.setItem("preferred-theme", theme);
    set({ theme });
  },
}));
