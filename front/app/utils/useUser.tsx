import React from "react";
import type { CurrentUserType } from "~/types/userTypes";
import api from "./api";

type UserContextType = {
  user: CurrentUserType | null;
  setUser: (user: CurrentUserType | null) => void;
  init: () => Promise<void>;
  isLoggedIn: () => boolean;
  isHost: () => boolean;
};

const UserContext = React.createContext<UserContextType | null>(null);

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = React.useState<CurrentUserType | null>(null);

  const init = async () => {
    if (api.restoreToken()) {
      await api
        .get("user/self")
        .then((response) => {
          setUser(response.data);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            api.removeToken();
            setUser(null);
          }
        });
    }
  };

  const isLoggedIn = () => user !== null;
  const isHost = () => user?.eventCode === user?.eventCode;

  const value = { user, setUser, init, isLoggedIn, isHost };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export function useUser() {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export default useUser;
