import React, { useState, useEffect, useContext } from 'react';
import MainLayouts from '../Layouts/MainLayouts';
import { supabase } from '../utils/Supabase';
import { SessionContext } from '../Contexts/SessionContexts';
import EventCard from '../components/Icon/EventCard';

const EVENTS_PER_PAGE = 6;

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

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [search, filterDate, filterLocation]);

    // Filter logic
    const filteredEvents = events.filter((event) => {
        const matchesSearch = event.title
            .toLowerCase()
            .includes(search.toLowerCase());
        const matchesDate = filterDate
            ? event.start_date === filterDate
            : true;
        const matchesLocation = filterLocation
            ? event.location
                .toLowerCase()
                .includes(filterLocation.toLowerCase())
            : true;
        return matchesSearch && matchesDate && matchesLocation;
    });

    // Pagination logic
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

    return (
        <MainLayouts>
            <div className="max-w-7xl mx-auto px-4 py-10">

                {/* Header */}
                <h1 className="text-3xl font-bold text-green-900 mb-8">Events</h1>

                {/* Search & Filter Bar */}
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="text-xs text-gray-400 uppercase tracking-widest mb-1 block">
                                Search
                            </label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                placeholder="Search events..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="text-xs text-gray-400 uppercase tracking-widest mb-1 block">
                                Filter by Date
                            </label>
                            <input
                                type="date"
                                className="input input-bordered w-full"
                                value={filterDate}
                                onChange={(e) => setFilterDate(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="text-xs text-gray-400 uppercase tracking-widest mb-1 block">
                                Filter by Location
                            </label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                placeholder="Enter location..."
                                value={filterLocation}
                                onChange={(e) => setFilterLocation(e.target.value)}
                            />
                        </div>
                    </div>
                    {(search || filterDate || filterLocation) && (
                        <div className="mt-4 text-right">
                            <button
                                onClick={clearFilters}
                                className="btn btn-outline btn-sm rounded-full text-gray-500"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>

                {/* Results count */}
                <p className="text-sm text-gray-400 mb-4">
                    Showing {paginatedEvents.length} of {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
                </p>

                {/* Event Cards */}
                {paginatedEvents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    <div className="text-center py-20 text-gray-400">
                        No events found. Try adjusting your search or filters.
                    </div>
                )}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-10">
                        <button
                            className="btn btn-outline btn-sm rounded-full"
                            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            ← Prev
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                className={`btn btn-sm rounded-full ${
                                    currentPage === page
                                        ? 'btn-primary'
                                        : 'btn-outline'
                                }`}
                                onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            className="btn btn-outline btn-sm rounded-full"
                            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            Next →
                        </button>
                    </div>
                )}

            </div>
        </MainLayouts>
    );
};

export default Events;