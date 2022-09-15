import React, { useState, useEffect } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import SlideOver from '@/Components/SlideOver';
import Modal from '@/Components/Modal';
import DeleteModal from '@/Components/DeleteModal';
import Table, { actionButtons, ActiveCell, AvatarCell, SelectColumnFilter } from '@/Components/Table';
import PrimaryButton from '@/Components/PrimaryButton';
import { moneyFormat } from '@/Components/shared/Utils';
import ClassroomForm from '@/Components/ClassroomForm';

const emptyClassroom = {
    id: null,
    image: "",
    name: "",
    description: "",
    space: 0,
}

const Classrooms = (props) => {

    const [selectedClassroom, setSelectedClassroom] = useState(emptyClassroom);
    const [onCreate, setOnCreate] = useState(false);
    const [onEdit, setOnEdit] = useState(false);
    const [onView, setOnView] = useState(false);
    const [onDelete, setOnDelete] = useState(false);
    const [message, setMessage] = useState(props.flash.message);


    const handleFilter = (e) => {
        const { value } = e.target
        setSearch(value)
        Inertia.get(route('classrooms'), { search: value }, {
            preserveState: true
        });
    }

    const openEdit = (classroom_id) => {
        let classroom = props.classrooms.data.find(u => u.id === classroom_id);
        setSelectedClassroom(classroom);
        setOnEdit(true)
    }
    const openView = (classroom_id) => {
        let classroom = props.classrooms.data.find(u => u.id === classroom_id);
        setSelectedClassroom(classroom);
        setOnView(true)
    }

    const openDelete = (classroom_id) => {
        let classroom = props.classrooms.data.find(u => u.id === classroom_id);
        setSelectedClassroom(classroom);
        setOnDelete(true)
    }
    const closeCRUD = () => {
        setSelectedClassroom(null);
        setOnEdit(false)
        setOnView(false)
        setOnCreate(false)
        setOnDelete(false)
    }

    const handleDelete = (classroom) => {
        Inertia.delete(route('classrooms.delete', { id: classroom.id }),
            {
                preserveState: false,
                preserveScroll: true,
                onSuccess: (res) => {

                },
                onError: (err) => {
                    setMessage('Oups! Something went wrong \nContact administrator !')
                }
            })
        setOnDelete(false)
    }


    const columns = React.useMemo(
        () => [
            {
                Header: "Class Name",
                accessor: "name",
                Cell: AvatarCell,
                imgAccessor: "image",
            },
            {
                Header: "Description",
                accessor: "description",
            },
            {
                Header: "Space",
                accessor: "space",
            },
            {
                Header: "Action",
                Cell: actionButtons,
                itemId: "id",
                openEdit: openEdit,
                openView: openView,
                openDelete: openDelete,
            },
        ],
        []
    );


    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-md text-gray-800 dark:text-white leading-tight">Manage Classrooms</h2>}
        >

            <Head title="Classrooms Management" />

            {
                message &&
                <Modal open={!(message == null)} setOpen={setMessage} title='Info' >
                    {message}
                </Modal>
            }


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
                                            Here is a list of randori&#x27;s classrooms. You can create, view, edit or delete any classroom !
                                        </h2>
                                    </>}

                                <section className="flex flex-col w-full mt-5">
                                    <div className="flex justify-between mb-5">
                                        <div className="flex space-x-2 items-center">
                                            <PrimaryButton handleClick={() => setOnCreate(true)} type='button' className='bg-blue-600' > Create A Classroom </PrimaryButton>
                                        </div>
                                        { false && <div className="flex flex-col text-slate-600 dark:text-slate-200 ">
                                            <label htmlFor="search" className="text-sm font-mono font-bold">Search </label>
                                            <input
                                                className="rounded-lg shadow focus-within:shadow-lg border-0 bg-slate-50 bg-opacity-25 dark:placeholder:text-white placeholder:opacity-40"
                                                type="search"
                                                name="search"
                                                id="search"
                                                placeholder="Search "
                                                onChange={(e) => handleFilter(e)} />
                                        </div>}
                                    </div>

                                    <Table columns={columns} data={props.classrooms.data} />

                                    <div>

                                        {
                                            onCreate &&
                                            <SlideOver title={"Create a classroom"} open={onCreate}  setOpen={closeCRUD}>
                                                <ClassroomForm onSubmit={closeCRUD} setMessage={setMessage} isAdmin={props.auth.user.role_id == 1} classroom={emptyClassroom}   />
                                            </SlideOver>
                                        }

                                        {
                                            onEdit &&
                                            <SlideOver title={selectedClassroom.name + "'s info"} open={onEdit} setOpen={closeCRUD}>
                                                <ClassroomForm onSubmit={closeCRUD} setMessage={setMessage} isAdmin={props.auth.user.role_id == 1} classroom={selectedClassroom}/>
                                            </SlideOver>
                                        }

                                        {
                                            onView &&
                                            <Modal title={"Classroom's Information"} open={onView} setOpen={setOnView} actionTitle="Done !" handleAction={closeCRUD} >

                                                <table className="ml-auto text-slate-800 dark:text-white text-sm">
                                                    <tbody>
                                                    <tr className='my-2 w-full'>
                                                        <td className='font-semibold'>Label     </td>
                                                        <td className='ml-auto p-1'><span className='mr-2'>:</span>{selectedClassroom.name} </td>
                                                    </tr>
                                                    <tr className='my-2 w-full'>
                                                        <td className='font-semibold'>Description     </td>
                                                        <td className='ml-auto p-1'><span className='mr-2'>:</span>{selectedClassroom.description} </td>
                                                    </tr>
                                                    <tr className='my-2 w-full'>
                                                        <td className='font-semibold'>Space     </td>
                                                        <td className='ml-auto p-1'><span className='mr-2'>:</span>{selectedClassroom.space} </td>
                                                    </tr>
                                                    </tbody>
                                                </table>

                                            </Modal>
                                        }
                                        {
                                            onDelete &&
                                            <DeleteModal title={'Delete ' + selectedClassroom.name + ' classroom'} open={onDelete} setOpen={setOnDelete} handleDelete={() => handleDelete(selectedClassroom)} >
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

export default Classrooms
