<<<<<<< HEAD
import { useSearchParams } from "react-router-dom";

export function useTab(defaultTab = "info", paramName = "tab") {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentTab = searchParams.get(paramName) || defaultTab;

  const setTab = (tab) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(paramName, tab);
    setSearchParams(newParams);
  };

  return {
    currentTab,
    setTab
  };
=======
import { useSearchParams } from "react-router-dom";

export function useTab(defaultTab = "info", paramName = "tab") {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentTab = searchParams.get(paramName) || defaultTab;

  const setTab = (tab) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(paramName, tab);
    setSearchParams(newParams);
  };

  return {
    currentTab,
    setTab
  };
>>>>>>> 465cc3141e38c8c834add71a04812074070966dd
}