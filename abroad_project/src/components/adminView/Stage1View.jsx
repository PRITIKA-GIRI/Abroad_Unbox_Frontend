import axios from "axios";
import React, { useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import Nav from "../Nav";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Stage1View = () => {
  const [stage1Data, setStage1Data] = useState([]);
  const getStage1Data = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/stage-one-submissions/`
      );
      if (response) {
        setStage1Data(response.data);
      }
    } catch (error) {
      console.log("Failed to fetch the data", error);
    }
  };

  useEffect(() => {
    getStage1Data();
  }, []);

  const handleApprove = async (studentId,stage)=>{
    try{
        const response = await axios.post(`${API_BASE_URL}/students/complete-stage/`,{
            'stage':stage,
            'student_id':studentId,
        });
        if(response){
            alert("User stage1 approved");
        }
    }catch(error){
        console.log("Failed to approve the user", error);
        // console.log(data);
    }
  };

  const handleDecline = async (id)=>{
    try{
        const confirm = window.confirm("Are you sure you want to decline the stage 1 of this user?");
        if(!confirm) return;
        
        const response = await axios.delete(`${API_BASE_URL}/stage-one-submissions/${id}/`);
        if(response){
            alert("User's stage 1 declined");
            getStage1Data();
        }
    }catch(error){
        console.log("Failed to delete the user satge", error);
    }
  };

  return (
    <div>
      <Nav />
      <div className="w-[94%] mx-auto p-6">
        <table className="w-full">
          <thead>
            <tr className="bg-green-800 text-white border-none font-normal text-nowrap">
              <td className="px-4 py-3">S.No</td>
              <td className="px-4 py-3">Student Name</td>
              <td className="px-4 py-3">Action</td>
            </tr>
          </thead>
          <tbody>
            {stage1Data.length > 0 ? (
              stage1Data.map((data, index) => (
                <tr
                  key={index}
                  className="odd:bg-gray-50 bg-white hover:bg-gray-100 font-normal text-gray-900 border-t-0 border-l-0 border-r-0 border border-gray-200"
                >
                  <td className="px-4 py-4">{index + 1}</td>
                  <td className="px-4 py-4 text-nowrap">
                    {data.student_name}
                  </td>
                  <td className="px-4 py-4 text-nowrap flex gap-3">
                    <div className="flex gap-3">
                        
                        <button onClick={()=>handleApprove(data.student, data.stage)} className="px-3 py-2 text-white bg-green-800 hover:bg-green-900 rounded-md">Approve</button>
                        <button onClick={()=>handleDecline(data.id)} className="px-3 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md">Decline</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-4">
                  <p>No data available at the moment!!</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Stage1View;
