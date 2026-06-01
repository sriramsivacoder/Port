import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
/** Merge classnames with Tailwind conflict resolution */
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
/** Generate a random ID */
export function generateId() {
    return crypto.randomUUID();
}
/** Format a date string */
export function formatDate(date) {
    if (!date)
        return '';
    try {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
        }).format(new Date(date));
    }
    catch {
        return date;
    }
}
/** Format date range */
export function formatDateRange(start, end, current) {
    const startStr = formatDate(start);
    const endStr = current ? 'Present' : formatDate(end);
    if (!startStr && !endStr)
        return '';
    if (!startStr)
        return endStr;
    if (!endStr)
        return startStr;
    return `${startStr} — ${endStr}`;
}
/** Slugify a string for URLs */
export function slugify(text) {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 80);
}
/** Debounce a function */
export function debounce(fn, ms) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), ms);
    };
}
/** Validate URL format */
export function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    }
    catch {
        return false;
    }
}
/** Validate GitHub URL */
export function isGitHubUrl(url) {
    try {
        const parsed = new URL(url.startsWith('http') ? url : `https://github.com/${url.replace(/^@/, '')}`);
        return parsed.hostname.replace('www.', '') === 'github.com' && parsed.pathname.split('/').filter(Boolean).length >= 1;
    }
    catch {
        return false;
    }
}
/** Validate GitHub URL or username */
export function isGitHubUrlOrUsername(value) {
    const v = value.trim();
    if (!v)
        return true;
    if (isGitHubUrl(v))
        return true;
    const username = v.replace(/^@/, '').replace(/^https?:\/\/(www\.)?github\.com\//i, '');
    return /^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?$/.test(username);
}
/** Normalize GitHub URL or username to full profile URL */
export function normalizeGitHubUrl(value) {
    if (!value?.trim())
        return '';
    let v = value.trim();
    if (!v.startsWith('http')) {
        v = v.replace(/^@/, '');
        if (!v.includes('github.com')) {
            return `https://github.com/${v}`;
        }
        return `https://${v.replace(/^\/\//, '')}`;
    }
    try {
        const parsed = new URL(v);
        if (parsed.hostname.replace('www.', '') === 'github.com') {
            return parsed.href.split('?')[0] ?? v;
        }
    }
    catch {
        return '';
    }
    return v;
}
/** Normalize LinkedIn URL or handle to full profile URL */
export function normalizeLinkedInUrl(value) {
    if (!value?.trim())
        return '';
    let v = value.trim();
    if (!v.startsWith('http')) {
        v = v.replace(/^@/, '');
        if (v.includes('linkedin.com')) {
            return `https://${v.replace(/^\/\//, '')}`;
        }
        return `https://linkedin.com/in/${v.replace(/^\//, '')}`;
    }
    try {
        const parsed = new URL(v);
        if (parsed.hostname.includes('linkedin.com')) {
            return parsed.href.split('?')[0] ?? v;
        }
    }
    catch {
        return '';
    }
    return v;
}
/** Extract social URLs from parsed resume contact */
export function extractSocialUrlsFromResume(contact) {
    return {
        github: normalizeGitHubUrl(contact?.github),
        linkedin: normalizeLinkedInUrl(contact?.linkedin),
    };
}
/** Validate LinkedIn URL */
export function isLinkedInUrl(url) {
    try {
        const parsed = new URL(url);
        return parsed.hostname.includes('linkedin.com');
    }
    catch {
        return false;
    }
}
/** Validate LinkedIn URL or profile handle */
export function isLinkedInUrlOrHandle(value) {
    const v = value.trim();
    if (!v)
        return true;
    const normalized = normalizeLinkedInUrl(v);
    return normalized ? isLinkedInUrl(normalized) : false;
}
/** Clamp a number within a range */
export function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
/** Get initials from a name */
export function getInitials(name) {
    return name
        .split(' ')
        .slice(0, 2)
        .map((n) => n[0])
        .join('')
        .toUpperCase();
}
/** Generate or retrieve a session ID from localStorage */
export function getSessionId() {
    const key = 'portfolioforge_session_id';
    let sessionId = localStorage.getItem(key);
    if (!sessionId) {
        sessionId = generateId();
        localStorage.setItem(key, sessionId);
    }
    return sessionId;
}
/** Format file size */
export function formatFileSize(bytes) {
    if (bytes === 0)
        return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}
