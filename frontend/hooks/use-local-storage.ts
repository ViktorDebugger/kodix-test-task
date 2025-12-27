"use client";

import { useState, useEffect } from "react";

export const useLocalStorage = <T>(
  key: string,
  defaultValue: T,
): [T, (value: T) => void] => {
  const [value, setValue] = useState<T>(defaultValue);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem(key);
    if (saved !== null) {
      try {
        const parsed = JSON.parse(saved) as T;
        setValue(parsed);
      } catch (error) {
        setValue(defaultValue);
      }
    }
  }, [key, defaultValue]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value, isMounted]);

  return [value, setValue];
};
