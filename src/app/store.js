import { configureStore } from "@reduxjs/toolkit";
import postSlide from "../features/postSlicer";

export default configureStore({
  reducer: {
   post:postSlide
  }
});
