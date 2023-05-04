import React, { useEffect, useState } from "react";
import "./connectedPeople.css";
import axios from "axios";
import { chatUrl, postUrl } from "../../api/api";
import PeopleModal from "./peopleModal";
import modalStore from "../../store/modalStore";
// import React, { useState } from 'react';
// import './gameModal.css';
import { useNavigate } from "react-router-dom";
import { reduxbuttonClicked } from "../reduxstore/reducerslice";
import { useDispatch, useSelector } from "react-redux";
// import {useNavigate} from "react-router-dom"

export default function Connection() {
  const Navigate = useNavigate();
  const dispatch = useDispatch()
  const [people, setPeople] = useState([]);
  const [userData, setUserData] = useState("");
  const [isRequest, setIsRequest] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const { buttonClicked } = useSelector((state) => state.auth);
  // const[buttonclicked,setButtonClicked]=useState(false)

  const [isOpen, setIsOpen] = useState(false);
  const { showUserModal, setShowUserModal, refresh, setIfRequest, setIfContact } =
    modalStore();

  const data = {
    token: localStorage.getItem("userToken"),
  };
  const [showModal, setShowModal] = useState(false);

  // const toggleModal = () => {
  //   setShowModal(!showModal);
  // };

  useEffect(() => {
    const getPeople = async () => {
      if (data.token != null) {
        await axios.post(`${postUrl}connection`, data).then((response) => {
          console.log(response.data);
          setPeople(response.data);
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
    setShowUserModal(true);
  }, [userData]);

  // This useEffect is for disabling the modal on page reload and not to render
  // it on cold start.
  useEffect(() => {
    setShowUserModal(false);
  }, []);


  const handleOpen = async (id) => {
    console.log(id);
    await axios.get(`${chatUrl}getId/${id}`).then((response) => {
      console.log(response.data)
      localStorage.setItem('chatterId', response.data._id)
      localStorage.setItem('chatter', response.data.firstName)
      setShowModal(true);
    })
  }

  const handleClose = () => {
    setShowModal(false);
  }

  const handleImageClick = () => {
    // navigate to a different page based on the clicked image name
    // window.location.href = `/image/${imageName}`;
    // dispatch(reduxbuttonClicked());
    localStorage.setItem("game", "tic")
    Navigate("/chat")
  }
  const handleImageClick2 = () => {
    // navigate to a different page based on the clicked image name
    // window.location.href = `/image/${imageName}`;
    // dispatch(reduxbuttonClicked());
    localStorage.setItem("game", "memory")
    Navigate("/chat")
  }


  return (
    <>
      {/* {showUserModal ? <PeopleModal data={userData} /> : null} */}

      <div className="flex flex-col bg-transparent m-auto p-auto">
        <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
          <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10">
            {people.map((x) => {
              return (
                <>
                  {/* <div
                    className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out sm:px-12 bg-pink-100 text-black ml-6"
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
                      </div>
                      <div className="flex flex-col items-center pt-2 space-y-4">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={()=>handleOpen(x._id)}>Open Modal</button>
                        {isOpen && (
                          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
                            <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

                            <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                              <div className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50">
                                <svg
                                  className="fill-current text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18"
                                  height="18"
                                  viewBox="0 0 18 18"
                                >
                                  <path
                                    d="M18 1.5L16.5 0 9 7.5 1.5 0 0 1.5 7.5 9 0 16.5 1.5 18 9 10.5 16.5 18 18 16.5 10.5 9z"
                                  />
                                </svg>
                                <span className="text-sm">(Esc)</span>
                              </div>

                              <div className="modal-content py-4 text-left px-6 bg-purple-200">
                                <div className="image-container flex flex-col justify-center items-center ">
                                  <p  className="px-4 py-2  text-black rounded-lg mr-2">
                                    Choose your game
                                  </p>
                                  <br></br>
                                  {!buttonClicked ? (
                                    <>
                                      <div className="image-div-1 mb-4" onClick={() => handleImageClick()}>
                                        <img
                                          src="https://cdn.dribbble.com/users/317853/screenshots/7171494/media/898b3a307c9ffbbba7b8db0b53c8605c.png?compress=1&resize=400x300"
                                          alt="Image 1"
                                          width="500"
                                          height="500"
                                        />
                                      </div>
                                      <div className="image-div-2" onClick={() => handleImageClick2()}>
                                        <img
                                          src="https://www.memozor.com/templates/memoire/images/zoom/matching_game_kids_halloween.jpg"
                                          alt="Image 2"
                                          width="500"
                                          height="500"
                                        />
                                      </div>
                                    </>
                                  ) : (
                                    null
                                  )}
                                </div>

                                <div className="modal-footer flex justify-end">
                                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2 " onClick={handleClose}>Close</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>



                    </div>
                  </div> */}
                  {showModal && (
                    <><div className="fixed inset-0 bg-gray-800 opacity-50 z-50"></div><div className="fixed inset-0 z-50 flex items-center justify-center">
                      <div className="bg-blue-300 rounded-lg shadow-lg p-6">
                        <>
                          {/* <p  className="px-4 py-2  text-black rounded-lg mr-2">
                                    Choose your game
                                  </p>
                                  <br></br> */}
                          <div className="image-div-1 mb-4 " onClick={() => handleImageClick()}>
                            <img
                              src="https://cdn.dribbble.com/users/317853/screenshots/7171494/media/898b3a307c9ffbbba7b8db0b53c8605c.png?compress=1&resize=400x300"
                              alt="Image 1"
                              width="500"
                              height="500"
                            />
                          </div>
                          {/* <div className="image-div-2" onClick={() => handleImageClick2()}>
                            <img
                              src="https://www.memozor.com/templates/memoire/images/zoom/matching_game_kids_halloween.jpg"
                              alt="Image 2"
                              width="500"
                              height="500"
                            />
                          </div> */}
                        </>
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded justify-end"
                          onClick={handleClose}
                        >
                          Close
                        </button>
                      </div>
                    </div></>
                  )}
                  <div class="glassBox z-40">
                    <div class="glassBox__imgBox">
                      <img src={x.image} alt="" className="rounded-full" />
                      <h3 class="glassBox__title"> {x.firstName}</h3>
                    </div>
                    <div>
                      <button
                        className="bg-green-400 hover:bg-transparent text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleOpen(x._id)}
                      >
                        play
                      </button>

                    </div>

                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );

}

