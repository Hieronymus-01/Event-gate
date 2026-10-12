import React, { useContext } from 'react';
import MainLayouts from '../Layouts/MainLayouts';
import Input from '../components/Forms/Input';
import Card from '../components/Icon/Card';
import SendIcon from '../components/Icon/SendIcon';
import { supabase } from '../utils/Supabase';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../Contexts/SessionContexts.js';
import { useToast } from '../Contexts/ToastContext';

const EditProfile = () => {
    const { session } = useContext(SessionContext);
    const navigate = useNavigate();
    const { showToast } = useToast();

    if (!session) return <p>Loading...</p>;

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!session) return;

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

        if (profileError) {
            showToast(profileError.message, 'error');
        } else {
            showToast('Profile updated successfully!', 'success');
            navigate("/profile");
        }
    };

    return (
        <MainLayouts>
            <div className="max-w-2xl mx-auto py-16 px-4">
                <h1 className="text-3xl font-bold text-green-900 mb-10">Edit Profile</h1>
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <Input
                            name="firstname"
                            placeholder="Enter your First Name"
                            label="First Name"
                            type="text"
                        />
                        <Input
                            name="lastname"
                            placeholder="Enter your Last Name"
                            label="Last Name"
                            type="text"
                        />
                        <Input
                            name="email"
                            placeholder="Enter your Email"
                            label="Email"
                            type="email"
                        />
                        <div className="text-right pt-2">
                            <button className="btn btn-primary rounded-full">
                                <SendIcon className="text-sm" /> Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </MainLayouts>
    );
};

export default EditProfile;