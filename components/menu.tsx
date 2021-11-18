import React, { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellSolid, MenuSolid, XSolid } from "@graywolfai/react-heroicons";
import Image from "next/image";

import Link from "next/link";
import { logout } from "../services/services";
import { destroyCookie } from "nookies";
import Router from "next/router";

export default function TopMenu({ user, page }: any) {
  const isAdmin = user?.role === "administrador";

  console.log(`USER GENRE IS : ${user?.genre}`);

  const handleLogout = async () => {
    try {
      destroyCookie(null, "equilibrium.token");
      const { code, message } = await logout();

      if (code === "SUCCESS") {
        console.log("Logged out");
      }
      Router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Disclosure as="nav" className="bg-gray-900">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link href="/dashboard">
                    <Image
                      src="/img/icon.png"
                      height={35}
                      width={35}
                      alt="Recipe"
                      className=" object-cover   "
                    />
                  </Link>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <Link href="/users">
                      <a
                        className={`text-gray-300 ${
                          page === "users"
                            ? "bg-indigo-600"
                            : "hover:bg-gray-700"
                        }  hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
                      >
                        Usuários
                      </a>
                    </Link>

                    <Link href="/cases">
                      <a
                        className={`text-gray-300 ${
                          page === "cases"
                            ? "bg-indigo-600"
                            : "hover:bg-gray-700"
                        }  hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
                      >
                        Casos
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <span className="text-gray-300  hover:text-white block px-3 py-2 text-base font-medium">
                    {user?.name}
                  </span>
                  <button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">Ver notificações</span>
                    <BellSolid className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">
                              Abrir menu do usuário
                            </span>

                            <Image
                              src={`/img/${
                                user?.genre === "femenino"
                                  ? "female.png"
                                  : "male.png"
                              }`}
                              height={35}
                              width={35}
                              alt="Recipe"
                              className=" object-cover rounded-full   shadow-md "
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            <Menu.Item>
                              <Link href="#">
                                <a
                                  href="#"
                                  onClick={() => handleLogout()}
                                  className="block px-4 py-2 text-sm text-gray-700"
                                >
                                  Terminar Sessão
                                </a>
                              </Link>
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">Abrir menu principal</span>
                  {open ? (
                    <XSolid className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuSolid className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/users">
                <a
                  className={`text-gray-300 ${
                    page === "users" ? "bg-indigo-600" : "hover:bg-gray-700"
                  }  hover:text-white block px-3 py-2 rounded-md text-base font-medium`}
                >
                  Usuários
                </a>
              </Link>
              <Link href="/cases">
                <a
                  className={`text-gray-300 ${
                    page === "cases" ? "bg-indigo-600" : "hover:bg-gray-700"
                  }  hover:text-white block px-3 py-2 rounded-md text-base font-medium`}
                >
                  Casos
                </a>
              </Link>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <Image
                    src={`/img/${
                      user?.genre === "femenino" ? "female.png" : "male.png"
                    }`}
                    height={35}
                    width={35}
                    alt="Recipe"
                    className=" object-cover rounded-full   shadow-md "
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">
                    {user?.name}
                  </div>
                  <div className="text-sm font-medium leading-none text-gray-400">
                    {user?.email}
                  </div>
                </div>
                <button className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">View notifications</span>
                  <BellSolid className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <a
                  href="#"
                  onClick={() => handleLogout()}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                >
                  Sair
                </a>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
