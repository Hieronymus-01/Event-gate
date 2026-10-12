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

    return (
        <MainLayouts>
            <div className="max-w-2xl mx-auto py-16 px-4">

                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <h1 className="text-3xl font-bold text-green-900">My Profile</h1>
                    <Link
                        to="/profile/edit-profile"
                        className="btn btn-primary rounded-full btn-outline"
                    >
                        <EditUserIcon className="text-xl" />
                        Edit Profile
                    </Link>
                </div>

                {/* Profile Card */}
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">

                    {/* Top Banner */}
                    <div className="bg-green-900 h-24" />

                    {/* Avatar */}
                    <div className="px-8 pb-8">
                        <div className="w-20 h-20 rounded-full bg-yellow-400 flex items-center justify-center text-green-900 text-3xl font-bold -mt-10 border-4 border-white shadow">
                            {profile?.firstname?.charAt(0).toUpperCase()}
                        </div>

                        <div className="mt-6 space-y-5">
                            {/* Firstname */}
                            <div>
                                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">First Name</p>
                                <p className="text-gray-800 font-medium">{profile?.firstname || '—'}</p>
                                <div className="border-b border-gray-100 mt-3" />
                            </div>

                            {/* Lastname */}
                            <div>
                                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Last Name</p>
                                <p className="text-gray-800 font-medium">{profile?.lastname || '—'}</p>
                                <div className="border-b border-gray-100 mt-3" />
                            </div>

                            {/* Email */}
                            <div>
                                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Email</p>
                                <p className="text-gray-800 font-medium">{profile?.email || '—'}</p>
                                <div className="border-b border-gray-100 mt-3" />
                            </div>

                            {/* Role */}
                            <div>
                                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Role</p>
                                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                    profile?.role === 'admin'
                                        ? 'bg-yellow-100 text-yellow-700'
                                        : 'bg-green-100 text-green-700'
                                }`}>
                                    {profile?.role || 'user'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayouts>
    );
};

export default Profile;