import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Memory from "../../pages/Memory match"
import Tic from "../../pages/tictactoe/tictactoe";
// import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";
import gameStore from "../../store/gameStore";
import { useDispatch, useSelector } from "react-redux";

import { reduxifGame, reduxselectedGame, reduxshowEmojiPicker, unreduxshowEmojiPicker } from "../../components/reduxstore/reducerslice";


const images = [
  {
    src:
      "https://store-images.s-microsoft.com/image/apps.2005.14057826194083709.67242c47-4fd7-4f1a-9dd6-5d93f6cc10df.f80f14c0-72ab-46ff-86cd-9d801c8e04e8?mode=scale&q=90&h=300&w=300",
    game: "tic",
  },
  {
    src:
      "https://i0.wp.com/sweetferndesigns.com/wp-content/uploads/2023/03/Screen-Shot-2023-03-01-at-6.13.27-PM.png?resize=300%2C300&ssl=1",
    game: "memory",
  },
  
];
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  centerMode: true,
  centerPadding: "0px",
};


function ImageSlider() {
  const dispatch=useDispatch()
  const {ifGame,selectedGame }=useSelector((state)=>state.auth)
  const sliderRef = useRef(null);
  const navigate = useNavigate();
  // const [ifGame, setIfGame] = useState(false)
  // const[selecteGame,setSelectedGame]=useState("")
  // const { setIfGame, selectedGame, setSelecteGame, setShowEmojiPicker } = gameStore()

  function previousSlide() {
    sliderRef.current.slickPrev();
  }

  function nextSlide() {
    sliderRef.current.slickNext();
  }

  function handleImageClick(game) {
    // navigate(navigateTo);
    dispatch(reduxselectedGame(`${game}`))

    dispatch(reduxifGame())
    // console.log(ifGame);
    dispatch(reduxshowEmojiPicker())
  }

  return (
    <>
      {
        ifGame  ? (
          <>
          <div className="relative w-full">
            {/* <Slider ref={sliderRef} {...settings} >
              {images.map((image, index) => (
                <div key={index} onClick={() => handleImageClick(image.game)}>
                  <img src={image.src} alt="" style={{ marginLeft: "26px" }} />
                </div>
              ))}
            </Slider> */}
            <a
              onClick={previousSlide}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {/* <ArrowLeftIcon className="h-6 w-6" aria-hidden="true" /> */}
            </a>
            <a
              onClick={nextSlide}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {/* <ArrowRightIcon className="h-6 w-6" aria-hidden="true" /> */}
            </a>
          </div>
         </>
        ) 
        : (
          <>
            <div className="relative w-full">
              <Slider ref={sliderRef} {...settings} >
                {images.map((image, index) => (
                  <div key={index} onClick={() => handleImageClick(image.game)}>
                    <img src={image.src} alt="" style={{ marginLeft: "26px" }} />
                  </div>
                ))}
              </Slider>
              <a
                onClick={previousSlide}
                className="absolute top-1/2 left-0 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {/* <ArrowLeftIcon className="h-6 w-6" aria-hidden="true" /> */}
              </a>
              <a
                onClick={nextSlide}
                className="absolute top-1/2 right-0 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {/* <ArrowRightIcon className="h-6 w-6" aria-hidden="true" /> */}
              </a>
            </div>
           </>
        )
      }
    </>

  );
}

export default ImageSlider;
