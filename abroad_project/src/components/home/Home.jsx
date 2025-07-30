import { useState } from "react";
import { Link } from "react-router-dom";
import React, { useRef } from "react";
import linkedin_svg from "../../assets/svg/linkedin1.svg";
import facebook_svg from "../../assets/svg/facebook1.svg";
import instagram_svg from "../../assets/svg/instagram1.svg";
import yt_svg from "../../assets/svg/youtube.svg";
import bg1 from "../../assets/bg_img/Photo 1-2.jpg";
import bg2 from "../../assets/bg_img/Photo 2-2.jpg";
import bg3 from "../../assets/bg_img/Photo 3-2.jpg";
import bg4 from "../../assets/bg_img/Photo 4-2.jpg";
import photo1 from "../../assets/sucess_img/photo1.png";
import photo2 from "../../assets/sucess_img/photo2.png";
import photo3 from "../../assets/sucess_img/photo3.png";
import photo4 from "../../assets/sucess_img/photo4.png";
import photo5 from "../../assets/sucess_img/photo5.png";
import photo6 from "../../assets/sucess_img/sachit.png";
import photo7 from "../../assets/sucess_img/photo7.png";
import photo8 from "../../assets/sucess_img/photo8.png";
import photo9 from "../../assets/sucess_img/subash.png";
import photo10 from "../../assets/sucess_img/pratik.png";
import photo11 from "../../assets/sucess_img/photo11.png";
import photo12 from "../../assets/sucess_img/photo12.png";
import photo13 from "../../assets/sucess_img/photo13.png";
import photo14 from "../../assets/sucess_img/photo14.png";
import photo15 from "../../assets/sucess_img/photo15.png";
import photo16 from "../../assets/sucess_img/photo16.png";
import photo17 from "../../assets/sucess_img/photo17.png";
import photo18 from "../../assets/sucess_img/photo18.png";
import photo19 from "../../assets/sucess_img/photo19.png";
import photo20 from "../../assets/sucess_img/photo20.png";
import photo21 from "../../assets/sucess_img/photo21.png";
import photo22 from "../../assets/sucess_img/photo22.png";
import photo23 from "../../assets/sucess_img/photo23.png";
import next_svg from "../../assets/svg/next.svg";

import Nav from "../Nav";
import Footer from "../Footer";
import CommitmentServices from "./CommitmentServices";
import ExpAdvices from "./ExpAdvices";
import Success from "./Success";

const details = [
  {
    photo: bg1,
    title: "Welcome to Abroad Unbox",
    detail_text: "Mentor to your Career",
    memo: "Welcome to your study and career in the US",
    detail_text2:
      "We are <strong>Prep School</strong>, not a consultancy helping students not just with getting your <strong>visa</strong>, but making sure you are able to <strong>succeed</strong> out there as well.",
  },
  {
    photo: bg2,
    title: "Everything Matters!",
    memo: "It's not just the documents, it about your overall profile.",
    detail_text:
      "Most of the university does the holistic profile review, Admissions and Scholarships are often based on:",
    list: "- Your Academics,<br/>- Standardize test Scores<br/>- Essays (Personal Essay & SOP)<br/>- Extracurricular involvement<br/>- Exceptional qualities<br/>- Communication<br/>- And much more........",
  },
  {
    photo: bg3,
    title: "Have the Right Mindset!",
    memo: "Don't have Tunnel Vision. Visa is just a foot on the door.",
    detail_text:
      "Don't make visa your <strong>goal</strong>.<br/>It is just the consequence of your <strong>preparation<strong>.",
    detail_text2:
      "Focus on your choice of <strong>Major</strong>, your <strong>University</strong> selection, <strong>Personal</strong> skills, <strong>Professional</strong> skills & <strong>Networking</strong>.",
  },
  {
    photo: bg4,
    title: "Grow, be Competent!",
    memo: "Ability is of little account without opportunity & Vice Versa.",
    detail_text:
      "Going to <strong>University</stong> is <strong>not</strong> just about getting a <strong>degree</strong>,<br/>Nor even the <strong>knowledge</strong>.<br/>You can do it <strong>Online</strong> these days,",
    detail_text2:
      "You are there to <strong>learn, solve</strong> problems, <strong>innovate</strong>, and add to the <strong>collective knowledge</strong> of humankind.",
    detail_text3:
      "<strong>Choose</strong> the university that allows you to do so.",
  },
];

const successes = [
  {
    photo: photo1,
  },
  {
    photo: photo2,
  },
  {
    photo: photo3,
  },
  {
    photo: photo4,
  },
  {
    photo: photo5,
  },
  {
    photo: photo6,
  },
  {
    photo: photo7,
  },
  {
    photo: photo8,
  },
  {
    photo: photo9,
  },
  {
    photo: photo10,
  },
  {
    photo: photo11,
  },
  {
    photo: photo12,
  },
  {
    photo: photo13,
  },
  {
    photo: photo14,
  },
  {
    photo: photo15,
  },
  {
    photo: photo16,
  },
  {
    photo: photo17,
  },
  {
    photo: photo18,
  },
  {
    photo: photo19,
  },
  {
    photo: photo20,
  },
  {
    photo: photo21,
  },
  {
    photo: photo22,
  },
  {
    photo: photo23,
  },
];

function Home() {
  // const containerRef = useRef(null);

  // // Function to scroll the container
  // const scrollRight = () => {
  //     if (containerRef.current) {
  //         containerRef.current.scrollBy({
  //             left: 400, // Adjust this value based on how much you want to scroll
  //             behavior: 'smooth',
  //         });
  //     }
  // };

  return (
    <>
      <Nav />
      <div className="relative">
        {/* ref={containerRef} */}
        <div className="w-11/12 mx-auto mt-3">
          <div className="relative mx-auto flex flex-row overflow-x-scroll gap-4">
            {details.map((detail, index) => (
              <div
                key={index}
                className="relative rounded-lg overflow-hidden h-[420px] min-w-[350px] sm:h-[650px] md:h-[550px] sm:min-w-[600px] md:min-w-[800px] lg:min-w-[900px]"
              >
                {/* Blurred Background Layer */}
                <div
                  className="absolute inset-0 bg-cover bg-center h-full w-full"
                  style={{ backgroundImage: `url(${detail.photo})` }}
                >
                  <div className="bg-black z-[5] w-full h-full opacity-60"></div>
                </div>

                {/* Content Layer */}
                <div className="relative w-3/4 flex flex-col ml-5 text-white z-10 p-5 sm:p-8">
                  <h2 className="text-xl sm:text-2xl font-bold">
                    {detail.title}
                  </h2>
                  <p className="mt-3 text-lg sm:text-xl">{detail.memo}</p>
                  <p className="w-full mt-3 sm:w-full text-sm sm:text-base">
                    <span
                      dangerouslySetInnerHTML={{ __html: detail.detail_text }}
                    ></span>
                  </p>
                  {detail.list && (
                    <p className="mt-3">
                      <span
                        dangerouslySetInnerHTML={{ __html: detail.list }}
                      ></span>
                    </p>
                  )}
                  <p className="w-full mt-3 text-sm sm:text-base">
                    <span
                      dangerouslySetInnerHTML={{ __html: detail.detail_text2 }}
                    ></span>
                  </p>
                  <p className="w-full mt-3 text-sm sm:text-base">
                    <span
                      dangerouslySetInnerHTML={{ __html: detail.detail_text3 }}
                    ></span>
                  </p>
                </div>

                {/* Social Media Links */}
                <div className="absolute bottom-4 right-4 w-full flex flex-row items-center justify-center gap-4 z-20">
                  <a
                    href="https://www.facebook.com/share/183SYEbTBd/"
                    target="_blank"
                  >
                    <img
                      className="w-10 sm:w-12 p-2 hover:bg-transparent hover:scale-110 transition-transform rounded-none"
                      src={facebook_svg}
                      alt="Facebook"
                    />
                  </a>
                  <a
                    href="https://www.instagram.com/abroadunbox/profilecard/?igsh=MWRud3N6Ym00a3Rtbw=="
                    target="_blank"
                  >
                    <img
                      className="w-10 sm:w-12 p-2 hover:bg-transparent hover:scale-110 transition-transform rounded-none"
                      src={instagram_svg}
                      alt="Instagram"
                    />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/abroad-unbox/"
                    target="_blank"
                  >
                    <img
                      className="w-10 sm:w-12 p-2 hover:bg-transparent hover:scale-110 transition-transform rounded-none"
                      src={linkedin_svg}
                      alt="Linkedin"
                    />
                  </a>
                  <a
                    href="https://youtube.com/@abroadunbox?si=XYkMA1BkUFrC9NuA"
                    target="_blank"
                  >
                    <img
                      className="w-10 sm:w-12 p-2 hover:bg-transparent hover:scale-110 transition-transform rounded-none"
                      src={yt_svg}
                      alt="YouTube"
                    />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className="absolute right-0 top-1/2 transform -translate-y-1/2 text-2xl cursor-pointer lg:hidden"
          // onClick={scrollRight}
        >
          <img className="w-12 h-12 mx-auto" src={next_svg} alt="Next" />
        </div>
      </div>

      {/* commitment and services section */}
      <CommitmentServices />

      {/* youtube section */}
      {/* <div className="p-2 bg-gradient-to-r from-[#006600] to-[#ffffff] w-11/12 mx-auto mt-3"> */}
        <ExpAdvices />
      {/* </div> */}

      <Success/>

      {/* <div className="p-2 bg-gradient-to-r from-[#006600] to-[#ffffff] w-11/12 mx-auto mt-3">
        <p className="text-2xl font-bold text-white">Our Success</p>
      </div>
      <div className="w-11/12 mx-auto mt-3 flex flex-row overflow-x-scroll">
        {successes.map((success, index) => (
          <div key={index} className="relative ">
            <div className="p-3 w-[320px] h-[400px] rounded-lg">
              <img
                className="h-full w-full rounded-lg"
                style={{
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 4px 8px 0 rgba(0, 0, 0, 0.19)",
                }}
                src={success.photo}
                alt="sucess image"
              />
            </div>
          </div>
        ))}
      </div> */}
      <Footer />
    </>
  );
}

export default Home;
