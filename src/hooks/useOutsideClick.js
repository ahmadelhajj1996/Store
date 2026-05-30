<<<<<<< HEAD
import { useEffect } from "react";

export default function useOutsideClick(ref, callback, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        callback?.();
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, callback, enabled]);
=======
import { useEffect } from "react";

export default function useOutsideClick(ref, callback, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        callback?.();
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, callback, enabled]);
>>>>>>> 465cc3141e38c8c834add71a04812074070966dd
}