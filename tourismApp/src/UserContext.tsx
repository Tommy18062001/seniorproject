import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { UserContextInterface, UserInterface } from "./Interfaces";

export const UserContext = createContext<UserContextInterface | undefined>(undefined);

interface childrenInterace {
  children: React.ReactNode
}
export function UserContextProvider({ children }: childrenInterace) {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!user) {
      axios.get("/userData").then(({ data }) => {
        setUser(data);
        setReady(true);
      });
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
