import React, { useEffect, useState } from "react";
import userProfileStore from "../../store/userProfileStore";
import axios from "axios";
import { userUrl } from "../../api/api";
import animationStore from "../../store/animationStore";
import ProfileConnections from "../sidebar/connections";
import modalStore from "../../store/modalStore";

export default function UserProfile() {
  const [userData, setUserData] = useState("");
  const [parsing, setParsing] = useState(true);
  const [dob, setDob] = useState("");
  const [winRate, setWinRate] = useState(0);
  const [loseRate, setLoseRate] = useState(0)
  const [ticwinRate, setticWinRate] = useState(0);
  const [ticloseRate, setticLoseRate] = useState(0)
  const [loading, setLoading] = useState(false)
  const [requests, setRequests] = useState([])
  const { setUserProfile } = userProfileStore();
  const { isHovered, setIsHovered } = animationStore();

  const data = {
    token: localStorage.getItem("userToken"),
  };

  const {
    setIsActive,
    isActive,
    connection,
    setIsConnection,
    showUserModal4,
    setShowUserModal4,
    setIfRequest,
    refresh,
    setRefresh,
  } = modalStore()

  useEffect(() => {
    const token = {
      token: localStorage.getItem("userToken"),
    };
    const getDetails = () => {
      axios.post(`${userUrl}getDetails`, token).then((response) => {
        setUserData(response.data.data);
        setTimeout(() => {
          setParsing(false);
        }, 100);
        // console.log(userData);
      });
    };
    getDetails();
  }, []);

  // const connectionSidebar = async () => {
  //   await axios.patch(`${userUrl}checkRequests`, data).then((response) => {
  //     setRequestData(response.data.data);
  //     setIsConnection(true);
  //     setIsActive(!isActive);
  //   });
  // };

  useEffect(() => {
    axios.patch(`${userUrl}checkRequests`, data).then((response) => {
      setRequests(response.data.data);
    })
  }, [])

  useEffect(() => {
    const checkConnections = async () => {
      await axios.patch(`${userUrl}checkRequests`, data).then((response) => {
        setRequests(response.data.data);
      });
    };
    checkConnections();
  }, [refresh]);

  useEffect(() => {
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

  useEffect(() => {
    const setStats = () => {
      setTimeout(() => {
        setWinRate(userData.gameHistory.memoryMatch.won)
        setLoseRate(userData.gameHistory.memoryMatch.lost)
        setticWinRate(userData.gameHistory.ticTacToe.won)
        setticLoseRate(userData.gameHistory.ticTacToe.lost)

      }, 1000);
    }
    setStats()
  }, [userData]);

  useEffect(() => {
    setLoading(false)
  }, [winRate, loseRate,ticwinRate,ticloseRate]);
  const showProfile = async (id) => {
    await axios.patch(`${postUrl}userProfile/${id}`, data).then((response) => {
      setUserData(response.data.data);
      setShowUserModal4(true);
      if (response.data.request === true) {
        setIfRequest(true);
      }
    });
  };

  const acceptRequest = async (id) => {
    await axios.put(`${userUrl}acceptRequest/${id}`, data).then((response) => {
      console.log('here?');
      setRefresh(!refresh);
    });
  };

  const declineRequest = async (id) => {
    await axios.put(`${userUrl}declineRequest/${id}`, data).then((response) => {
      setRefresh(!refresh);
    });
  };

  return (
    <>
      <main className="profile-page ">
        {/* <section className="relative block" style={{ height: "500px" }}>
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
                    <button
                      className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                      type="button"
                      style={{ transition: "all .15s ease" }}
                      onClick={() => setUserProfile("edit")}
                    >
                      Edit your profile
                    </button>
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
                        onClick={() => setUserProfile("peeps")}
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
        </div> */}

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
                  {/* <ProfileConnections /> */}
                  <div className="bg-transparent">
                    <ul>
                      <hr className="mt-10 " />
                      {requests.length === 0 ? (
                        <div>Hurray, you have dealt with all your connection requests</div>
                      ) : (
                        <>
                          {requests.map((result) => (
                            <>
                              <div
                                key={result._id}
                                className="mt-4 bg-transparent flex items-center justify-between p-2"
                              >
                                <h3
                                  className={`text-2xl font-semibold text-black cursor-pointer duration-300 ease-in-out ${isHovered ? "hover:underline" : ""
                                    }`}
                                  onMouseEnter={() => setIsHovered(true)}
                                  onMouseLeave={() => setIsHovered(false)}
                                  onClick={() => showProfile(result._id)}
                                >
                                  {result.firstName} {result.lastName}
                                </h3>
                                <div className="flex items-center">
                                  <button
                                    className="px-4 py-2 mr-2 bg-green-600 text-white rounded hover:bg-green-700"
                                    onClick={() => acceptRequest(result._id)}
                                  >
                                    {/* <FontAwesomeIcon icon={faCheck} /> */}
                                    Accept
                                  </button>
                                  <button
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                    onClick={() => declineRequest(result._id)}
                                  >
                                    {/* <FontAwesomeIcon icon={faTimes} /> */}
                                    Decline
                                  </button>
                                </div>
                              </div>
                              <hr className="mt-4 " />
                            </>
                          ))}
                        </>
                      )}
                    </ul>
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
                            onClick={() => setUserProfile("peeps")}
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


                      <div class="lg:mr-4 p-3 text-center">

                        <button
                          className="bg-purple-600 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                          type="button"
                          style={{ transition: "all .15s ease" }}
                          onClick={() => setUserProfile("edit")}
                        >
                          Edit your profile
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
                <div class="text-center mt-6">

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
                {
                  loading === false && (
                    <div className="flex justify-center">
                      <p>Memory Match</p>
                      <span class="text-xl font-bold block uppercase mt-3 tracking-wide text-blueGray-600">
                        {winRate}
                      </span>
                      <span class="text-sm mt-4 text-blueGray-400">Win</span>
                      <span class="text-xl font-bold block uppercase ml-5 mt-3 tracking-wide text-blueGray-600">
                        {loseRate}
                      </span>
                      <span class="text-sm mt-4 text-blueGray-400">Lose</span>
                    </div>
                  )
                }
                     {
                  loading === false && (
                    <div className="flex justify-center"> 
                    <p>Tictactoe</p>

                      <span class="text-xl font-bold block uppercase mt-3 tracking-wide text-blueGray-600">
                       {ticwinRate}
                      </span>
                      <span class="text-sm mt-4 text-blueGray-400">Win</span>
                      <span class="text-xl font-bold block uppercase ml-5 mt-3 tracking-wide text-blueGray-600">
                        {ticloseRate}
                      </span>
                      <span class="text-sm mt-4 text-blueGray-400">Lose</span>
                    </div>
                  )
                }

                <div class="mt-10 py-10  text-center">
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
    </>
  );
}
