import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { logo, user_empty, avatar } from './assets';
import { webInfo } from './constants';
import { classNamesFx } from './common';
import { Link, useLocation } from 'react-router-dom';
import { useUserContext } from '../UserContextProvider';


export default function NavBar() {
  const location = useLocation();
  const { isUserLoggedIn, loggedInUser } = useUserContext();

    const navMenu = [
        { name: 'Home', href: '/', current: location.pathname === '/' },
        { name: 'Events', href: '/events', current: location.pathname === '/events' },
    ];
  return (
    <Disclosure as="nav" className="bg-bgColor2 z-50 fixed top-0 left-0 right-0">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src={logo}
                    alt={webInfo.webName}
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navMenu.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNamesFx(
                          'relative',
                          item.current ? 'text-white bg-bgColor' : 'text-gray-300 hover:bg-bgColorHover hover:text-white',
                          'rounded-md px-3 py-2 font-bold text-lg',
                          item.current ? 'after:bg-bgColor after:absolute after:top-9 after:left-0 after:w-full after:h-5' : ''
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={isUserLoggedIn?  avatar : user_empty}
                        alt="User Profile Pic"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute text-bgColor right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {loggedInUser && <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="account"
                            className={classNamesFx(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            {loggedInUser ? loggedInUser.name : "Account"}
                          </Link>
                        )}
                      </Menu.Item>}
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to={isUserLoggedIn ? "login?logout=true" : "login"}
                            className={classNamesFx(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            {isUserLoggedIn ? "Logout" : "Login"}
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>

              </div>

            </div>
          </div>

          <Disclosure.Panel className="sm:hidden flex justify-center">
            <div className="space-y-1 px-2 pb-3 pt-2">
                {navMenu.map((item) => (
                    <Disclosure.Button
                        key={item.name}
                        as={Link}
                        to={item.href}
                        className={classNamesFx(
                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'block rounded-md px-3 py-2 text-base font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                    >
                        {item.name}
                    </Disclosure.Button>
                ))}
            </div>
        </Disclosure.Panel>

        </>
      )}
    </Disclosure>
  )
}
