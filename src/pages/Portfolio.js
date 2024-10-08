import React, { useEffect, useState } from 'react';
import { CgArrowLongDown, CgArrowLongUp } from "react-icons/cg";
import CallToActionSection from "../components/Reusable/CallToActionSection";
import PortfolioData from "../content/PortfolioData";
import axios from 'axios';
import { useParams } from "react-router-dom";

function Portfolio() {
  const {lang} = useParams();
  const [visible, setVisible] = useState(4); // Show 4 cards initially

  const [portfolioItems, setPortfolioItems] = useState([]); // State to store portfolio data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Function to fetch portfolio data
    const fetchPortfolioData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_WOUESSI_API_URL}/api/portfolios`);  // Replace with your actual API endpoint
        setPortfolioItems(response.data);  // Set portfolio data in state
        setLoading(false);  // Set loading to false after data is fetched
      } catch (error) {
        setError('Error fetching portfolio data');
        setLoading(false);
      }
    };

    fetchPortfolioData(); // Fetch the data when the component mounts
  }, []); // Empty dependency array ensures this only runs on mount

  if (loading) {
    return <div className='page-background'>Loading...</div>;  // Show loading message while data is being fetched
  }

  if (error) {
    return <div className='page-background'>{error}</div>;  // Show error message if there's an error
  }

  const showMorePortfolioData = () => {
    setVisible((prevValue) =>
      prevValue === 8 ? (prevValue = 2) : prevValue + 2
    );
  };

  return (
    <div className="text-black flex justify-center page-background">
      <div className="w-[80%] mt-[4vw]">
        <div className="flex gap-x-[10vw] PortfolioData-center max-[450px]:flex-col max-[450px]:gap-y-[6vw] max-[450px]:mb-[8vw]">
          <h1 className="text-[3.5vw]/[4.5vw] text-left w-[75vw] font-bold max-[450px]:text-[7.5vw]/[8.5vw] max-[450px]:w-full">
            Explore our new recently completed projects
          </h1>
          <p className="w-[40vw] text-[1.1vw] text-left text-black float-right max-[450px]:w-[100%] max-[450px]:text-[3vw] max-[450px]:font-semibold max-[450px]:mb-[-2vw]">
            Our portfolio boasts an impressive array of successful
            collaborations with esteemed clients. Each partnership stands as a
            testament to our commitment to excellence and innovation.
          </p>
        </div>
        <div className="flex flex-wrap justify-between gap-x-[2vw] mt-[1vw]">
          {portfolioItems.slice(0, visible).map((item) => (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-[48%] pb-[2vw] bg-white rounded-2xl mt-[2vw] max-[450px]:w-full max-[450px]:pb-[2vw] max-[450px]:mt-[6vw] shadow-md hover:shadow-lg transition-transform"
              key={item.title}>
              <div className="relative w-full h-[29vw] max-[450px]:h-[65vw] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-t-2xl transition-transform transform hover:scale-105 transition-all duration-500 ease-in-out"
                />
              </div>
              <div className="flex justify-center">
                <div className="w-[90%] flex justify-center justify-between PortfolioData-center bg-white text-black h-[7vw] max-[450px]:h-[17vw]">
                  <div className="flex flex-col text-left max-[450px]:p-[2vw]">
                    <h2 className="text-[2vw] font-bold max-[450px]:text-[4vw]">
                      {item.title}
                    </h2>
                  </div>
                </div>
              </div>
            </a>
          ))}
          <div className="flex justify-center w-full max-[450px]:mt-[4vw] max-[450px]:mb-[8vw]">
            <div
              className="border-black border-[0.1vw] rounded-[3vw] hover:bg-[#2703A5] hover:text-white transition ease-in-out flex justify-center mt-[3vw] w-[8.5vw] h-[2.5vw] text-[1.1vw] cursor-pointer max-[450px]:w-[19vw] max-[450px]:h-[6vw] max-[450px]:text-[2.5vw]"
              onClick={showMorePortfolioData}
            >
              {visible === 10 ? (
                <div className="flex PortfolioData-center gap-x-[0.3vw] max-[450px]:gap-x-[1vw]">
                  See Less
                  <CgArrowLongUp className="text-[1.1vw] max-[450px]:text-[2.5vw]" />
                </div>
              ) : (
                <div className="flex PortfolioData-center gap-x-[0.3vw] max-[450px]:gap-y-[1vw]">
                  See More
                  <CgArrowLongDown className="text-[1.1vw] max-[450px]:text-[2.5vw]" />
                </div>
              )}
            </div>
          </div>
        </div>
        <CallToActionSection
          Content="We would love to hear more about your project"
          CallToAction="Let's Talk"
          Title="Work With Us"
          lang ={lang}
        />
      </div>
    </div>
  );
}

export default Portfolio;
