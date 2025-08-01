import React from "react";
import { useParams } from "react-router-dom";
import Nav from "../Nav";
import DashboardSection from "./DashboardSection";
import NewsSection from "./NewsSection";

export default function StudentDashboard() {
    const { id } = useParams();
    return (
        <>
        <Nav />
        <div className="w-11/12 mx-auto mt-3">
            <h1 className="mb-4 text-2xl font-bold text-center">Welcome, student ID: {id}</h1>

            <div className="flex justify-center gap-4 mb-5 text-xl font-semibold">
                <button className="px-5 py-2 transition-transform duration-200 rounded-lg shadow-lg cursor-pointer hover:shadow-xl hover:scale-105">Dashboard</button>
                <button className="px-5 py-2 transition-transform duration-200 rounded-lg shadow-lg cursor-pointer hover:shadow-xl hover:scale-105">Application</button>
            </div>
            <div className="flex gap-4 mb-3">
                <DashboardSection studentId={id} />
                <NewsSection />
            </div>
        </div>
        </>
    )
}