import { create } from 'zustand';
export const useEditorStore = create()((set, get) => ({
    activePanel: 'content',
    isSidebarOpen: true,
    undoStack: [],
    redoStack: [],
    isSaving: false,
    lastSaved: null,
    setActivePanel: (panel) => set({ activePanel: panel }),
    toggleSidebar: () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),
    setSidebarOpen: (open) => set({ isSidebarOpen: open }),
    pushUndo: (snapshot) => set((s) => ({
        undoStack: [...s.undoStack.slice(-49), snapshot],
        redoStack: [],
    })),
    undo: () => {
        const { undoStack, redoStack } = get();
        if (undoStack.length === 0)
            return undefined;
        const previous = undoStack[undoStack.length - 1];
        set({
            undoStack: undoStack.slice(0, -1),
            redoStack: [...redoStack, previous],
        });
        return previous;
    },
    redo: () => {
        const { redoStack, undoStack } = get();
        if (redoStack.length === 0)
            return undefined;
        const next = redoStack[redoStack.length - 1];
        set({
            redoStack: redoStack.slice(0, -1),
            undoStack: [...undoStack, next],
        });
        return next;
    },
    setIsSaving: (saving) => set({ isSaving: saving }),
    setLastSaved: (date) => set({ lastSaved: date }),
}));
