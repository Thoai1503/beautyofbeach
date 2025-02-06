import React, { createContext, useContext, useState } from "react";

const StateContext = createContext({
  user: null,
  token: null,
  userId: null,
  roll: null,
  avartar: null,
  setUser: () => {},
  setToken: () => {},
  setUserId: () => {},
  setRole: () => {},
  setAvartar: () => {},
});

export const ContextProvider = ({ children }) => {
  const [avartar, _setAvartar] = useState(localStorage.getItem("ACCESS_AVAR"));
  const [user, _setUser] = useState(localStorage.getItem("ACCESS_USER"));
  const [userId, _setUserId] = useState(localStorage.getItem("ACCESS_USERID"));
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const [role, _setRole] = useState(localStorage.getItem("ACCESS_ROLE"));

  const setRole = (role) => {
    _setRole(role);
    if (role) {
      localStorage.setItem("ACCESS_ROLE", role);
    } else {
      localStorage.removeItem("ACCESS_ROLE");
    }
  };

  const setAvartar = (avartar) => {
    _setAvartar(avartar);
    if (avartar) {
      localStorage.setItem("ACCESS_AVAR", avartar);
    } else {
      localStorage.removeItem("ACCESS_AVAR");
    }
  };

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  const setUser = (user) => {
    _setUser(user);
    if (user) {
      localStorage.setItem("ACCESS_USER", user);
    } else {
      localStorage.removeItem("ACCESS_USER");
    }
  };

  const setUserId = (userId) => {
    _setUserId(userId);
    if (userId) {
      localStorage.setItem("ACCESS_USERID", userId);
    } else {
      localStorage.removeItem("ACCESS_USERID");
    }
  };
  return (
    <StateContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        userId,
        setUserId,
        role,
        setRole,
        avartar,
        setAvartar,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
