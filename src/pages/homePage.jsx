import React, { useState, useEffect, Suspense } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Header from "../components/header/header";
import Sidebar from "../components/sidebar/sidebar";
const People = React.lazy(() => import("../components/posts/suggestedPeople"));
import Loading from "../components/loading/Loading";
import Waiting from "../components/loading/waiting";
import Error1 from "../components/error/error1";
import Connection from "../components/posts/connectedPeople";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [peopleHidden, setPeopleHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const loader = async () => {
        setLoading(false);
      };
      loader();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen">
    <video
      autoPlay
      muted
      loop
      className="absolute top-0 left-0 w-full h-full object-cover z-0"
    >
      <source src="../../src/assets/pexels-pressmaster-3141208-3840x2160-25fps.mp4" type="video/mp4" />
    </video>
    <div className="relative z-10">
      <Sidebar />
      {/* <Header /> */}
      <div className="flex flex-row justify-between items-center py-5 lg:px-20 md:px-10 px-5 lg:mx-40 md:mx-20 mx-5">
        <h1 className="font-bold text-4xl  text-white mb-12 mt-12">
          People you may know..
        </h1>
      </div>
      <div className="relative z-10">
        <Suspense fallback={<Waiting />}>
          <div className="container mx-auto">
            <People />
          </div>
        </Suspense>
      </div>
  
      <div className="flex flex-row justify-between items-center py-5 lg:px-20 md:px-10 px-5 lg:mx-40 md:mx-20 mx-5">
        <h1 className="font-bold text-4xl text-white mb-12 mt-12">
          Do you want to play with your friends?
        </h1>
      </div>
      <div className="relative z-10">
        <Suspense fallback={<Waiting />}>
          <div className="container mx-auto px-5 lg:px-40 md:px-20">
            <Connection />
          </div>
        </Suspense>
      </div>
    </div>
  </div>
  )  
}
