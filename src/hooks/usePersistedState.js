import { useEffect, useState } from "react";

export function usePersistedState(key, initialValue) {
  // 1. Initialize state safely
  const [state, setState] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch (err) {
      console.error(err);
      return initialValue;
    }
  });

  // FIX 1: Sync internal state when the storage key changes dynamically
  useEffect(() => {
    try {
      const stored = localStorage.getItem(key);
      setState(stored ? JSON.parse(stored) : initialValue);
    } catch (err) {
      console.error(err);
      setState(initialValue);
    }
  }, [key, initialValue]); // If 'key' changes, force-update state directly

  // 2. Persist state changes back to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (err) {
      console.error(err);
    }
  }, [key, state]);

  return [state, setState];
}