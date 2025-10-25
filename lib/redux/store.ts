import { configureStore } from "@reduxjs/toolkit";
import leadReducer from "./features/leadSlice";
import adhikariReducer from "./features/adhikariSlice";
import karyakramReducer from "./features/karyakramSlice";
import railayanReducer from "./features/railayanSlice";
import galleryReducer from "./features/gallerySlice";
import jantaDarbarReducer from "./features/darbarSlice";
import postReducer from "./features/postSlice";

const store = configureStore({
  reducer: {
    leads: leadReducer,
    adhikari: adhikariReducer,
    karyakram: karyakramReducer,
    railayan: railayanReducer,
    gallery: galleryReducer,
    jantaDarbar : jantaDarbarReducer,
    posts: postReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;