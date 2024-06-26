import { PhoneSolid } from "@graywolfai/react-heroicons";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { parseCookies } from "nookies";
import React, { Fragment, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import TopMenu from "../../components/menu";
import { AuthContext } from "../../contexts/context";
import {
  formatDate,
  notify,
  notifyError,
} from "../../helpers/helper_functions";
import { getAPIClient } from "../../services/axios";
import { getCase, removeContact } from "../../services/services";
import { api } from "../../services/api";
import { toastStyle } from "../../helpers/defaults";

export default function Case({ caso }: any) {
  const { user } = useContext(AuthContext);
  const [contatcs, setContacts] = useState(caso.contact);

  function fillContacts(state: any) {
    toast
      .promise(
        getCase(api, caso.id),
        {
          loading: "Carregando contactos ...",
          success: () => <span>...</span>,
          error: "Ocorreu um erro , não foi possível listar contactos",
        },
        {
          success: toastStyle,
        }
      )
      .then((result) => {
        const { contact } = result;
        state(contact);
      })
      .catch((error) => {
        // Getting the Error details.
        console.error(error.message);
        return error.message;
      });
  }

  function handleDeleteContact(contactId: number, caseId = caso.id) {
    const answer = confirm("Deseja realmente apagar o contacto ?");

    console.log(answer);
    if (answer) {
      /* try {
        const { code, message } = await removeContact(contactId);
        console.log(code, message);

        if (code === "SUCCESS") {
          const { contact } = await getCase(api, caseId);
          console.log(contact);
          setContacts(contact);
          notify(message);
        } else {
          notifyError(message);
        }
      } catch (error) {
        console.log(error);
        notifyError("Ocorreu um erro ao eliminar contacto");
      }*/

      try {
        toast
          .promise(
            removeContact(contactId),
            {
              loading: "Eliminando contacto ...",
              success: () => <span>...</span>,
              error: "Ocorreu um erro , não foi possível realizar o seu pedido",
            },
            {
              success: toastStyle,
            }
          )
          .then((result) => {
            const { code, message } = result;

            if (code === "SUCCESS") {
              fillContacts(setContacts);
              notify(message);
            } else {
              notifyError(message);
            }
          })
          .catch((error) => {
            // Getting the Error details.
            console.error(error.message);
            return error.message;
          });
      } catch (error) {
        console.log(error);
        notifyError("Ocorreu um erro ao eliminar contacto");
        return error;
      }
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen  ">
      <Head>
        <title>Informações sobre o caso</title>
      </Head>
      <header className="bg-white shadow ">
        <TopMenu user={user} page={"cases"} />
      </header>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8  ">
        <Toaster />
        <div className="h-20 bg-indigo-500 mx-10 mt-5  rounded-t-md"></div>

        <div className=" mx-10  text-gray-600 grid md:grid-cols-2 lg:grid-cols-5  gap-2  ">
          <div className="     md:col-span-2 xl:flex md:flex-col justify-center items-center  bg-workcation-200">
            <div className="flex  flex-col justify-center items-center">
              <div className=" -mt-10  ">
                <div className="border-4 border-gray-50 rounded-full ">
                  <Image
                    src={`/img/${
                      caso?.genre === "feminino" ? "female.jpg" : "male.jpg"
                    }`}
                    height={80}
                    width={80}
                    alt="Recipe"
                    className=" object-cover  rounded-full   shadow-md  "
                  />
                </div>
              </div>
              <div className=" text-sm  text-gray-500 font-bold ">
                <h2>{caso.name}</h2>
              </div>
              <div className="flex">
                <h2>{caso.address}</h2>
              </div>
            </div>

            <div className="flex flex-row justify-center gap-2  ">
              <div className="text-sm font-light">
                <h2>{caso.phone}</h2>
              </div>
              <div className="text-sm font-light uppercase"> |</div>

              <div
                className="text-sm font-light 
            "
              >
                <h2>{caso.email}</h2>
              </div>
            </div>

            <div className=" flex flex-col p-2 mt-10 bg-white min-w-full rounded-sm border border-gray-100  ">
              <div className="flex flex-row justify-between w-full border-b  border-gray-300 mb-2  py-2">
                <h1 className=" text-xs text-gray-400  uppercase ">
                  Gênero:{" "}
                  <span
                    className={`text-xs text-${
                      caso.genre === "feminino" ? "red" : "indigo"
                    }-400`}
                  >
                    {" "}
                    {caso.genre}{" "}
                  </span>
                </h1>
                <h1 className=" text-xs text-gray-500 font-light uppercase ">
                  IDADE:{" "}
                  <span className="text-gray-700 font-medium">
                    {caso.age} Ano(s)
                  </span>
                </h1>
              </div>
              <div>
                <h1 className=" text-xs text-gray-400  uppercase ">
                  Local do teste
                </h1>
                <h1 className=" text-xs text-indigo-500 font-light uppercase ">
                  {caso.place}
                </h1>
              </div>
              <div className="flex flex-row justify-between w-full">
                <div>
                  <span className="text-xs text-gray-400  uppercase">
                    {" "}
                    Tipo:{" "}
                  </span>{" "}
                  <span className=" text-xs text-indigo-500 font-light uppercase">
                    {caso.test_type}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-gray-400  uppercase">
                    Data:
                  </span>
                  <span className=" text-xs text-indigo-500 font-light uppercase">
                    {formatDate(caso.test_date)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <main className=" pr-2  pt-1    max-h-96 overflow-y-auto   md:col-span-3 mt-12">
            <div className="flex flex-row  justify-between mb-4 border-b border-gray-300 pb-2">
              <h2 className="uppercase">
                Contactos diretos do caso positivo (
                <span className="text-indigo-600">{caso.contact.length}</span>)
              </h2>
              <Link href={`/contact/add/${caso.id}`}>
                <a className="mr-4 transition duration-500 ease-in-out bg-gray-600  hover:bg-black transform hover:-translate-y-1 hover:scale-110   px-2 py-1  text-white text-xs font-medium   rounded-md uppercase  cursor-pointer ">
                  Adicionar
                </a>
              </Link>
            </div>
            {contatcs.map((contact: any, index: any) => {
              return (
                <Fragment key={contact.id}>
                  <div className="flex flex-row items-center justify-between gap-x-4 h-12 mb-3 bg-white border border-gray hover:border-blue-600 shadow-sm  pb-1  rounded transition duration-500 ease-in-out  transform hover:-translate-y-2 hover:scale-25 hover:shadow-lg ">
                    <div className="flex flex-row items-center gap-x-1">
                      <div className="ml-2 mt-1 ">
                        <Image
                          src={`/img/${
                            contact?.genre === "feminino"
                              ? "female.jpg"
                              : "male.jpg"
                          }`}
                          height={35}
                          width={35}
                          alt="Recipe"
                          className=" object-cover  rounded-full   shadow-md "
                        />
                      </div>
                      <div className="text-xs font-medium text-indigo-400 uppercase ">
                        <h2>{contact.name}</h2>
                      </div>
                    </div>
                    <div className="text-xs  ">
                      <h2>{contact.age} ano (s)</h2>
                    </div>
                    <div className="text-xs font-medium ">
                      <h2>{contact.genre}</h2>
                    </div>
                    <div className="text-sm font-light text-indigo-600 ">
                      <h2>{contact.email}</h2>
                    </div>

                    <div className="flex flex-row items-center gap-x-2">
                      <button
                        onClick={() => handleDeleteContact(contact.id)}
                        className=" h-6 mb-1 transition duration-500 ease-in-out  bg-primary  hover:bg-red-600    px-1 py-1  text-white text-xs font-light   rounded-md uppercase  cursor-pointer "
                      >
                        Eliminar
                      </button>
                      <div className="flex flex-col items-center  mr-4 mt-2">
                        <div className="flex flex-row gap-x-2 transition duration-500    bg-gray-600  hover:bg-black  text-xs text-white  font-medium   rounded  p-1 ">
                          <PhoneSolid className="h-4 w-4" />
                          <h2>{contact.phone}</h2>
                        </div>

                        <div className="text-xs font-extralight ">
                          <h2>{formatDate(contact.created_at)}</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </Fragment>
              );
            })}
          </main>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx);
  const { ["equilibrium.token"]: token } = parseCookies(ctx);
  const id = ctx.query.id;
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
