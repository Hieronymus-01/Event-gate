import { useState, useEffect } from 'react'
import './App.css';
import { Routes, Route } from "react-router-dom"
import HomePage from './pages/HomePage';
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import { supabase } from "./utils/Supabase";
import { SessionContext } from "./Contexts/SessionContexts";
import Profile from './pages/Profile.jsx';
import EditProfile from './pages/EditProfile.jsx';
import ManageEvents from './pages/ManageEvents.jsx';
import AddEvent from './pages/AddEvent.jsx';
import EditEvent from './pages/EditEvent.jsx';
import Events from './pages/Events.jsx';
import ViewEvent from './pages/ViewEvent.jsx';
import Settings from './pages/Settings.jsx';
import MyEvents from './pages/MyEvents.jsx';
import Dashboard from './pages/Dashboard.jsx';


function App() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("event", event);
      console.log("session", session);
      if (event === "SIGNED_OUT") {
        setSession(null);
        setProfile(null);
      } else if (session) {
        setSession(session);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", session.user.id)
        .single();

      if (error) alert(error);
      if (data) {
        setProfile(data);
      }
    };

    if (session) {
      fetchProfile();
    }
  }, [session]);

  return (
    <SessionContext.Provider value={{ session, profile, setProfile }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit-profile" element={<EditProfile />} />
        <Route path="/manage-events" element={<ManageEvents />} />
        <Route path="/add-event" element={<AddEvent />} />
        <Route path="/edit-event/:eventId" element={<EditEvent />} />
        <Route path="/events" element={<Events />} />
        <Route path="/view-event/:eventId" element={<ViewEvent />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/events" element={<Events />} />
        <Route path="/my-events" element={<MyEvents />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </SessionContext.Provider>
  );
}

export default App;