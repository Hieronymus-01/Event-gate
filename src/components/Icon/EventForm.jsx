import React from 'react'
import Input from '../Forms/Input'
import { supabase } from '../../utils/Supabase'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../../Contexts/ToastContext'

const EventForm = ({ eventData = null }) => {
    const navigate = useNavigate();
    const { showToast } = useToast();

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

    const handleSubmit = (formEvent) => {
        formEvent.preventDefault();
        if (!eventData) {
            insertEvent(formEvent);
        } else {
            updateEvent(formEvent);
        }
    };

    return (
        <div className="pt-5">
            <form onSubmit={handleSubmit}>
                <div className="flex gap-6">
                    <div className="w-1/3">
                        <Input
                            type="text"
                            label="Title"
                            placeholder="Enter Title"
                            name="title"
                            defaultValue={eventData?.title}
                        />
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
                        <Input
                            type="text"
                            label="Location"
                            placeholder="Enter Location"
                            name="location"
                            defaultValue={eventData?.location}
                        />
                    </div>
                    <div className="flex-1">
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Description</legend>
                            <textarea
                                className="textarea h-full w-full"
                                placeholder="Description"
                                rows={20}
                                name="description"
                                defaultValue={eventData?.description}
                            ></textarea>
                        </fieldset>
                    </div>
                </div>
                <div className="text-right mt-5">
                    <button className="btn btn-primary rounded-full" type="submit">
                        Save Event
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EventForm;