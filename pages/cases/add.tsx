import { useContext, useState } from "react";
import Head from "next/head";
import Router from "next/router";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useForm } from "react-hook-form";
import { ArrowCircleLeft } from "heroicons-react";
import TopMenu from "../../components/menu";
import { AuthContext } from "../../contexts/context";
import { CaseType, registerCase } from "../../services/services";
import { toastStyle } from "../../helpers/defaults";
import { notifyError } from "../../helpers/helper_functions";

export default function AddCase() {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const [isInserting, setIsInserting] = useState(false);

  function handleRegister(data: CaseType) {
    setIsInserting(true);

    toast
      .promise(
        registerCase(data, user?.id as number),
        {
          loading: "Inserindo novo caso ...",
          success: () => <span>...</span>,
          error: "Ocorreu um erro , não foi possível realizar o seu pedido",
        },
        {
          success: toastStyle,
        }
      )
      .then((result) => {
        const { code, message, caso } = result;

        setIsInserting(false);

        if (code === "SUCCESS") {
          Router.push(`/cases/${caso.id}`);
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
      <TopMenu user={user} page={"cases"} />
      <Toaster />

      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 ">
          <Link href={`/cases`}>
            <a className="flex flex-row max-w-min text-left items-start pl-1 pr-2 py-1 border border-gray-200 bg-gray-50 hover:bg-gray-700  hover:text-white cursor-pointer text-indigo-400 rounded-md">
              <ArrowCircleLeft />
              <span className="ml-3">Retroceder</span>
            </a>
          </Link>
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
              <div className="flex items-center justify-between">
                <div className="">
                  <label htmlFor="age" className="sr-only">
                    Idade
                  </label>
                  <input
                    {...register("age")}
                    id="age"
                    name="age"
                    type="number"
                    autoComplete="current-age"
                    required
                    className="appearance-none  rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Idade"
                  />
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
                    <option value="feminino">Feminino</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="address" className="sr-only">
                  Endereço
                </label>
                <input
                  {...register("address")}
                  id="address"
                  name="address"
                  type="text"
                  autoComplete="current-address"
                  required
                  className="appearance-none rounded-md  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Endereço"
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
              <div className="">
                <label htmlFor="phone" className="sr-only">
                  Telefone
                </label>
                <input
                  {...register("phone")}
                  id="phone"
                  name="phone"
                  type="phone"
                  autoComplete="current-phone"
                  required
                  className="appearance-none  rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Telefone"
                />
              </div>

              <div className="text-sm">
                <select
                  {...register("testType")}
                  defaultValue={"DEFAULT"}
                  id="testType"
                  name="testType"
                  required
                  className="appearance-none  rounded-md relative block w-full px-7 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="E-mail"
                >
                  <option value="DEFAULT" disabled>
                    Tipo de teste
                  </option>
                  <option value="RT-PCR">RT-PCR</option>
                  <option value="TDR Antigeno (Ags)">TDR Antigeno (Ags)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="">
                <input
                  {...register("place")}
                  id="place"
                  name="place"
                  type="text"
                  autoComplete="current-place"
                  required
                  className="appearance-none  rounded-md  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Local da Testagem"
                />
              </div>

              <div className="text-sm">
                <input
                  {...register("testDate")}
                  id="testDate"
                  name="testDate"
                  type="date"
                  autoComplete="current-testDate"
                  required
                  className="appearance-none  rounded-md relative block w-full px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Data testagem"
                />
              </div>
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
