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
import CourseForm from '@/Components/CourseForm';

const emptyCourse = {
    id: null,
    image: "",
    title: "",
    description: "",
    capacity: 0,
    active: true
}

const Courses = (props) => {

    const [selectedCourse, setSelectedCourse] = useState(emptyCourse);
    const [onCreate, setOnCreate] = useState(false);
    const [onEdit, setOnEdit] = useState(false);
    const [onView, setOnView] = useState(false);
    const [onDelete, setOnDelete] = useState(false);
    const [message, setMessage] = useState(props.flash.message);


    const handleFilter = (e) => {
        const { value } = e.target
        setSearch(value)
        Inertia.get(route('courses'), { search: value }, {
            preserveState: true
        });
    }

    const openEdit = (course_id) => {
        let course = props.courses.data.find(u => u.id === course_id);
        setSelectedCourse(course);
        setOnEdit(true)
    }
    const openView = (course_id) => {
        let course = props.courses.data.find(u => u.id === course_id);
        setSelectedCourse(course);
        setOnView(true)
    }

    const openDelete = (course_id) => {
        let course = props.courses.data.find(u => u.id === course_id);
        setSelectedCourse(course);
        setOnDelete(true)
    }
    const closeCRUD = () => {
        setSelectedCourse(emptyCourse);
        setOnEdit(false)
        setOnView(false)
        setOnCreate(false)
        setOnDelete(false)
    }

    const handleDelete = (course) => {
        Inertia.delete(route('courses.delete', { id: course.id }),
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
                Header: "Course title",
                accessor: "title",
                Cell: AvatarCell,
                imgAccessor: "image",
            },
            {
                Header: "Description",
                accessor: "description",
            },
            {
                Header: "Capacity",
                accessor: "capacity",
            },
            {
                Header: "Available ?",
                accessor: "active",
                Cell: ActiveCell
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
            header={<h2 className="font-semibold text-md text-gray-800 dark:text-white leading-tight">Manage Courses</h2>}
        >

            <Head title="Courses Management" />

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
                                            Here is a list of randori&#x27;s courses. You can create, view, edit or delete any course !
                                        </h2>
                                    </>}

                                <section className="flex flex-col w-full mt-5">
                                    <div className="flex justify-between mb-5">
                                        <div className="flex space-x-2 items-center">
                                            <PrimaryButton handleClick={() => setOnCreate(true)} type='button' className='bg-blue-600' > Create A Course </PrimaryButton>
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

                                    <Table columns={columns} data={props.courses.data} />

                                    <div>

                                        {
                                            onCreate &&
                                            <SlideOver title={"Create a course"} open={onCreate}  setOpen={closeCRUD}>
                                                <CourseForm onSubmit={closeCRUD} setMessage={setMessage} isAdmin={props.auth.user.role_id == 1} course={emptyCourse}   />
                                            </SlideOver>
                                        }

                                        {
                                            onEdit &&
                                            <SlideOver title={selectedCourse.title + "'s info"} open={onEdit} setOpen={closeCRUD}>
                                                <CourseForm onSubmit={closeCRUD} setMessage={setMessage} isAdmin={props.auth.user.role_id == 1} course={selectedCourse}/>
                                            </SlideOver>
                                        }

                                        {
                                            onView &&
                                            <Modal title={"Course's Information"} open={onView} setOpen={setOnView} actionTitle="Done !" handleAction={closeCRUD} >

                                                <table className="ml-auto text-slate-800 dark:text-white text-sm">
                                                    <tbody>
                                                    <tr className='my-2 w-full'>
                                                        <td className='font-semibold'>Course title     </td>
                                                        <td className='ml-auto p-1'><span className='mr-2'>:</span>{selectedCourse.title} </td>
                                                    </tr>
                                                    <tr className='my-2 w-full'>
                                                        <td className='font-semibold'>Description     </td>
                                                        <td className='ml-auto p-1'><span className='mr-2'>:</span>{selectedCourse.description} </td>
                                                    </tr>
                                                    <tr className='my-2 w-full'>
                                                        <td className='font-semibold'>Capacity     </td>
                                                        <td className='ml-auto p-1'><span className='mr-2'>:</span>{selectedCourse.capacity} </td>
                                                    </tr>
                                                    <tr className='my-2 w-full'>
                                                        <td className='font-semibold'>Available ?     </td>
                                                        <td className='ml-auto class flex items-center'><span className='mr-2'>:</span> <ActiveCell value={selectedCourse.active} />  </td>
                                                    </tr>
                                                    </tbody>
                                                </table>

                                            </Modal>
                                        }
                                        {
                                            onDelete &&
                                            <DeleteModal title={'Delete ' + selectedCourse.title + ' course'} open={onDelete} setOpen={setOnDelete} handleDelete={() => handleDelete(selectedCourse)} >
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

export default Courses
