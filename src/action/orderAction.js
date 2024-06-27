import api from "../utils/api";
import * as types from "../constants/order.constants";
import { commonUiActions } from "./commonUiAction";

const createOrder = (payload) => async (dispatch) => {
    console.log("createOrder payload", payload);
    try {
        dispatch({ type: types.CREATE_ORDER_REQUEST });
        const response = await api.post("/order", payload);
        if (response.status !== 200) throw new Error(response.error);
        dispatch({
            type: types.CREATE_ORDER_SUCCESS,
            payload: response.data.orderNum,
        });
    } catch (error) {
        dispatch({ type: types.CREATE_ORDER_FAIL, payload: error.error });
        dispatch(commonUiActions.showToastMessage(error.error, "error"));
    }
};

const getOrder = () => async (dispatch) => {};
const getOrderList = (query) => async (dispatch) => {};

const updateOrder = (id, status) => async (dispatch) => {};

export const orderActions = {
    createOrder,
    getOrder,
    getOrderList,
    updateOrder,
};
