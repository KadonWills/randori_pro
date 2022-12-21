import React, { useState, useEffect } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';

import DatePicker from 'react-datepicker';

import {Calendar, dateFnsLocalizer} from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import "react-datepicker/dist/react-datepicker.css"

import {enUS, de} from 'date-fns/locale';

const locales = {
    'en-US': enUS,
    'de': de
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
});


const emptyEvent = {
    title: "",
    allDay: false,
    start: new Date(),
    end: new Date(),
}

const CalendarScreen = (props) => {

    const events = props.events ?? [
        {
            title: "Kung-fu",
            allDay: false,
            start: new Date(2022,8, 25, 10, 0),
            end: new Date(2022,8, 25, 12, 30)
        },
        {
            title: "Karate",
            allDay: false,
            start: new Date(2022,8, 26, 12, 35),
            end: new Date(2022,8, 26, 14, 15)
        },
        {
            title: "Taekwendo",
            allDay: false,
            start: new Date(2022, 8, 16, 14, 20),
            end: new Date(2022, 8, 16, 16, 0)
        }
    ];

    const [search, setSearch] = useState('');
    const [newEvent, setNewEvent] = useState(emptyEvent);
    const [allEvents, setAllEvents] = useState(events);


    const handleAddEvents = () => {
        setAllEvents([...allEvents, newEvent])
    }




    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-md text-gray-800 dark:text-slate-50 leading-tight">Manage Calendar</h2>}
        >

            <Head title="Course Agenda Management" />

            <div className="py-3 w-full lg:w-10/12">
                <div className="max-w-full mx-auto sm:px-6 ">
                    <div className="bg-white dark:bg-slate-700 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-3  border-b border-gray-200 dark:border-slate-700">
                            <div className="overflow-auto h-full pb-0 px-4 md:px-6">
                                <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                                    Course Events
                                </h1>
                                <h2 className="text-md text-gray-400">
                                    ...
                                </h2>
                            </div>

                        <Calendar
                            localizer={localizer}
                            events={allEvents}
                            startAccessor="start"
                            endAccessor="end"
                            style={{height:500, margin: "50px"}} />

                        </div>

                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}

export default CalendarScreen
