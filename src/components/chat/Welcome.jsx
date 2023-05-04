import React, { useState, useEffect } from "react";
import axios from "axios";
import { chatUrl } from "../../api/api";

export default function Welcome() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = { token: localStorage.getItem('userToken') }
    axios.post(`${chatUrl}userData`, token).then((response)=>{
      setUserName(response.data.data.firstName);
    })
  }, []);
  
  return (
    <div className="flex justify-center items-center flex-col text-white">
      {/* <img src={Robot} alt="" className="h-80" /> */}
      <h1 className="text-4xl text-black font-bold">
        Welcome, <span className="text-purple-500">{userName}!</span>
      </h1>
      <h3 className="text-lg mt-4">Please select a chat to start messaging.</h3>
    </div>
  );
}
