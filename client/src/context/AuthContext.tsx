import React, { createContext } from "react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { UseMutationResult } from "@tanstack/react-query/build/lib/types";

type AuthContext = {
  signup: UseMutationResult<AxiosResponse, unknown, User>;
};

type User = {
  id: string;
  name: string;
  image?: string;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

const Context = createContext<AuthContext | null>(null);

export function useAuth() {
  return React.useContext(Context) as AuthContext;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const signup = useMutation({
    mutationFn: (user: User) => {
      return axios.post(`${import.meta.env.VITE_SERVER_URL}/signup`, user);
    },
  });

  return <Context.Provider value={{ signup }}>{children}</Context.Provider>;
}
