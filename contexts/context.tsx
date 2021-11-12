import { createContext, useEffect, useState } from "react";
import { recoverUserInformation, SignInRequest } from "../services/services";
import { setCookie, parseCookies } from "nookies";
import Router from "next/router";
import { api } from "../services/api";
import { CommonHeaderProperties } from "../services/axios";

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (data: SignInData) => Promise<void>;
};

export type SignInData = {
  email: string;
  password: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  isActive: number;
};

export type resData = {
  code: string;
  message: string;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { "equilibrium.token": token } = parseCookies();

    if (!token) Router.push("/");

    if (token) {
      console.log(token);
      recoverUserInformation().then((response) => {
        console.log("USER DATA");
        console.log(response.user);
        setUser(response.user);
      });
    }
  }, []);

  async function signIn({ email, password }: SignInData) {
    try {
      const { code, message, token, user } = await SignInRequest({
        email,
        password,
      });

      if (code !== "SUCCESS") {
        console.log(message);
        return {
          code: code,
          message: message,
        };
      }

      setCookie(undefined, "equilibrium.token", token.token, {
        maxAge: 60 * 60 * 24, // 1 hour
        //expires:""
      });

      api.defaults.headers = {
        Authorization: "Bearer " + token.token,
      } as CommonHeaderProperties;

      setUser(user);

      Router.push("/dashboard");
      return {
        code: code,
        message: message,
      };
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
