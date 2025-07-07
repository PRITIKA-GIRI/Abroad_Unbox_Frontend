// import React, { useState } from "react";
// import Nav from "./Nav";
// import { FaEye, FaEyeSlash } from 'react-icons/fa';

// export default function Register (){
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConPassword, setShowConPassword] = useState(false);

//     return(
//         <>
//         <Nav />
//         <h2 className="mt-5 text-4xl font-serif text-center">User Registration</h2>

//         <form className="w-11/12 mx-auto content-center mt-5 space-y-1">
//             <div className="w-full md:w-1/2 mx-auto flex gap-2 items-center border-b-gray-500">
//                 <label className="w-1/2">First Name:<sup>*</sup></label>
//                 <input type="text" name="f_name" className="border py-1 px-2 rounded-lg w-1/2" required />
//             </div>
//             <div className="w-full md:w-1/2 mx-auto flex gap-2 items-center">
//                 <label className="w-1/2">Middle Name:</label>
//                 <input type="text" name="m_name" className="border py-1 px-2 rounded-lg w-1/2" />
//             </div>
//             <div className="w-full md:w-1/2 mx-auto flex gap-2 items-center">
//                 <label className="w-1/2">Last Name:<sup>*</sup></label>
//                 <input type="text" name="l_name" className="border py-1 px-2 rounded-lg w-1/2" required />
//             </div>

//             {/* Divider */}<div className="border-t border-gray-300 my-3 w-full md:w-1/2 mx-auto"></div>

//             <div className="w-full md:w-1/2 mx-auto flex gap-2 items-center">
//                 <label className="w-1/2">Email:<sup>*</sup></label>
//                 <input type="text" name="email" className="border py-1 px-2 rounded-lg w-1/2" required />
//             </div>
//             <div className="w-full md:w-1/2 mx-auto flex gap-2 items-center">
//                 <label className="w-1/2">Contact Number:<sup>*</sup></label>
//                 <input type="text" name="c_numer" className="border py-1 px-2 rounded-lg w-1/2" required />
//             </div>
//             <div className="w-full md:w-1/2 mx-auto flex gap-2 items-center">
//                 <label className="w-1/2">Secondary Number:</label>
//                 <input type="text" name="s_numer" className="border py-1 px-2 rounded-lg w-1/2" required />
//             </div>

//             {/* Divider */}<div className="border-t border-gray-300 my-3 w-full md:w-1/2 mx-auto"></div>

//             <div className="w-full md:w-1/2 mx-auto flex gap-2 items-center">
//                 <label className="w-1/2">Date of Birth:<sup>*</sup></label>
//                 <input type="date" name="dob" className="border py-1 px-2 rounded-lg w-1/2" required />
//             </div>
//             <div className="w-full md:w-1/2 mx-auto flex gap-2 items-center">
//                 <label className="w-1/2">Gender:<sup>*</sup></label>
//                 <select className="border py-1 px-2 rounded-lg w-1/2" name="gender">
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                     <option value="Other">Other</option>
//                 </select>
//             </div>

//             {/* Divider */}<div className="border-t border-gray-300 my-3 w-full md:w-1/2 mx-auto"></div>

//             <div className="w-full md:w-1/2 mx-auto flex gap-2 items-center">
//                 <label className="w-1/2">Application Level:<sup>*</sup></label>
//                 <select className="border py-1 px-2 rounded-lg w-1/2" name="app_level">
//                     <option value="undergraduate">Bachelors</option>
//                     <option value="graduate">Masters</option>
//                 </select>
//             </div>
//             <div className="w-full md:w-1/2 mx-auto flex gap-2 items-center">
//                 <label className="w-1/2">GPA/Percent:<sup>*</sup></label>
//                 <div className="flex w-1/2 justify-between"><input type="text" name="obtained_gpa_percentage" className="border py-1 px-2 rounded-lg w-1/3" required /> 
//                 Out of 
//                 <input type="text" name="total_gpa_percentage" className="border py-1 px-2 rounded-lg w-1/3" required /></div>
//             </div>
//             <div className="w-full md:w-1/2 mx-auto flex gap-2 items-center">
//                 <label className="w-1/2">Major:<sup>*</sup></label>
//                 <input type="text" name="major" className="border py-1 px-2 rounded-lg w-1/2" required />
//             </div>
//             <div className="w-full md:w-1/2 mx-auto flex gap-2 items-center">
//                 <label className="w-1/2">Expected Intake :<sup>*</sup></label>
//                 <input
//                     type="month"
//                     name="ex_intake_month"
//                     className="border py-1 px-2 rounded-lg w-1/2"
//                     required
//                     onInput={(e) => {
//                         const allowedMonths = [0, 2, 7]; // Jan = 0, Mar = 2, Aug = 7
//                         const value = e.target.value;
//                         const month = new Date(value).getMonth();
//                         if (!allowedMonths.includes(month)) {
//                             alert("Only January, March, or August are allowed.");
//                             e.target.value = ""; // Clear invalid input
//                         }
//                     }}
//                 />
//             </div>

//             {/* Divider */}<div className="border-t border-gray-300 my-3 w-full md:w-1/2 mx-auto"></div>

//             <div className="w-full md:w-1/2 mx-auto flex gap-2 items-center relative">
//                 <label className="w-1/2">Password:<sup>*</sup></label>
//                 <div className="relative w-1/2">
//                 <input
//                     type={showPassword ? 'text' : 'password'}
//                     name="password"
//                     className="border py-1 px-2 rounded-lg w-full pr-10"
//                     required
//                 />
//                 <button
//                     type="button"
//                     className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
//                     onClick={() => setShowPassword((prev) => !prev)}
//                 >
//                     {showPassword ? <FaEyeSlash /> : <FaEye />}
//                 </button>
//                 </div>
//             </div>

//             {/* Confirm Password */}
//             <div className="w-full md:w-1/2 mx-auto flex gap-2 items-center relative mt-4">
//                 <label className="w-1/2">Confirm Password:<sup>*</sup></label>
//                 <div className="relative w-1/2">
//                 <input
//                     type={showConPassword ? 'text' : 'password'}
//                     name="con_password"
//                     className="border py-1 px-2 rounded-lg w-full pr-10"
//                     required
//                 />
//                 <button
//                     type="button"
//                     className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
//                     onClick={() => setShowConPassword((prev) => !prev)}
//                 >
//                     {showConPassword ? <FaEyeSlash /> : <FaEye />}
//                 </button>
//                 </div>
//             </div>
            
//             {/* Divider */}<div className="border-t border-gray-300 my-3 w-full md:w-1/2 mx-auto"></div>

//             <div className="w-full md:w-1/2 mx-auto flex gap-2 items-center mt-5">
//                 <input type="submit" name="submit" className="bg-green-400 hover:bg-green-500 py-1 px-2 rounded-lg w-1/2 mx-auto font-semibold" value="Register" />
//             </div>
//         </form>
//         </>
//     )
// }






import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const [formData, setFormData] = useState({
    f_name: '',
    m_name: '',
    l_name: '',
    email: '',
    c_numer: '',
    s_numer: '',
    dob: '',
    gender: 'Male',
    app_level: 'undergraduate',
    obtained_gpa_percentage: '',
    total_gpa_percentage: '',
    major: '',
    ex_intake_month: '',
    password: '',
    con_password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.con_password) {
      alert("Passwords do not match.");
      return;
    }

    const payload = {
      first_name: formData.f_name,
      middle_name: formData.m_name,
      last_name: formData.l_name,
      email: formData.email,
      contact_number: formData.c_numer,
      secondary_number: formData.s_numer,
      date_of_birth: formData.dob,
      gender: formData.gender,
      application_level: formData.app_level,
      obtained_gpa_percent: formData.obtained_gpa_percentage,
      total_gpa_percent: formData.total_gpa_percentage,
      major: formData.major,
      expected_intake: formData.ex_intake_month + "-01",
      password: formData.password
    };

    try {
      const response = await fetch(`${API_BASE_URL}/students/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert("Successfully registered!");
        navigate("/login");
      } else {
        const errorData = await response.json();
        alert(`Registration failed: ${JSON.stringify(errorData)}`);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Nav />
      <h2 className="mt-5 text-4xl font-serif text-center">User Registration</h2>
      <form onSubmit={handleSubmit} className="w-11/12 mx-auto content-center mt-5 space-y-4">

        {/* Name Fields */}
        <div className="w-full md:w-1/2 mx-auto flex gap-2 items-center">
          <label className="w-1/2">First Name:<sup>*</sup></label>
          <input
            type="text"
            name="f_name"
            value={formData.f_name}
            onChange={handleChange}
            className="border py-1 px-2 rounded-lg w-1/2"
            required
          />
        </div>
        <div className="w-full md:w-1/2 mx-auto flex gap-2 items-center">
          <label className="w-1/2">Middle Name:</label>
          <input
            type="text"
            name="m_name"
            value={formData.m_name}
            onChange={handleChange}
            className="border py-1 px-2 rounded-lg w-1/2"
          />
        </div>
        <div className="w-full md:w-1/2 mx-auto flex gap-2 items-center">
          <label className="w-1/2">Last Name:<sup>*</sup></label>
          <input
            type="text"
            name="l_name"
            value={formData.l_name}
            onChange={handleChange}
            className="border py-1 px-2 rounded-lg w-1/2"
            required
          />
        </div>

        <div className="border-t border-gray-300 my-3 w-full md:w-1/2 mx-auto"></div>

        {/* Contact Fields */}
        <div className="w-full md:w-1/2 mx-auto flex gap-2 items-center">
          <label className="w-1/2">Email:<sup>*</sup></label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border py-1 px-2 rounded-lg w-1/2"
            required
          />
        </div>
        <div className="w-full md:w-1/2 mx-auto flex gap-2 items-center">
          <label className="w-1/2">Contact Number:<sup>*</sup></label>
          <input
            type="text"
            name="c_numer"
            value={formData.c_numer}
            onChange={handleChange}
            className="border py-1 px-2 rounded-lg w-1/2"
            required
          />
        </div>
        <div className="w-full md:w-1/2 mx-auto flex gap-2 items-center">
          <label className="w-1/2">Secondary Number:</label>
          <input
            type="text"
            name="s_numer"
            value={formData.s_numer}
            onChange={handleChange}
            className="border py-1 px-2 rounded-lg w-1/2"
          />
        </div>

        <div className="border-t border-gray-300 my-3 w-full md:w-1/2 mx-auto"></div>

        {/* Personal Info */}
        <div className="w-full md:w-1/2 mx-auto flex gap-2 items-center">
          <label className="w-1/2">Date of Birth:<sup>*</sup></label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="border py-1 px-2 rounded-lg w-1/2"
            required
          />
        </div>
        <div className="w-full md:w-1/2 mx-auto flex gap-2 items-center">
          <label className="w-1/2">Gender:<sup>*</sup></label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border py-1 px-2 rounded-lg w-1/2"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="border-t border-gray-300 my-3 w-full md:w-1/2 mx-auto"></div>

        {/* Academic Info */}
        <div className="w-full md:w-1/2 mx-auto flex gap-2 items-center">
          <label className="w-1/2">Application Level:<sup>*</sup></label>
          <select
            name="app_level"
            value={formData.app_level}
            onChange={handleChange}
            className="border py-1 px-2 rounded-lg w-1/2"
          >
            <option value="undergraduate">Bachelors</option>
            <option value="graduate">Masters</option>
          </select>
        </div>
        <div className="w-full md:w-1/2 mx-auto flex gap-2 items-center">
          <label className="w-1/2">GPA/Percent:<sup>*</sup></label>
          <div className="flex w-1/2 justify-between">
            <input
              type="text"
              name="obtained_gpa_percentage"
              value={formData.obtained_gpa_percentage}
              onChange={handleChange}
              className="border py-1 px-2 rounded-lg w-1/3"
              required
            />
            <span className="self-center">Out of</span>
            <input
              type="text"
              name="total_gpa_percentage"
              value={formData.total_gpa_percentage}
              onChange={handleChange}
              className="border py-1 px-2 rounded-lg w-1/3"
              required
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 mx-auto flex gap-2 items-center">
          <label className="w-1/2">Major:<sup>*</sup></label>
          <input
            type="text"
            name="major"
            value={formData.major}
            onChange={handleChange}
            className="border py-1 px-2 rounded-lg w-1/2"
            required
          />
        </div>
        <div className="w-full md:w-1/2 mx-auto flex gap-2 items-center">
          <label className="w-1/2">Expected Intake:<sup>*</sup></label>
          <input
            type="month"
            name="ex_intake_month"
            value={formData.ex_intake_month}
            onChange={handleChange}
            className="border py-1 px-2 rounded-lg w-1/2"
            required
            onInput={(e) => {
              const allowed = [0, 2, 7]; // Jan, Mar, Aug
              const month = new Date(e.target.value + "-01").getMonth();
              if (!allowed.includes(month)) {
                alert("Only January, March, or August are allowed.");
                e.target.value = "";
                setFormData(prev => ({ ...prev, ex_intake_month: "" }));
              }
            }}
          />
        </div>

        <div className="border-t border-gray-300 my-3 w-full md:w-1/2 mx-auto"></div>

        {/* Password Fields */}
        <div className="w-full md:w-1/2 mx-auto flex gap-2 items-center relative">
          <label className="w-1/2">Password:<sup>*</sup></label>
          <div className="relative w-1/2">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border py-1 px-2 rounded-lg w-full pr-10"
              required
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(prev => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/2 mx-auto flex gap-2 items-center relative">
          <label className="w-1/2">Confirm Password:<sup>*</sup></label>
          <div className="relative w-1/2">
            <input
              type={showConPassword ? 'text' : 'password'}
              name="con_password"
              value={formData.con_password}
              onChange={handleChange}
              className="border py-1 px-2 rounded-lg w-full pr-10"
              required
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowConPassword(prev => !prev)}
            >
              {showConPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="border-t border-gray-300 my-3 w-full md:w-1/2 mx-auto"></div>

        {/* Submit */}
        <div className="w-full md:w-1/2 mx-auto flex gap-2 items-center mt-5">
          <button
            type="submit"
            className="bg-green-400 hover:bg-green-500 py-1 px-2 rounded-lg w-1/2 mx-auto font-semibold"
          >
            Register
          </button>
        </div>
      </form>
    </>
  );
}
