import React from "react";
import MainLayouts from "../Layouts/MainLayouts";
import Input from "../components/Forms/Input";
import { supabase } from "../utils/Supabase";
import { useNavigate } from 'react-router-dom';
import EventForm from "../components/Icon/EventForm";

const AddEvent = () => {


    return (
        <MainLayouts>
            <EventForm />
        </MainLayouts>
    );

};

export default AddEvent;