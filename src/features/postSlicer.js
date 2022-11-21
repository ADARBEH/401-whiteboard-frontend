import { createSlice } from "@reduxjs/toolkit";
const axios = require("axios");
const API_URL = "https://whiteboard-backend-ad.herokuapp.com/post";

export const postSlide = createSlice({
    name: "post",
    initialState: {
        data: []
    },
    reducers: {
        addpost: (state, action) => {
            state.data.push(action.payload);
        },
        getpost: (state, action) => {
            state.data = [action.payload];
        }
    }
});

export const getpostAsync = () => async (dispatch) => {
    try {
        const response = await axios.get(`${API_URL}`,
            {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('User')).token}`
                }
            });
        console.log(response.data);
        dispatch(getpost(response.data));
    } catch (err) {
        throw new Error(err);
    }
};

export const addpostAsync = (data) => async (dispatch) => {
    try {
        const response = await axios.post(`${API_URL}`, data,
            {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('User')).token}`
                }
            });
        console.log(response.data);
        dispatch(addpost(response.data));
    } catch (err) {
        throw new Error(err);
    }
};


export const { addpost, getpost } = postSlide.actions;
export const showpost = (state) => state.post.data;
export default postSlide.reducer;
