import React from "react";
import document_svg from '../../assets/svg/document.svg'
import test_svg from '../../assets/svg/test.svg'
import counseling_svg from '../../assets/svg/counseling-icon.svg'
import university_svg from '../../assets/svg/university.svg'
import essay_svg from '../../assets/svg/essay.svg'
import passport_visa_svg from '../../assets/svg/passport-visa.svg'
import interview_svg from '../../assets/svg/interview.svg'
import flight_svg from '../../assets/svg/flight.svg'
import next_svg from '../../assets/svg/next.svg'

const services = [
  {
    svg: document_svg,
    title: "Application",
    text1: "Common App, LOR, Essays! EA, ED, Fee waiver, affidavit...!",
    text2:
      "DON'T WORRY, we've got you covered. Getting your application right on time to maximize your scholarship opportunities can be confusing and challenging.",
    text3:
      "We mentor you to submit an application that truly reflects you and helps you stand out among the pool of applicants.",
  },
  {
    svg: test_svg,
    title: "Standardize Test",
    text1: "We offer an extensive free Duolingo or EPT prep",
    text2:
      "We also, have advance learning platform for learning SAT. We make sure students get a comprehensive understanding of the core concepts, tips and tricks, and study plan for your success in the SAT.",
    text3: "We also have study plan and resources for GRE & GMAT.",
  },
  {
    svg: counseling_svg,
    title: "Career Counseling",
    text1:
      "Choosing your major is going to define the scope and extend of Your life. So, we need a more pragmatic approach to our choice of major and career.",
    text2:
      "US offer a wide array of career choice and we have to make the decision wisely. We do one on one counseling to make sure you understand the ramification of your Major and Future choices.",
  },
  {
    svg: university_svg,
    title: "University Selection ",
    text1:
      "Getting the right university is a crucial step. It is going define the limits of your growth and we help you apply to the university that is optimum for you.",
    text2:
      "We consider over TWENTY data points including multiple ranking, research resources, mentorship program, location, safety, study outcome,.... and may more.......",
  },
  {
    svg: essay_svg,
    title: "Essay Writing",
    text1:
      "Essay is one of the most vital component for your application. It helps university know you as the person rather than just a number on your GPA or Standardize test.",
    text2:
      "We make sure you not only are able to craft the best essay that reflects you but provide a comprehensive skillsets to make essay in the future. These skillset will be the basis for your Cover letter, letter of Intent, emails, formal communication and more.",
  },
  {
    svg: passport_visa_svg,
    title: "Visa Appointments",
    text1:
      "Booking your visa interview on time is crucial. Don't worry, we are here to help.",
    text2:
      "Its not just about filling out the forms. It's also making sure, the forms and documentation are done Right.",
  },
  {
    svg: interview_svg,
    title: "Visa Prepration",
    text1:
      "Visa interview is one of the most difficult for students. We understand the trepidation here.",
    text2:
      "We have a five week comprehensive program for your visa interview preparation. We go through it all.We do extensiv research, get the core concept, manage the cross questions and foster confidence to make your visa interview a success.",
  },
  {
    svg: flight_svg,
    title: "Pre Departure Prep.",
    text1:
      "Your journey is not done with getting the F1 Visa. It is simply the beginning.",
    text2:
      "There is lot to be done. We have a four week course on the adjusting to US setting, do's and don't, your action plan, timeline and much more.",
  },
];
const CommitmentServices = () => {
  return (
    <div>
      <div className="p-2 bg-gradient-to-r from-[#006600] to-[#ffffff] w-11/12 mx-auto mt-3">
        <p className="text-2xl font-bold text-white">
          Our Commitments and Services
        </p>
      </div>
      <div className="relative">
        {/* Scrollable container */}
        <div className="w-11/12 mx-auto mt-3 flex flex-row gap-3 overflow-x-scroll">
          {services.map((service, index) => (
            <div key={index} className="relative">
              <div className="h-[400px] min-w-[350px] bg-[#e6ffe6] p-6 rounded-lg ">
                <a href="/login">
                  <img
                    className="w-12 h-12 mx-auto"
                    src={service.svg}
                    alt={service.title}
                  />
                </a>
                <a href="/login">
                  <h2 className="text-center text-2xl underline">
                    {service.title}
                  </h2>
                </a>
                <p className="w-full mt-5">
                  <span
                    dangerouslySetInnerHTML={{ __html: service.text1 }}
                  ></span>
                </p>
                <p className="w-full mt-5">
                  <span
                    dangerouslySetInnerHTML={{ __html: service.text2 }}
                  ></span>
                </p>
                <p className="w-full mt-5">
                  <span
                    dangerouslySetInnerHTML={{ __html: service.text3 }}
                  ></span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Arrow (fixed and only visible on mobile) */}
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

export default CommitmentServices;
