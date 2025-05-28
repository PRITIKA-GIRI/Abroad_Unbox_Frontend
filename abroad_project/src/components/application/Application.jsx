import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import lock_svg from "../../assets/svg/lock-red.svg";
import Footer from "../Footer";
import Back from "../../assets/svg/back-to-home.png";
import { IoMdMenu } from "react-icons/io";
import axios from "axios";
import Stage1 from "./Stage1";
import Stage2 from "./Stage2";
import Stage3 from "./Stage3";
import Stage4 from "./Stage4";
import Stage5 from "./Stage5";
import Stage6 from "./Stage6";
import Stage7 from "./Stage7";
import Stage8 from "./Stage8";
import Stage9 from "./Stage9";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Application() {
  const [stages, setStages] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeStage, setActiveStage] = useState(1);
  const student_id = localStorage.getItem("student_id");
  const admin_id = localStorage.getItem("user_id");
  const role = localStorage.getItem("role");

  useEffect(() => {
    const getStages = async () => {
      try {
        if (role === "admin") {
          const response = await axios.get(
            `${API_BASE_URL}/application-time-stages/?user=${admin_id}`
          );
          setStages(response.data);
        } else {
          const response = await axios.get(
            `${API_BASE_URL}/application-time-stages/?student=${student_id}`
          );
          setStages(response.data);
        }
      } catch (error) {
        console.log("Failed to get the stages data", error);
      }
    };

    getStages();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleStageClick = (stageNumber, isLocked) => {
    if (isLocked === "unlocked") {
      setActiveStage(parseInt(stageNumber));
      setIsMenuOpen(false);
    }
  };

  const renderStageComponent = () => {
    switch (activeStage) {
      case 1:
        return <Stage1 />;
      case 2:
        return <Stage2 />;
      case 3:
        return <Stage3 />;
      case 4:
        return <Stage4 />;
      case 5:
        return <Stage5 />;
      case 6:
        return <Stage6 />;
      case 7:
        return <Stage7 />;
      case 8:
        return <Stage8 />;
      case 9:
        return <Stage9 />;
      default:
        return (
          <div>
            <Stage1 />
          </div>
        );
    }
  };

  return (
    <>
      {/* Header */}
      <div className="p-3 w-full flex flex-row gap-1 bg-gradient-to-r from-green-300 to-blue-300 text-xl font-semibold text-center items-center">
        <Link to="/">
          <img
            src={Back}
            alt="Back to Home"
            title="Back to Home"
            className="w-10"
          />
        </Link>
        <p className="ml-[40%]">My Application Roadmap</p>
      </div>

      {/* Menu icon for small screens */}
      <div className="w-full mt-1 flex md:hidden justify-end px-1">
        <IoMdMenu
          onClick={toggleMenu}
          className="text-3xl text-green-800 cursor-pointer"
          aria-label="Toggle menu"
        />
      </div>

      {/* Stages Navigation */}
      <div className="flex flex-col md:flex-row">
        {/* Left: Stages Navigation */}
        <div className="w-full md:w-1/6 mt-3 flex md:flex-col flex-col gap-3 items-left">
          {stages.map((stage) => (
            <div key={stage.id} className="w-full">
              {/* Desktop */}
              <div className="hidden md:flex flex-col justify-between items-center text-white font-bold text-xl">
                <span
                  onClick={() => handleStageClick(stage.stage, stage.is_locked)}
                  className={`w-full p-3 cursor-pointer flex ${
                    stage.is_locked === "unlocked"
                      ? activeStage === parseInt(stage.stage)
                        ? "bg-green-600"
                        : "bg-green-800 hover:bg-green-700"
                      : "bg-gray-400"
                  }`}
                >
                  Stage {stage.stage} {stage.is_locked !== "unlocked" && (
                  <img src={lock_svg} className="w-8 ml-10 " alt="Lock icon" />
                )}
                </span>
                {/* {stage.is_locked !== "unlocked" && (
                  <img src={lock_svg} className="w-8 mr-3" alt="Lock icon" />
                )} */}
              </div>

              {/* Mobile */}
              {isMenuOpen && (
                <div className="flex md:hidden justify-between items-center text-white font-bold text-xl">
                  <span
                    onClick={() =>
                      handleStageClick(stage.stage, stage.is_locked)
                    }
                    className={`w-full p-3 cursor-pointer ${
                      stage.is_locked === "unlocked"
                        ? activeStage === parseInt(stage.stage)
                          ? "bg-green-600"
                          : "bg-green-800 hover:bg-green-700"
                        : "bg-gray-400"
                    }`}
                  >
                    Stage {stage.stage}
                  </span>
                  {stage.is_locked !== "unlocked" && (
                    <img src={lock_svg} className="w-8 mr-3" alt="Lock icon" />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right: Stage Component */}
        <div className="w-full md:w-5/6 p-3 overflow-auto h-dvh">
          {renderStageComponent()}
        </div>
      </div>

      {/* Stage content */}

      {/* <Footer /> */}
    </>
  );
}

export default Application;
