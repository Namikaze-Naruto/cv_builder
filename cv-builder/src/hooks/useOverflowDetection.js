import { useEffect, useRef, useState, useCallback } from 'react';
import { A4_HEIGHT_PX } from '../config/onepage';

/**
 * useOverflowDetection
 * 
 * Attaches a ResizeObserver (or fallback) to the CV page ref.
 * Returns: { isOverflowing, overflowPx, percentage }
 */
export function useOverflowDetection(cvData) {
    const pageRef = useRef(null);
    const [status, setStatus] = useState({ isOverflowing: false, overflowPx: 0, percentage: 0 });

    const measure = useCallback(() => {
        if (!pageRef.current) return;
        const el = pageRef.current;
        const actualHeight = el.scrollHeight;
        const overflowPx = Math.max(0, actualHeight - A4_HEIGHT_PX);
        const percentage = Math.round((actualHeight / A4_HEIGHT_PX) * 100);
        setStatus({ isOverflowing: actualHeight > A4_HEIGHT_PX, overflowPx, percentage });
    }, []);

    useEffect(() => {
        let observer;
        if (typeof ResizeObserver !== 'undefined' && pageRef.current) {
            observer = new ResizeObserver(measure);
            observer.observe(pageRef.current);
        }
        measure();
        return () => observer?.disconnect();
    }, [measure, cvData]); // Re-run when cvData changes

    return { pageRef, ...status };
}
