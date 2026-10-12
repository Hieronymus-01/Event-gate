import React, { useContext } from "react";
import Card from "./Card";
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

    if (today < start) return { label: 'Upcoming', style: 'bg-blue-100 text-blue-700' };
    if (today > end) return { label: 'Ended', style: 'bg-gray-100 text-gray-500' };
    return { label: 'Ongoing', style: 'bg-green-100 text-green-700' };
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
        <Card>
            {/* Status Badge + Registration Count */}
            <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${status.style}`}>
                    {status.label}
                </span>
                <span className="text-xs text-gray-400 font-medium">
                    {registrationCount} {registrationCount === 1 ? 'student' : 'students'} registered
                </span>
            </div>

            <h2 className="text-xl font-bold">{event.title}</h2>
            <p className="text-sm text-gray-500 mt-1">Start Date: {event.start_date}</p>
            <p className="text-sm text-gray-500">End Date: {event.end_date}</p>
            <p className="text-sm text-gray-500">Start Time: {event.start_time}</p>
            <p className="text-sm text-gray-500">End Time: {event.end_time}</p>
            <p className="text-sm text-gray-500">Location: {event.location}</p>

            <div className="pt-5 flex flex-wrap gap-2">
                <Link
                    to={`/view-event/${event.id}`}
                    className="btn btn-primary rounded-full btn-outline btn-sm"
                >
                    View
                </Link>

                {profile?.role === "admin" && (
                    <>
                        <Link
                            to={`/edit-event/${event.id}`}
                            className="btn btn-primary rounded-full btn-sm"
                        >
                            Edit
                        </Link>
                        <button
                            className="btn btn-error rounded-full text-white btn-sm"
                            onClick={deleteEvent}
                        >
                            Delete
                        </button>
                    </>
                )}

                {profile?.role === "user" && !isRegistered && (
                    <button
                        className="btn btn-primary rounded-full btn-sm"
                        onClick={register}
                        disabled={status.label === 'Ended'}
                    >
                        Register
                    </button>
                )}

                {profile?.role === "user" && isRegistered && (
                    <button
                        className="btn btn-secondary rounded-full btn-sm"
                        onClick={unregister}
                    >
                        Unregister
                    </button>
                )}
            </div>
        </Card>
    );
};

export default EventCard;