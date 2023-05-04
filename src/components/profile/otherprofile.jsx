import React, { useEffect, useState } from "react";
import userProfileStore from "../../store/userProfileStore";
import axios from "axios";
import { postUrl, userUrl } from "../../api/api";
import animationStore from "../../store/animationStore";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../sidebar/sidebar";
import modalStore from "../../store/modalStore";
import PeopleModal from "../posts/peopleModal";

export default function OtherProfile() {
  const [userData, setUserData] = useState("");
    const { setUserProfile } = userProfileStore();

  const [parsing, setParsing] = useState(true);
  const [dob, setDob] = useState("");
  const [whichProfile, setWhichProfile] = useState("details")
  const [contacts, setContacts] = useState([])
  const { isHovered, setIsHovered } = animationStore();
  const {
    showUserModal5,
    setShowUserModal5,
    setIfRequest,
    setIfContact,
    setIsUser,
    ifContact,
  } = modalStore();
  // const Navigate = useNavigate();

  const { propValue } = useParams();

  const token = localStorage.getItem("userToken");

  useEffect(() => {
    const getDetails = () => {
      axios.get(`${userUrl}otherProfile/${propValue}`).then((response) => {
        // console.log(response.data);
        setUserData(response.data.data);
        setContacts(response.data.contact)
        setTimeout(() => {
          setParsing(false);
        }, 100);
      });
    };
    getDetails();
  }, []);

  // useEffect(()=>{
  //   const getContacts = async() => {
  //     axios.get('$')
  //   }
  // })

  useEffect(() => {
    console.log(userData);
    const getDob = () => {
      const formattedDate = new Date(userData.dateOfBirth).toLocaleString(
        "en-IN",
        {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        }
      );
      setDob(formattedDate);
    };
    getDob();
  }, [userData]);

  return (
    <>
      <Toaster />
      {showUserModal5 ? <PeopleModal data={modalData} /> : null}
      <Sidebar />
      {
        whichProfile === 'details' && (
          <>
           <main className="profile-page ">
           <section class="pt-16 bg-blueGray-50">
          <div class="w-full lg:w-4/12 px-4 mx-auto">
            <div class="relative flex flex-col min-w-0 break-words bg-gray-200 w-full mb-6 shadow-xl rounded-lg mt-16 opacity-80">
              <div class="px-6">
                <div class="flex flex-wrap justify-center">
                  <div class="w-full px-4 flex justify-center">
                    <div className="relative flex justify-center items-center">
                      <img
                        alt="..."
                        src={userData.image}
                        className="shadow-xl rounded-full h-72 w-72 object-cover object-center border-none"
                        style={{ maxWidth: "340px" }}
                      />
                    </div>

                  </div>
                  <div class="w-full px-4 text-center mt-20">
                    <div class="flex justify-center py-4 lg:pt-4 pt-8">
                      <div class="mr-4 p-3 text-center">
                     
                        {parsing ? null : (
                          <span
                            className={`uppercase text-black font-bold text-xs px-4 py-2 rounded outline-none sm:mr-2 cursor-pointer mb-1 ${isHovered ? "hover:underline" : ""
                              }`}
                            type="button"
                            style={{ transition: "all .15s ease" }}
                            onClick={() => setWhichProfile("connections")}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                          >
                            {userData.contacts.length}{" "}
                            {userData.contacts.length === 1 ? (
                              <span>Connection</span>
                            ) : (
                              <span>Friends</span>
                            )}
                          </span>
                        )}
                      </div>
                      {/* <div class="mr-4 p-3 text-center">
              <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                10
              </span>
              <span class="text-sm text-blueGray-400">Photos</span>
            </div> */}
                      {/* <div class="lg:mr-4 p-3 text-center"> */}
                        {/* <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                89
              </span>
              <span class="text-sm text-blueGray-400">Comments</span> */}
                        {/* <button
                          className="bg-purple-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                          type="button"
                          style={{ transition: "all .15s ease" }}
                          onClick={() => setUserProfile("edit")}
                        >
                          Edit your profile
                        </button> */}
                      {/* </div> */}
                    </div>
                  </div>
                </div>
                <div class="text-center mt-12">
                  <h3 class="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                    {userData.firstName}
                  </h3>
                  <div class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <i class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                    Location: {userData.location}
                  </div>
                  {/* <div class="mb-2 text-blueGray-600 mt-10">
                    <i class="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                    Solution Manager - Creative Tim Officer
                  </div> */}
                  <div class="mb-2 text-blueGray-600">
                    <i class="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                    {userData.job}
                  </div>
                  <div class="mb-2 text-blueGray-600">
                    <i class="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                    Date of birth: {dob}
                  </div>
                </div>
                <div class="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div class="flex flex-wrap justify-center">
                    <div class="w-full lg:w-9/12 px-4">
                      <p class="mb-4 text-lg leading-relaxed text-blueGray-700">
                        {userData.description}
                      </p>
                    
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <footer class="relative  pt-8 pb-6 mt-8">
  <div class="container mx-auto px-4">
    <div class="flex flex-wrap items-center md:justify-between justify-center">
      <div class="w-full md:w-6/12 px-4 mx-auto text-center">
        <div class="text-sm text-blueGray-500 font-semibold py-1">
          Made with <a href="https://www.creative-tim.com/product/notus-js" class="text-blueGray-500 hover:text-gray-800" target="_blank">Notus JS</a> by <a href="https://www.creative-tim.com" class="text-blueGray-500 hover:text-blueGray-800" target="_blank"> Creative Tim</a>.
        </div>
      </div>
    </div>
  </div>
</footer> */}
        </section>

      </main>
            {/* <main className="profile-page">
              <section className="relative block" style={{ height: "500px" }}>
                <svg
                  className="absolute bottom-0 overflow-hidden"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  version="1.1"
                  viewBox="0 0 2560 100"
                  x="0"
                  y="0"
                >
                </svg>
              </section>
              <div className="container mx-auto px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-purple-600  w-full mb-6 shadow-xl rounded-lg -mt-64">
                  <div className="px-6">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                        <div className="relative">
                          <img
                            alt="..."
                            src={userData.image}
                            className="shadow-xl rounded-full h-72 w-72 align-middle border-none absolute -m-16 -ml-20 lg:-ml-32 -mt-48"
                            style={{ maxWidth: "340px" }}
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                        <div className="py-6 px-3 mt-32 sm:mt-0">
                        </div>
                      </div>
                      <div className="w-full lg:w-4/12 px-4 lg:order-1">
                        <div className="py-6 px-3 mt-32 sm:mt-0">
                          {parsing ? null : (
                            <span
                              className={`uppercase text-white font-bold text-xs px-4 py-2 rounded outline-none sm:mr-2 cursor-pointer mb-1 ${isHovered ? "hover:underline" : ""
                                }`}
                              type="button"
                              style={{ transition: "all .15s ease" }}
                              onClick={() => setWhichProfile("connections")}
                              onMouseEnter={() => setIsHovered(true)}
                              onMouseLeave={() => setIsHovered(false)}
                            >
                              {userData.contacts.length}{" "}
                              {userData.contacts.length === 1 ? (
                                <span>Connection</span>
                              ) : (
                                <span>Connections</span>
                              )}
                            </span>
                          )}
                        
                        </div>
                      </div>
                    </div>
                    <div className="text-center mt-12">
                      <h3 className="text-4xl font-semibold leading-normal mb-2 text-white mb-2">
                        {userData.firstName}
                      </h3>
                      <div className="text-sm leading-normal mt-0 mb-2 text-blue-100 font-bold uppercase">
                        <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{" "}
                        Location: {userData.location}
                      </div>
                      <div className="mb-2 text-aqua-100 mt-10">
                        <i className="fas fa-briefcase mr-2 text-lg text-blue-100"></i>
                        {userData.job}
                      </div>
                      <div className="mb-2 text-aqua-100">
                        <i className="fas fa-university mr-2 text-lg text-blue-100"></i>
                        Date of birth: {dob}
                      </div>
                    </div>
                    <div className="mt-10 py-10 border-t border-gray-300 text-center">
                      <div className="flex flex-wrap justify-center">
                        <div className="w-full lg:w-9/12 px-4">
                          <p className="mb-4 text-lg leading-relaxed text-blue-100">
                         
                            {userData.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main> */}
          </>
        )
      }
      {
        whichProfile === 'connections' && (
          <>
            <main className="profile-page">
              <section className="relative block" style={{ height: "500px" }}>
                <div
                  className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
                  style={{ height: "70px" }}
                >
                  <svg
                    className="absolute bottom-0 overflow-hidden"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    version="1.1"
                    viewBox="0 0 2560 100"
                    x="0"
                    y="0"
                  >
                  </svg>
                </div>
              </section>
              <div className="container mx-auto px-4">
                <div className="relative flex flex-col min-w-0 break-words  w-full mb-6 rounded-lg -mt-64">
                  <div className="px-6">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-4/12 px-4 lg:order-1">
                        <div className="py-6 px-3 mt-32 sm:mt-0">
                          {/* <button
                            className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                            type="button"
                            style={{ transition: "all .15s ease" }}
                            onClick={() => setWhichProfile("details")}
                          >
                            Go back
                          </button> */}
                             <div className="w-full lg:w-4/12 px-4 lg:order-1">
                      <div className="py-6 px-3 sm:mt-0">
                        <div className=" rounded-full p-3 cursor-pointer">
                          <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"  onClick={() => setWhichProfile("details")}>
                            <path d="M15 19l-7-7 7-7"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                        </div>
                      </div>
                      <div className="w-full lg:w-4/12 px-4 lg:order-3">
                        <div className="py-6 px-3 mt-32 sm:mt-0 underline">
                          <a className="bg-transparent text-white font-semibold uppercase font-bold text-xs px-4 py-2 rounded sm:mr-2 mb-1">
                            {/* You have a total of {contacts.length}{" "} */}
                            {/* {contacts.length === 1 ? (
                              <span>connection</span>
                            ) : (
                              <span>connections</span>
                            )} */}
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* <div className="mt-10 py-10 border-t border-gray-300 text-center"> */}
                      <div className="flex flex-wrap justify-center">
                        <div className="w-full lg:w-9/12 px-4">
                          <p className="mb-4 text-lg leading-relaxed text-gray-800">
                            <main>
                              <section>
                                <div className="container mx-auto">
                                  <div className="flex flex-wrap">
                                    {!contacts.length ? (
                                      <div>
                                        {userData.firstName} does not appear to have any
                                        connections.
                                      </div>
                                    ) : (
                                      <>
                                        {contacts.map((x) => {
                                          return (
                                            <>
                                              <div
                                                className="w-full max-w-xs mx-4 pt-5 my-4 md:w-1/3    rounded-lg shadow"
                                                key={x._id}
                                              >
                                                <div className="flex flex-col items-center pb-10">
                                                  <img
                                                    className="w-24 h-24 mb-3 rounded-full shadow-lg"
                                                    src={x.image}
                                                  />
                                                  <a className="mb-1 text-xl font-medium text-white">
                                                    {x.firstName}
                                                  </a>
                                                  <span className="text-sm text-purple-500">
                                                    {x.job}
                                                  </span>
                                                
                                                </div>
                                              </div>
                                            </>
                                          );
                                        })}
                                      </>
                                    )}
                                  </div>
                                </div>
                              </section>
                            </main>
                          </p>
                        </div>
                      </div>
                    {/* </div> */}
                  </div>
                </div>
              </div>
            
            </main>
          </>
        )
      }

    </>
  );
}