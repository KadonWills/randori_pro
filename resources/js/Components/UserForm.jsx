import React from 'react'
import { useForm } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia';
import { FaSave } from 'react-icons/fa'

const UserForm = ({ user, roles, classrooms, onSubmit = () => { }, isAdmin = false }) => {

    const { data, setData, transform, progress, processing , put} = useForm({
        id: user?.id,
        photo: user.photo,
        first_name: user.first_name,
        last_name: user.last_name,
        gender: user.gender ?? "male",
        email: user.email,
        phone: user.phone,
        dob: user.dob,
        role_id: user.role_id,
        classroom_id: user.classroom_id,
        active: user.active,
        status: user.status,
        password: user.password
    });

    transform((data) => ({
        ...data,
        password: data?.password === "" ? null : data.password,
        classroom_id: (parseInt(data.classroom_id) instanceof Number) ? parseInt(data.classroom_id) : null,
    }))

    const update = (e) => {
        e.preventDefault()
        put(route('users.update', { id: data.id }), data,
            {
                _method: 'put',
                forceFormData: true,
                preserveState: false,
                preserveScroll: true,

                onStart: () => {
                    //console.log(data);
                },
                onComplete: (res) => {
                    alert(res.props.flash.message);
                },
                onError: (err) => {
                    alert(err[0])
                }
            })
    }

    const _create = (e) => {
        e.preventDefault();

        Inertia.post(route('users.create'), data,
            {
                forceFormData: true,
                preserveState: false,
                preserveScroll: true,
                onStart: () => {

                },
                onSuccess: (res) => {
                    alert(res.props.flash.message)
                },
                onError: (err) => {
                    //console.log(err)
                    alert(err[0])
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

                        <form id='_u__form' onSubmit={!data.id ? _create : update} method="POST">
                            <div className="dark:bg-slate-700 dark:text-slate-200 overflow-hidden shadow sm:rounded-md">
                                <div className=" px-4 py-5 sm:p-6">
                                    <div className="mb-3">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-100">Photo</label>
                                        <div className="mt-1 flex items-center">
                                            {data?.photo ?
                                                <img src={data.photo} alt="photo" className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100" />

                                                :
                                                <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                                                    <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                    </svg>
                                                </span>}
                                            <div className='flex flex-col space-y-1' >


                                                <input
                                                    type="file"
                                                    onChange={e => setData('photo', e.target.files[0])}
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
                                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 dark:text-slate-100">
                                                First name
                                            </label>
                                            <input
                                                required
                                                type="text"
                                                name="first-name"
                                                id="first-name"
                                                value={data.first_name}
                                                onChange={(e) => setData((_) => ({ ..._, first_name: e.target.value }))}
                                                autoComplete="given-name"
                                                className="dark:bg-slate-800 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 dark:text-slate-100">
                                                Last name
                                            </label>
                                            <input
                                                required
                                                type="text"
                                                name="last-name"
                                                id="last-name"
                                                value={data.last_name}
                                                onChange={(e) => setData((_) => ({ ..._, last_name: e.target.value }))}
                                                autoComplete="family-name"
                                                className="dark:bg-slate-800 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                            />
                                        </div>

                                        <div className="col-span-6 w-full">
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-slate-100">
                                                Email address
                                            </label>
                                            <input
                                                required
                                                type="email"
                                                name="email"
                                                id="email"
                                                value={data.email}
                                                onChange={(e) => setData((_) => ({ ..._, email: e.target.value }))}
                                                autoComplete="email"
                                                className="dark:bg-slate-800 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-slate-100">
                                                Gender
                                            </label>
                                            <select
                                                id="gender"
                                                name="gender"
                                                autoComplete="gender"
                                                value={data.gender}
                                                onChange={(e) => setData((_) => ({ ..._, gender: e.target.value }))}
                                                className="mt-1 block w-full rounded-md border border-gray-300 bg-white dark:bg-slate-800 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                                            >
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-slate-100">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                id="phone"
                                                value={data.phone}
                                                onChange={(e) => setData((_) => ({ ..._, phone: e.target.value }))}
                                                autoComplete="phone"
                                                className="dark:bg-slate-800 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                                            <label htmlFor="dob" className="block text-sm font-medium text-gray-700 dark:text-slate-100">
                                                Date of birth
                                                <span className="ml-2 text-xs text-gray-400" >{data.dob}</span>
                                            </label>
                                            <input
                                                type="date"
                                                name="dob"
                                                id="dob"
                                                defaultValue={data.dob}
                                                // value={new Date(data.dob)}
                                                onChange={(e) => setData((_) => ({ ..._, dob: e.target.value }))}
                                                autoComplete="date-of-birth"
                                                className="dark:bg-slate-800 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                            />
                                        </div>
                                        {
                                            (isAdmin) &&
                                            <>
                                                <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                                                    <label htmlFor="role_id" className="block text-sm font-medium text-gray-700 dark:text-slate-100">
                                                        Role
                                                    </label>
                                                    <select
                                                        id="role_id"
                                                        name="role_id"
                                                        autoComplete="role"
                                                        value={data.role_id ?? 2}
                                                        onChange={(e) => setData((_) => ({ ..._, role_id: parseInt(e.target.value) }))}
                                                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white dark:bg-slate-800 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                                                    >
                                                        {
                                                            roles.map((r, i) => (<option key={'role-opt-' + i} value={r.id}>{r.name}</option>))
                                                        }
                                                    </select>
                                                </div>

                                                <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                                                    <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700 dark:text-slate-100">
                                                        classroom
                                                    </label>
                                                    <select
                                                        id="classroom_id"
                                                        name="classroom_id"
                                                        autoComplete="classroom"
                                                        value={data.classroom_id ?? ""}
                                                        onChange={(e) => setData((_) => ({ ..._, classroom_id: isNaN(parseInt(e.target.value)) ? null : parseInt(e.target.value) }))}
                                                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white dark:bg-slate-800 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                                                    >
                                                        <option value={null} >None</option>
                                                        {
                                                            classrooms.map((c, i) => (<option key={'classroom-opt-' + i} value={c.id}>{c.name}</option>))
                                                        }
                                                    </select>
                                                </div>

                                            </>
                                        }
                                                <div className="col-span-6 ">
                                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-slate-100">
                                                        create a password
                                                    </label>
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        id="password"
                                                        value={data.password}
                                                        onChange={(e) => setData((_) => ({ ..._, password: e.target.value }))}
                                                        autoComplete="password"
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

export default UserForm
