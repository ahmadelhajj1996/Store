<<<<<<< HEAD
import { useEffect, useRef, useState } from "react";

export const useDropdown = ({ onItemSelect } = {}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const [position, setPosition] = useState({
    top: 0,
    right: 0,
    width: 0,
  });

  const dropdownRef = useRef(null);

  const openDropdown = () => setOpen(true);
  const close = () => setOpen(false);

  const setTarget = (item, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const parentRect = dropdownRef.current.getBoundingClientRect();

    setPosition({
      top: rect.bottom - parentRect.top + 8,
      right: parentRect.right - rect.right,
      width: rect.width,
    });

    const isSame = open && selected?.id === item.id;

    if (isSame) {
      close();
      return;
    }

    setSelected(item);
    openDropdown();
  };

  const items =
    selected?.children?.map((child) => ({
      label: child.name,
      onClick: () => {
        onItemSelect?.(child); // ✅ child.id handled in parent
        close();
      },
    })) || [];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return {
    open,
    position,
    items,
    setTarget,
    dropdownRef,
  };
};
=======
import { useEffect, useRef, useState } from "react";

export const useDropdown = ({ onItemSelect } = {}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const [position, setPosition] = useState({
    top: 0,
    right: 0,
    width: 0,
  });

  const dropdownRef = useRef(null);

  const openDropdown = () => setOpen(true);
  const close = () => setOpen(false);

  const setTarget = (item, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const parentRect = dropdownRef.current.getBoundingClientRect();

    setPosition({
      top: rect.bottom - parentRect.top + 8,
      right: parentRect.right - rect.right,
      width: rect.width,
    });

    const isSame = open && selected?.id === item.id;

    if (isSame) {
      close();
      return;
    }

    setSelected(item);
    openDropdown();
  };

  const items =
    selected?.children?.map((child) => ({
      label: child.name,
      onClick: () => {
        onItemSelect?.(child); // ✅ child.id handled in parent
        close();
      },
    })) || [];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return {
    open,
    position,
    items,
    setTarget,
    dropdownRef,
  };
};
>>>>>>> 465cc3141e38c8c834add71a04812074070966dd
