import React from "react";
import { useParams } from "react-router-dom";
import Nav from "../Nav";
import DashboardSection from "./DashboardSection";

export default function StudentDashboard() {
    const { id } = useParams();
    return (
        <>
        <Nav />
        <div className="w-11/12 mx-auto mt-3">
            <h1 className="text-2xl font-bold mb-4 text-center">Welcome, student ID: {id}</h1>

            <div className="flex justify-center gap-4 text-xl font-semibold mb-5">
                <button className="px-5 py-2 shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-200 rounded-lg cursor-pointer">Dashboard</button>
                <button className="px-5 py-2 shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-200 rounded-lg cursor-pointer">Application</button>
            </div>
            <DashboardSection studentId={id} />
        </div>
        </>
    )
}