import { create } from "zustand";

interface useLayoutStoreProps {
  header: boolean;
  sidebar: boolean;
  setSidebar: (status: boolean) => void;
  setHeader: (status: boolean) => void;
}

export const useLayoutStore = create<useLayoutStoreProps>((set) => ({
  header: true,
  sidebar: false,
  setSidebar: (status: boolean): void => set(() => ({ sidebar: status })),
  setHeader: (status: boolean): void => set(() => ({ header: status })),
}));
