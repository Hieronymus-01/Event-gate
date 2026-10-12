import React, { useEffect, useState, useContext } from 'react';
import MainLayouts from '../Layouts/MainLayouts';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../utils/Supabase';
import { SessionContext } from '../Contexts/SessionContexts';

const ViewEvent = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const { profile } = useContext(SessionContext);

    useEffect(() => {
        const fetchEvent = async () => {
            const { data, error } = await supabase
                .from('events')
                .select()
                .eq('id', eventId)
                .single();
            if (error) alert(error.message);
            if (data) setEvent(data);
        };
        fetchEvent();
    }, [eventId]);

    return (
        <MainLayouts>
            <div className="max-w-2xl mx-auto py-16 px-4">

                {/* Back Button */}
                <Link
                    to="/events"
                    className="text-sm text-green-700 hover:underline mb-8 inline-block"
                >
                    ← Back to Events
                </Link>

                {/* Event Card */}
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">

                    {/* Top Banner */}
                    <div className="bg-green-900 h-24 flex items-end px-8 pb-4">
                        <h1 className="text-2xl font-bold text-white">
                            {event?.title}
                        </h1>
                    </div>

                    {/* Event Details */}
                    <div className="px-8 py-8 space-y-5">
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Start Date</p>
                            <p className="text-gray-800 font-medium">{event?.start_date || '—'}</p>
                            <div className="border-b border-gray-100 mt-3" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">End Date</p>
                            <p className="text-gray-800 font-medium">{event?.end_date || '—'}</p>
                            <div className="border-b border-gray-100 mt-3" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Start Time</p>
                            <p className="text-gray-800 font-medium">{event?.start_time || '—'}</p>
                            <div className="border-b border-gray-100 mt-3" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">End Time</p>
                            <p className="text-gray-800 font-medium">{event?.end_time || '—'}</p>
                            <div className="border-b border-gray-100 mt-3" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Location</p>
                            <p className="text-gray-800 font-medium">{event?.location || '—'}</p>
                        </div>
                        <div>
    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Description</p>
    <p className="text-gray-800 font-medium whitespace-pre-wrap">{event?.description || '—'}</p>
</div>
                    </div>

                    {/* Admin Actions */}
                    {profile?.role === 'admin' && (
                        <div className="px-8 pb-8 flex gap-3">
                            <Link
                                to={`/edit-event/${eventId}`}
                                className="btn btn-primary rounded-full btn-outline"
                            >
                                Edit Event
                            </Link>
                            <button className="btn btn-secondary rounded-full">
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </MainLayouts>
    );
};

export default ViewEvent;