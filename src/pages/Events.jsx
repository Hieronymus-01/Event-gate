import React, { useState, useEffect, useContext } from 'react';
import MainLayouts from '../Layouts/MainLayouts';
import { supabase } from '../utils/Supabase';
import { SessionContext } from '../Contexts/SessionContexts';
import EventCard from '../components/Icon/EventCard';

const EVENTS_PER_PAGE = 12;

const Events = () => {
    const [events, setEvents] = useState([]);
    const [registrations, setRegistrations] = useState([]);
    const [search, setSearch] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [filterLocation, setFilterLocation] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const { session } = useContext(SessionContext);

    useEffect(() => {
        const fetchEvents = async () => {
            const { data, error } = await supabase.from('events').select();
            if (error) alert(error.message);
            if (data) setEvents(data);
        };

        const fetchRegistrations = async () => {
            const { data, error } = await supabase.from('registrations').select();
            if (error) alert(error.message);
            if (data) setRegistrations(data);
        };

        fetchEvents();
        if (session) fetchRegistrations();
    }, [session]);

    useEffect(() => {
        setCurrentPage(1);
    }, [search, filterDate, filterLocation]);

    const filteredEvents = events.filter((event) => {
        const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase());
        const matchesDate = filterDate ? event.start_date === filterDate : true;
        const matchesLocation = filterLocation
            ? event.location.toLowerCase().includes(filterLocation.toLowerCase())
            : true;
        return matchesSearch && matchesDate && matchesLocation;
    });

    const totalPages = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE);
    const paginatedEvents = filteredEvents.slice(
        (currentPage - 1) * EVENTS_PER_PAGE,
        currentPage * EVENTS_PER_PAGE
    );

    const clearFilters = () => {
        setSearch('');
        setFilterDate('');
        setFilterLocation('');
    };

    const hasFilters = !!(search || filterDate || filterLocation);

    const stats = events.reduce(
        (acc, e) => {
            const today = new Date();
            const start = new Date(e.start_date);
            const end = new Date(e.end_date);
            today.setHours(0, 0, 0, 0);
            start.setHours(0, 0, 0, 0);
            end.setHours(0, 0, 0, 0);
            if (today < start) acc.upcoming++;
            else if (today > end) acc.ended++;
            else acc.ongoing++;
            return acc;
        },
        { ongoing: 0, upcoming: 0, ended: 0 }
    );

    return (
        <MainLayouts>
            <div className="flex-1 w-full flex gap-6 px-6 py-5 min-h-0">

                {/* ---------- SIDEBAR ---------- */}
                <aside className="w-72 2xl:w-80 shrink-0 flex flex-col gap-4">

                    <div>
                        <p className="text-[10px] font-bold tracking-[1.8px] text-amber-600 uppercase mb-1">
                            Browse Events
                        </p>
                        <h1 className="text-2xl 2xl:text-3xl font-extrabold text-green-900 leading-tight">
                            Upcoming Events
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
                                    Date
                                </label>
                                <input
                                    type="date"
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                                    value={filterDate}
                                    onChange={(e) => setFilterDate(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter location..."
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                                    value={filterLocation}
                                    onChange={(e) => setFilterLocation(e.target.value)}
                                />
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
                                <span className="font-extrabold text-green-900">{events.length}</span>
                            </div>
                        </div>
                    </div>

                </aside>

                {/* ---------- MAIN GRID ---------- */}
                <section className="flex-1 min-w-0 flex flex-col min-h-0">

                    <div className="flex items-center justify-between mb-3 shrink-0">
                        <p className="text-sm text-gray-500">
                            Showing <span className="font-bold text-green-900">{paginatedEvents.length}</span> of{' '}
                            <span className="font-bold text-green-900">{filteredEvents.length}</span> event
                            {filteredEvents.length !== 1 ? 's' : ''}
                        </p>
                    </div>

                    {paginatedEvents.length > 0 ? (
                        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                            {paginatedEvents.map((event) => (
                                <EventCard
                                    key={event.id}
                                    event={event}
                                    registrations={registrations}
                                    setRegistrations={setRegistrations}
                                    setEvents={setEvents}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-14 h-14 rounded-full bg-gray-100 mx-auto mb-3 flex items-center justify-center">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="4" width="18" height="18" rx="2" />
                                        <path d="M16 2v4M8 2v4M3 10h18" />
                                    </svg>
                                </div>
                                <h3 className="text-base font-bold text-green-900 mb-1">No events found</h3>
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

                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-auto pt-4">
                            <button
                                className="px-3 py-1.5 rounded-full border border-gray-200 text-xs font-bold text-green-800 hover:border-green-800 disabled:opacity-40 disabled:cursor-not-allowed"
                                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                Prev
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    className={`w-8 h-8 rounded-full text-xs font-bold transition ${currentPage === page
                                        ? 'bg-green-800 text-white'
                                        : 'border border-gray-200 text-green-800 hover:border-green-800'
                                        }`}
                                    onClick={() => setCurrentPage(page)}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                className="px-3 py-1.5 rounded-full border border-gray-200 text-xs font-bold text-green-800 hover:border-green-800 disabled:opacity-40 disabled:cursor-not-allowed"
                                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    )}

                </section>
            </div>
        </MainLayouts>
    );
};

export default Events;