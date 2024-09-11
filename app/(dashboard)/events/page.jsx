'use client'
import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import Card from '@/components/ui/Card'
import { useState } from 'react'
import Modal from '@/components/ui/Modal'
import AddEventsForm from '@/components/event/add-event-form/page'
import EditEventsForm from '@/components/event/edit-event-form/page'
import { useMutation, useQuery } from '@tanstack/react-query'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import dayjs from 'dayjs'

export default function Events() {
    const [showAddEventsModal, setShowAddEventsModal] = useState(false)
    const [showEditEventsModal, setShowEditEventsModal] = useState(false)
    const [eventId, setEventId] = useState('')
    const token = getCookie('token')

    const updateEventDrop = useMutation({
        mutationFn: async (values) => {
            const data = new URLSearchParams({
                start: dayjs(values.start).format('YYYY-MM-DD'),
                end: dayjs(values.end).format('YYYY-MM-DD'),
                start_time: dayjs(values.start).format('YYYY-MM-DD'),
                end_time: dayjs(values.end)
                    .subtract(1, 'day')
                    .format('YYYY-MM-DD'),
            }).toString()
            return http(token).patch(`/events/${eventId}`, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['events'] })
            setLoading(false)
        },
        onError: (err) => {
            setLoading(false)
        },
    })

    const updateEventEndDate = useMutation({
        mutationFn: async (values) => {
            const data = new URLSearchParams({
                end: dayjs(values.end).format('YYYY-MM-DD'),
                end_time: dayjs(values.end)
                    .subtract(1, 'day')
                    .format('YYYY-MM-DD'),
            }).toString()
            return http(token).patch(`/events/${eventId}`, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['events'] })
            setLoading(false)
        },
        onError: (err) => {
            setLoading(false)
        },
    })

    async function fetchEvents() {
        const { data } = await http(token).get('/events')
        return data.results.data
    }

    const { data: eventsData } = useQuery({
        queryKey: ['events'],
        queryFn: () => fetchEvents(),
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    return (
        <div className="dashcode-calender">
            <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4 mb-6">
                Acara
            </h4>
            <div className="grid grid-cols-12 gap-4">
                <Card className="lg:col-span-12 col-span-12 bg-white">
                    <FullCalendar
                        height={600}
                        plugins={[
                            dayGridPlugin,
                            timeGridPlugin,
                            interactionPlugin,
                            listPlugin,
                        ]}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
                        }}
                        editable
                        selectable
                        droppable
                        selectMirror
                        dayMaxEvents={2}
                        weekends
                        events={eventsData ? eventsData : []} // Ensure eventsData is an array before passing it to events prop
                        initialView="dayGridMonth"
                        eventDragStart={(data) => {
                            setEventId(data.event.id)
                        }}
                        eventResizeStart={(data) => {
                            setEventId(data.event.id)
                        }}
                        eventDrop={(data) => {
                            updateEventDrop.mutate({
                                id: data.event.id,
                                start: data.event.start,
                                end: data.event.end,
                            })
                        }}
                        eventResize={(data) => {
                            updateEventEndDate.mutate({
                                id: data.event.id,
                                end: data.event.end,
                            })
                        }}
                        dateClick={(data) => {
                            setShowAddEventsModal(!showAddEventsModal)
                        }}
                        eventClick={(data) => {
                            setShowEditEventsModal(!showEditEventsModal)
                            setEventId(data.event.id)
                        }}
                    />
                </Card>
            </div>
            <Modal
                title="Tambah Acara"
                label="Tambah Acara"
                className="max-w-5xl"
                labelClass="btn-outline-dark"
                activeModal={showAddEventsModal}
                onClose={() => {
                    setShowAddEventsModal(!showAddEventsModal)
                }}
            >
                <AddEventsForm setShowAddEventsModal={setShowAddEventsModal} />
            </Modal>
            <Modal
                title="Edit Acara"
                label="Edit Acara"
                className="max-w-5xl"
                labelClass="btn-outline-dark"
                activeModal={showEditEventsModal}
                onClose={() => {
                    setShowEditEventsModal(!showEditEventsModal)
                }}
            >
                <EditEventsForm
                    eventId={eventId}
                    setShowEditEventsModal={setShowEditEventsModal}
                />
            </Modal>
        </div>
    )
}
