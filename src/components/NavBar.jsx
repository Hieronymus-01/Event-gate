import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import HomeIcon from "./Icon/HomeIcon.jsx"
import SignUpIcon from './Icon/SignUpIcon.jsx'
import { useContext } from 'react'
import { SessionContext } from '../Contexts/SessionContexts.js'
import { supabase } from '../utils/Supabase.js'
import LoginIcon from './Icon/LoginIcon.jsx'
import { useToast } from '../Contexts/ToastContext'

const NavBar = () => {
    const { session, profile } = useContext(SessionContext);
    const navigate = useNavigate();
    const { showToast } = useToast();

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            showToast(error.message, 'error');
        } else {
            showToast('Logged out successfully.', 'success');
            navigate('/');
        }
    };

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="flex w-full max-w-7xl mx-auto">

                {/* Brand */}
                <div className="flex-1">
                    <a className="btn btn-ghost px-0 flex flex-col items-start leading-none h-auto py-1">
                        <span className="text-xl font-bold">
                            <span className="text-primary">Event</span>
                            <span className="text-secondary">Gate</span>
                        </span>
                        <span className="text-[0.6rem] font-semibold tracking-widest text-secondary uppercase mt-0.5">
                            FEU Roosevelt
                        </span>
                    </a>
                </div>

                <div className="flex items-center">
                    <NavLink to="/" className="btn btn-primary mr-4 rounded-full btn-outline">
                        <HomeIcon className="text-md mr-1" />
                        Home
                    </NavLink>

                    {!session && (
                        <>
                            <NavLink to="/sign-up" className="btn btn-primary mr-4 rounded-full btn-outline">
                                <SignUpIcon className="text-lg" />
                                Sign Up
                            </NavLink>
                            <NavLink to="/log-in" className="btn btn-primary mr-4 rounded-full btn-outline">
                                <LoginIcon className="text-xl" />
                                Login
                            </NavLink>
                        </>
                    )}

                    {profile?.role === "admin" && (
                        <>
                            <NavLink to="/dashboard" className="btn btn-primary mr-4 rounded-full btn-outline">
                                Dashboard
                            </NavLink>
                            <NavLink to="/manage-events" className="btn btn-primary mr-4 rounded-full btn-outline">
                                Manage Events
                            </NavLink>
                        </>
                    )}

                    {profile?.role === "user" && (
                        <>
                            <NavLink to="/events" className="btn btn-primary mr-4 rounded-full btn-outline">
                                Events
                            </NavLink>
                            <NavLink to="/my-events" className="btn btn-primary mr-4 rounded-full btn-outline">
                                My Events
                            </NavLink>
                        </>
                    )}

                    {session && (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Profile"
                                        src={profile?.avatar_url || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlOg0JzU3TJSuC8qIw9QnQhu9DabzyZhQkSQ&s.webp"}
                                    />
                                </div>
                            </div>
                            <ul tabIndex="-1" className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                <li>
                                    <NavLink to="/profile" className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/settings">Settings</NavLink>
                                </li>
                                <li>
                                    <button onClick={handleLogout}>Logout</button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NavBar;