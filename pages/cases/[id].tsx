import { PhoneSolid } from "@graywolfai/react-heroicons";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { parseCookies } from "nookies";
import React, { Fragment, useContext, useEffect } from "react";

import toast, { Toaster } from "react-hot-toast";
import { isContext } from "vm";
import TopMenu from "../../components/menu";
import { AuthContext } from "../../contexts/context";
import { formatDate } from "../../helpers/helper_functions";
import { api } from "../../services/api";
import { getAPIClient } from "../../services/axios";
import { getCase } from "../../services/services";
const notify = () => toast("Here is your toast.");

export default function Case({ caso }) {
  const { user } = useContext(AuthContext);

  console.log(`CASO : ${caso.id}`);

  return (
    <div className="bg-gray-50 min-h-screen  ">
      <Head>
        <title>Dashboard </title>
      </Head>
      <header className="bg-white shadow ">
        <TopMenu user={user} />
      </header>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8  ">
        <div></div>
        <div className="h-20 bg-indigo-500 mx-10 mt-5  rounded-t-md"></div>

        <div className=" mx-10  text-gray-600 grid md:grid-cols-2 lg:grid-cols-5  gap-2  ">
          <div className="     md:col-span-2 xl:flex md:flex-col justify-center items-center  bg-workcation-200">
            <div className="flex  flex-col justify-center items-center">
              <div className=" -mt-10 ">
                <Image
                  src="/img/1.jpg"
                  height={80}
                  width={80}
                  alt="Recipe"
                  className=" object-cover rounded-full   shadow-md "
                />
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

            <div className=" flex flex-col p-2 mt-10 bg-white rounded-sm border border-gray-100  ">
              <div>
                <h1 className=" text-xs text-gray-400  uppercase ">
                  Local do teste
                </h1>
                <h1 className=" text-xs text-indigo-500 font-light uppercase ">
                  {caso.place}
                </h1>
              </div>
              <div className="flex flex-row justify-between">
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
                    {" "}
                    Data:{" "}
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
              <h2 className="uppercase">Contactos diretos do caso positivo</h2>
              <Link href="/contact/add">
                <a className="mr-4 transition duration-500 ease-in-out bg-gray-600  hover:bg-black transform hover:-translate-y-1 hover:scale-110   px-2 py-1  text-white text-xs font-medium   rounded-md uppercase  cursor-pointer ">
                  Adicionar
                </a>
              </Link>
            </div>
            {caso.contact.map((contact: any, index: any) => {
              return (
                <Fragment key={contact.id}>
                  <div className="flex flex-row items-center justify-between gap-x-4 h-12 mb-3 bg-white border border-gray hover:border-blue-600 shadow-sm  pb-1  rounded transition duration-500 ease-in-out  transform hover:-translate-y-2 hover:scale-25 hover:shadow-lg ">
                    <div className="flex flex-row items-center gap-x-4">
                      <div className="ml-4 mt-1">
                        <Image
                          src="/img/1.jpg"
                          height={35}
                          width={35}
                          alt="Recipe"
                          className=" object-cover rounded-full   shadow-md "
                        />
                      </div>
                      <div className="text-xs font-bold text-indigo-400 ">
                        <h2>{contact.name}</h2>
                      </div>
                    </div>
                    <div className="text-sm font-light ">
                      <h2>{contact.email}</h2>
                    </div>

                    <div className="flex flex-row items-center gap-x-2">
                      <a className=" h-6 mb-1 transition duration-500 ease-in-out  bg-primary  hover:bg-red-600    px-1 py-1  text-white text-xs font-light   rounded-md uppercase  cursor-pointer ">
                        Eliminar
                      </a>
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
