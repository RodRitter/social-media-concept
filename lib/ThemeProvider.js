import React, { useContext, useState } from "react";
import { themes } from "../globals";

export const ThemeContext = React.createContext({
  theme: undefined,
  setTheme: async (theme) => null,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes.dark);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
