import React, { useContext } from "react";
import Head from "next/head";
import Router from "next/router";
import { useForm } from "react-hook-form";
import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { AuthContext } from "../../../contexts/context";
import {
  ContactType,
  getCase,
  registerContact,
} from "../../../services/services";
import TopMenu from "../../../components/menu";
import { getAPIClient } from "../../../services/axios";
import { ArrowCircleLeft } from "heroicons-react";
import Link from "next/link";

export default function AddCase({ caso }: any) {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();

  async function handleRegister(data: ContactType) {
    console.log(data);

    const { code, message } = await registerContact(data, caso.id as number);

    console.log(message);
    if (code === "SUCCESS") {
      Router.push(`/cases/${caso.id}`);
    }
  }

  return (
    <div>
      <Head>
        <title>Novo contacto</title>
      </Head>
      <TopMenu user={user} />

      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 ">
          <form
            className="mt-8 space-y-4 px-6 py-6 shadow-lg rounded-lg"
            onSubmit={handleSubmit(handleRegister)}
          >
            <Link href={`/cases/${caso.id}`}>
              <a className="flex flex-row max-w-min text-left items-start pl-1 pr-2 py-1 border border-gray-200 bg-gray-50 hover:bg-gray-700  hover:text-white cursor-pointer text-indigo-400 rounded-md">
                <ArrowCircleLeft />
                <span className="ml-3">Retroceder</span>
              </a>
            </Link>
            <div className=" flex gap-x-2 items-center  border-gray-400 p-1 rounded bg-gray-100 shadow-sm">
              <Image
                src="/img/1.jpg"
                height={35}
                width={35}
                alt="Recipe"
                className=" object-cover rounded-full   shadow-md "
              />
              <h2 className="text-xs ">
                Adicionando novo contacto para
                <span className="text-red-500 font-bold"> {caso.name}</span>
              </h2>
            </div>
            <h1>Contacto</h1>
            <div className="  space-y-4">
              <div>
                <label htmlFor="name" className="sr-only">
                  Nome
                </label>
                <input
                  {...register("name")}
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none  rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Nome"
                />
              </div>

              <div className="text-sm">
                <input
                  {...register("email")}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="current-email"
                  required
                  className="appearance-none  rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="E-mail"
                />
              </div>
              <div className="text-sm">
                <input
                  {...register("phone")}
                  id="phone"
                  name="phone"
                  type="phone"
                  autoComplete="phone"
                  required
                  className="appearance-none  rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Phone"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                Adicionar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx);
  const { ["equilibrium.token"]: token } = parseCookies(ctx);
  const id = ctx.query.idCase;
  const caso = await getCase(apiClient, id);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (!caso) {
    return {
      redirect: {
        destination: "/cases",
        permanent: true,
      },
    };
  }

  return {
    props: {
      caso,
    },
  };
};
