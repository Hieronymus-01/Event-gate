import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import { SessionContext } from "../../Contexts/SessionContexts";
import { supabase } from "../../utils/Supabase";
import { useToast } from "../../Contexts/ToastContext";

const getEventStatus = (startDate, endDate) => {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    today.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    if (today < start) return { label: 'Upcoming', dot: '#2563eb', cls: 'bg-blue-50 text-blue-700 border border-blue-200' };
    if (today > end) return { label: 'Ended', dot: '#dc2626', cls: 'bg-red-50 text-red-700 border border-red-200' };
    return { label: 'Ongoing', dot: '#16a34a', cls: 'bg-green-50 text-green-700 border border-green-200' };
};

const formatDate = (d) => {
    if (!d) return '—';
    const date = new Date(d);
    if (isNaN(date.getTime())) return d;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const formatTime = (t) => {
    if (!t) return '';
    const parts = String(t).split(':');
    if (parts.length >= 2 && !isNaN(parts[0])) {
        const h = parseInt(parts[0], 10);
        const m = parts[1];
        const ampm = h >= 12 ? 'PM' : 'AM';
        const h12 = h % 12 === 0 ? 12 : h % 12;
        return `${h12}:${m} ${ampm}`;
    }
    return t;
};

const EventCard = ({ event, registrations, setRegistrations, setEvents }) => {
    const { profile } = useContext(SessionContext);
    const { showToast } = useToast();
    const status = getEventStatus(event.start_date, event.end_date);

    const isRegistered = registrations?.some(
        (registration) =>
            registration.profile_id === profile?.id &&
            registration.event_id === event.id,
    );

    const registrationCount = registrations?.filter(
        (registration) => registration.event_id === event.id
    ).length ?? 0;

    const register = async () => {
        const { data, error } = await supabase
            .from("registrations")
            .insert({
                event_id: event.id,
                profile_id: profile.id,
            })
            .select()
            .single();

        if (error) showToast(error.message, 'error');
        if (data) {
            setRegistrations((prev) => [...prev, data]);
            showToast('Successfully registered!', 'success');
        }
    };

    const unregister = async () => {
        const { data: deletedRegistration, error: errorDeleteRegistration } =
            await supabase
                .from("registrations")
                .delete()
                .eq("event_id", event.id)
                .select()
                .single();

        if (errorDeleteRegistration) showToast(errorDeleteRegistration.message, 'error');
        if (deletedRegistration) {
            const updatedRegistrations = registrations.filter(
                (registration) => registration.id !== deletedRegistration.id
            );
            setRegistrations(updatedRegistrations);
            showToast('Successfully unregistered.', 'warning');
        }
    };

    const deleteEvent = async () => {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${event.title}"?`
        );
        if (!confirmed) return;

        const { error } = await supabase
            .from("events")
            .delete()
            .eq("id", event.id);

        if (error) {
            showToast(error.message, 'error');
        } else {
            setEvents((prev) => prev.filter((e) => e.id !== event.id));
            showToast('Event deleted successfully.', 'success');
        }
    };

    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-green-200 cursor-pointer flex flex-col">
            {/* Status + count */}
            <div className="flex items-center justify-between mb-3">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${status.cls}`}>
                    <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: status.dot }} />
                    {status.label}
                </span>
                <span className="text-[10px] text-gray-400 font-medium">
                    {registrationCount} registered
                </span>
            </div>

            {/* Title + location */}
            <h3 className="text-base font-extrabold text-green-900 leading-tight truncate" title={event.title}>
                {event.title}
            </h3>
            <p className="text-[11px] text-gray-400 mb-3 truncate" title={event.location}>
                {event.location || '—'}
            </p>

            {/* Info rows */}
            <div className="space-y-1.5 mb-4 text-xs flex-1">
                <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5 text-gray-500">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" />
                            <path d="M16 2v4M8 2v4M3 10h18" />
                        </svg>
                        Date
                    </span>
                    <span className="font-semibold text-gray-800 text-right">
                        {formatDate(event.start_date)}
                        {event.end_date && event.end_date !== event.start_date && ` – ${formatDate(event.end_date)}`}
                    </span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5 text-gray-500">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 6v6l4 2" />
                        </svg>
                        Time
                    </span>
                    <span className="font-semibold text-gray-800 text-right">
                        {formatTime(event.start_time)}
                        {event.end_time && ` – ${formatTime(event.end_time)}`}
                    </span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-1.5">
                <Link
                    to={`/view-event/${event.id}`}
                    className="flex-1 text-center py-1.5 rounded-lg border-2 border-green-800 text-green-800 text-[11px] font-bold hover:bg-green-800 hover:text-white transition"
                >
                    View
                </Link>

                {profile?.role === "admin" && (
                    <>
                        <Link
                            to={`/edit-event/${event.id}`}
                            className="flex-1 text-center py-1.5 rounded-lg bg-green-800 text-white text-[11px] font-bold hover:bg-green-900 transition"
                        >
                            Edit
                        </Link>
                        <button
                            className="flex-1 py-1.5 rounded-lg bg-red-600 text-white text-[11px] font-bold hover:bg-red-700 transition"
                            onClick={deleteEvent}
                        >
                            Delete
                        </button>
                    </>
                )}

                {profile?.role === "user" && !isRegistered && (
                    <button
                        className="flex-1 py-1.5 rounded-lg bg-green-800 text-white text-[11px] font-bold hover:bg-green-900 transition disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                        onClick={register}
                        disabled={status.label === 'Ended'}
                        title={status.label === 'Ended' ? 'This event has ended' : 'Register for this event'}
                    >
                        Register
                    </button>
                )}

                {profile?.role === "user" && isRegistered && (
                    <button
                        className="flex-1 py-1.5 rounded-lg bg-amber-500 text-white text-[11px] font-bold hover:bg-amber-600 transition"
                        onClick={unregister}
                    >
                        Unregister
                    </button>
                )}
            </div>
        </div>
    );
};

export default EventCard;