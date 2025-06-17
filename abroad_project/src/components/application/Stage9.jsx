// import React, { useState, useEffect } from "react";
// import { FaCirclePlus } from "react-icons/fa6";
// import CryptoJS from "crypto-js";
// import { IoWarningOutline } from "react-icons/io5";
// import axios from "axios";
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const Stage9 = () => {
//   const [stagesDetail, setStagesDetail] = useState([]);
//   const [paymentDetail, setPaymentDetail] = useState([]);
//   const [signature, setSignature] = useState("");
//   const [isSignatureReady, setIsSignatureReady] = useState(false);
//   const [transactionUuid, setTransactionUuid] = useState("");

//   const studentID = localStorage.getItem("student_id");

//   const getStages = async () => {
//     try {
//       const response = await axios.get(
//         `${API_BASE_URL}/application-time-stages/?student=${studentID}`
//       );
//       setStagesDetail(response.data);
//     } catch (err) {
//       console.log("Failed to get stages data", err);
//     }
//   };
//   const stage9Data = stagesDetail.find((item) => item.stage === "9");
//   const isStage9Completed = stage9Data?.is_complete === "completed";

//   const getPaymentDetails = async () => {
//     try {
//       const response = await axios.get(
//         `${API_BASE_URL}/after-visa-payments/?student=${studentID}`
//       );
//       setPaymentDetail(response.data);
//     } catch (err) {
//       console.log("Failed to get payment detail", err);
//     }
//   };
//   const isPaid = paymentDetail?.status === "COMPLETE";

//   // Generate random transaction UUID
//   const generateRandomString = () => {
//     const strings =
//       "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//     let code = "";
//     let length = 25;
//     for (let i = 0; i < length; i++) {
//       code += strings[Math.floor(Math.random() * strings.length)];
//     }
//     return code;
//   };

//   const handleEmailClick = () => {
//     window.location.href = "mailto:someone@example.com";
//   };

//   useEffect(() => {
//     const generateEsewaSignature = () => {
//       const secret = "8gBm/:&EnhH.1/q";
//       const uuid = generateRandomString(); // Generate unique UUID

//       const totalAmount = "5000";
//       const productCode = "EPAYTEST";

//       // FIXED: Correct message format for eSewa signature
//       const message = `total_amount=${totalAmount},transaction_uuid=${uuid},product_code=${productCode}`;

//       console.log("Message to sign:", message); // Debug log

//       const hash = CryptoJS.HmacSHA256(message, secret);
//       const signature = CryptoJS.enc.Base64.stringify(hash);

//       console.log("Generated signature:", signature); // Debug log

//       setTransactionUuid(uuid);
//       setSignature(signature);
//       setIsSignatureReady(true);
//     };

//     generateEsewaSignature();
//   }, []);

//   const handleSubmit = async () => {
//     if (isStage9Completed) return;
  
//     try {
  
//       const payload = {
//         student: studentID,
//         payment_status: "Paid",  // Unpaid
//       };
  
//       const response = await axios.post(
//         `${API_BASE_URL}/stage-nine-submissions/`,
//         payload
//       );
  
//       if (response) {
//         console.log(response.data);
//         alert("Stage 9 submission successful!");
//         getStages();
//       }
//     } catch (error) {
//       console.log("Failed to post the form data", error);
//       alert("Failed to submit Stage 9. Please try again.");
//     }
//   };

//   useEffect(() => {
//       getStages();
//       getPaymentDetails();
//     }, []);

//   return (
//     <div className="flex md:flex-row flex-col">
//       <div className="md:w-1/4 w-full bg-gradient-to-l from-[#FFFFFF] to-[#248A4D] h-auto md:h-dvh p-2 text-center">
//         <h2 className="text-2xl underline font-bold">Stage 9:</h2>
//         <h2 className="text-xl font-semibold mt-6">After Visa.</h2>
//         <p className="font-medium mt-5">
//           Just the last thing remaining in the menu. We have to make sure you
//           are ready for the future ahead.
//         </p>
//         <p className="font-medium mt-5 md:flex hidden">
//           Don't forget visa is just the foot on the door. We have a great,
//           unpredicted and unexpected journey ahead. Let's make the necessary
//           preparations
//         </p>
//       </div>
//       <div className="w-full md:w-3/4 lh:w-4/5 bg-white h-svh p-2 overflow-scroll">
//         <div className="flex justify-between items-center bg-gradient-to-r from-[#FFFFFF] to-blue-300 p-2 w-full text-2xl font-semibold text-center">
//           <p>NOC</p>
//           <div className="flex justify-end items-end">
//             <FaCirclePlus className="text-green-900 text-2xl" />
//           </div>
//         </div>
//         <div>
//           <div className="px-5 py-3 w-[80%] ml-0 mt-2 text-left text-lg">
//             <p className="font-semibold">1. Visit the Official Website:</p>
//             <p>
//               - Go to the official website of the Ministry of Education, Science
//               and <br />
//               Technology (MOEST): noc.moest.gov.np.
//             </p>
//             <p className="mt-5 font-semibold">
//               2. Create an Account or Log In:
//             </p>
//             <p>
//               - If you don't have an account, create one using your email or{" "}
//               <br />
//               phone number.
//             </p>
//             <p>- If you already have an account, log in.</p>
//             <p className="mt-5 font-semibold">
//               3. Fill Out the Application Form:
//             </p>
//             <p>
//               - Carefully fill out the NOC application form with accurate
//               personal
//               <br />
//               information and other required details.
//             </p>
//             <p>- Ensure all information is correct and complete.</p>
//             <p className="mt-5 font-semibold">4. Upload Required Documents:</p>
//             <p>
//               - Upload scanned copies of the necessary documents, such as your
//               <br />
//               passport, acceptance letter, and other relevant documents.
//               <br />
//               information and other required details.
//             </p>
//             <p>- Ensure that the documents are clear and readable</p>
//           </div>
//         </div>
//         <div>
//           <div className="px-5 py-3 mt-2">
//             <button
//               onClick={handleEmailClick}
//               className="px-4 py-2 bg-green-700 rounded-lg text-white hover:bg-green-800"
//             >
//               Request Appointment
//             </button>
//           </div>
//           <div className="flex justify-between items-center bg-gradient-to-r from-[#FFFFFF] to-blue-300 p-2 w-full text-2xl font-semibold text-center">
//             <p>After Visa Session</p>
//             <div className="flex justify-end items-end">
//               <FaCirclePlus className="text-green-900 text-2xl" />
//             </div>
//           </div>
//         </div>
//         <div className="px-5 py-3 mt-2 text-center w-[96%] mx-auto">
          // <p>
          //   We do offer 3 Weeks comprehensive course for helping you with your
          //   Journey into US more fruitful.
          // </p>
          // <p className="mt-3">
          //   We will talk about everything from simple communication skills to
          //   Professional networking.
          // </p>
          // <p className="mt-3">
          //   We shall go into the depth of the US Culture and how to cope, adopt
          //   and thrive in the USA.
          // </p>
          // <p className="mt-3">
          //   Unfortunately, this 4 Weeks Session is not part of our application
          //   cost. We charge Rs. 5,000 for the whole session.
          // </p>
//         </div>

//         {isSignatureReady && (
//           <div className="px-5 py-3">
//             <form
//               action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
//               method="POST"
//             >
//               <input type="hidden" name="amount" value="5000" />
//               <input type="hidden" name="tax_amount" value="0" />
//               <input type="hidden" name="total_amount" value="5000" />
//               <input
//                 type="hidden"
//                 name="transaction_uuid"
//                 value={transactionUuid}
//               />
//               <input type="hidden" name="product_code" value="EPAYTEST" />
//               <input type="hidden" name="product_service_charge" value="0" />
//               <input type="hidden" name="product_delivery_charge" value="0" />
//               <input
//                 type="hidden"
//                 name="success_url"
//                 value="http://localhost:5173/esewa-success/"
//               />
//               <input
//                 type="hidden"
//                 name="failure_url"
//                 value="http://localhost:5173/esewa-fail/"
//               />
//               <input
//                 type="hidden"
//                 name="signed_field_names"
//                 value="total_amount,transaction_uuid,product_code"
//               />
//               <input type="hidden" name="signature" value={signature} />
//               <input
//                 value="Pay for After Visa Session with eSewa (Rs. 5000)"
//                 type="submit"
//                 className="px-4 py-2 bg-green-700 hover:bg-green-800 rounded-lg text-white cursor-pointer w-full mb-3"
//               />
//             </form>
//             {/* <div className="bg-gray-100 p-3 rounded text-sm">
//               <p><strong>Debug Info:</strong></p>
//               <p>Transaction UUID: {transactionUuid}</p>
//               <p>Signature: {signature}</p>
//             </div> */}

//             <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg shadow-sm text-sm text-gray-800 flex items-start gap-3">
//               <IoWarningOutline size={24} className="text-red-600 mt-1" />
//               <div>
//                 <p className="font-semibold mb-1">Disclaimer:</p>
//                 <p>
//                   This is a test environment. Please{" "}
//                   <span className="font-semibold text-red-700">do not</span> use
//                   your original credentials.
//                 </p>
//                 <p className="mt-2">
//                   <span className="font-medium">
//                     For testing purposes, use the following:
//                   </span>
//                   <br />
//                   <span className="block ml-4">
//                     eSewa ID: 9806800001 / 2 / 3 / 4 / 5<br />
//                     Password:{" "}
//                     <code className="bg-gray-200 px-1 rounded">Nepal@123</code>
//                     <br />
//                     MPIN: <code className="bg-gray-200 px-1 rounded">1122</code>
//                     <br />
//                     Token:{" "}
//                     <code className="bg-gray-200 px-1 rounded">123456</code>
//                   </span>
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="mt-4">
//           <button
//             onClick={() => handleSubmit()}
//             className={`w-full py-4 text-2xl font-semibold mt-3 ${
//               isStage9Completed
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-gradient-to-l from-[#ffffff] to-green-300 hover:from-[#ffffff] hover:to-green-500"
//             }`}
//             disabled={isStage9Completed}
//           >
//             {isStage9Completed ? "Stage 9: Completed" : "Stage 9: Submit"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Stage9;








import React, { useState, useEffect } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import CryptoJS from "crypto-js";
import { IoWarningOutline } from "react-icons/io5";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Stage9 = () => {
  const [stagesDetail, setStagesDetail] = useState([]);
  const [paymentDetail, setPaymentDetail] = useState(null);
  const [signature, setSignature] = useState("");
  const [isSignatureReady, setIsSignatureReady] = useState(false);
  const [transactionUuid, setTransactionUuid] = useState("");

  const studentID = localStorage.getItem("student_id");

  // Fetch stage details
  const getStages = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/application-time-stages/?student=${studentID}`
      );
      setStagesDetail(response.data);
    } catch (err) {
      console.log("Failed to get stages data", err);
    }
  };

  // Determine if Stage 9 is completed
  const stage9Data = stagesDetail.find((item) => item.stage === "9");
  const isStage9Completed = stage9Data?.is_complete === "completed";

  // Fetch payment details
  const getPaymentDetails = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/after-visa-payments/?student=${studentID}`
      );
      // take the first payment result if exists
      const data = response.data.results?.[0] || null;
      setPaymentDetail(data);
    } catch (err) {
      console.log("Failed to get payment detail", err);
    }
  };

  // Check if payment is complete
  const isPaid = paymentDetail?.status === "COMPLETE";

  // Generate random transaction UUID
  const generateRandomString = () => {
    const strings =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    let length = 25;
    for (let i = 0; i < length; i++) {
      code += strings[Math.floor(Math.random() * strings.length)];
    }
    return code;
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:someone@example.com";
  };

  // Generate eSewa signature once
  useEffect(() => {
    const generateEsewaSignature = () => {
      const secret = "8gBm/:&EnhH.1/q";
      const uuid = generateRandomString();
      const totalAmount = "5000";
      const productCode = "EPAYTEST";
      const message = `total_amount=${totalAmount},transaction_uuid=${uuid},product_code=${productCode}`;
      console.log("Message to sign:", message); // Debug log
      const hash = CryptoJS.HmacSHA256(message, secret);
      const signature = CryptoJS.enc.Base64.stringify(hash);
      console.log("Generated signature:", signature); // Debug log
      setTransactionUuid(uuid);
      setSignature(signature);
      setIsSignatureReady(true);
    };

    generateEsewaSignature();
  }, []);

  // Handle Stage 9 submission
  const handleSubmit = async () => {
    if (isStage9Completed) return;
    try {
      const payload = {
        student: studentID,
        payment_status: isPaid ? "Paid" : "Unpaid",
      };
      const response = await axios.post(
        `${API_BASE_URL}/stage-nine-submissions/`,
        payload
      );
      if (response) {
        console.log(response.data);
        alert("Stage 9 submission successful!");
        getStages();
      }
    } catch (error) {
      console.log("Failed to post the form data", error);
      alert("Failed to submit Stage 9. Please try again.");
    }
  };

  // Initial data fetch
  useEffect(() => {
    getStages();
    getPaymentDetails();
  }, []);

  return (
    <div className="flex md:flex-row-reverse flex-col">
      {/* Sidebar */}
      <div className="md:w-1/4 w-full bg-gradient-to-l from-[#FFFFFF] to-[#248A4D] h-auto md:h-dvh p-2 text-center">
        <h2 className="text-2xl underline font-bold">Stage 9:</h2>
        <h2 className="text-xl font-semibold mt-6">After Visa.</h2>
        <p className="font-medium mt-5">
          Just the last thing remaining in the menu. We have to make sure you
          are ready for the future ahead.
        </p>
        <p className="font-medium mt-3">
          Don't forget visa is just the foot on the door. We have a great,
          unpredicted and unexpected journey ahead. Let's make the necessary
          preparations
        </p>
      </div>

      {/* Main content */}
      <div className="w-full md:w-3/4 lh:w-4/5 bg-white h-svh p-2 md:overflow-scroll">
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
               and <br />
               Technology (MOEST): noc.moest.gov.np.
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
               - Carefully fill out the NOC application form with accurate personal
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

        {/* eSewa payment section */}
        {isSignatureReady && (
          <div className="px-5 py-3">
            {!isPaid ? (
              <form
                action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
                method="POST"
              >
                <input type="hidden" name="amount" value="5000" />
                <input type="hidden" name="tax_amount" value="0" />
                <input type="hidden" name="total_amount" value="5000" />
                <input
                  type="hidden"
                  name="transaction_uuid"
                  value={transactionUuid}
                />
                <input type="hidden" name="product_code" value="EPAYTEST" />
                <input
                  type="hidden"
                  name="product_service_charge"
                  value="0"
                />
                <input
                  type="hidden"
                  name="product_delivery_charge"
                  value="0"
                />
                <input
                  type="hidden"
                  name="success_url"
                  value="http://localhost:5173/esewa-success/"
                />
                <input
                  type="hidden"
                  name="failure_url"
                  value="http://localhost:5173/esewa-fail/"
                />
                <input
                  type="hidden"
                  name="signed_field_names"
                  value="total_amount,transaction_uuid,product_code"
                />
                <input type="hidden" name="signature" value={signature} />
                <input
                  value="Pay for After Visa Session with eSewa (Rs. 5000)"
                  type="submit"
                  className="px-4 py-2 bg-green-700 hover:bg-green-800 rounded-lg text-white cursor-pointer w-full mb-3"
                />
              </form>
            ) : (
              <button
                disabled
                className="px-4 py-2 bg-gray-400 rounded-lg text-white w-full mb-3 cursor-not-allowed"
              >
                Already Paid
              </button>
            )}

            {/* <div className="bg-gray-100 p-3 rounded text-sm">
              <p><strong>Debug Info:</strong></p>
              <p>Transaction UUID: {transactionUuid}</p>
              <p>Signature: {signature}</p>
            </div> */}

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg shadow-sm text-sm text-gray-800 flex items-start gap-3">
              <IoWarningOutline size={24} className="text-red-600 mt-1" />
              <div>
                <p className="font-semibold mb-1">Disclaimer:</p>
                <p>
                  This is a test environment. Please{' '}
                  <span className="font-semibold text-red-700">do not</span> use
                  your original credentials.
                </p>
                <p className="mt-2">
                  <span className="font-medium">
                    For testing purposes, use the following:
                  </span>
                  <br />
                  <span className="block ml-4">
                    eSewa ID: 9806800001 / 2 / 3 / 4 / 5<br />
                    Password:{' '}
                    <code className="bg-gray-200 px-1 rounded">Nepal@123</code>
                    <br />
                    MPIN: <code className="bg-gray-200 px-1 rounded">1122</code>
                    <br />
                    Token:{' '}
                    <code className="bg-gray-200 px-1 rounded">123456</code>
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Submit button */}
        <div className="mt-4">
          <button
            onClick={handleSubmit}
            className={`w-full py-4 text-2xl font-semibold mt-3 ${
              isStage9Completed
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-l from-[#ffffff] to-green-300 hover:from-[#ffffff] hover:to-green-500"
            }`}
            disabled={isStage9Completed}
          >
            {isStage9Completed ? "Stage 9: Completed" : "Stage 9: Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stage9;
