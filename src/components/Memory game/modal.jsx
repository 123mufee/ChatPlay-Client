import React, { useEffect, useState } from "react";
import modalStore from "../../store/modalStore";
import axios from "axios";
import { userUrl } from "../../api/api";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import userProfileStore from "../../store/userProfileStore";

export default function Modal() {
    const { setGameModal } = modalStore()

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none text-black">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-transparent outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t"></div>
                        <div className="relative p-0 flex-auto">
                            <div className="max-w-4xl flex items-center h-auto  flex-wrap mx-auto lg:my-0">
                                <div className="h-96 w-96 lg:w-screen" style={{ backgroundImage: "url('https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fch_it%2Fsearch%3Fk%3D%2522you%2520win%2522&psig=AOvVaw3a_wr5cwagugVoN5BVIuaa&ust=1683606525703000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCPCR7Znx5P4CFQAAAAAdAAAAABAE')", backgroundSize: "cover", backgroundRepeat: 'no-repeat' }}>


                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                            className="text-white background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setGameModal(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
            <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}
