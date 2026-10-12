import React, { useState, useEffect, useContext } from 'react';
import MainLayouts from '../Layouts/MainLayouts';
import { supabase } from '../utils/Supabase';
import { SessionContext } from '../Contexts/SessionContexts';
import EventCard from '../components/Icon/EventCard';

const MyEvents = () => {
    const [myEvents, setMyEvents] = useState([]);
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const { session, profile } = useContext(SessionContext);

    useEffect(() => {
        const fetchMyEvents = async () => {
            if (!session) return;

            // Fetch registrations for current user
            const { data: regData, error: regError } = await supabase
                .from('registrations')
                .select()
                .eq('profile_id', session.user.id);

            if (regError) {
                alert(regError.message);
                return;
            }

            setRegistrations(regData);

            if (regData.length === 0) {
                setLoading(false);
                return;
            }

            // Get event ids from registrations
            const eventIds = regData.map((reg) => reg.event_id);

            // Fetch events matching those ids
            const { data: eventsData, error: eventsError } = await supabase
                .from('events')
                .select()
                .in('id', eventIds);

            if (eventsError) alert(eventsError.message);
            if (eventsData) setMyEvents(eventsData);

            setLoading(false);
        };

        fetchMyEvents();
    }, [session]);

    return (
        <MainLayouts>
            <div className="max-w-7xl mx-auto px-4 py-10">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-green-900">My Events</h1>
                    <p className="text-gray-400 text-sm mt-1">
                        Events you have registered for.
                    </p>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="text-center py-20 text-gray-400">
                        Loading...
                    </div>
                )}

                {/* Empty State */}
                {!loading && myEvents.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-400 text-lg mb-4">
                            You have not registered for any events yet.
                        </p>
                        <a
                            href="/events"
                            className="btn btn-primary rounded-full px-8"
                        >
                            Browse Events
                        </a>
                    </div>
                )}

                {/* Results count */}
                {!loading && myEvents.length > 0 && (
                    <>
                        <p className="text-sm text-gray-400 mb-4">
                            You are registered for {myEvents.length} event{myEvents.length !== 1 ? 's' : ''}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {myEvents.map((event) => (
                                <EventCard
                                    key={event.id}
                                    event={event}
                                    registrations={registrations}
                                    setRegistrations={setRegistrations}
                                    setEvents={setMyEvents}
                                />
                            ))}
                        </div>
                    </>
                )}

            </div>
        </MainLayouts>
    );
};

export default MyEvents;