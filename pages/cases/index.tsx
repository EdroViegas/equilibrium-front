import { PhoneSolid } from "@graywolfai/react-heroicons";
import Head from "next/head";
import Link from "next/link";
import React, { Fragment, useContext, useEffect, useState } from "react";
import TopMenu from "../../components/menu";
import { AuthContext } from "../../contexts/context";
import { formatDate } from "../../helpers/helper_functions";
import { api } from "../../services/api";

export default function Cases() {
  const { user } = useContext(AuthContext);
  const [cases, setCases] = useState([]);

  useEffect(() => {
    try {
      const result = api.get("/cases").then((res) => {
        const { cases } = res.data;
        setCases(cases);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Casos</title>
      </Head>

      <TopMenu user={user} />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="flex flex-row  justify-end">
            <div className=" mb-5">
              <Link href="cases/add">
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
                          E-mail
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
                      {cases.map((item, index) => (
                        <Fragment key={item.id}>
                          <tr
                            className={
                              index % 2 == 0 ? "bg-white" : "bg-gray-100"
                            }
                          >
                            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-500">
                              # {item.id}
                            </td>
                            <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                              {item.name}
                            </td>
                            <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                              {item.address}
                            </td>
                            <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                              {item.phone}
                            </td>
                            <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                              {item.email}
                            </td>
                            <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                              {item.place}
                            </td>
                            <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                              {formatDate(item.test_date)}
                            </td>
                            <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                              <a
                                href="#"
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                Edit
                              </a>
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
