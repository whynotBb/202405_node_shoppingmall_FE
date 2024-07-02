import api from "../utils/api";
import * as types from "../constants/order.constants";
import { commonUiActions } from "./commonUiAction";
import { cartActions } from "./cartAction";

const createOrder = (payload, navigate) => async (dispatch) => {
    console.log("createOrder payload", payload);
    try {
        dispatch({ type: types.CREATE_ORDER_REQUEST });
        const response = await api.post("/order", payload);
        if (response.status !== 200) throw new Error(response.error);
        console.log("order action", response);
        dispatch({
            type: types.CREATE_ORDER_SUCCESS,
            payload: response.data.orderNum,
        });
        //오더 후에 카트 비워주고, 카트 아이템 갯수 확인하는 api 를 호출하여 갯수도 현행화 해 준다.
        dispatch(cartActions.getCartQty());
        navigate("/payment/success");
    } catch (error) {
        dispatch({ type: types.CREATE_ORDER_FAIL, payload: error.error });
        dispatch(commonUiActions.showToastMessage(error.error, "error"));
    }
};

// admin 에서 orders 모두 가져오기,   query -> page, orderNum 검색
const getOrders = (query) => async (dispatch) => {
    try {
        dispatch({ type: types.GET_ORDER_REQUEST });
        const response = await api.get("/order/all", {
            params: { ...query },
        });
        if (response.status !== 200) throw new Error(response.error);
        dispatch({ type: types.GET_ORDER_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: types.GET_ORDER_FAIL, payload: error.error });
    }
};
const getOrderList = () => async (dispatch) => {
    try {
        dispatch({ type: types.GET_ORDER_LIST_REQUEST });
        const response = await api.get("/order");
        if (response.status !== 200) throw new Error(response.error);
        dispatch({
            type: types.GET_ORDER_LIST_SUCCESS,
            payload: response.data.data,
        });
    } catch (error) {
        dispatch({ type: types.GET_ORDER_LIST_FAIL, payload: error.error });
    }
};

const updateOrder = (id, status) => async (dispatch) => {};

export const orderActions = {
    createOrder,
    getOrders,
    getOrderList,
    updateOrder,
};
