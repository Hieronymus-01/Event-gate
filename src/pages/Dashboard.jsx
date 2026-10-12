import React, { useState, useEffect, useContext } from 'react';
import MainLayouts from '../Layouts/MainLayouts';
import { supabase } from '../utils/Supabase';
import { SessionContext } from '../Contexts/SessionContexts';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { profile } = useContext(SessionContext);
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalEvents: 0,
        totalUsers: 0,
        totalRegistrations: 0,
        upcomingEvents: 0,
        ongoingEvents: 0,
        endedEvents: 0,
    });
    const [recentEvents, setRecentEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Redirect non-admins
        if (profile && profile.role !== 'admin') {
            navigate('/');
        }
    }, [profile]);

    useEffect(() => {
        const fetchStats = async () => {
            // Total events
            const { data: events } = await supabase.from('events').select();
            // Total users
            const { data: users } = await supabase.from('profiles').select();
            // Total registrations
            const { data: registrations } = await supabase.from('registrations').select();

            if (events) {
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                const upcoming = events.filter((e) => {
                    const start = new Date(e.start_date);
                    start.setHours(0, 0, 0, 0);
                    return today < start;
                }).length;

                const ongoing = events.filter((e) => {
                    const start = new Date(e.start_date);
                    const end = new Date(e.end_date);
                    start.setHours(0, 0, 0, 0);
                    end.setHours(0, 0, 0, 0);
                    return today >= start && today <= end;
                }).length;

                const ended = events.filter((e) => {
                    const end = new Date(e.end_date);
                    end.setHours(0, 0, 0, 0);
                    return today > end;
                }).length;

                setStats({
                    totalEvents: events.length,
                    totalUsers: users?.length ?? 0,
                    totalRegistrations: registrations?.length ?? 0,
                    upcomingEvents: upcoming,
                    ongoingEvents: ongoing,
                    endedEvents: ended,
                });

                // Recent 3 events
                const sorted = [...events].sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                );
                setRecentEvents(sorted.slice(0, 3));
            }

            setLoading(false);
        };

        fetchStats();
    }, []);

    const StatCard = ({ label, value, style }) => (
        <div className={`bg-white border rounded-2xl shadow-sm p-6 ${style}`}>
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">{label}</p>
            <p className="text-4xl font-bold text-green-900">{value}</p>
        </div>
    );

    return (
        <MainLayouts>
            <div className="max-w-7xl mx-auto px-4 py-10">

                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-green-900">Admin Dashboard</h1>
                    <p className="text-gray-400 text-sm mt-1">
                        Overview of EventGate activity.
                    </p>
                </div>

                {loading ? (
                    <div className="text-center py-20 text-gray-400">Loading...</div>
                ) : (
                    <>
                        {/* Main Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <StatCard
                                label="Total Events"
                                value={stats.totalEvents}
                                style="border-gray-100"
                            />
                            <StatCard
                                label="Total Users"
                                value={stats.totalUsers}
                                style="border-gray-100"
                            />
                            <StatCard
                                label="Total Registrations"
                                value={stats.totalRegistrations}
                                style="border-gray-100"
                            />
                        </div>

                        {/* Event Status Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                            <div className="bg-blue-50 border border-blue-100 rounded-2xl shadow-sm p-6">
                                <p className="text-xs text-blue-400 uppercase tracking-widest mb-1">Upcoming Events</p>
                                <p className="text-4xl font-bold text-blue-700">{stats.upcomingEvents}</p>
                            </div>
                            <div className="bg-green-50 border border-green-100 rounded-2xl shadow-sm p-6">
                                <p className="text-xs text-green-400 uppercase tracking-widest mb-1">Ongoing Events</p>
                                <p className="text-4xl font-bold text-green-700">{stats.ongoingEvents}</p>
                            </div>
                            <div className="bg-gray-50 border border-gray-100 rounded-2xl shadow-sm p-6">
                                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Ended Events</p>
                                <p className="text-4xl font-bold text-gray-500">{stats.endedEvents}</p>
                            </div>
                        </div>

                        {/* Recent Events */}
                        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold text-green-900">Recent Events</h2>
                                <a
                                    href="/manage-events"
                                    className="text-sm text-green-700 hover:underline"
                                >
                                    View all →
                                </a>
                            </div>
                            <div className="space-y-4">
                                {recentEvents.map((event) => (
                                    <div
                                        key={event.id}
                                        className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0"
                                    >
                                        <div>
                                            <p className="font-medium text-gray-800">{event.title}</p>
                                            <p className="text-xs text-gray-400">
                                                {event.start_date} → {event.end_date} · {event.location}
                                            </p>
                                        </div>
                                        <a
                                            href={`/view-event/${event.id}`}
                                            className="btn btn-primary btn-outline btn-sm rounded-full"
                                        >
                                            View
                                        </a>
                                    </div>
                                ))}
                                {recentEvents.length === 0 && (
                                    <p className="text-gray-400 text-sm">No events yet.</p>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </MainLayouts>
    );
};

export default Dashboard;