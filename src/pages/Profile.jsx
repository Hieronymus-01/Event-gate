import React, { useEffect, useContext, useState } from 'react'
import MainLayouts from '../Layouts/MainLayouts';
import { supabase } from '../utils/Supabase';
import { SessionContext } from '../Contexts/SessionContexts';
import { Link } from 'react-router-dom';
import EditUserIcon from '../components/Icon/Edit';

const Profile = () => {
    const { session } = useContext(SessionContext);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select()
                .eq("id", session.user.id)
                .single();
            if (error) alert(error.message);
            if (data) setProfile(data);
        };
        if (session) fetchProfile();
    }, [session]);

    const initials = (() => {
        const f = profile?.firstname?.charAt(0)?.toUpperCase() || '';
        const l = profile?.lastname?.charAt(0)?.toUpperCase() || '';
        return (f + l) || '?';
    })();

    const fullName =
        [profile?.firstname, profile?.lastname].filter(Boolean).join(' ') || 'User';

    const isAdmin = profile?.role === 'admin';

    return (
        <MainLayouts>
            <div className="w-full px-6 py-5">

                {/* Page header */}
                <div className="mb-6">
                    <p className="text-[10px] font-bold tracking-[1.8px] text-amber-600 uppercase mb-1">
                        Account
                    </p>
                    <h1 className="text-2xl 2xl:text-3xl font-extrabold text-green-900 leading-tight">
                        My Profile
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">

                    {/* ---------- LEFT: avatar card ---------- */}
                    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">

                        {/* Banner */}
                        <div
                            className="h-24 bg-green-900"
                            style={{
                                backgroundImage:
                                    'radial-gradient(circle at 30% 30%, rgba(240,180,41,0.25), transparent 65%)',
                            }}
                        />

                        {/* Avatar + identity */}
                        <div className="px-6 pb-6 flex flex-col items-center text-center">

                            {/* Avatar pulled up over the banner */}
                            <div className="-mt-12 relative z-10">
                                {profile?.avatar_url ? (
                                    <img
                                        src={profile.avatar_url}
                                        alt={fullName}
                                        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg bg-white"
                                    />
                                ) : (
                                    <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-green-900 text-3xl font-extrabold">
                                        {initials}
                                    </div>
                                )}
                            </div>

                            <h2 className="mt-4 text-lg font-extrabold text-green-900 leading-tight">
                                {fullName}
                            </h2>
                            <p className="text-xs text-gray-400 mt-0.5 truncate max-w-full">
                                {profile?.email || '—'}
                            </p>

                            <span
                                className={`mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${isAdmin
                                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                    : 'bg-green-50 text-green-700 border border-green-200'
                                    }`}
                            >
                                <span
                                    className="inline-block w-1.5 h-1.5 rounded-full"
                                    style={{ background: isAdmin ? '#d99e1a' : '#16a34a' }}
                                />
                                {(profile?.role || 'user').toUpperCase()}
                            </span>

                            <Link
                                to="/profile/edit-profile"
                                className="mt-5 w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl border-2 border-green-800 text-green-800 text-xs font-bold hover:bg-green-800 hover:text-white transition"
                            >
                                <EditUserIcon className="text-base" />
                                Edit Profile
                            </Link>
                        </div>
                    </div>

                    {/* ---------- RIGHT: details card ---------- */}
                    <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl shadow-sm p-6">

                        <div className="flex items-center gap-2 mb-5">
                            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#166534" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-sm font-extrabold text-green-900">Account Information</h2>
                                <p className="text-[11px] text-gray-400">Your personal details on file.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                                    First Name
                                </p>
                                <p className="text-sm font-semibold text-gray-800">
                                    {profile?.firstname || '—'}
                                </p>
                                <div className="border-b border-gray-100 mt-2" />
                            </div>

                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                                    Last Name
                                </p>
                                <p className="text-sm font-semibold text-gray-800">
                                    {profile?.lastname || '—'}
                                </p>
                                <div className="border-b border-gray-100 mt-2" />
                            </div>

                            <div className="md:col-span-2">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                                    Email
                                </p>
                                <p className="text-sm font-semibold text-gray-800 break-all">
                                    {profile?.email || '—'}
                                </p>
                                <div className="border-b border-gray-100 mt-2" />
                            </div>

                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                                    Role
                                </p>
                                <span
                                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${isAdmin
                                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                        : 'bg-green-50 text-green-700 border border-green-200'
                                        }`}
                                >
                                    <span
                                        className="inline-block w-1.5 h-1.5 rounded-full"
                                        style={{ background: isAdmin ? '#d99e1a' : '#16a34a' }}
                                    />
                                    {(profile?.role || 'user').toUpperCase()}
                                </span>
                            </div>

                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                                    User ID
                                </p>
                                <p className="text-xs font-mono text-gray-400 truncate" title={profile?.id}>
                                    {profile?.id ? `${profile.id.slice(0, 8)}…` : '—'}
                                </p>
                                <div className="border-b border-gray-100 mt-2" />
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </MainLayouts>
    );
};

export default Profile;