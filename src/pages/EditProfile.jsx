import React, { useContext } from 'react';
import MainLayouts from '../Layouts/MainLayouts';
import Input from '../components/Forms/Input';
import { supabase } from '../utils/Supabase';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../Contexts/SessionContexts.js';
import { useToast } from '../Contexts/ToastContext';
import { useState } from 'react';

const EditProfile = () => {
    const { session, profile } = useContext(SessionContext);
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!session) return <p className="p-6 text-gray-500">Loading...</p>;

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!session) return;

        setIsSubmitting(true);

        const formData = new FormData(event.target);
        const signupForm = {
            firstname: formData.get("firstname"),
            lastname: formData.get("lastname"),
            email: formData.get("email"),
        };

        const { error: profileError } = await supabase
            .from("profiles")
            .update({
                firstname: signupForm.firstname,
                lastname: signupForm.lastname,
                email: signupForm.email,
            })
            .eq("id", session.user.id);

        setIsSubmitting(false);

        if (profileError) {
            showToast(profileError.message, 'error');
        } else {
            showToast('Profile updated successfully!', 'success');
            navigate("/profile");
        }
    };

    const handleCancel = () => navigate('/profile');

    return (
        <MainLayouts>
            <div className="w-full px-6 py-5">

                {/* Page header */}
                <div className="mb-6">
                    <p className="text-[10px] font-bold tracking-[1.8px] text-amber-600 uppercase mb-1">
                        Account
                    </p>
                    <h1 className="text-2xl 2xl:text-3xl font-extrabold text-green-900 leading-tight">
                        Edit Profile
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Update your personal information below.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-5 max-w-5xl mx-auto"
                >

                    {/* ---------- LEFT: form fields ---------- */}
                    <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl shadow-sm p-6">

                        <div className="flex items-center gap-2 mb-5">
                            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#166534" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-sm font-extrabold text-green-900">Personal Details</h2>
                                <p className="text-[11px] text-gray-400">These will appear on your profile.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                            <Input
                                name="firstname"
                                placeholder="Enter your First Name"
                                label="First Name"
                                type="text"
                                defaultValue={profile?.firstname}
                            />
                            <Input
                                name="lastname"
                                placeholder="Enter your Last Name"
                                label="Last Name"
                                type="text"
                                defaultValue={profile?.lastname}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <Input
                                name="email"
                                placeholder="Enter your Email"
                                label="Email"
                                type="email"
                                defaultValue={profile?.email}
                            />
                        </div>

                    </div>

                    {/* ---------- RIGHT: sticky action card ---------- */}
                    <div className="space-y-5">
                        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 lg:sticky lg:top-5">
                            <h2 className="text-sm font-extrabold text-green-900 mb-1">
                                Save Changes
                            </h2>
                            <p className="text-[11px] text-gray-400 mb-4">
                                Your updates will be applied immediately.
                            </p>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-2.5 rounded-xl bg-green-800 text-white text-sm font-bold hover:bg-green-900 transition disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                                            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                                        </svg>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 6 9 17l-5-5" />
                                        </svg>
                                        Save Changes
                                    </>
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={handleCancel}
                                disabled={isSubmitting}
                                className="w-full mt-2 py-2.5 rounded-xl border-2 border-gray-200 text-green-800 text-sm font-bold hover:border-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </MainLayouts>
    );
};

export default EditProfile;