import React, { useState, useEffect, useMemo } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import PrimaryButton from '@/Components/PrimaryButton';
import SlideOver from '@/Components/SlideOver';
import UserForm from '@/Components/UserForm';
import { EyeIcon } from '@heroicons/react/24/outline';
import { PencilIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/24/outline';
import DeleteModal from '@/Components/DeleteModal';
import Table, { actionButtons, AvatarCell, RolePill, SelectColumnFilter } from '@/Components/Table';
import Modal from '@/Components/Modal';

const emptyUser = {
    id: null,
    photo: "",
    first_name: "",
    last_name: "",
    gender: "male",
    email: "",
    phone: "",
    dob: "",
    role_id: null,
    classroom_id: "",
    active: true,
    status: "active",
    password: ""

}

const Users = (props) => {

    const [search, setSearch] = useState('');
    const [selectedUser, setSelectedUser] = useState({});
    const [onCreate, setOnCreate] = useState(false);
    const [onEdit, setOnEdit] = useState(false);
    const [onView, setOnView] = useState(false);
    const [onDelete, setOnDelete] = useState(false);


    const handleFilter = (e) => {
        const { value } = e.target
        //console.log(value);
        setSearch(value)
        Inertia.get(route('users'), { search: value }, {
            preserveState: true
        });
    }

    const openEdit = (user_id) => {
        let user = props.users.data.find(u => u.id === user_id);
        setSelectedUser(user);
        setOnEdit(true)
    }
    const openView = (user_id) => {
        let user = props.users.data.find(u => u.id === user_id);
        setSelectedUser(user);
        setOnView(true)
    }

    const openDelete = (user_id) => {
        let user = props.users.data.find(u => u.id === user_id);
        setSelectedUser(user);
        setOnDelete(true)
    }
    const closeCRUD = () => {
        setSelectedUser(props.auth.user);
        setOnEdit(false)
        setOnView(false)
        setOnCreate(false)
        setOnDelete(false)
    }

    const handleDelete = (user) => {
        Inertia.delete(route('users.delete', { id: user.id }),
            {
                preserveState: false,
                preserveScroll: true,
                onSuccess: (res) => {
                    alert(res.props.flash.message)
                },
                onError: (err) => {
                    alert('Oups! Something went wrong \nContact administrator !')
                }
            })
        setOnDelete(false)
    }


    const columns = React.useMemo(
        () => [
            {
                Header: "Name",
                accessor: "name",
                Cell: AvatarCell,
                imgAccessor: "photo",
                emailAccessor: "email",
            },
            {
                Header: "Phone",
                accessor: "phone",
            },
            {
                Header: "Subsc.",
                accessor: "subscription",
            },
            {
                Header: "Role",
                accessor: "role",
                Filter: SelectColumnFilter,
                Cell: RolePill,
                // filter: 'includes',
            },
            {
                Header: "Age",
                accessor: "age",
            },
            {
                Header: "Action",
                Cell: actionButtons,
                itemId: "id",
                openEdit: openEdit,
                openView: openView,
                openDelete: openDelete,
                // accessor: "role",
            },
        ],
        []
    );


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
                            <div className=" h-min  px-4 md:px-6">
                                {false &&
                                    <>

                                        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                                            Hi, {props.auth.user.first_name}.
                                        </h1>
                                        <h2 className="text-md text-gray-400">
                                            Here is a list of randori&#x27;s users. You can create, view, edit or delete any user !
                                        </h2>
                                    </>}

                                <section className="flex flex-col w-full mt-5">
                                    <div className="flex justify-between mb-5">
                                        <div className="flex space-x-2 items-center">
                                            <PrimaryButton handleClick={() => setOnCreate(true)} type='button' className='bg-blue-600' > Create New User </PrimaryButton>
                                        </div>
                                        <div className="flex flex-col text-slate-600 dark:text-slate-200 ">
                                            <label htmlFor="search" className="text-sm font-mono font-bold">Search By email</label>
                                            <input
                                                className="rounded-lg shadow focus-within:shadow-lg border-0 bg-slate-50 bg-opacity-25 dark:placeholder:text-white placeholder:opacity-40"
                                                type="search"
                                                name="search"
                                                id="search"
                                                placeholder="Search by email"
                                                onChange={(e) => handleFilter(e)} />
                                        </div>
                                    </div>

                                    <Table columns={columns} data={props.users.data} />

                                    <div>

                                        {
                                            onCreate &&
                                            <SlideOver title={"Create a user"} open={onCreate} setOpen={() => closeCRUD()}>
                                                <UserForm isAdmin={props.auth.user.role_id == 1} user={emptyUser} roles={props.roles} classrooms={props.classrooms} />
                                            </SlideOver>
                                        }

                                        {
                                            onEdit &&
                                            <SlideOver title={selectedUser.first_name + "'s info"} open={onEdit} setOpen={() => closeCRUD()}>
                                                <UserForm isAdmin={props.auth.user.role_id == 1} user={selectedUser} roles={props.roles} classrooms={props.classrooms} />
                                            </SlideOver>
                                        }

                                        {
                                            onView &&
                                            <Modal title={"User's Information"} open={onView} setOpen={setOnView} actionTitle="Done !" handleAction={closeCRUD} >

                                                <table className="ml-auto text-slate-800 dark:text-white text-sm">
                                                    <tr className='my-2 w-full'>
                                                        <td className='font-semibold'>First Name     </td>
                                                        <td className='ml-auto p-1'><span className='mr-2'>:</span>{selectedUser.first_name} </td>
                                                    </tr>
                                                    <tr className='my-2 w-full'>
                                                        <td className='font-semibold'>Last Name      </td>
                                                        <td className='ml-auto p-1'><span className='mr-2'>:</span>{selectedUser.last_name} </td>
                                                    </tr>
                                                    <tr className='my-2 w-full'>
                                                        <td className='font-semibold'>Date of birth  </td>
                                                        <td className='ml-auto p-1'><span className='mr-2'>:</span>{selectedUser.dob} ({selectedUser.age} years old) </td>
                                                    </tr>
                                                    <tr className='my-2 w-full'>
                                                        <td className='font-semibold'>Gender         </td>
                                                        <td className='ml-auto p-1'><span className='mr-2'>:</span>{selectedUser.gender} </td>
                                                    </tr>
                                                    <tr className='my-2 w-full'>
                                                        <td className='font-semibold'>Email          </td>
                                                        <td className='ml-auto p-1'><span className='mr-2'>:</span>{selectedUser.email}</td>
                                                    </tr>
                                                    <tr className='my-2 w-full'>
                                                        <td className='font-semibold'>Contact        </td>
                                                        <td className='ml-auto p-1'><span className='mr-2'>:</span>{selectedUser.phone} </td>
                                                    </tr>
                                                    <tr className='my-2 w-full'>
                                                        <td className='font-semibold'>Role           </td>
                                                        <td className='ml-auto p-1'><span className='mr-2'>:</span> <RolePill value={selectedUser.role} />  </td>
                                                    </tr>
                                                    <tr className='my-2 w-full'>
                                                        <td className='font-semibold'>Classroom      </td>
                                                        <td className='ml-auto p-1'><span className='mr-2'>:</span>{props.classrooms.find(x => x.id == selectedUser.classroom_id)?.name || "-"} </td>
                                                    </tr>
                                                </table>

                                            </Modal>
                                        }
                                        {
                                            onDelete &&
                                            <DeleteModal title={'Delete ' + selectedUser.name} open={onDelete} setOpen={setOnDelete} handleDelete={() => handleDelete(selectedUser)} >
                                                <p className="text-lg ">
                                                    Are you sure about this action ?
                                                </p>
                                            </DeleteModal>
                                        }
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
