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

const getOrder = () => async (dispatch) => {};
const getOrderList = (query) => async (dispatch) => {};

const updateOrder = (id, status) => async (dispatch) => {};

export const orderActions = {
    createOrder,
    getOrder,
    getOrderList,
    updateOrder,
};
