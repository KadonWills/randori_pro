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
import BundleForm from '@/Components/BundleForm';

const emptyBundle = {
    id: null,
    name: "",
    description: "",
    image: "",
    price: 0.0,
    active: true,
    has_discount: false,
    discount_price: "",
    discount_end_date: ""
}

const Bundles = (props) => {

    const [selectedBundle, setSelectedBundle] = useState(emptyBundle);
    const [onCreate, setOnCreate] = useState(false);
    const [onEdit, setOnEdit] = useState(false);
    const [onView, setOnView] = useState(false);
    const [onDelete, setOnDelete] = useState(false);
    const [message, setMessage] = useState(props.flash.message);


    const handleFilter = (e) => {
        const { value } = e.target
        //console.log(value);
        setSearch(value)
        Inertia.get(route('bundles'), { search: value }, {
            preserveState: true
        });
    }

    const openEdit = (bundle_id) => {
        let bundle = props.bundles.data.find(u => u.id === bundle_id);
        setSelectedBundle(bundle);
        setOnEdit(true)
    }
    const openView = (bundle_id) => {
        let bundle = props.bundles.data.find(u => u.id === bundle_id);
        setSelectedBundle(bundle);
        setOnView(true)
    }

    const openDelete = (bundle_id) => {
        let bundle = props.bundles.data.find(u => u.id === bundle_id);
        setSelectedBundle(bundle);
        setOnDelete(true)
    }
    const closeCRUD = () => {
        setSelectedBundle(emptyBundle);
        setOnEdit(false)
        setOnView(false)
        setOnCreate(false)
        setOnDelete(false)
    }

    const handleDelete = (bundle) => {
        Inertia.delete(route('bundles.delete', { id: bundle.id }),
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
                Header: "Label",
                accessor: "name",
                Cell: AvatarCell,
                imgAccessor: "image",
            },
            {
                Header: "Description",
                accessor: "description",
            },
            {
                Header: "Active",
                accessor: "active",
                Filter: SelectColumnFilter,
                Cell: ActiveCell
            },
            {
                Header: "Price",
                accessor: "price",
                Cell: moneyFormat
            },
            {
                Header: "Has Discount ?",
                accessor: "has_discount",
                Cell: ActiveCell
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
            header={<h2 className="font-semibold text-md text-gray-800 dark:text-white leading-tight">Manage Bundles</h2>}
        >

            <Head title="Bundles Management" />

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
                                            Here is a list of randori&#x27;s bundles. You can create, view, edit or delete any bundle !
                                        </h2>
                                    </>}

                                <section className="flex flex-col w-full mt-5">
                                    <div className="flex justify-between mb-5">
                                        <div className="flex space-x-2 items-center">
                                            <PrimaryButton handleClick={() => setOnCreate(true)} type='button' className='bg-blue-600' > Create A Bundle </PrimaryButton>
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

                                    <Table columns={columns} data={props.bundles.data} />

                                    <div>

                                        {
                                            onCreate &&
                                            <SlideOver title={"Create a bundle"} open={onCreate} setOpen={() => closeCRUD()}>
                                                <BundleForm setMessage={setMessage} isAdmin={props.auth.user.role_id == 1} bundle={emptyBundle} roles={props.roles} classrooms={props.classrooms} />
                                            </SlideOver>
                                        }

                                        {
                                            onEdit &&
                                            <SlideOver title={selectedBundle.name + "'s info"} open={onEdit} setOpen={() => closeCRUD()}>
                                                <BundleForm setMessage={setMessage} isAdmin={props.auth.user.role_id == 1} bundle={selectedBundle} roles={props.roles} classrooms={props.classrooms} />
                                            </SlideOver>
                                        }

                                        {
                                            onView &&
                                            <Modal title={"Bundle's Information"} open={onView} setOpen={setOnView} actionTitle="Done !" handleAction={closeCRUD} >

                                                <table className="ml-auto text-slate-800 dark:text-white text-sm">
                                                    <tr className='my-2 w-full'>
                                                        <td className='font-semibold'>Label     </td>
                                                        <td className='ml-auto p-1'><span className='mr-2'>:</span>{selectedBundle.name} </td>
                                                    </tr>
                                                    <tr className='my-2 w-full'>
                                                        <td className='font-semibold'>Description     </td>
                                                        <td className='ml-auto p-1'><span className='mr-2'>:</span>{selectedBundle.description} </td>
                                                    </tr>
                                                    <tr className='my-2 w-full'>
                                                        <td className='font-semibold'>Price     </td>
                                                        <td className='ml-auto p-1'><span className='mr-2'>:</span>{moneyFormat({value: selectedBundle.price})} </td>
                                                    </tr>
                                                   {
                                                    (selectedBundle.has_discount == true )&&
                                                    <> <tr className='my-2 w-full'>
                                                        <td className='font-semibold'>Discount Price    </td>
                                                        <td className='ml-auto p-1'><span className='mr-2'>:</span>{moneyFormat({value: selectedBundle.discount_price})} </td>
                                                    </tr>
                                                    <tr className='my-2 w-full'>
                                                        <td className='font-semibold'>Discount End Date    </td>
                                                        <td className='ml-auto p-1'><span className='mr-2'>:</span>{selectedBundle.discount_end_date} </td>
                                                    </tr>
                                                    </>}
                                                    <tr className='my-2 w-full'>
                                                        <td className='font-semibold'>Active     </td>
                                                        <td className='ml-auto  flex items-center space-x-2'><span className=''>:</span> <ActiveCell value={selectedBundle.active} />  </td>
                                                    </tr>
                                                </table>

                                            </Modal>
                                        }
                                        {
                                            onDelete &&
                                            <DeleteModal title={'Delete ' + selectedBundle.name + ' bundle'} open={onDelete} setOpen={setOnDelete} handleDelete={() => handleDelete(selectedBundle)} >
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

export default Bundles
