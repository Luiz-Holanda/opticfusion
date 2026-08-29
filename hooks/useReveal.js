'use client';

import { useEffect, useRef } from 'react';

export function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.classList.add('reveal');

    if (el.getBoundingClientRect().top < window.innerHeight * 0.95) {
      requestAnimationFrame(() => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return ref;
}

export function useRevealAll() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    const observeItems = () => {
      const items = root.querySelectorAll('.reveal:not(.visible)');
      items.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.95) {
          requestAnimationFrame(() => el.classList.add('visible'));
        } else {
          observer.observe(el);
        }
      });
    };

    observeItems();

    const timeoutId = window.setTimeout(observeItems, 0);

    const mutationObserver = new MutationObserver(() => {
      observeItems();
    });
    mutationObserver.observe(root, { childList: true, subtree: true });

    return () => {
      window.clearTimeout(timeoutId);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return rootRef;
}
