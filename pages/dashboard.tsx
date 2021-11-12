import React, { Fragment, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/context";

import Head from "next/head";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { BellSolid, MenuSolid, XSolid } from "@graywolfai/react-heroicons";
import { api } from "../services/api";
import { getAPIClient } from "../services/axios";
import TopMenu from "../components/menu";

const navigation = ["Usuários", "Casos", "Contactos"];
const profile = [];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    /* try {
      const data = api.get("/users").then((data) => {
        // console.log(data);
      });
    } catch (error) {
      console.log(error);
    }*/
  }, []);

  return (
    <div>
      <Head>
        <title>Dashboard </title>
      </Head>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>
      <TopMenu user={user} />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
          </div>
          {/* /End replace */}
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx);
  const { ["equilibrium.token"]: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // await apiClient.get("/users");

  return {
    props: {},
  };
};
