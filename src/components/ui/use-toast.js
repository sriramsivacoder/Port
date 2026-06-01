import { useCallback, useMemo, useSyncExternalStore } from 'react';
const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 5000;
let state = { toasts: [] };
const listeners = new Set();
function emitChange() {
    for (const listener of listeners) {
        listener();
    }
}
function dispatch(action) {
    switch (action.type) {
        case 'ADD_TOAST':
            state = {
                ...state,
                toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
            };
            break;
        case 'DISMISS_TOAST':
            state = {
                ...state,
                toasts: state.toasts.filter((t) => t.id !== action.id),
            };
            break;
        case 'REMOVE_TOAST':
            state = {
                ...state,
                toasts: state.toasts.filter((t) => t.id !== action.id),
            };
            break;
    }
    emitChange();
}
let toastCount = 0;
function genId() {
    toastCount = (toastCount + 1) % Number.MAX_SAFE_INTEGER;
    return toastCount.toString();
}
export function toast(props) {
    const id = genId();
    const duration = props.duration ?? TOAST_REMOVE_DELAY;
    dispatch({ type: 'ADD_TOAST', toast: { ...props, id } });
    setTimeout(() => {
        dispatch({ type: 'REMOVE_TOAST', id });
    }, duration);
    return id;
}
export function dismissToast(id) {
    dispatch({ type: 'DISMISS_TOAST', id });
}
function subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
}
function getSnapshot() {
    return state;
}
export function useToast() {
    const currentState = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
    const dismiss = useCallback((id) => dismissToast(id), []);
    return useMemo(() => ({
        toasts: currentState.toasts,
        toast,
        dismiss,
    }), [currentState, dismiss]);
}
