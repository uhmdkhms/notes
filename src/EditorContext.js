import { createContext, useState } from "react";

export const EditorContext = createContext(null);

export default function EditorProvider({ children }) {
  const [tabs, setTabs] = useState([]);
  const [currentTabId, setCurrentTabId] = useState(null);

  function doesTabExist(note) {
    let tabExist = false;
    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i].note.id === note.id) tabExist = true;
    }
    return tabExist ? true : false;
  }

  function getTabIndexById(id) {
    let target = null;
    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i].id === id) target = i;
    }
    return target;
  }

  function getTabById(id) {
    let target = null;
    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i].id === id) target = tabs[i];
    }
    return target;
  }

  function isTabUnsaved(tab) {
    try {
      const local = JSON.parse(localStorage.getItem(`note${tab.id}`));
      return !local ||
        (tab.input && tab.input !== local.text) ||
        (tab.titleInput && tab.titleInput !== local.title)
        ? true
        : false;
    } catch {
      return false;
    }
  }

  return (
    <EditorContext.Provider
      value={{
        tabs,
        setTabs,
        currentTabId,
        setCurrentTabId,
        doesTabExist,
        getTabById,
        getTabIndexById,
        isTabUnsaved,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}
