import React, { useEffect, useState } from "react";
import Nav from "../Nav";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import axios from 'axios';

const Stage2View = () => {
  const [stage2Data, setStage2Data] = useState([]);
  const getStage2Data = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/stage-two-submissions/`
      );
      if (response) {
        setStage2Data(response.data);
      }
    } catch (error) {
      console.log("Failed to fetch the data", error);
    }
  };

  useEffect(() => {
    getStage2Data();
  }, []);

  const handleApprove = async (studentId,stage)=>{
    try{
        const response = await axios.post(`${API_BASE_URL}/students/complete-stage/`,{
            'stage':stage,
            'student_id':studentId,
        });
        if(response){
            alert("User stage2 approved");
        }
    }catch(error){
        console.log("Failed to approve the user", error);
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
    <>
      <Nav />
      <div className="w-11/12 p-5 mx-auto bg-green-300 mt-5">

        {stage2Data.length > 0 ? (
          stage2Data.map((data, index) => (
            <div className="grid grid-cols-5 gap-5">
              <div className="bg-[#f1f1f1] p-3 rounded-xl">
                <p className="text-center font-semibold text-2xl">{data.name}</p>
                <p>Student id: {data.student}</p>
                <p>Stage: {data.stage}</p>
                <p>Marital Status: {data.marital_status? "Married" : "Single"}</p>
                <p>Date of Birth: {data.date_of_birth}</p>
                <div className="flex gap-3 mt-3">              
                  <button onClick={()=>handleApprove(data.student, data.stage)} className="w-1/2 px-3 py-2 text-white bg-green-800 hover:bg-green-900 rounded-md">Approve</button>
                  <button onClick={()=>handleDecline(data.id)} className="w-1/2 px-3 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md">Decline</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No data available at the moment!!</p>
        )}

      </div>

    </>
  )
}

export default Stage2View;