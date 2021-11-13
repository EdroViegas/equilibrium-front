import { useContext } from "react";
import Head from "next/head";

import TopMenu from "../../components/menu";
import { AuthContext } from "../../contexts/context";
import { useForm } from "react-hook-form";
import { CaseType, registerCase } from "../../services/services";
import Router from "next/router";

export default function AddCase() {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();

  async function handleRegister(data: CaseType) {
    console.log(data);
    const { code, message } = await registerCase(data, user?.id as number);

    console.log(message);
    if (code === "SUCCESS") {
      Router.push("/cases");
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
            <h1>Adicionar caso positivo</h1>
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
