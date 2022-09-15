import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon, EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useTable, useGlobalFilter, useAsyncDebounce, useFilters, useSortBy, usePagination } from "react-table";
import PrimaryButton from "./PrimaryButton";
import { Button, PageButton } from './shared/Button'
import { SortDownIcon, SortIcon, SortUpIcon } from "./shared/Icons";
import { classNames } from "./shared/Utils";


const GlobalFilter = ({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) => {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <label className="flex gap-x-2 items-baseline">
            <span className="text-gray-700 dark:text-gray-200">Search: </span>
            <input
                type="text"
                className="mt-1 block  rounded-md dark:bg-transparent border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={value || ""}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} records...`}
            />
        </label>
    )
}

// This is a custom filter UI for selecting
// a unique option from a list
export function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id, render },
}) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
        const options = new Set();
        preFilteredRows.forEach((row) => {
            options.add(row.values[id]);
        });
        return [...options.values()];
    }, [id, preFilteredRows]);

    // Render a multi-select box
    return (
        <label className="flex gap-x-2 items-baseline">
            <span className="text-gray-700">{render("Header")}: </span>
            <select
                className="mt-1 block dark:bg-transparent dark:text-white  rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                name={id}
                id={id}
                value={filterValue}
                onChange={e => {
                    setFilter(e.target.value || undefined)
                }}
            >
                <option value="">All</option>
                {options.map((option, i) => (
                    <option key={i} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </label>
    );
}


export function RolePill({ value }) {
    const status = value ? value.toLowerCase() : "unknown";

    return (
        <span
            className={classNames(
                "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
                status.startsWith("admin") ? "bg-slate-100 text-slate-700" : null,
                status.startsWith("student") ? "bg-blue-100 text-blue-700" : null,
                status.startsWith("tutor") ? "bg-teal-100 text-teal-700" : null
            )}
        >
            {status}
        </span>
    );
}

export const ActiveCell = ({ value }) => (<div className={`w-3 h-3 rounded-full ${value ? 'bg-green-600': 'bg-red-600'}`}> &nbsp; </div>)

export function actionButtons({column, row}) {
    return (
        <div className="flex flex-col md:flex-row space-y-1 md:space-y-0 md:space-x-1 text-center">
            <PrimaryButton type='button' handleClick={() => column.openView(row.original[column.itemId])} className='bg-gray-200 text-black w-10 h-10 py-0' > <EyeIcon className="w-full h-full" /> </PrimaryButton>
            <PrimaryButton type='button' handleClick={() => column.openEdit(row.original[column.itemId])} className='bg-blue-300 text-blue-700 w-10 h-10 py-0' > <PencilIcon className="w-full h-full" /> </PrimaryButton>
            <PrimaryButton type='button' handleClick={() => column.openDelete(row.original[column.itemId])} className='bg-red-300 text-red-700 w-10 h-10 py-0' > <TrashIcon className="w-full h-full" /> </PrimaryButton>
        </div>
    )
}

export function AvatarCell({ value, column, row }) {
    return (
        <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
                <img
                    className="h-10 w-10 rounded-full"
                    src={row.original[column.imgAccessor]}
                    alt=""
                />
            </div>
            <div className="ml-4">
                <div className="text-sm font-medium text-gray-900 dark:text-white">{value}</div>
                <div className="text-sm text-gray-500 dark:text-blue-400">
                    {row.original[column.emailAccessor]}
                </div>
            </div>
        </div>
    );
}

const Table = ({ columns, data }) => {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps, getTableBodyProps, headerGroups, prepareRow, page,
        canPreviousPage, canNextPage, pageOptions, pageCount, gotoPage, nextPage, previousPage, setPageSize,
        state, preGlobalFilteredRows, setGlobalFilter
    } = useTable({
        columns,
        data,
    },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    // Render the UI for your table
    return (
        <>
            <div className="flex items-center justify-between">
                <GlobalFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                />

                {headerGroups.map((headerGroup, i) =>
                    headerGroup.headers.map((column) =>
                        column.Filter ? (
                            <div key={column.id}>
                                {/* <label htmlFor={column.id}>{column.render("Header")}: </label> */}
                                {column.render("Filter")}
                            </div>
                        ) : null
                    )
                )}
            </div>

            <div className="mt-2 flex flex-col">
                <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 dark:border-gray-500 sm:rounded-lg">
                            <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50 dark:bg-slate-900">
                                    {headerGroups.map(headerGroup => (
                                        <tr {...headerGroup.getHeaderGroupProps()}>
                                            {headerGroup.headers.map(column => (
                                                // Add the sorting props to control sorting. For this example
                                                // we can add them into the header props
                                                <th
                                                    scope="col"
                                                    className=" px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-200 uppercase tracking-wider"
                                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        {column.render('Header')}
                                                        {/* Add a sort direction indicator */}
                                                        <span className="scale-90">
                                                            {column.isSorted
                                                                ? column.isSortedDesc
                                                                    ? <SortDownIcon className="w-4 h-4 text-gray-400" />
                                                                    : <SortUpIcon className="w-4 h-4 text-gray-400" />
                                                                : (
                                                                    <SortIcon className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
                                                                )}
                                                        </span>
                                                    </div>
                                                </th>
                                            ))}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody
                                    {...getTableBodyProps()}
                                    className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-gray-700"
                                >
                                    {page.map((row, i) => {
                                        prepareRow(row)
                                        return (
                                            <tr {...row.getRowProps()}>
                                                {row.cells.map(cell => {
                                                    return (
                                                        <td
                                                            {...cell.getCellProps()}
                                                            className="px-6 py-4 whitespace-nowrap dark:text-slate-100"
                                                            role="cell"
                                                        >
                                                            {cell.column.Cell.name === "defaultRenderer" ? (
                                                                <div className="text-sm text-gray-500 dark:text-white ">{cell.render("Cell")}</div>
                                                            ) : (
                                                                cell.render("Cell")
                                                            )}
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-3 flex items-center justify-between">
                <div className="flex-1 flex justify-between sm:hidden">
                    <Button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</Button>
                    <Button onClick={() => nextPage()} disabled={!canNextPage}>Next</Button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div className="flex gap-x-2">
                        <label>
                            <span className="sr-only">Items Per Page</span>
                            <select
                                className="mt-1 block w-full rounded-md border-gray-300 dark:bg-slate-700 dark:text-white shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={state.pageSize}
                                onChange={(e) => {
                                    setPageSize(Number(e.target.value));
                                }}
                            >
                                {[5, 10, 20].map((pageSize) => (
                                    <option key={pageSize} value={pageSize}>
                                        Show {pageSize}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            <PageButton
                                className="rounded-l-md"
                                onClick={() => gotoPage(0)}
                                disabled={!canPreviousPage}
                            >
                                <span className="sr-only">First</span>
                                <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
                            </PageButton>
                            <PageButton
                                onClick={() => previousPage()}
                                disabled={!canPreviousPage}
                            >
                                <span className="sr-only">Previous</span>
                                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                            </PageButton>
                            <PageButton
                                onClick={() => nextPage()}
                                disabled={!canNextPage
                                }>
                                <span className="sr-only">Next</span>
                                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                            </PageButton>
                            <PageButton
                                className="rounded-r-md"
                                onClick={() => gotoPage(pageCount - 1)}
                                disabled={!canNextPage}
                            >
                                <span className="sr-only">Last</span>
                                <ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />
                            </PageButton>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Table;
