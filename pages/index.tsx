import Head from "next/head";
import { useForm } from "react-hook-form";
import React, { useContext, useState } from "react";
import { AuthContext, SignInData } from "../contexts/context";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import toast, { Toaster } from "react-hot-toast";
import { UserOutline } from "@graywolfai/react-heroicons";

const notify = (message: string) => toast.error(message);

export default function Home() {
  const { register, handleSubmit } = useForm();
  const { signIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  async function handleSignIn(data: SignInData) {
    //Message here
    const { code, message } = await signIn(data);

    const result = toast
      .promise(
        signIn(data),
        {
          loading: "Efectuando login",
          success: () => <span>...</span>,
          error: "Ocorreu um erro ao efectuar o login",
        },
        {
          success: {
            style: {
              minWidth: 0,
              display: "none",
            },

            duration: 5000,
            icon: "",
          },
        }
      )
      .then((result) => {
        const { code, message } = result;

        if (code !== "SUCCESS") notify(message);
      })
      .catch((error) => {
        // Getting the Error details.
        console.error(error.message);
        return error.message;
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-700 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Acessar a conta </title>
      </Head>

      <div className="max-w-sm w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <UserOutline className=" h-24 text-indigo-600 text-center" />
          </div>
          <h2 className="mt-6 text-center text-md font-bold uppercase text-gray-900">
            Accessar a conta
          </h2>
          <Toaster />
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleSignIn)}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                E-mail
              </label>
              <input
                {...register("email")}
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="E-mail"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Senha
              </label>
              <input
                {...register("password")}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Senha"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  //const apiClient = getAPIClient(ctx);
  const { ["equilibrium.token"]: token } = parseCookies(ctx);

  if (token) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  // await apiClient.get("/users");

  return {
    props: {},
  };
};
