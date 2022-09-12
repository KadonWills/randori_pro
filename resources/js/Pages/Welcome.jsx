import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Welcome(props) {
    return (
        <>
            <Head title="Welcome" />
            <div className="relative flex items-top justify-center min-h-screen  bg-[url('/bg/abstract-blue')]  sm:items-center sm:pt-0">
                <div className="fixed top-0 right-0 px-6 py-4 sm:block">
                    {props.auth.user ? (
                        <Link href={route('logout')} method="post" as="button" className="text-sm text-gray-700 dark:text-gray-500 underline">
                            Log Out
                        </Link>
                    ) : (
                        <>
                            <Link href={route('login')} className="text-sm text-gray-700 dark:text-gray-500 underline">
                                Log in
                            </Link>

                            <Link
                                href={route('register')}
                                className="ml-4 text-sm text-gray-700 dark:text-gray-500 underline"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                    {/* <div className="flex justify-center pt-8 sm:justify-start sm:pt-0">


                    </div> */}

                    <section className="w-full ">
                        <div className="relative items-center w-full px-5  mx-auto md:px-12 lg:px-16 max-w-7xl ">
                            <div className="flex w-full mx-auto text-left">
                                <div className="relative inline-flex items-center mx-auto align-middle">
                                    <div className="text-center">
                                        <h1 className="max-w-5xl text-2xl font-black leading-none tracking-tighter text-neutral-800 md:text-5xl lg:text-6xl lg:max-w-7xl">

                                            <ApplicationLogo />
                                        </h1>
                                        <p className="max-w-xl mx-auto mt-8 text-base leading-relaxed text-gray-500">Notre académie a pour but d'enseigner et de former de nouveau sportif ou de mettre à niveau les compétences techniques pour la récupération du sportif</p>
                                        <div className="flex justify-center w-full max-w-2xl gap-2 mx-auto mt-6">
                                            {props.auth.user ? (
                                                <div className="mt-3 rounded-lg sm:mt-0">
                                                <Link href={route('dashboard')} className="items-center capitalize block px-5 py-2 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-black lg:px-10 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                                    Go To Dashboard
                                                </Link>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="mt-3 rounded-lg sm:mt-0">
                                                        <Link href={route('login')} className="items-center uppercase block px-5 py-2 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-black lg:px-10 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                                            {("login")}
                                                        </Link>
                                                    </div>
                                                    <div className="mt-3 rounded-lg sm:mt-0 sm:ml-3">
                                                        <Link
                                                            href={route('register')}
                                                            className="items-center uppercase block px-5 lg:px-10 py-2 text-base font-medium text-center text-black transition duration-500 ease-in-out transform  border-black bg-white shadow-md hover:shadow-xl rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                                        >
                                                            Register
                                                        </Link>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>



                </div>
            </div>
        </>
    );
}
