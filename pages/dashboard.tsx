import React, { useContext } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { AuthContext } from "../contexts/context";
import TopMenu from "../components/menu";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

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
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
          </div>
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ["equilibrium.token"]: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
