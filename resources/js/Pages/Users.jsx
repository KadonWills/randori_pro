import React, { useState, useEffect } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import PrimaryButton from '@/Components/PrimaryButton';
import SlideOver from '@/Components/SlideOver';
import UserForm from '@/Components/UserForm';

const Users = (props) => {

    const [search, setSearch] = useState('')

    useEffect(() => {
        let ac = new AbortController();


        return () => {
            ac.abort()
        }
    }, []);


    const handleFilter = (e) => {
        const {value} = e.target
        console.log(value);
        setSearch(value)
        Inertia.get(route('users'), { search: value }, {
            preserveState: true
        });
    }


    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-md text-gray-800 dark:text-white leading-tight">Manage Users</h2>}
        >

            <Head title="Users Management" />

            <div className="py-3 w-full lg:w-10/12">
                <div className="max-w-full mx-auto sm:px-6 ">
                    <div className="bg-white dark:bg-slate-700 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-3  border-b border-gray-200 dark:border-slate-700">
                            <div className="overflow-auto h-full pb-24 px-4 md:px-6">
                                <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                                    Hi, {props.auth.user.first_name}.
                                </h1>
                                <h2 className="text-md text-gray-400">
                                    Here is a list of randori&#x27;s users. You can create, view, edit or delete any user !
                                </h2>

                                <section className="flex flex-col w-full mt-5">
                                    <div className="flex justify-between">
                                        <div className="flex space-x-2 items-center">
                                            <PrimaryButton type='button' className='bg-blue-600' > New User </PrimaryButton>
                                        </div>
                                        <div className="flex flex-col text-slate-600 dark:text-slate-200 ">
                                            <label htmlFor="search" className="text-sm font-mono font-bold">Search</label>
                                            <input
                                                className="rounded-lg shadow focus-within:shadow-lg border-0 bg-slate-50 bg-opacity-25 placeholder:opacity-40"
                                                type="search"
                                                name="search"
                                                id="search"
                                                placeholder="Search by name"
                                                onChange={(e) => handleFilter (e)} />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="text-sm text-blue-600 my-2 font-mono italic">{search.length > 0 && `Search result for: ` + search}</div>

                                        <table className="table border-spacing-2 w-full mt-5 text-slate-700 dark:text-slate-100">
                                            <thead className=" font-bold text-left my-1 ">
                                                <tr>

                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Phone</th>
                                                    <th>Subscr.</th>
                                                    <th>Role</th>
                                                    <th>Age</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    props.users.data.map((user, i) => (
                                                        <tr key={`user-data-`+i} className="table-row p-1">
                                                            <td>{user.name}</td>
                                                            <td>{user.email}</td>
                                                            <td>{user.phone}</td>
                                                            <td>{user.subscription ?? "None"}</td>
                                                            <td>{user.role}</td>
                                                            <td>{user.age}</td>
                                                            <td className="flex flex-col md:flex-row space-y-1 md:space-x-1 text-center my-2">
                                            <PrimaryButton type='button' className='bg-gray-200 text-black text-xs py-1 font-mono' > View </PrimaryButton>
                                            <PrimaryButton type='button' className='bg-blue-300 text-blue-700 text-xs py-1 font-mono' > Edit </PrimaryButton>
                                            <PrimaryButton type='button' className='bg-red-300 text-red-700 text-xs py-1 font-mono' > Delete </PrimaryButton>
                                                                </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                        <SlideOver title="User's info" isOpen={true}>
                                            <UserForm />
                                        </SlideOver>
                                    </div>
                                </section>

                            </div>
                        </div>


                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}

export default Users
