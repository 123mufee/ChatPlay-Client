import React, { useEffect, useState } from "react";
import "./suggestedPeople.css";
import axios from "axios";
import { postUrl } from "../../api/api";
import PeopleModal from "./peopleModal";
import modalStore from "../../store/modalStore";
import SelectGameModal from "./gameModal";

export default function connection() {
  const [people, setPeople] = useState([]);
  const [userData, setUserData] = useState("");
  const [isRequest, setIsRequest] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const { showUserModal5, setShowUserModal5, refresh, setIfRequest, setIfContact } =
    modalStore();

  const data = {
    token: localStorage.getItem("userToken"),
  };

  useEffect(() => {
    const getPeople = async () => {
      if (data.token != null) {
        await axios.post(`${postUrl}people`, data).then((response) => {
          setPeople(response.data.data);
        });
      }
    };
    getPeople();
  }, []);

  // useEffect(() => {
  //   const getPeople = async () => {
  //     if (data.token != null) {
  //       await axios.post(`${postUrl}people`, data).then((response) => {
  //         setPeople(response.data.data);
  //       });
  //     }
  //   };
  //   getPeople();
  // }, [refresh]);

  const showProfile = async (id) => {
    await axios.patch(`${postUrl}userProfile/${id}`, data).then((response) => {
      setUserData(response.data.data);
      if (response.data.request === true) {
        setIfRequest(true);
      } else if (response.data.contact === true) {
        setIfContact(true);
      }
    });
  };

  // This useEffect is for rendering the modal on click
  useEffect(() => {
    setShowUserModal5(true);
  }, [userData]);

  // This useEffect is for disabling the modal on page reload and not to render
  // it on cold start.
  useEffect(() => {
    setShowUserModal5(false);
  }, []);

  return (
    <>
      {showUserModal5 ? <PeopleModal data={userData} /> : null}

      <div className="flex flex-col bg-transparent m-auto p-auto">
        <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
          <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10">
            {people.map((x) => {
              return (
                <>
                  {/* <div
                    className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out sm:px-12 bg-transparent  text-White ml-6"
                    key={x._id}
                  >
                    <img
                      src={x.image}
                      alt=""
                      className="w-32 h-32 mx-auto rounded-full dark:bg-gray-700 aspect-square"
                    />
                    <div className="space-y-4 text-center divide-y ">
                      <div className="my-2 space-y-1">
                        <h2 className="text-xl font-semibold sm:text-2xl">
                          {x.firstName}
                        </h2>
                        <p className="px-5 text-xs sm:text-base dark:text-gray-40">
                          {x.location}
                        </p>
                      </div>
                      <div className="flex justify-center pt-2 space-x-4 align-center">
                        <button
                          className="bg-blue-500 hover:bg-green-500 text-black-700 font-semibold hover:text-white py-2 px-4 hover:border-transparent rounded"
                          onClick={() => showProfile(x._id)}
                        >
                          View Profile
                        </button>
                      </div>
                    </div>
                  </div> */}
                   <div
                    className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out sm:px-12 bg-transparent text-White"
                    key={x._id}
                    style={{width:'400px'}}
                  >
                  <div
                    class="rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 shadow-xl  opacity-90">
                    <a class="block rounded-xl bg-blue-400 p-4 sm:p-6 lg:p-8">
                      <div class="mt-16">
                      <img
                      src={x.image}
                      alt=""
                      className="w-32 h-32 mx-auto rounded-full dark:bg-gray-700 aspect-square"
                    />
                    <div className="justify-center text-red-500 mt-5">
                        <h2 className="text-xl font-semibold sm:text-2xl">
                          {x.firstName}
                        </h2>
                        </div>
                         <button
                          className="bg-black-500 hover:bg-green-500 text-black-700 font-semibold hover:text-white py-2 px-4 mt-5 hover:border-transparent rounded"
                          onClick={() => showProfile(x._id)}
                        >
                          View Profile
                        </button>
                      </div>
                    </a>
                  </div>
                  </div>
                </>
                // <>
                //   <div className="rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 shadow-xl">
                //     <a className="block rounded-xl bg-white p-4 sm:p-6 lg:p-8" href="">
                //       <div className="mt-16">
                //         <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                //           Science of Chemistry
                //         </h3>
                //         <p className="mt-2 text-sm text-gray-500">
                //           Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, adipisci.
                //         </p>
                //       </div>
                //     </a>
                //   </div>

                // </>

              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
