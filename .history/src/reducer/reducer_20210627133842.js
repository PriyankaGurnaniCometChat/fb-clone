// import { StateProvider } from "./StateProvider"

export const initialState = {
    user: null,
    UID: user,
};

export const actionTypes = {
    SET_USER: "SET_USER",
    SET_UID: "SET_UID",
};

const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user,
            };
        case actionTypes.SET_UID:
            return {
                ...state,
                UID: action.UID,
            }

        default:
            return state;
    }
};

export default reducer;
