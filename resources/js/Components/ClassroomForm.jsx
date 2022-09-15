import React, { useState } from 'react'
import { useForm } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia';
import { FaSave } from 'react-icons/fa'

const ClassroomForm = ({ classroom,  onSubmit = () => { }, isAdmin = false , setMessage}) => {

    const { data, setData, progress, processing , put} = useForm({
        id: classroom?.id,
        name: classroom.name,
        description: classroom.description,
        image: classroom.image,
        space: classroom.space,
    });


    const update = (e) => {
        e.preventDefault()
        put(route('classrooms.update', { id: data }), data,
            {
                _method: 'put',
                forceFormData: true,
                preserveState: false,
                preserveScroll: true,

                onStart: () => {

                },
                onComplete: (res) => {
                    setMessage(res.props.flash.message);

                },
                onError: (err) => {
                    setMessage(err[0] || err.props.flash.message)

                }
            })
    }

    const _create = (e) => {
        e.preventDefault();

        Inertia.post(route('classrooms.create'), data,
            {
                forceFormData: true,
                preserveState: false,
                preserveScroll: true,
                onStart: () => {

                },
                onSuccess: (res) => {
                    setMessage(res.props.flash.message)
                },
                onError: (err) => {
                    setMessage(err.props.flash.message)
                }
            })
    }

    return (
        <>


            <div className="mt-10 sm:mt-0 ">
                <div className="flex flex-col space-y-2">
                    <div hidden className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
                            <p className="mt-1 text-sm text-gray-600">.</p>
                        </div>
                    </div>
                    <div className="">

                        <form id='_classroom__form' onSubmit={!data.id ? _create : update} method="POST">
                            <div className="dark:bg-slate-700 dark:text-slate-200 overflow-hidden shadow sm:rounded-md">
                                <div className=" px-4 py-5 sm:p-6">
                                    <div className="mb-3">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-100">Classroom's Image</label>
                                        <div className="mt-1 flex items-center">
                                            {data?.image ?
                                                <img src={data.image} alt="image" className="inline-block h-12 w-24 overflow-hidden rounded bg-gray-100" />

                                                :
                                                <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                                                    <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                    </svg>
                                                </span>}
                                            <div className='flex flex-col space-y-1' >


                                                <input
                                                    type="file"
                                                    onChange={e => setData('image', e.target.files[0])}
                                                    className="ml-5 rounded-md border border-gray-300 bg-white dark:bg-slate-800 py-2 px-3 text-sm  leading-4 text-gray-700 dark:text-slate-100 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                                />
                                                {progress && (
                                                    <progress className='bg-green-600' value={progress.percentage} max="100">
                                                        {progress.percentage}%
                                                    </progress>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-slate-100">
                                                Classroom name
                                            </label>
                                            <input
                                                required
                                                type="text"
                                                name="name"
                                                id="name"
                                                value={data.name}
                                                onChange={(e) => setData((_) => ({ ..._, name: e.target.value }))}
                                                autoComplete="given-name"
                                                className="dark:bg-slate-800 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                            />
                                        </div>
                                        <div className="col-span-6 md:col-span-3">
                                            <label htmlFor="space" className="block text-sm font-medium text-gray-700 dark:text-slate-100">
                                                Space
                                            </label>
                                            <input
                                                required
                                                type="number"
                                                name="space"
                                                id="space"
                                                min={0}
                                                value={data.space}
                                                onChange={(e) => setData((_) => ({ ..._, space: e.target.value }))}
                                                autoComplete="space"
                                                className="dark:bg-slate-800 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                            />
                                        </div>

                                        <div className="col-span-6 ">
                                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-slate-100">
                                                Description
                                            </label>
                                            <textarea
                                                required
                                                name="description"
                                                id="description"
                                                value={data.description}
                                                onChange={(e) => setData((_) => ({ ..._, description: e.target.value }))}
                                                autoComplete="description"
                                                className="dark:bg-slate-800 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                            />
                                        </div>



                                    </div>
                                </div>
                                <div className=" px-4 py-3 text-right sm:px-6">

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center disabled:opacity-60  space-x-2 justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        <span>
                                            <FaSave />
                                        </span>
                                        <span>
                                            Save
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


            <div className="hidden sm:block" aria-hidden="true">
                <div className="py-5">
                    <div className="border-t border-gray-200" />
                </div>
            </div>

        </>
    )

}

export default ClassroomForm
