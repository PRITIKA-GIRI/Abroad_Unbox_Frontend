import React from "react";
import { useParams } from "react-router-dom";

export default function ViewStudentApplication() {
    const { id } = useParams();

    return (
        <div className="w-11/12 mx-auto p-3 mt-3">
        <h1 className="text-2xl font-bold mb-4 text-center">View Student Application</h1>
        <p className="text-center text-gray-600">This feature is under development.</p>
        <p className="text-center text-gray-600">Student ID: {id}</p>
        </div>
    );
}