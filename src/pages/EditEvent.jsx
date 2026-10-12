import React from 'react'
import MainLayouts from '../Layouts/MainLayouts'
import { useParams } from 'react-router'
import { useEffect } from 'react';
import { supabase } from '../utils/Supabase';
import { useState } from 'react';
import EventForm from '../components/Icon/EventForm';

const EditEvent = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            const { data: eventData, error: eventError } = await supabase
                .from("events")
                .select()
                .eq("id", eventId)
                .single();
            if (eventError) alert(eventError);
            if (eventData) setEvent(eventData);
        };

        fetchEvent();
    }, [eventId]);
    return (
        <MainLayouts>
            <EventForm eventData={event} />
        </MainLayouts>
    );
};

export default EditEvent;