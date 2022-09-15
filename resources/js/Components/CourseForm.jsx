import React, { useState } from 'react'
import { useForm } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia';
import { FaSave } from 'react-icons/fa'
import Checkbox from './Checkbox';

const CourseForm = ({ course,  onSubmit = () => { }, isAdmin = false , setMessage}) => {


    const { data, setData, progress, processing , put} = useForm({
        id: course?.id,
        title: course.title,
        description: course.description,
        image: course.image,
        capacity: course.capacity,
        active: course.active,
    });


    const update = (e) => {
        e.preventDefault()
        put(route('courses.update', { id: data.id }), data,
            {
                _method: 'put',
                forceFormData: true,
                preserveState: false,
                preserveScroll: true,

                onStart: () => {
                    //console.log(data);
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

        Inertia.post(route('courses.create'), data,
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
                    setMessage(err[0])
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

                        <form id='_course__form' onSubmit={!data.id ? _create : update} method="POST">
                            <div className="dark:bg-slate-700 dark:text-slate-200 overflow-hidden shadow sm:rounded-md">
                                <div className=" px-4 py-5 sm:p-6">
                                    <div className="mb-3">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-100">Course's Image</label>
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
                                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-slate-100">
                                                Course title
                                            </label>
                                            <input
                                                required
                                                type="text"
                                                name="title"
                                                id="title"
                                                value={data.title}
                                                onChange={(e) => setData((_) => ({ ..._, title: e.target.value }))}
                                                autoComplete="given-title"
                                                className="dark:bg-slate-800 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                            />
                                        </div>



                                        <div className="col-span-6 md:col-span-3">
                                            <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 dark:text-slate-100">
                                                Capacity
                                            </label>
                                            <input
                                                required
                                                type="number"
                                                name="capacity"
                                                id="capacity"
                                                min={0}
                                                value={data.capacity}
                                                onChange={(e) => setData((_) => ({ ..._, capacity: e.target.value }))}
                                                autoComplete="capacity"
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

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="active" className="block text-sm font-medium text-gray-700 dark:text-slate-100">
                                                Should this course be active ?
                                            </label>
                                            <Checkbox
                                                id="active"
                                                name="active"
                                                autoComplete="active"
                                                value={data.active}
                                                handleChange={(e) => setData((_) => ({ ..._, active: e.target.value }))}
                                                className="mt-1 block w-full rounded-md border border-gray-300 bg-white dark:bg-slate-800 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
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

export default CourseForm
