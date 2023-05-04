import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducerslice"

export default configureStore({
    reducer:{
        auth:authReducer,
    }
})