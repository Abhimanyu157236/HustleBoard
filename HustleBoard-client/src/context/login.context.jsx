import { createContext, useState } from "react";

export const loginContext = createContext({
  user: "",
});

export const LoginProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const setUserName = (name) => {
    setUser(name);
  };
  return (
    <loginContext.Provider value={{ user, setUserName }}>
      {children}
    </loginContext.Provider>
  );
};
