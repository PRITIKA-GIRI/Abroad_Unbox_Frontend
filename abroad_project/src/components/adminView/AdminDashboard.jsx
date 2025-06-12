import React from "react";
import { Link } from "react-router-dom";
import Nav from "../Nav";

const AdminDashboard = () => {
  return (
    <div>
      <Nav />
      <div className="w-11/12 mx-auto mt-6">
        {/* Use responsive grid: 1 column on small screens, 2 on medium, 3 on large */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
            to="/view-students"
            className="flex items-center justify-center h-32 border border-gray-300 rounded-xl hover:shadow-lg transition-shadow duration-200 bg-white"
          >
            <span className="text-lg font-medium">View Students</span>
          </Link>

          <Link
            to="/add-university"
            className="flex items-center justify-center h-32 border border-gray-300 rounded-xl hover:shadow-lg transition-shadow duration-200 bg-white"
          >
            <span className="text-lg font-medium">Add University</span>
          </Link>

          <Link
            to="/add-session"
            className="flex items-center justify-center h-32 border border-gray-300 rounded-xl hover:shadow-lg transition-shadow duration-200 bg-white"
          >
            <span className="text-lg font-medium">Add Session for Stage 8</span>
          </Link>

          <Link
            to="/stage1/view"
            className="flex items-center justify-center h-32 border border-gray-300 rounded-xl hover:shadow-lg transition-shadow duration-200 bg-white"
          >
            <span className="text-lg font-medium">
              View Stage 1 Submissions
            </span>
          </Link>

          <Link
            to="/stage2/view"
            className="flex items-center justify-center h-32 border border-gray-300 rounded-xl hover:shadow-lg transition-shadow duration-200 bg-white"
          >
            <span className="text-lg font-medium">
              View Stage 2 Submissions
            </span>
          </Link>

          <Link
            to="/stage3/view"
            className="flex items-center justify-center h-32 border border-gray-300 rounded-xl hover:shadow-lg transition-shadow duration-200 bg-white"
          >
            <span className="text-lg font-medium">
              View Stage 3 Submissions
            </span>
          </Link>

          <Link
            to="/stage4/view"
            className="flex items-center justify-center h-32 border border-gray-300 rounded-xl hover:shadow-lg transition-shadow duration-200 bg-white"
          >
            <span className="text-lg font-medium">
              View Stage 4 Submissions
            </span>
          </Link>

          <Link
            to="/stage5/view"
            className="flex items-center justify-center h-32 border border-gray-300 rounded-xl hover:shadow-lg transition-shadow duration-200 bg-white"
          >
            <span className="text-lg font-medium">
              View Stage 5 Submissions
            </span>
          </Link>

          <Link
            to="/stage6/view"
            className="flex items-center justify-center h-32 border border-gray-300 rounded-xl hover:shadow-lg transition-shadow duration-200 bg-white"
          >
            <span className="text-lg font-medium">
              View Stage 6 Submissions
            </span>
          </Link>

          <Link
            to="/stage7/view"
            className="flex items-center justify-center h-32 border border-gray-300 rounded-xl hover:shadow-lg transition-shadow duration-200 bg-white"
          >
            <span className="text-lg font-medium">
              View Stage 7 Submissions
            </span>
          </Link>

          <Link
            to="/stage8/view"
            className="flex items-center justify-center h-32 border border-gray-300 rounded-xl hover:shadow-lg transition-shadow duration-200 bg-white"
          >
            <span className="text-lg font-medium">
              View Stage 8 Submissions
            </span>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
