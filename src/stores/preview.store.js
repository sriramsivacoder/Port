import { create } from 'zustand';
export const usePreviewStore = create()((set) => ({
    device: 'desktop',
    zoom: 100,
    setDevice: (device) => set({ device }),
    setZoom: (zoom) => set({ zoom: Math.max(25, Math.min(200, zoom)) }),
}));
