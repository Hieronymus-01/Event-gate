import React, { useState, useEffect } from 'react';
import MainLayouts from '../Layouts/MainLayouts';
import { Link } from 'react-router-dom';
import { supabase } from '../utils/Supabase';
import EventCard from '../components/Icon/EventCard';

const ManageEvents = () => {
    const [events, setEvents] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            const { data: eventsData, error: eventsError } = await supabase
                .from("events")
                .select();
            if (eventsError) alert(eventsError.message);
            if (eventsData) setEvents(eventsData);
        };
        fetchEvents();
    }, []);

    return (
        <MainLayouts>
            <div className="pt-5 max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-green-900">Manage Events</h1>
                    <Link to="/add-event" className="btn btn-primary rounded-full">
                        Add Event
                    </Link>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    {events?.map((event) => (
                        <EventCard
                            key={event.id}
                            event={event}
                            setEvents={setEvents}
                        />
                    ))}
                </div>
                {events?.length === 0 && (
                    <div className="text-center py-20 text-gray-400">
                        No events yet. Click "Add Event" to create one.
                    </div>
                )}
            </div>
        </MainLayouts>
    );
};

export default ManageEvents;