import axios, { HeadersDefaults } from "axios";
import Router from "next/router";

import { destroyCookie, parseCookies } from "nookies";

export interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}

export function getAPIClient(ctx?: any) {
  const { "equilibrium.token": token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    //baseURL: "https://equilibrium-ao.herokuapp.com",
  });
  //Remove after test
  api.interceptors.request.use((config) => {
    console.log(config);

    return config;
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        //Apaga o token não valido - Remove not valid token
        //Prevent errors
        destroyCookie(ctx, "equilibrium.token");
        console.log("Acesso negado");
        Router.push("/");
      }
      if (error.response.status === 404) {
        console.log("Página não encontrada");
        return error;
      }
      if (error.response.status === 500) {
        console.log("Ocorreu um erro no servidor");
        return error;
      }
      return error;
    }
  );

  if (token) {
    api.defaults.headers = {
      Authorization: "Bearer " + token,
    } as CommonHeaderProperties;
  }

  return api;
}
