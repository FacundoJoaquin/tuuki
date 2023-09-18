import { createSlice } from "@reduxjs/toolkit";
//import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    firstReadAchievements: false,
    achievements: {
        firstComment: {
            complete: false,
            key: "firstComment",
        },
        firstControl: {
            complete: false,
            key: "firstControl",
        },
        firstLogin: {
            complete: false,
            key: "firstLogin",
        },
    },
};

export const achievementSlice = createSlice({
    name: "achievement",
    initialState,
    reducers: {
        updateAchievements: (state, action) => {
            return {
                ...state,
                achievements: {
                    ...state.achievements,
                    ...action.payload,
                },
            };
        },
        setfirstReadAchievements: (state, action) => {
            state.firstReadAchievements = action.payload;
        },
    },
});


export const { updateAchievements, setfirstReadAchievements } = achievementSlice.actions;

export default achievementSlice.reducer;
