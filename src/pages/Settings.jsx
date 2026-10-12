import React, { useState, useContext } from 'react';
import MainLayouts from '../Layouts/MainLayouts';
import Input from '../components/Forms/Input';
import { supabase } from '../utils/Supabase';
import { SessionContext } from '../Contexts/SessionContexts';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../Contexts/ToastContext';

const Settings = () => {
    const { session, profile } = useContext(SessionContext);
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [loading, setLoading] = useState(false);

    const handleChangePassword = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newPassword = formData.get('new_password');
        const confirmPassword = formData.get('confirm_password');

        if (newPassword !== confirmPassword) {
            showToast('Passwords do not match.', 'error');
            return;
        }

        setLoading(true);
        const { error } = await supabase.auth.updateUser({ password: newPassword });
        setLoading(false);

        if (error) showToast(error.message, 'error');
        else {
            showToast('Password updated successfully!', 'success');
            e.target.reset();
        }
    };

    const handleChangeAvatar = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const avatarUrl = formData.get('avatar_url');

        setLoading(true);
        const { error } = await supabase
            .from('profiles')
            .update({ avatar_url: avatarUrl })
            .eq('id', session.user.id);
        setLoading(false);

        if (error) showToast(error.message, 'error');
        else showToast('Profile picture updated!', 'success');
    };

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm(
            'Are you sure you want to delete your account? This cannot be undone.'
        );
        if (!confirmed) return;

        setLoading(true);
        const { error } = await supabase
            .from('profiles')
            .delete()
            .eq('id', session.user.id);
        setLoading(false);

        if (error) {
            showToast(error.message, 'error');
        } else {
            await supabase.auth.signOut();
            navigate('/');
        }
    };

    return (
        <MainLayouts>
            <div className="max-w-2xl mx-auto py-16 px-4">

                <h1 className="text-3xl font-bold text-green-900 mb-10">Settings</h1>

                {/* Change Password */}
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 mb-6">
                    <h2 className="text-lg font-bold text-green-900 mb-1">Change Password</h2>
                    <p className="text-sm text-gray-400 mb-6">Update your account password.</p>
                    <form onSubmit={handleChangePassword} className="space-y-3">
                        <Input
                            type="password"
                            label="New Password"
                            placeholder="Enter new password"
                            name="new_password"
                        />
                        <Input
                            type="password"
                            label="Confirm Password"
                            placeholder="Confirm new password"
                            name="confirm_password"
                        />
                        <div className="text-right pt-2">
                            <button
                                type="submit"
                                className="btn btn-primary rounded-full"
                                disabled={loading}
                            >
                                {loading ? 'Saving...' : 'Update Password'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Change Profile Picture */}
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 mb-6">
                    <h2 className="text-lg font-bold text-green-900 mb-1">Profile Picture</h2>
                    <p className="text-sm text-gray-400 mb-6">Enter a URL for your profile picture.</p>
                    <form onSubmit={handleChangeAvatar} className="space-y-3">
                        <Input
                            type="text"
                            label="Image URL"
                            placeholder="https://example.com/photo.jpg"
                            name="avatar_url"
                            defaultValue={profile?.avatar_url}
                        />
                        <div className="text-right pt-2">
                            <button
                                type="submit"
                                className="btn btn-primary rounded-full"
                                disabled={loading}
                            >
                                {loading ? 'Saving...' : 'Update Picture'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Notification Preferences */}
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 mb-6">
                    <h2 className="text-lg font-bold text-green-900 mb-1">Notifications</h2>
                    <p className="text-sm text-gray-400 mb-6">Manage your notification preferences.</p>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-700">Event Reminders</p>
                                <p className="text-xs text-gray-400">Get notified before an event starts.</p>
                            </div>
                            <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                        </div>
                        <div className="border-t border-gray-100" />
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-700">New Events</p>
                                <p className="text-xs text-gray-400">Get notified when a new event is added.</p>
                            </div>
                            <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                        </div>
                        <div className="border-t border-gray-100" />
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-700">Registration Updates</p>
                                <p className="text-xs text-gray-400">Get notified about your registrations.</p>
                            </div>
                            <input type="checkbox" className="toggle toggle-primary" />
                        </div>
                    </div>
                </div>

                {/* Delete Account */}
                <div className="bg-white border border-red-100 rounded-2xl shadow-sm p-8">
                    <h2 className="text-lg font-bold text-red-600 mb-1">Delete Account</h2>
                    <p className="text-sm text-gray-400 mb-6">
                        Permanently delete your account and all your data. This cannot be undone.
                    </p>
                    <button
                        onClick={handleDeleteAccount}
                        className="btn btn-error rounded-full text-white"
                        disabled={loading}
                    >
                        {loading ? 'Deleting...' : 'Delete My Account'}
                    </button>
                </div>

            </div>
        </MainLayouts>
    );
};

export default Settings;