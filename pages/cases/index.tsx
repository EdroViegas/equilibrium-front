import { SearchSolid, XSolid } from "@graywolfai/react-heroicons";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { parseCookies } from "nookies";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import TopMenu from "../../components/menu";
import { AuthContext } from "../../contexts/context";
import { toastStyle } from "../../helpers/defaults";
import {
  formatDate,
  notify,
  notifyError,
} from "../../helpers/helper_functions";
import { api } from "../../services/api";
import { getCases, removeCase, searchCase } from "../../services/services";

export default function Cases() {
  const { user } = useContext(AuthContext);
  const [cases, setCases] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const { register, handleSubmit } = useForm();

  function removeSearching() {
    if (isSearching === true) {
      setIsSearching(false);
      fillCases(setCases);
    }
  }

  function fillCases(state: any) {
    const result = toast
      .promise(
        getCases(api),
        {
          loading: "Carregando os casos ...",
          success: () => <span>...</span>,
          error: "Ocorreu um erro , não foi possível obter os casos",
        },
        {
          success: toastStyle,
        }
      )
      .then((result) => {
        const cases = result;
        state(cases);
      })
      .catch((error) => {
        // Getting the Error details.
        console.error(error.message);
        return error.message;
      });
  }

  function handleSearch(data: any) {
    console.log(data);

    const result = toast
      .promise(
        searchCase(api, data),
        {
          loading: "Pesquisando ...",
          success: () => <span>...</span>,
          error: "Ocorreu um erro , não foi possível realizar o seu pedido",
        },
        {
          success: toastStyle,
        }
      )
      .then((result) => {
        const { cases } = result;

        setIsSearching(true);
        setCases(cases);
      })
      .catch((error) => {
        // Getting the Error details.
        console.error(error.message);
        return error.message;
      });
  }

  async function handleDeleteCase(caseId: number) {
    console.log(caseId);
    const answer = confirm("Deseja realmente eliminar o caso  ? ");

    if (answer) {
      try {
        const { code, message } = await removeCase(caseId);

        if (code === "SUCCESS") {
          const cases = await getCases(api);
          console.log(cases);
          setCases(cases);
          notify(message);
        } else {
          notifyError(message);
        }
      } catch (error) {
        console.log(error);
        notifyError("Ocorreu um erro ao eliminar contacto");
      }
    }
  }

  useEffect(() => {
    fillCases(setCases);
  }, []);

  return (
    <div>
      <Head>
        <title>Casos</title>
      </Head>

      <TopMenu user={user} page={"cases"} />
      <main>
        <Toaster />
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="flex flex-row  justify-between items-center">
            <form
              className="mt-8 space-y-6"
              onSubmit={handleSubmit(handleSearch)}
            >
              <div className="flex flex-row justify-between gap-2 mb-2">
                <div className=" -space-y-px">
                  <div>
                    <label htmlFor="search" className="sr-only">
                      Pesquisar
                    </label>
                    <input
                      {...register("search")}
                      id="search"
                      name="search"
                      type="text"
                      autoComplete="current-search"
                      required
                      className="appearance-none rounded-none w-full px-3 py-2 border-b border-gray-300 placeholder-indigo-500 text-xs  uppercase text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Nome"
                    />
                  </div>
                </div>

                <div className="flex flex-row justify-between">
                  <button
                    type="submit"
                    className="w-full flex justify-center  px-2  text-sm font-medium"
                  >
                    <SearchSolid className=" text-indigo-600 h-6 hover:text-gray-800" />
                  </button>

                  <a
                    onClick={() => removeSearching()}
                    className={!isSearching ? "hidden" : "block"}
                  >
                    <XSolid className="text-red-400 hover:text-red-600  h-6 hover:text-gray-800" />
                  </a>
                </div>
              </div>
            </form>

            <div className=" mb-5">
              <Link href="/cases/add">
                <a className="transition duration-500 ease-in-out bg-gray-600  hover:bg-black transform hover:-translate-y-1 hover:scale-110   px-3 py-2  text-white text-xs font-medium   rounded-md uppercase  cursor-pointer ">
                  Adicionar
                </a>
              </Link>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 border-t ">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                        >
                          #Ord
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                        >
                          Nome
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                        >
                          Endereço
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                        >
                          Telefone
                        </th>

                        <th
                          scope="col"
                          className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                        >
                          Tipo de Teste
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                        >
                          Local Testagem
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                        >
                          Data do Teste
                        </th>

                        <th
                          scope="col"
                          className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cases.map((caseInfo: any, index) => (
                        <Fragment key={caseInfo.id}>
                          <tr
                            className={
                              index % 2 == 0 ? "bg-white" : "bg-gray-100"
                            }
                          >
                            <td className="px-2 py-2 whitespace-nowrap text-xs    font-bold  uppercase text-black">
                              # {++index}
                            </td>
                            <td className="px-2 py-4 whitespace-nowrap text-xs font-light  uppercase text-black">
                              {caseInfo.name}
                            </td>
                            <td className="px-2 py-4 whitespace-nowrap text-xs font-light   uppercase text-black">
                              {caseInfo.address}
                            </td>
                            <td className="px-2 py-4 whitespace-nowrap text-xs font-light   uppercase text-black">
                              {caseInfo.phone}
                            </td>

                            <td className="px-2 py-4 whitespace-nowrap text-xs font-light   uppercase text-black">
                              {caseInfo.test_type}
                            </td>
                            <td className="px-2 py-4 whitespace-nowrap text-xs font-light   uppercase text-black">
                              {caseInfo.place}
                            </td>
                            <td className="px-2 py-4 whitespace-nowrap text-xs font-light   uppercase text-black">
                              {formatDate(caseInfo.test_date)}
                            </td>
                            <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                              <Link href={`/cases/${caseInfo.id}`}>
                                <a className="transition duration-500 ease-in-out bg-gray-600  hover:bg-black transform hover:-translate-y-1 hover:scale-110   px-2 py-1  text-white text-xs font-light   uppercase  rounded-md  cursor-pointer ">
                                  Ver caso
                                </a>
                              </Link>

                              <button
                                onClick={() => handleDeleteCase(caseInfo.id)}
                                className="ml-2 transition duration-500 ease-in-out  bg-primary  hover:bg-red-700 transform hover:-translate-y-1 hover:scale-110   px-2 py-1  text-white text-xs font-light   rounded-md uppercase  cursor-pointer "
                              >
                                Eliminar
                              </button>
                            </td>
                          </tr>
                        </Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
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
