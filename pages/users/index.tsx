import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { parseCookies } from "nookies";
import React, { Fragment, useContext, useEffect, useState } from "react";
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
import {
  changeUserState,
  getUsers,
  removeUser,
  UserType,
} from "../../services/services";

export default function Cases() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  const isAdmin = user?.role === "administrador";
  /*Used to verify if table row corresponds to current user and
   is admin user , avoid deactivating himself*/
  const isCurrentUser = (id: number) => isAdmin && id === user.id;

  function fillUsers(state: any) {
    toast
      .promise(
        getUsers(api),
        {
          loading: "Carregando usuários ...",
          success: () => <span>...</span>,
          error: "Ocorreu um erro , não foi possível listar usuários",
        },
        {
          success: toastStyle,
        }
      )
      .then((result) => {
        const users = result;
        state(users);
      })
      .catch((error) => {
        // Getting the Error details.
        console.error(error.message);
        return error.message;
      });
  }

  async function handleUserState(
    userId: number,
    currentState: number,
    canExecute: Boolean
  ) {
    if (canExecute) {
      const stateName = currentState === 1 ? "desactivar" : "activar";
      const answer = confirm(
        `Está prestes a ${stateName} o usuário , deseja prosseguir ?`
      );

      if (answer) {
        try {
          const { code, message } = await changeUserState(userId);
          console.log(message);
          if (code === "SUCCESS") {
            fillUsers(setUsers);
            notify(message);
          }
        } catch (error) {
          console.log(error);
          notifyError(`Ocorreu um erro ao ${stateName} o usuário`);
        }
      }
    }
  }

  function handleDeleteUser(userId: number, canDelete: Boolean) {
    if (canDelete) {
      const answer = confirm("Deseja realmente eliminar o usuário  ? ");

      if (answer) {
        try {
          toast
            .promise(
              removeUser(userId),
              {
                loading: "Eliminando usuário ...",
                success: () => <span>...</span>,
                error:
                  "Ocorreu um erro , não foi possível realizar o seu pedido",
              },
              {
                success: toastStyle,
              }
            )
            .then((result) => {
              const { code, message } = result;

              if (code === "SUCCESS") {
                fillUsers(setUsers);
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
          notifyError("Ocorreu um erro ao eliminar usuário");
          return error;
        }
      }
    }
  }

  useEffect(() => {
    fillUsers(setUsers);
  }, []);

  return (
    <div>
      <Head>
        <title>Usuários</title>
      </Head>

      <TopMenu user={user} page={"users"} />
      <main>
        <Toaster />
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="flex flex-row  justify-end">
            <div className=" mb-5">
              <Link href="/users/add">
                <a
                  className={`${
                    !isAdmin ? "hidden" : ""
                  } transition duration-500 ease-in-out bg-gray-600  hover:bg-black transform hover:-translate-y-1 hover:scale-110   px-3 py-2  text-white text-xs font-medium   rounded-md uppercase  cursor-pointer `}
                >
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
                          E-mail
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                        >
                          Nível
                        </th>

                        <th
                          scope="col"
                          className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                        >
                          Estado
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                        >
                          Data Registro
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
                      {users.map((user: UserType, index) => (
                        <Fragment key={user.id}>
                          <tr
                            className={
                              index % 2 == 0 ? "bg-white" : "bg-gray-100"
                            }
                          >
                            <td className="px-2 py-2 whitespace-nowrap text-xs    font-bold  uppercase text-black">
                              # {++index}
                            </td>
                            <td className="px-2 py-4 whitespace-nowrap text-xs font-light  uppercase text-black">
                              {user.name}
                            </td>

                            <td className="px-2 py-4 whitespace-nowrap text-xs font-light   text-indigo-600 ">
                              {user.email}
                            </td>
                            <td className="px-2 py-4 whitespace-nowrap text-xs font-light  uppercase text-black">
                              {user.role}
                            </td>
                            <td className="px-2 py-4 whitespace-nowrap text-xs font-light  uppercase text-black">
                              <button
                                onClick={() =>
                                  handleUserState(
                                    user.id,
                                    user.is_active,
                                    isAdmin && !isCurrentUser(user.id)
                                  )
                                }
                                className={`${
                                  isAdmin && !isCurrentUser(user.id)
                                    ? user.is_active === 1
                                      ? "bg-green-500"
                                      : "bg-red-500"
                                    : "bg-gray-500 cursor-default"
                                }   text-xs uppercase py-1 px-2 rounded text-white`}
                              >
                                {user.is_active === 1 ? "Activo" : "Inactivo"}
                              </button>
                            </td>
                            <td className="px-2 py-4 whitespace-nowrap text-xs font-light  uppercase text-black">
                              {formatDate(user.created_at)}
                            </td>

                            <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                              <button
                                onClick={() =>
                                  handleDeleteUser(
                                    user.id,
                                    isAdmin && !isCurrentUser(user.id)
                                  )
                                }
                                className={`${
                                  isCurrentUser(user.id) || !isAdmin
                                    ? "hidden"
                                    : ""
                                } ml-2 transition duration-500 ease-in-out  bg-primary  hover:bg-red-700 transform hover:-translate-y-1 hover:scale-110   px-2 py-1  text-white text-xs font-light   rounded-md uppercase  cursor-pointer`}
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
