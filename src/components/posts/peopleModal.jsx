import React, { useEffect, useState } from "react";
import modalStore from "../../store/modalStore";
import axios from "axios";
import { userUrl } from "../../api/api";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import userProfileStore from "../../store/userProfileStore";

export default function PeopleModal({ data }) {
  const Navigate = useNavigate();
  const { setUserProfile } = userProfileStore();

  const {
    setShowUserModal,
    setShowUserModal2,
    setShowUserModal3,
    setShowUserModal4,
    setShowUserModal5,
    refresh,
    setRefresh,
    ifRequest,
    setIfRequest,
    ifContact,
    setIfContact,
    isUser,
    setIsUser,
    setShowSearch,
    showSearch,
    setIsActive,
    isActive,
    setShowSidebar,
  } = modalStore();

  const close = () => {
    setShowUserModal(false);
    setShowUserModal2(false);
    setShowUserModal3(false);
    setShowUserModal4(false);
    setShowUserModal5(false)
    setIfRequest(false);
    setIfContact(false);
    setIsUser(false);
  };

  const goToProfile = () => {
    setUserProfile("about");
    Navigate("/profile");
    setShowSearch(!showSearch);
    setIsActive(!isActive);
    setShowSidebar(false);
    close();
  };

  const token = {
    token: localStorage.getItem("userToken"),
  };

  const addContact = async (id) => {
    if (!ifRequest) {
      await axios
        .patch(`${userUrl}addContact/${id}`, token)
        .then((response) => {
          if (response.status) {
            setRefresh(!refresh);
            setIfRequest(response.data.request);
          }
        });
    } else {
      toast
        .promise(confirmToast(), {
          loading: "Cancelling request..",
          success: "Request Cancelled!",
          error: "Request not cancelled",
        })
        .then(async () => {
          await axios
            .patch(`${userUrl}addContact/${id}`, token)
            .then((response) => {
              if (response.status) {
                setRefresh(!refresh);
                setIfRequest(response.data.request);
              }
            });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const confirmToast = () => {
    return new Promise((resolve, reject) => {
      toast(
        <div>
          <p className="text-black">Are you sure you want to cancel this request?</p>
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
    if(showSearch === true) {
      setShowSearch(false);
      setIsActive(true);
      setShowSidebar(false);
    }
    close();
    Navigate(`/otherprofile/${id}`);
    
  };

  return (
    <>
      <Toaster />

      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none text-black">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-transparent outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t"></div>
              <div className="relative p-0 flex-auto">
                <div className="max-w-4xl flex items-center h-auto  flex-wrap mx-auto lg:my-0">
                  <div
                    id="profile"
                    className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-100 lg:mx-0"
                  >
                    <div className="p-4 md:p-12 text-center lg:text-left bg-white">
                      {/* Mobile photo */}
                      <div
                        className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-24 w-48 bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${data.image})`,
                        }}
                      />
                      <h1 className="text-3xl font-bold pt-8 lg:pt-0">
                        {data.firstName}
                      </h1>
                      <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25" />
                      <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start text-black">
                        <svg
                          className="h-4 fill-current text-green-700 pr-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
                        </svg>{" "}
                        {data.job}
                      </p>
                      <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
                        <svg
                          className="h-4 fill-current text-green-700 pr-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81 28.81 0 0 1 0 4h3.82zm-.82 2h-3.22a14.44 14.44 0 0 1-.95 3.51A8.03 8.03 0 0 0 16.93 14zm-8.85-2h3.84a24.61 24.61 0 0 0 0-4H8.08a24.61 24.61 0 0 0 0 4zm.25 2c.41 2.4 1.13 4 1.67 4s1.26-1.6 1.67-4H8.33zm-6.08-2h3.82a28.81 28.81 0 0 1 0-4H2.25a8.01 8.01 0 0 0 0 4zm.82 2a8.03 8.03 0 0 0 4.17 3.51c-.42-.96-.74-2.16-.95-3.51H3.07zm13.86-8a8.03 8.03 0 0 0-4.17-3.51c.42.96.74 2.16.95 3.51h3.22zm-8.6 0h3.34c-.41-2.4-1.13-4-1.67-4S8.74 3.6 8.33 6zM3.07 6h3.22c.2-1.35.53-2.55.95-3.51A8.03 8.03 0 0 0 3.07 6z" />
                        </svg>{" "}
                        {data.location}
                      </p>
                      <p className="pt-8 text-sm">
                        <a className="pt-8 text-sm text-black">
                          Totally optional short description about yourself,
                          what you do and so on.
                        </a>
                        <br />
                        {data.description}
                      </p>
                      <div className="pt-12 pb-8">
                        {isUser ? (
                          <>
                            <button
                              className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full"
                              onClick={goToProfile}
                            >
                              View Current Profile
                            </button>
                            <br />{" "}
                          </>
                        ) : (
                          <>
                            {ifContact ? (
                              <>
                                <button
                                  className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full"
                                  onClick={() => goToOtherProfile(data._id)}
                                >
                                  View Profile
                                </button>
                                <br />{" "}
                              </>
                            ) : (
                              <>
                                {!ifRequest ? (
                                  <>
                                    <button
                                      className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full"
                                      onClick={() => addContact(data._id)}
                                    >
                                      Add contact
                                    </button>{" "}
                                    <br />
                                  </>
                                ) : (
                                  <>
                                    <button
                                      className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full"
                                      onClick={() => addContact(data._id)}
                                    >
                                      Requested
                                    </button>{" "}
                                    <br />
                                  </>
                                )}
                              </>
                            )}
                          </>
                        )}

                        {/* <span
                          className="border-b-2 border-transparent  text-xs px-4 cursor-pointer"
                          // onClick={() => reportPost(postDetail._id)}
                        >
                          Block User
                        </span> */}
                      </div>
                    
                    </div>
                  </div>
                  {/* Normal Photo */}
                  <div className="w-full lg:w-2/5">
                    <img
                      src={data.image}
                      className="shadow-2xl w-full h-full hidden lg:block"
                      style={{ height: "430px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-white background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={close}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </>
      <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
