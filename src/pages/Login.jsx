import React from 'react';
import MainLayouts from '../Layouts/MainLayouts';
import Input from '../components/Forms/Input';
import Card from '../components/Icon/Card';
import { FaPaperPlane } from 'react-icons/fa';
import { supabase } from '../utils/Supabase';
import { useContext, useEffect } from 'react';
import { SessionContext } from '../Contexts/SessionContexts.js'
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
    const { session, profile } = useContext(SessionContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (profile?.role === "user") {
            navigate("/");
        }
        else if (profile?.role === "admin") {
            navigate("/manage-events");
        }

    }, [profile, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const loginForm = {
            email: formData.get("email"),
            password: formData.get("password"),
        };

        const { data, error } = await supabase.auth.signInWithPassword({
            email: loginForm.email,
            password: loginForm.password,
        });

        if (error) alert(error.message);
        if (data) console.log(data);
    };

    useEffect(() => { }, [])

    return (
        <MainLayouts>
            <div className="min-h-screen flex flex-col">
                <div className="flex justify-center items-center flex-1">
                    <Card>
                        <h1 className="text-xl font-bold text-center mb-4">
                            <span className="text-primary">LOGIN </span>
                        </h1>
                        <form onSubmit={handleSubmit}>
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
                                <FaPaperPlane className="text-sm" /> Login
                            </button>
                        </form>

                        <p className="text-center text-sm mt-4">
                            Don't have an account?{" "}
                            <Link to="/sign-up" className="text-primary font-semibold hover:underline">
                                Sign Up
                            </Link>
                        </p>
                    </Card>
                </div>
            </div>
        </MainLayouts>
    );
};

export default Login;