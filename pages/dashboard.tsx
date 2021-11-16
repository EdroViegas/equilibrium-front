import React, { useContext } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import Image from "next/image";
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
            <div className=" flex justify-center items-center border-4 border-dashed border-indigo-300 rounded-lg h-96">
              <Image
                src="/img/under-construction.png"
                height={50}
                width={50}
                alt="Recipe"
                className=" object-cover "
              />
              <h1 className="ml-5 text-indigo-600 text-md font-light uppercase">
                Está página está em construção
              </h1>
            </div>
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
