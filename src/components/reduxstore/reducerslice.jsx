import {createSlice}from "@reduxjs/toolkit"
   const initialState={
     ifGame:false,
     selectedGame: "",
     buttonClicked: false,
     showEmojiPicker: false,
   }
   const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        reduxifGame:(state)=>{
            state.ifGame=true;
        },
        unreduxifGame:(state)=>{
            state.ifGame=false;
        },
        reduxselectedGame:(state,data)=>{
            state.selectedGame=data.payload
        },
        // unreduxselectedGame:(state)=>{
        //     state.selectedGame=
        // },
        reduxbuttonClicked:(state)=>{
            state.buttonClicked=!state.buttonClicked;
        },
        // unreduxbuttonClicked:(state)=>{
        //     state.buttonClicked=false;
        // },
        reduxshowEmojiPicker:(state)=>{
            state.showEmojiPicker=!state.showEmojiPicker;
        },
        // unreduxshowEmojiPicker:(state)=>{
        //     state.showEmojiPicker=false
        // }
    },
   });
   export const {reduxifGame,unreduxifGame,reduxselectedGame,unreduxselectedGame,reduxbuttonClicked,unreduxbuttonClicked,reduxshowEmojiPicker,unreduxshowEmojiPicker}=authSlice.actions;
   export default authSlice.reducer;