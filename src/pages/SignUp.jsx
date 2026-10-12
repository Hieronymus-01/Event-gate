import React from 'react';
import MainLayouts from '../Layouts/MainLayouts';
import Input from '../components/Forms/Input';
import Card from '../components/Icon/Card';
import { FaPaperPlane } from 'react-icons/fa';
import { supabase } from '../utils/Supabase';
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import { SessionContext } from '../Contexts/SessionContexts.js'

const SignUp = () => {
    const { session } = useContext(SessionContext);
    const navigate = useNavigate();


    useEffect(() => {
        if (session) {
            navigate("/");
        }
    }, [session, navigate]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const signUpForm = {
            firstname: formData.get("firstname"),
            lastname: formData.get("lastname"),
            email: formData.get("email"),
            password: formData.get("password"),
        };


        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: signUpForm.email,
            password: signUpForm.password,
        });

        if (signUpError) alert(signUpError);

        if (signUpData) {
            const { data: profileData, error: profileError } = await supabase.from("profiles").insert({
                id: signUpData.user.id,
                firstname: signUpForm.firstname,
                lastname: signUpForm.lastname,
                email: signUpForm.email,
            });

            if (profileError) alert(profileError);
            if (profileData) console.log("ProfileData", profileData);
        };
    };

    return (
        <MainLayouts>
            <div className="min-h-screen flex flex-col">
                <div className="flex justify-center items-center flex-1">
                    <Card>
                        <h1 className="text-xl font-bold text-center mb-4">
                            Create an <span className="text-primary">Account👌</span>
                        </h1>
                        <form onSubmit={handleSubmit}>
                            <Input
                                name="firstname"
                                placeholder="Enter your First Name"
                                label="Firstname"
                                type="text"
                            />
                            <Input
                                name="lastname"
                                placeholder="Enter your Last Name"
                                label="Lastname"
                                type="text"
                            />
                            <Input
                                name="email"
                                placeholder="Enter your Email"
                                label="Email"
                                type="email"
                            />
                            <Input
                                name="password"
                                placeholder="Enter your Password"
                                label="Password"
                                type="password"
                            />
                            <button type="submit" className="btn btn-primary rounded-full mt-5 w-full">
                                <FaPaperPlane className="text-sm" /> Sign Up
                            </button>
                        </form>

                        <p className="text-center text-sm mt-4">
                            Already have an account?{" "}
                            <label htmlFor="login_modal" className="text-primary font-semibold hover:underline cursor-pointer">
                                Login
                            </label>
                        </p>
                    </Card>
                </div>
            </div>
        </MainLayouts>
    );
};

export default SignUp;