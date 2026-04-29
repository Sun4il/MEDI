import { createContext, useContext, useEffect, useMemo, useState } from "react";

const TOKEN_KEY = "smart-medicine-finder.token";
const USER_KEY = "smart-medicine-finder.user";

const readStorageValue = (key) => {
  if (typeof window === "undefined") {
    return null;
  }

  const value = window.localStorage.getItem(key);

  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => readStorageValue(USER_KEY));
  const [token, setToken] = useState(() => readStorageValue(TOKEN_KEY));

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (token) {
      window.localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
    } else {
      window.localStorage.removeItem(TOKEN_KEY);
    }

    if (user) {
      window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      window.localStorage.removeItem(USER_KEY);
    }
  }, [user, token]);

  const setSession = (nextUser, nextToken) => {
    setUser(nextUser);
    setToken(nextToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      setSession,
      logout,
    }),
    [user, token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};