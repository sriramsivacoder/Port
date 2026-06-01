import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
export function InlineEditable({ value, onChange, as: Tag = 'span', className, placeholder = 'Click to edit', multiline = false, disabled = false, }) {
    const [isEditing, setIsEditing] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        if (isEditing && ref.current) {
            ref.current.focus();
            const range = document.createRange();
            range.selectNodeContents(ref.current);
            range.collapse(false);
            const sel = window.getSelection();
            sel?.removeAllRanges();
            sel?.addRange(range);
        }
    }, [isEditing]);
    const handleBlur = () => {
        setIsEditing(false);
        if (ref.current) {
            const text = ref.current.textContent ?? '';
            if (text !== value)
                onChange(text);
        }
    };
    const handleKeyDown = (e) => {
        if (!multiline && e.key === 'Enter') {
            e.preventDefault();
            ref.current?.blur();
        }
        if (e.key === 'Escape') {
            if (ref.current)
                ref.current.textContent = value;
            setIsEditing(false);
        }
    };
    if (disabled) {
        return <Tag className={className}>{value || placeholder}</Tag>;
    }
    return (<Tag ref={ref} contentEditable={isEditing} suppressContentEditableWarning onClick={() => !isEditing && setIsEditing(true)} onBlur={handleBlur} onKeyDown={handleKeyDown} className={cn('outline-none transition-colors', !isEditing && 'cursor-text rounded-md hover:bg-black/5 dark:hover:bg-white/5', !value && 'text-muted-foreground', className)} data-placeholder={placeholder}>
      {value || placeholder}
    </Tag>);
}
