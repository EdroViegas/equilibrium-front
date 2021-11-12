import axios, { HeadersDefaults } from "axios";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

export interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}

export function getAPIClient(ctx?: any) {
  const { "equilibrium.token": token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: "http://localhost:3333",
  });
  //Remove after test
  api.interceptors.request.use((config) => {
    console.log(config);

    return config;
  });

  if (token) {
    api.defaults.headers = {
      Authorization: "Bearer " + token,
    } as CommonHeaderProperties;
  }

  return api;
}
