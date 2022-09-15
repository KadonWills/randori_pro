import React, { useState, useEffect } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import UserForm from '@/Components/UserForm';

const Profile = (props) => {

    const {user} = props.auth



    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-md text-gray-800 dark:text-slate-50 leading-tight">Manage Your Profile</h2>}
        >

            <Head title="Profile Management" />

            <div className="py-3 w-full lg:w-10/12">
                <div className="max-w-full flex flex-col-reverse md:flex-row justify-between md:space-x-2 mx-auto sm:px-6 ">
                    <div className="bg-white w-full md:w-2/3 dark:bg-slate-700 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-3  border-b border-gray-200 dark:border-slate-700">
                            <div hidden className="overflow-auto h-full pb-6 px-4 md:px-6">
                                <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                                    Hi, {props.auth.user.first_name}.
                                </h1>
                                <h2 className="text-md text-gray-400">
                                    <p className="text-xs"> Here you can update any information of your profile. </p>
                                </h2>
                            </div>

                            <div>
                                <UserForm user={user} roles={props.roles} classrooms={props.classrooms} isAdmin={user.role_id === 1} />
                            </div>
                        </div>

                    </div>
                    <div className=" overflow-hidden max-w-[360px] w-[320px] md:fixed md:right-3 mx-auto mb-10 md:mb-0 md:mx-0 md:w-1/3 lg:h-[175px]  rounded-md shadow-sm sm:rounded-lg">
                        <div className="p-3 flex relative items-center min-h-[150px] h-full w-full border border-gray-200 dark:border-slate-700 bg-gradient-to-br from-blue-500 to-blue-700">

                            <div>
                                <img src={user.photo} alt={user.first_name} className="w-[100px] h-[100px] bg-slate-300 overflow-hidden rounded-full border-2 border-white" />
                            </div>
                            <div className="ml-auto  flex flex-col space-y-1 text-white text-sm">
                                <p> <b>First Name</b> :  {user.first_name}</p>
                                <p> <b>Last Name</b> :  {user.last_name}</p>
                                <p> <b>Date of birth</b> :  {user.dob}</p>
                                <p> <b>Gender</b> :  {user.gender}</p>
                                {/* <p> <b>Email</b> :  <br /><small>{user.email}</small> </p>
                                <p> <b>Contact</b> : <br /> {user.phone}</p> */}
                            </div>

                            <div className="absolute top-1 left-1 text-xs rounded p-1 bg-slate-200 dark:bg-slate-900  text-blue-700 dark:text-white font-mono font-black">
                                {(user.role_id == 1) ? "Admin" : (user.role_id == 2) ? "Student" : "Tutor"}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}

export default Profile
