import React, { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
const Stage9 = () => {
  const [responseLink, setResponseLink] = useState(
    "https://www.youtube.com/embed/QjQliDFIsnk"
  );
  const handleEmailClick = () => {
    window.location.href = "mailto:someone@example.com";
  };
  return (
    <div className="flex md:flex-row flex-col">
      <div className="md:w-1/5 w-full bg-gradient-to-l from-[#FFFFFF] to-[#248A4D] h-auto md:h-dvh p-2 text-center">
        <h2 className="text-2xl underline font-bold">Stage 9:</h2>
        <h2 className="text-xl font-semibold mt-6">After Visa.</h2>
        <p className="font-medium mt-5">
          Just the last thing remaining in the menu. We have to make sure you
          are ready for the future ahead.
        </p>
        <p className="font-medium mt-5 md:flex hidden">
          Don't forget visa is just the foot on the door. We have a great,
          unpredicted and unexpected journey ahead. Let's make the necessary
          preparations
        </p>
      </div>
      <div className="w-full md:w-4/5 lh:w-4/5 bg-white h-svh p- 2 overflow-scroll">
        <div className="flex justify-between items-center bg-gradient-to-r from-[#FFFFFF] to-blue-300 p-2 w-full text-2xl font-semibold text-center">
          <p>NOC</p>
          <div className="flex justify-end items-end">
            <FaCirclePlus className="text-green-900 text-2xl" />
          </div>
        </div>
        <div>
          <div className="px-5 py-3 w-[80%] ml-0 mt-2 text-left text-lg">
            <p className="font-semibold">1. Visit the Official Website:</p>
            <p>
              - Go to the official website of the Ministry of Education, Science
              and <br></br>Technology (MOEST): noc.moest.gov.np.
            </p>
            <p className="mt-5 font-semibold">
              2. Create an Account or Log In:
            </p>
            <p>
              - If you don't have an account, create one using your email or{" "}
              <br />
              phone number.
            </p>
            <p>- If you already have an account, log in.</p>
            <p className="mt-5 font-semibold">
              3. Fill Out the Application Form:
            </p>
            <p>
              - Carefully fill out the NOC application form with accurate
              personal
              <br />
              information and other required details.
            </p>
            <p>- Ensure all information is correct and complete.</p>
            <p className="mt-5 font-semibold">4. Upload Required Documents:</p>
            <p>
              - Upload scanned copies of the necessary documents, such as your
              <br />
              passport, acceptance letter, and other relevant documents.
              <br />
              information and other required details.
            </p>
            <p>- Ensure that the documents are clear and readable</p>
          </div>
        </div>
        <div>
          <div className="px-5 py-3 mt-2">
            <button
              onClick={handleEmailClick}
              className="px-4 py-2 bg-green-700 rounded-lg text-white hover:bg-green-800"
            >
              Request Appointment
            </button>
          </div>
          <div className="flex justify-between items-center bg-gradient-to-r from-[#FFFFFF] to-blue-300 p-2 w-full text-2xl font-semibold text-center">
            <p>After Visa Session</p>
            <div className="flex justify-end items-end">
              <FaCirclePlus className="text-green-900 text-2xl" />
            </div>
          </div>
        </div>
        <div className="px-5 py-3 mt-2 text-center w-[96%] mx-auto">
          <p>
            We do offer 3 Weeks comprehensive course for helping you with your
            Journey into US more fruitful.
          </p>
          <p className="mt-3">
            We will talk about everything from simple communication skills to
            Professional networking.
          </p>
          <p className="mt-3">
            We shall go into the depth of the US Culture and how to cope, adopt
            and thrive in the USA.
          </p>
          <p className="mt-3">
            Unfortunately, this 4 Weeks Session is not part of our application
            cost. We charge Rs. 5,000 for the whole session.
          </p>
        </div>
        <div className="px-5 py-3 mt-2">
          <button className="px-4 py-2 bg-green-700 hover:bg-green-800 rounded-lg text-white">
            Register for after visa
          </button>
        </div>
        <button className="text-white mt-5 text-center font-semibold w-full px-4 py-3 bg-green-500 hover:bg-green-600">
          STAGE IX: Complete
        </button>
      </div>
    </div>
  );
};
export default Stage9;