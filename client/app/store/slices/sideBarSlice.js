const { createSlice } = require("@reduxjs/toolkit");


const initialState = {
    sideBarOpen : true,
    currentFocus : 0,
}


const sideBarSlice = createSlice({
    name : 'sideBar',
    initialState,
    reducers : {
        changeSideBarState : (state)=>{
            state.sideBarOpen = !state.sideBarOpen
        },
        changeFocus : (state,action)=>{
            state.currentFocus = action.payload;
        }
    }
})


export const {
    changeSideBarState,
    changeFocus
} = sideBarSlice.actions;

export const selectSideBarOpen = (state)=> state.sideBar.sideBarOpen;
export const selectCurrentFocus = (state) => state.sideBar.currentFocus;


export default sideBarSlice.reducer