import { createContext, ReactNode, useContext, useState } from "react";

interface MenuContextData {
  menuIsOpen: boolean;
  toggleMenu: () => void;
  openMenu: () => void;
  closeMenu: () => void;
};

const MenuContext = createContext({} as MenuContextData);

export function MenuProvider({ children }: { children: ReactNode }) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const toggleMenu = () => setMenuIsOpen((oldState) => !oldState);

  const openMenu = () => setMenuIsOpen(true);

  const closeMenu = () => setMenuIsOpen(false);

  return (
    <MenuContext.Provider value={{
      menuIsOpen,
      toggleMenu,
      openMenu,
      closeMenu,
    }}>
      {children}
    </MenuContext.Provider>
  );
}

export const useMenu = () => useContext(MenuContext);
