import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/bg_img/logo1.png';
import { FaUser } from 'react-icons/fa';

function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [first_name, setFirstName] = useState('');
  const [role, setRole] = useState('');
  const [graduation, setGraduation] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle mobile menu visibility
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    const storedFirstName = localStorage.getItem('first_name');
    const role = localStorage.getItem("role");
    const storedRole = localStorage.getItem('role');
    const storedGraduation = localStorage.getItem('application_level');
    if (token) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
      setFirstName(storedFirstName);
      setRole(storedRole);
      setGraduation(storedGraduation);
    } else {
      setIsLoggedIn(false);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUsername('');
    navigate('/');
    window.location.reload();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu visibility
  };

  return (
    <>
      <div className="bg-gradient-to-l from-[#006600] to-[#ffffff] px-6 py-4 flex items-center justify-between sm:px-10 sm:py-4">
        <a href='/'><img className="mr-auto w-[60px] sm:w-[70px]" src={logo} alt="Logo" /></a>
        <nav className="hidden sm:flex px-10 py- 5 mt-3 text-xl font-semibold">
          {/* <ul className="flex gap-10 justify-between">
            <Link to="/"><li className="hover:text-blue-900 hover:underline">Home</li></Link>
            <a href="/login"><li className="hover:text-blue-900 hover:underline">Application</li></a>
            <a href="/login"><li className="hover:text-blue-900 hover:underline">Essay</li></a>
            <a href="/login"><li className="hover:text-blue-900 hover:underline">SAT</li></a>
            <a href="/login"><li className="hover:text-blue-900 hover:underline">English Proficiency</li></a>
            <a href="/login"><li className="hover:text-blue-900 hover:underline">Info Session</li></a>
            <a href="https://www.google.com/maps/dir/?api=1&destination=Abroad Unbox, Kaikastan Marg, Kathmandu 44600" target="_blank">
              <li className="hover:text-blue-900 hover:underline">Navigate</li>
            </a>
          </ul> */}
          {isLoggedIn ? (
            <ul className="flex justify-between">
              {/* <Link to="/"><li className="hover:text-blue-900 hover:underline">Home</li></Link> */}
              {role === "admin" ? (
                <a href="/admin_dashboard">
                  <li className="py-2 px-4 hover:bg-blue-400 hover:text-white rounded-tl-2xl rounded-br-2xl">Application</li>
                </a>
              ) : graduation === "undergraduate" ? (
                <a href="/application">
                  <li className="py-2 px-4 hover:bg-blue-400 hover:text-white rounded-tl-2xl rounded-br-2xl">Application</li>
                </a>
              ) : (
                <a href="/masters-application">
                  <li className="py-2 px-4 hover:bg-blue-400 hover:text-white rounded-tl-2xl rounded-br-2xl">Application</li>
                </a>
              )}
              <a href="/essay"><li className="py-2 px-4 hover:bg-blue-400 hover:text-white rounded-tl-2xl rounded-br-2xl">Essay</li></a>
              <a href="/"><li className="py-2 px-4 hover:bg-blue-400 hover:text-white rounded-tl-2xl rounded-br-2xl">SAT</li></a>
              <a href="/"><li className="py-2 px-4 hover:bg-blue-400 hover:text-white rounded-tl-2xl rounded-br-2xl">English Proficiency</li></a>
              <a href="/info"><li className="py-2 px-4 hover:bg-blue-400 hover:text-white rounded-tl-2xl rounded-br-2xl">Info Session</li></a>
              {role == "admin" &&(
                <a href="/register_student"><li className="py-2 px-4 hover:bg-blue-400 hover:text-white rounded-tl-2xl rounded-br-2xl">Register Student</li></a>
              )}
              <a href="https://www.google.com/maps/dir/?api=1&destination=Abroad Unbox, Kaikastan Marg, Kathmandu 44600" target="_blank">
                <li className="py-2 px-4 hover:bg-blue-400 hover:text-white rounded-tl-2xl rounded-br-2xl" title='Kalikastan-29, Kathmandu, Nepal'>Navigate</li>
              </a>
            </ul>
          ) : (
            <ul className="flex justify-between">
              {/* <Link to="/"><li className="hover:text-blue-900 hover:underline">Home</li></Link> */}
              <a href="/login"><li className="py-2 px-4 hover:bg-blue-400 hover:text-white rounded-tl-2xl rounded-br-2xl">Application</li></a>
              <a href="/login"><li className="py-2 px-4 hover:bg-blue-400 hover:text-white rounded-tl-2xl rounded-br-2xl">Essay</li></a>
              <a href="/login"><li className="py-2 px-4 hover:bg-blue-400 hover:text-white rounded-tl-2xl rounded-br-2xl">SAT</li></a>
              <a href="/login"><li className="py-2 px-4 hover:bg-blue-400 hover:text-white rounded-tl-2xl rounded-br-2xl">English Proficiency</li></a>
              <a href="/info"><li className="py-2 px-4 hover:bg-blue-400 hover:text-white rounded-tl-2xl rounded-br-2xl">Info Session</li></a>
              <a href="https://www.google.com/maps/dir/?api=1&destination=Abroad Unbox, Kaikastan Marg, Kathmandu 44600" target="_blank">
                <li className="py-2 px-4 hover:bg-blue-400 hover:text-white rounded-tl-2xl rounded-br-2xl" title='Kalikastan-29, Kathmandu, Nepal'>Navigate</li>
              </a>
            </ul>
          )}
        </nav>

        <div className="flex items-center ml-auto">
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <span className="text-black">Welcome, {first_name}</span>
              {role === "student" && (() => {
                const studentId = localStorage.getItem("student_id");
                return (
                  <Link to={`/student-dashboard/${studentId}`}>
                    <FaUser
                      className="text-xl hover:text-blue-800 cursor-pointer"
                      title="Dashboard"
                    />
                  </Link>
                );
              })()}
              <button
                onClick={handleLogout}
                className="p-2 bg-blue-400 hover:bg-blue-600 text-black rounded-lg cursor-pointer hover:text-white hover:scale-105 transition-transform duration-200 font-semibold"
              >
                Log Out
              </button>
            </div>
          ) : (
            <>
            <Link to="/login">
              <button className="ml-auto p-2 bg-[#1a53ff] text-white rounded-lg cursor-pointer mr-2 hover:bg-black hover:scale-105 transition-transform duration-200 font-semibold">
                Log In
              </button>
            </Link>
            <Link to="/register">
              <button className="ml-auto p-2 bg-[#1a53ff] text-white rounded-lg cursor-pointer mr-4 hover:bg-black hover:scale-105 transition-transform duration-200 font-semibold">
                Register
              </button>
            </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="sm:hidden">
          <button
            onClick={toggleMenu}
            className="text-white"
            aria-label="Menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Navigation (Hidden by default) */}
      <div className={`sm:hidden bg-gradient-to-l from-[#006600] to-[#ffffff] text-xl font-bold ${isMenuOpen ? 'block' : 'hidden'}`}>

      {isLoggedIn ? (
            <ul className="flex flex-col gap-5 justify-between p-2">
              {/* <Link to="/"><li className="hover:text-blue-900 hover:underline">Home</li></Link> */}
              {role === "admin" ? (
                <a href="/admin_dashboard">
                  <li className="hover:text-blue-900 hover:underline">Application</li>
                </a>
              ) : graduation === "undergraduate" ? (
                <a href="/application">
                  <li className="hover:text-blue-900 hover:underline">Application</li>
                </a>
              ) : (
                <a href="/masters-application">
                  <li className="hover:text-blue-900 hover:underline">Application</li>
                </a>
              )}
              <a href="/essay"><li className="hover:text-blue-900 hover:underline">Essay</li></a>
              <a href="/"><li className="hover:text-blue-900 hover:underline">SAT</li></a>
              <a href="/"><li className="hover:text-blue-900 hover:underline">English Proficiency</li></a>
              <a href="/info"><li className="hover:text-blue-900 hover:underline">Info Session</li></a>
              {role == "admin" &&(
                <a href="/register_student"><li className="hover:text-blue-900 hover:underline">Register Student</li></a>
              )}
              <a href="https://www.google.com/maps/dir/?api=1&destination=Abroad Unbox, Kaikastan Marg, Kathmandu 44600" target="_blank">
                <li className="hover:text-blue-900 hover:underline" title='Kalikastan-29, Kathmandu, Nepal'>Navigate</li>
              </a>
            </ul>
          ) : (

        <ul className="flex flex-col gap-5 py-5 px-2">
          <Link to="/"><li className="hover:text-blue-900 hover:underline">Home</li></Link>
          <a href="/login"><li className="hover:text-blue-900 hover:underline">Application</li></a>
          <a href="/login"><li className="hover:text-blue-900 hover:underline">Essay</li></a>
          <a href="/login"><li className="hover:text-blue-900 hover:underline">SAT</li></a>
          <a href="/login"><li className="hover:text-blue-900 hover:underline">English Proficiency</li></a>
          <a href="/login"><li className="hover:text-blue-900 hover:underline">Info Session</li></a>
          <a href="https://www.google.com/maps/dir/?api=1&destination=27.7172,85.3240" target="_blank">
            <li className="hover:text-blue-900 hover:underline" title='Kalikastan-29, Kathmandu, Nepal'>Navigate</li>
          </a>
        </ul>
          )}
      </div>
    </>
  );
}

export default Nav;


