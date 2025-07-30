import React, { useEffect } from "react";
import next_svg from "../../assets/svg/next.svg";
import { FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { useState } from "react";
import { FaTrash } from "react-icons/fa";

const ExpAdvices = () => {
  const [expAdvicesData, setExpAdvicesData] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/alumni-advice/`);
      setExpAdvicesData(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this item?");
    if(!confirm) return;
    try {
      const response = await axios.delete(`${API_BASE_URL}/alumni-advice/${id}/`);
      if(response){
        alert("Item deleted successfully");
        getData();
      }
    }
    catch (error) {
      console.error("Error deleting item", error);
    }
  };

  const role = localStorage.getItem("role");
  return (
    <div>
      <div className="p-2 bg-gradient-to-r from-[#006600] to-[#ffffff] w-11/12 mx-auto mt-3">
        <p className="text-2xl font-bold text-white">
          Experiences and Advices by Our Alumni
        </p>
      </div>
      <div className="relative">
        <div className="w-11/12 mx-auto mt-3 flex flex-row gap-3 overflow-x-scroll">
          {expAdvicesData.map((item, index) => {
            return (
              <div className="relative">
                {role == "admin" && (
                  <FaTrash onClick={()=> handleDelete(item.id)} className="absolute right-2 top-2 text-red-500 text-xl" />
                )}
                <div className="h-[400px] min-w-[350px] bg-gray-400 rounded-lg overflow-hidden">
                  <iframe
                    width="350"
                    height="400"
                    src={item.video_link}  
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            );
          })}
          {role == "admin" && (
            <div className="relative">
              <div className="h-[400px] min-w-[350px]">
                <button className="w-full h-full relative bg-none">
                  <Link to="/add_new_alumni">
                    <FaPlusCircle className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl rounded-full shadow-md shadow-gray-900" />
                  </Link>
                </button>
              </div>
            </div>
          )}
        </div>
        <div
          className="absolute right-0 top-1/2 transform -translate-y-1/2 text-2xl cursor-pointer lg:hidden"
          // onClick={scrollRight}
        >
          <img className="w-12 h-12 mx-auto" src={next_svg} alt="Next" />
        </div>
      </div>
    </div>
  );
};

export default ExpAdvices;
