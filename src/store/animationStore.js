import { create } from "zustand";

const animationStore = create((set) => ({
  isHovered: false,
  setIsHovered: (newIsHovered) => set({ isHovered: newIsHovered }),

  loading: true,
  setLoading: (newLoading) => set({ loading: newLoading }),
}));

export default animationStore;
