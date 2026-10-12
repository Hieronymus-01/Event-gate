import React, { useState } from 'react'
import Input from '../Forms/Input'
import { supabase } from '../../utils/Supabase'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../../Contexts/ToastContext'

const EventForm = ({ eventData = null }) => {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isEdit = !!eventData;

    const insertEvent = async (formEvent) => {
        const formData = new FormData(formEvent.target);
        const formDataObject = Object.fromEntries(formData.entries());

        const { data: eventDataResult, error: eventError } = await supabase
            .from("events")
            .insert(formDataObject)
            .select()
            .single();

        if (eventError) showToast(eventError.message, 'error');
        if (eventDataResult) {
            showToast('Event created successfully!', 'success');
            navigate("/manage-events");
        }
    };

    const updateEvent = async (formEvent) => {
        const formData = new FormData(formEvent.target);
        const formDataObject = Object.fromEntries(formData.entries());

        const { data: eventDataResult, error: eventError } = await supabase
            .from("events")
            .update(formDataObject)
            .eq("id", eventData.id)
            .select()
            .single();

        if (eventError) showToast(eventError.message, 'error');
        if (eventDataResult) {
            showToast('Event updated successfully!', 'success');
            navigate("/manage-events");
        }
    };

    const handleSubmit = async (formEvent) => {
        formEvent.preventDefault();
        setIsSubmitting(true);
        try {
            if (!eventData) {
                await insertEvent(formEvent);
            } else {
                await updateEvent(formEvent);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <div className="w-full px-6 py-5">

            {/* Page header */}
            <div className="mb-6">
                <p className="text-[10px] font-bold tracking-[1.8px] text-amber-600 uppercase mb-1">
                    {isEdit ? 'Edit Event' : 'Create Event'}
                </p>
                <h1 className="text-2xl 2xl:text-3xl font-extrabold text-green-900 leading-tight">
                    {isEdit ? eventData?.title || 'Edit Event' : 'Add New Event'}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    {isEdit
                        ? 'Update the details below and save your changes.'
                        : 'Fill in the details below to create a new event.'}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                {/* ---------- LEFT: main fields ---------- */}
                <div className="lg:col-span-2 space-y-5">

                    {/* Event Details */}
                    <section className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#166534" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-sm font-extrabold text-green-900">Event Details</h2>
                                <p className="text-[11px] text-gray-400">Give your event a clear, descriptive name.</p>
                            </div>
                        </div>

                        <Input
                            type="text"
                            label="Title"
                            placeholder="Enter Title"
                            name="title"
                            defaultValue={eventData?.title}
                        />
                    </section>

                    {/* Description */}
                    <section className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#166534" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 6h16M4 12h16M4 18h10" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-sm font-extrabold text-green-900">Description</h2>
                                <p className="text-[11px] text-gray-400">What is this event about? Who should attend?</p>
                            </div>
                        </div>

                        <textarea
                            className="w-full min-h-[280px] border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 resize-none"
                            placeholder="Describe the event, format, prizes, or anything attendees should know..."
                            name="description"
                            defaultValue={eventData?.description}
                        />
                    </section>

                </div>

                {/* ---------- RIGHT: sidebar ---------- */}
                <div className="space-y-5">

                    {/* Schedule */}
                    <section className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#166534" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" />
                                    <path d="M16 2v4M8 2v4M3 10h18" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-sm font-extrabold text-green-900">Schedule</h2>
                                <p className="text-[11px] text-gray-400">When is it happening?</p>
                            </div>
                        </div>

                        <Input
                            type="date"
                            label="Start Date"
                            placeholder="Select Start Date"
                            name="start_date"
                            defaultValue={eventData?.start_date}
                        />
                        <Input
                            type="date"
                            label="End Date"
                            placeholder="Select End Date"
                            name="end_date"
                            defaultValue={eventData?.end_date}
                        />
                        <Input
                            type="time"
                            label="Start Time"
                            placeholder="Select Start Time"
                            name="start_time"
                            defaultValue={eventData?.start_time}
                        />
                        <Input
                            type="time"
                            label="End Time"
                            placeholder="Select End Time"
                            name="end_time"
                            defaultValue={eventData?.end_time}
                        />
                    </section>

                    {/* Location */}
                    <section className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#166534" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 22s7-7.58 7-13a7 7 0 1 0-14 0c0 5.42 7 13 7 13z" />
                                    <circle cx="12" cy="9" r="2.5" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-sm font-extrabold text-green-900">Location</h2>
                                <p className="text-[11px] text-gray-400">Where should attendees go?</p>
                            </div>
                        </div>

                        <Input
                            type="text"
                            label="Location"
                            placeholder="Enter Location"
                            name="location"
                            defaultValue={eventData?.location}
                        />
                    </section>

                    {/* Actions */}
                    <section className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm lg:sticky lg:top-5">
                        <h2 className="text-sm font-extrabold text-green-900 mb-1">
                            {isEdit ? 'Save Changes' : 'Ready to publish?'}
                        </h2>
                        <p className="text-[11px] text-gray-400 mb-4">
                            {isEdit
                                ? 'Your changes will be visible to all users immediately.'
                                : 'The event will appear on the Events page right away.'}
                        </p>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-2.5 rounded-xl bg-green-800 text-white text-sm font-bold hover:bg-green-900 transition disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                                    </svg>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 6 9 17l-5-5" />
                                    </svg>
                                    {isEdit ? 'Save Changes' : 'Create Event'}
                                </>
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={handleCancel}
                            disabled={isSubmitting}
                            className="w-full mt-2 py-2.5 rounded-xl border-2 border-gray-200 text-green-800 text-sm font-bold hover:border-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>
                    </section>

                </div>
            </form>
        </div>
    );
};

export default EventForm;