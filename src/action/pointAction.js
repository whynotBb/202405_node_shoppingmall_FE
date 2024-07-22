import api from "../utils/api";
import * as types from "../constants/point.constants";
import { commonUiActions } from "./commonUiAction";

const addPoint = (payload) => async (dispatch) => {
    try {
        console.log(payload);
        dispatch({ type: types.ADD_POINT_REQUEST });
        const response = await api.post("/point", payload);
        if (response.status !== 200) throw new Error(response.error);
        console.log(response);
        dispatch({ type: types.ADD_POINT_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: types.ADD_POINT__FAIL, payload: error.error });
    }
};

const getTotalPoints = () => async (dispatch) => {
    try {
        dispatch({ type: types.GET_POINT_REQUEST });
        const response = await api.get("/point");
        if (response.status !== 200) throw new Error(response.error);
        console.log("getTotalPoints--", response);
        dispatch({ type: types.GET_POINT_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: types.GET_POINT_FAIL, payload: error.error });
    }
};

export const pointActions = {
    addPoint,
    getTotalPoints,
};
