import React, { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import routeList from '@/constants';
import { Link } from '@inertiajs/inertia-react';
import ThemeSwitcher from '@/Components/ThemeSwitcher';

export default function Authenticated({ auth, errors, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-slate-900">
            <nav className="bg-white dark:bg-slate-800 dark:text-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-12">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block w-[150px] dark:invert " />
                                </Link>
                            </div>

                            <div className="hidden space-x-4 lg:-my-px lg:ml-10 lg:flex">
                                {
                                    routeList.map((link, index) => (
                                        <NavLink key={'nav-header-' + index} href={route(link.routeName)} active={route().current(link.routeName)}>
                                            {link.label}
                                        </NavLink>
                                    ))
                                }

                            </div>
                        </div>

                        <div className="hidden lg:flex lg:items-center lg:ml-6">
                            <div className="ml-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md  dark:text-slate-200  dark:bg-blue-900 ">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-600 bg-white dark:bg-slate-800 dark:text-slate-200 hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {auth.user.first_name + " " + auth.user.last_name}

                                                <svg
                                                    className="ml-2 -mr-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content contentClasses='bg-slate-200 dark:bg-blue-900 '>
                                        <Dropdown.Link href={route('profile')} method="get"  as="button">
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-mr-2 flex items-center lg:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-blue-600 dark:text-white hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex text-red-500' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' lg:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">

                        {
                            routeList.map((link, index) => (
                                <ResponsiveNavLink key={'nav-responsive-header-' + index} href={route(link.routeName)} active={route().current(link.routeName)}>
                                    {link.label}
                                </ResponsiveNavLink>
                            ))
                        }

                    </div>

                    <div className="pt-4 pb-1 border-t bg-gray-200 dark:bg-slate-700 ">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800 dark:text-slate-200">{auth.user.first_name + " " + auth.user.last_name}</div>
                            <div className="font-medium text-sm text-gray-500 dark:text-slate-400">{auth.user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink method='get'  href={route('profile')} as="button">
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white dark:bg-slate-700  dark:text-slate-50 shadow">
                    <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}


            <div className="errors absolute right-5">


            {  (errors instanceof Array && errors.length > 0) &&
                errors.map( (error, i) =>(
                    <div key={`error-${i}`}
                    onClick={ () => errors = errors.filter(e => e != error) }
                    class={` w-[100px] h-auto bg-red-500 bg-opacity-90 border-red-700 border-l-2 text-red-50 my-[2px] px-3 py-1 rounded duration-1000 ease-in-out `} role="alert">
                    {error}
                </div>
                ))
            }
            </div>


            <main className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-1 ">

                <aside className="hidden lg:block lg:w-2/12 p-3">
                    <div className="min-w-max mx-auto ">
                        <div className="flex flex-col items-center bg-white  dark:text-slate-200 dark:bg-slate-700 overflow-hidden p-3 shadow-sm sm:rounded-lg">
                            {
                                routeList.map((link, index) => (
                                    <ResponsiveNavLink key={'nav-' + index} href={route(link.routeName)} active={route().current(link.routeName)} className="p-2 my-1 active:text-blue-600 active:bg-blue-200 w-full rounded bg-white dark:bg-slate-800 dark:hover:bg-blue-300  hover:text-blue-700 dark:hover:text-blue-700 dark:text-slate-200  capitalize">
                                        {link.label}
                                    </ResponsiveNavLink>
                                ))


                            }

                        </div>
                    </div>
                </aside>

                {children}

            </main>
            <ThemeSwitcher />
        </div>
    );
}
