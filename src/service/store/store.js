import { configureStore } from "@reduxjs/toolkit";
import sampleSlicer from "./sampleSlicer";

export const store = configureStore({
  reducer: {
    sample:sampleSlicer
  },
});
