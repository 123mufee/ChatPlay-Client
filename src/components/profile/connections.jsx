import React, { useEffect, useState } from "react";
import userProfileStore from "../../store/userProfileStore";
import axios from "axios";
import { postUrl, userUrl } from "../../api/api";
import toast, { Toaster } from "react-hot-toast";
import postStore from "../../store/postStore";
import Loading from "../loading/Loading";
import { useNavigate } from "react-router-dom";
import useWindowSize from "../../customHook/useWindowSize";

export default function Connections() {
  const Navigate = useNavigate()
  const [contacts, setContacts] = useState([]);
  const [whichProfile, setWhichProfile] = useState("details")

  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const { setUserProfile } = userProfileStore();
  const { newPost } = postStore();
  const { width } = useWindowSize()
  const token = {
    token: localStorage.getItem("userToken"),
  };
  useEffect(() => {
    const getDetails = async () => {
      await axios.patch(`${userUrl}getConnection`, token).then((response) => {
        setContacts(response.data.data);
      });
    };
    getDetails();
  }, []);

  useEffect(() => {
    const getDetails = async () => {
      await axios.patch(`${userUrl}getConnection`, token).then((response) => {
        setContacts(response.data.data);
      });
    };
    getDetails();
  }, [status]);

  useEffect(() => {
    const didNewPost = () => {
      setStatus(!status);
    };
    didNewPost();
  }, [newPost]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const loader = () => {
        setLoading(false);
      };
      loader();
    }, 1000);
    return () => clearTimeout(timer);
  }, [contacts]);

  const handleDelete = (id) => {
    toast
      .promise(confirmToast(), {
        loading: "Deleting friend...",
        success: "connection is deleted!",
        error: "connection deletion cancelled",
      })
      .then(async () => {
        await axios
          .delete(`${userUrl}removeConnection/${id}/${token.token}`)
          .then((response) => {
            if (response.status) {
              setStatus(!status);
            }
          });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const confirmToast = () => {
    return new Promise((resolve, reject) => {
      toast(
        <div>
          <p>Are you sure you want to delete this snippet?</p>
          <div className="mt-4">
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-4"
              onClick={() => {
                resolve();
                toast.dismiss();
              }}
            >
              Yes
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                reject();
                toast.dismiss();
              }}
            >
              No
            </button>
          </div>
        </div>,
        {
          duration: 10000, // Set a longer duration for the confirmation toast
        }
      );
    });
  };

  const goToOtherProfile = (id) => {
    Navigate(`/otherprofile/${id}`);
  };

  return (
    <>
      <Toaster />
      {loading ? (
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
            <section className="relative py-16">
              <div className="container mx-auto px-4">
                <div className="relative flex flex-col min-w-0 break-words   w-full mb-6 rounded-lg -mt-64">
                  <div className="px-6">
                    <Loading />
                  </div>
                </div>
              </div>
            </section>
          </main>
        </>
      ) : (
        <>
          <main className="profile-page ">
            <section className="relative block " style={{ height: "500px" }}>

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

            <div className="container mx-auto px-4  ">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 rounded-lg -mt-64 ">
                <div className="px-6">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                      <div className="py-6 px-3 sm:mt-0">
                        <div className=" rounded-full p-3 cursor-pointer">
                          <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" onClick={() => setUserProfile("about")}>
                            <path d="M15 19l-7-7 7-7"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-3">
                      <div className="py-6 px-3 mt-32 sm:mt-0 underline">
                        <a className="bg-transparent text-black font-semibold uppercase font-bold text-xs px-4 py-2 rounded sm:mr-2 mb-1">
                          {/* You have a total of {contacts.length}{" "} */}
                          {contacts.length === 1 ? (
                            <span></span>
                          ) : (
                            <span></span>
                          )}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* <div className="mt-10 py-10 border-t border-gray-300 text-center"> */}
                  <div className="flex flex-wrap justify-center ">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-gray-800">
                        <main>
                          <section>
                            <div className="container mx-auto  ">
                              <div className="flex flex-wrap">
                                {!contacts.length ? (
                                  <div>
                                    You do not appear to have any
                                    connections. Connect with people to
                                    start interactions
                                  </div>
                                ) : (
                                  <>
                                    {contacts.map((x) => {
                                      return (
                                        <>
                                          {
                                            width > 1025 ? (
                                              <>
                                                <div className="flex flex-col justify-center max-w-xs p-6 rounded-xl sm:px-12 dark:text-gray-100 ml-10">
                                                  <img src={x.image} alt="" className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square" />
                                                  <div className="space-y-4 text-center divide-y divide-gray-700">
                                                    <div className="my-2 space-y-1">
                                                      <h2 className="text-xl font-semibold text-gray-100 sm:text-2xl">{x.firstName}</h2>
                                                      <p className="px-5 text-xs sm:text-base text-purple-300 ">{x.job}</p>
                                                    </div>
                                                    {/* <div className="flex mt-4 space-x-3 md:mt-6"> */}
                                                      <a
                                                        onClick={() =>
                                                          Navigate(
                                                            `/otherprofile/${x._id}`
                                                          )
                                                        }
                                                        className="inline-flex items-center cursor-pointer px-4 py-2 text-sm font-medium text-center text-white bg-blue-400 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                      >
                                                        View Profile
                                                      </a>
                                                      <a
                                                        onClick={() =>
                                                          handleDelete(x._id)
                                                        }
                                                        className="inline-flex items-center ml-2 px-4 cursor-pointer py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                                                      >
                                                        Remove
                                                      </a>
                                                    {/* </div> */}
                                                  </div>
                                                </div>
                                              </>
                                            ) : (
                                              <>
                                                <div className="flex flex-col justify-center max-w-xs p-6 rounded-xl sm:px-12 w-48 dark:text-gray-100 ml-10">
                                                  <img src={x.image} alt="" className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square" />
                                                  <div className="space-y-4 text-center divide-y divide-gray-700">
                                                    <div className="my-2 space-y-1">
                                                      <h2 className="text-xl font-semibold text-gray-100 sm:text-2xl">{x.firstName}</h2>
                                                      <p className="px-5 text-xs sm:text-base text-purple-300 ">{x.job}</p>
                                                    </div>
                                                    <div className="flex mt-4 space-x-3 md:mt-6">
                                                    <a
                                                      onClick={() =>
                                                        Navigate(
                                                          `/otherprofile/${x._id}`
                                                        )
                                                      }
                                                      className="inline-flex items-center cursor-pointer px-4 py-2 text-sm font-medium text-center text-white bg-blue-200 rounded-lg hover:bg-blue-200 focus:ring-4 focus:outline-none focus:ring-blue-200"
                                                    >
                                                      View Profile
                                                    </a>
                                                    <a
                                                      onClick={() =>
                                                        handleDelete(x._id)
                                                      }
                                                      className="inline-flex items-center px-4 cursor-pointer py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                                                    >
                                                      Remove
                                                    </a>
                                                  </div>
                                                  </div>

                                                </div>
                                              </>
                                            )
                                          }
                                          {/* <div className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 sm:w-48 md:w-auto dark:text-gray-100 ml-10">
                                              <img src={x.image} alt="" className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square" />
                                              <div className="space-y-4 text-center divide-y divide-gray-700">
                                                <div className="my-2 space-y-1">
                                                  <h2 className="text-xl font-semibold text-gray-100 sm:text-2xl">{x.firstName}</h2>
                                                  <p className="px-5 text-xs sm:text-base text-purple-300 ">{x.job}</p>
                                                </div>
                                              </div>
                                            </div> */}
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
          {/* {contacts.map((x) => {
            return (
              <div className="flex flex-col max-w-md p-6 dark:bg-gray-900 dark:text-gray-100">
                <img src={x.image}
                  alt="" className="flex-shrink-0 object-cover h-64 rounded-sm sm:h-96 dark:bg-gray-500 aspect-square" />
                <div>
                  <h2 className="text-xl font-semibold">    {x.firstName}</h2>
                  <span className="block pb-2 text-sm dark:text-gray-400">CTO of Company Inc.</span>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur non deserunt</p>
                </div>
              </div>
            )
          })} */}
        </>
      )}
    </>
  );
}
