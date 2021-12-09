import React, { useContext, useState } from "react";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import Link from "next/link";
import { ArrowCircleLeft } from "heroicons-react";
import Router from "next/router";
import toast, { Toaster } from "react-hot-toast";
import TopMenu from "../../components/menu";
import { AuthContext } from "../../contexts/context";
import { notifyError } from "../../helpers/helper_functions";
import { getAPIClient } from "../../services/axios";
import {
  getCurrentUser,
  registerUser,
  UserType,
} from "../../services/services";
import { toastStyle } from "../../helpers/defaults";

export default function AddCase() {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const [isInserting, setIsInserting] = useState(false);

  async function handleRegister(user: UserType) {
    if (user.password !== user.confirm_password) {
      notifyError("A palavra passe deve ser igual a confirmação! ");

      return;
    }

    setIsInserting(true);
    toast
      .promise(
        registerUser(user),
        {
          loading: "Inserindo novo usuário ...",
          success: () => <span>...</span>,
          error: "Ocorreu um erro , não foi possível realizar o seu pedido",
        },
        {
          success: toastStyle,
        }
      )
      .then((result) => {
        const { code, message } = result;

        setIsInserting(false);

        if (code === "SUCCESS") {
          Router.push(`/users`);
        } else {
          notifyError(message);
        }
      })
      .catch((error) => {
        // Getting the Error details.
        console.error(error.message);
        return error.message;
      });
  }

  return (
    <div>
      <Head>
        <title>Novo caso positivo</title>
      </Head>
      <TopMenu user={user} page={"users"} />

      <Toaster />

      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 ">
          <Link href={`/users`}>
            <a className="flex flex-row max-w-min text-left items-start pl-1 pr-2 py-1 border border-gray-200 bg-gray-50 hover:bg-gray-700  hover:text-white cursor-pointer text-indigo-400 rounded-md">
              <ArrowCircleLeft />
              <span className="ml-3">Retroceder</span>
            </a>
          </Link>
          <form
            className="mt-8 space-y-4 px-6 py-6 shadow-lg rounded-lg"
            onSubmit={handleSubmit(handleRegister)}
          >
            <h1>Adicionar usuário</h1>
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
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <select
                  {...register("role")}
                  id="role"
                  name="role"
                  required
                  className="appearance-none  rounded-md relative block w-full px-7 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                >
                  <option value="funcionário">Funcionário</option>
                  <option value="administrador">Administrador</option>
                </select>
              </div>
              <div className="text-sm">
                <select
                  defaultValue={"DEFAULT"}
                  {...register("genre")}
                  id="genre"
                  name="genre"
                  required
                  className="appearance-none  rounded-md relative block w-full px-7 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                >
                  <option value="DEFAULT" disabled>
                    Gênero{" "}
                  </option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Feminino</option>
                </select>
              </div>
            </div>

            <div className="text-sm">
              <input
                {...register("password")}
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none  rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Senha"
              />
            </div>
            <div className="text-sm">
              <input
                {...register("confirm_password")}
                id="confirm_password"
                name="confirm_password"
                type="password"
                required
                className="appearance-none  rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirme a Senha"
              />
            </div>

            <div>
              <button
                type="submit"
                className={` group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md  ${
                  !isInserting
                    ? "text-white bg-indigo-600 hover:bg-indigo-700"
                    : "bg-black text-gray-400 cursor-not-allowed"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                disabled={isInserting}
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
  const { ["equilibrium.token"]: token } = parseCookies(ctx);

  const apiClient = getAPIClient(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const user = await getCurrentUser(apiClient);

  //Admin only page
  if (!user || user.role !== "administrador") {
    return {
      redirect: {
        destination: "/users",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
