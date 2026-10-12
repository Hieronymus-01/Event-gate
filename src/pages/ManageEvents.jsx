import React, { useState, useEffect } from 'react';
import MainLayouts from '../Layouts/MainLayouts';
import { Link } from 'react-router-dom';
import { supabase } from '../utils/Supabase';
import EventCard from '../components/Icon/EventCard';

const getStatusKey = (startDate, endDate) => {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    today.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    if (today < start) return 'upcoming';
    if (today > end) return 'ended';
    return 'ongoing';
};

const ManageEvents = () => {
    const [events, setEvents] = useState(null);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

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

    const allEvents = events ?? [];

    const filteredEvents = allEvents.filter((event) => {
        const matchesSearch = event.title?.toLowerCase().includes(search.toLowerCase());
        const matchesStatus =
            statusFilter === 'all' ||
            getStatusKey(event.start_date, event.end_date) === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const stats = allEvents.reduce(
        (acc, e) => {
            const key = getStatusKey(e.start_date, e.end_date);
            acc[key]++;
            return acc;
        },
        { ongoing: 0, upcoming: 0, ended: 0 }
    );

    const clearFilters = () => {
        setSearch('');
        setStatusFilter('all');
    };

    const hasFilters = search || statusFilter !== 'all';

    return (
        <MainLayouts>
            <div className="flex-1 w-full flex gap-6 px-6 py-5 min-h-0">

                {/* ---------- SIDEBAR ---------- */}
                <aside className="w-72 2xl:w-80 shrink-0 flex flex-col gap-4">

                    <div>
                        <p className="text-[10px] font-bold tracking-[1.8px] text-amber-600 uppercase mb-1">
                            Admin Panel
                        </p>
                        <h1 className="text-2xl 2xl:text-3xl font-extrabold text-green-900 leading-tight">
                            Manage Events
                        </h1>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">
                            Filters
                        </p>

                        <div className="space-y-3">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                                    Search
                                </label>
                                <div className="relative">
                                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round">
                                        <circle cx="11" cy="11" r="7" />
                                        <path d="m20 20-3.5-3.5" />
                                    </svg>
                                    <input
                                        type="text"
                                        placeholder="Event name..."
                                        className="w-full border border-gray-200 rounded-lg pl-8 pr-3 py-2 text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                                    Status
                                </label>
                                <div className="space-y-1.5">
                                    {[
                                        { key: 'all', label: 'All', dot: null },
                                        { key: 'ongoing', label: 'Ongoing', dot: '#16a34a' },
                                        { key: 'upcoming', label: 'Upcoming', dot: '#2563eb' },
                                        { key: 'ended', label: 'Ended', dot: '#dc2626' },
                                    ].map((opt) => (
                                        <button
                                            key={opt.key}
                                            onClick={() => setStatusFilter(opt.key)}
                                            className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${statusFilter === opt.key
                                                ? 'bg-green-50 text-green-800 border border-green-200'
                                                : 'text-gray-600 hover:bg-gray-50 border border-transparent'
                                                }`}
                                        >
                                            {opt.dot && (
                                                <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: opt.dot }} />
                                            )}
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {hasFilters && (
                                <button
                                    onClick={clearFilters}
                                    className="w-full flex items-center justify-center gap-1 text-[11px] font-bold text-green-700 hover:text-green-900 pt-1"
                                >
                                    Clear all filters
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                                        <path d="M18 6 6 18M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">
                            Quick Stats
                        </p>
                        <div className="space-y-2.5 text-xs">
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-2 text-gray-600">
                                    <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: '#16a34a' }} />
                                    Ongoing
                                </span>
                                <span className="font-extrabold text-green-900">{stats.ongoing}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-2 text-gray-600">
                                    <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: '#2563eb' }} />
                                    Upcoming
                                </span>
                                <span className="font-extrabold text-green-900">{stats.upcoming}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-2 text-gray-600">
                                    <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: '#dc2626' }} />
                                    Ended
                                </span>
                                <span className="font-extrabold text-green-900">{stats.ended}</span>
                            </div>
                            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                <span className="text-gray-500">Total</span>
                                <span className="font-extrabold text-green-900">{allEvents.length}</span>
                            </div>
                        </div>
                    </div>

                </aside>

                {/* ---------- MAIN AREA ---------- */}
                <section className="flex-1 min-w-0 flex flex-col min-h-0">

                    <div className="flex items-center justify-between mb-4 shrink-0">
                        <p className="text-sm text-gray-500">
                            Showing <span className="font-bold text-green-900">{filteredEvents.length}</span> of{' '}
                            <span className="font-bold text-green-900">{allEvents.length}</span> event
                            {allEvents.length !== 1 ? 's' : ''}
                        </p>
                        <Link
                            to="/add-event"
                            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-green-800 text-white text-xs font-bold hover:bg-green-900 transition"
                        >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                                <path d="M12 5v14M5 12h14" />
                            </svg>
                            Add Event
                        </Link>
                    </div>

                    {events === null && (
                        <div className="flex-1 flex items-center justify-center">
                            <p className="text-sm text-gray-400">Loading...</p>
                        </div>
                    )}

                    {events !== null && filteredEvents.length > 0 && (
                        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                            {filteredEvents.map((event) => (
                                <EventCard
                                    key={event.id}
                                    event={event}
                                    setEvents={setEvents}
                                />
                            ))}
                        </div>
                    )}

                    {events !== null && allEvents.length === 0 && (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-14 h-14 rounded-full bg-gray-100 mx-auto mb-3 flex items-center justify-center">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="4" width="18" height="18" rx="2" />
                                        <path d="M16 2v4M8 2v4M3 10h18" />
                                    </svg>
                                </div>
                                <h3 className="text-base font-bold text-green-900 mb-1">No events yet</h3>
                                <p className="text-gray-500 text-xs mb-4">Click "Add Event" to create your first one.</p>
                                <Link
                                    to="/add-event"
                                    className="inline-block px-4 py-1.5 rounded-full bg-green-800 text-white text-xs font-bold hover:bg-green-900"
                                >
                                    Add Event
                                </Link>
                            </div>
                        </div>
                    )}

                    {events !== null && allEvents.length > 0 && filteredEvents.length === 0 && (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-14 h-14 rounded-full bg-gray-100 mx-auto mb-3 flex items-center justify-center">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="11" cy="11" r="7" />
                                        <path d="m20 20-3.5-3.5" />
                                    </svg>
                                </div>
                                <h3 className="text-base font-bold text-green-900 mb-1">No events match</h3>
                                <p className="text-gray-500 text-xs mb-4">Try adjusting your filters.</p>
                                <button
                                    onClick={clearFilters}
                                    className="px-4 py-1.5 rounded-full bg-green-800 text-white text-xs font-bold hover:bg-green-900"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        </div>
                    )}

                </section>
            </div>
        </MainLayouts>
    );
};

export default ManageEvents;