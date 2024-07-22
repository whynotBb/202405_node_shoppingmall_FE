import * as types from "../constants/point.constants";

const initialState = {
    loading: false,
    error: "",
    totalPoint: null,
    pointHistory: "",
};
function pointReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case types.ADD_POINT_REQUEST:
        case types.GET_POINT_REQUEST:
            return { ...state, loading: true };
        case types.ADD_POINT_SUCCESS:
            return {
                ...state,
                loading: true,
                totalPoint: payload.data.totalPoint,
            };
        case types.GET_POINT_SUCCESS:
            return {
                ...state,
                loading: true,
                totalPoint: payload.data.totalPoint,
            };
        case types.ADD_POINT__FAIL:
        case types.GET_POINT_FAIL:
            return { ...state, loading: true, error: payload };
        default:
            return state;
    }
}

export default pointReducer;
