import React, { useState, useEffect } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';

const Subscriptions = (props) => {

    const [search, setSearch] = useState('')



    const filterByName = (e) => {
        const { value } = e.target
        console.log(value);
        setSearch(value)
        Inertia.get(route('subscriptions'), { search: value }, {
            preserveState: true
        });
    }


    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-md text-gray-800 dark:text-slate-50 leading-tight">Manage Subscriptions</h2>}
        >

            <Head title="Subscriptions Management" />

            <div className="py-3 w-full lg:w-10/12">
                <div className="max-w-full mx-auto sm:px-6 ">
                    <div className="bg-white dark:bg-slate-700 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-3  border-b border-gray-200 dark:border-slate-700">
                            <div className="overflow-auto h-full pb-24 px-4 md:px-6">
                                <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                                    Hi, {props.auth.user.first_name}.
                                </h1>
                                <h2 className="text-md text-gray-400">
                                    Here is a list of randori&#x27;s users. You can create, view, edit or delete any classroom !
                                    <p className="text-red-600 dark:text-red-500 text-xs"> <b>Note*</b>: Deleting a classroom will permanently delete every related course events. </p>
                                </h2>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}

export default Subscriptions
