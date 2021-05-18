import React, { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();

export const StateProvider = ({ reducer }) => (
    <StateContext.Provider value={useReducer(reducer)}>
        {/* {children} */}
    </StateContext.Provider>
)

export const useStateValue = () => useContext(StateContext);

export default StateProvider

