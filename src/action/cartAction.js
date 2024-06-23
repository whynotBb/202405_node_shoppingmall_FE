import api from "../utils/api";
import * as types from "../constants/cart.constants";
import { commonUiActions } from "../action/commonUiAction";
const addToCart =
    ({ id, size }) =>
    async (dispatch) => {
        try {
            dispatch({ type: types.ADD_TO_CART_REQUEST });
            const response = await api.post("/cart", {
                productId: id,
                size,
                qty: 1,
            });
            console.log("carttttttt", response.data.cartItmeQty);
            if (response.status !== 200) throw new Error(response.error);
            dispatch({
                type: types.ADD_TO_CART_SUCCESS,
                payload: response.data.cartItmeQty,
            });
            dispatch(
                commonUiActions.showToastMessage(
                    "상품을 추가하였습니다.",
                    "success"
                )
            );
        } catch (error) {
            dispatch({ type: types.ADD_TO_CART_FAIL, payload: error.error });
            dispatch(commonUiActions.showToastMessage(error.error, "error"));
        }
    };

const getCartList = () => async (dispatch) => {
    try {
        dispatch({ type: types.GET_CART_LIST_REQUEST });
        const response = await api.get("/cart");

        console.log("getCartListaction", response);
        if (response.status !== 200) throw new Error(response.error);
        dispatch({
            type: types.GET_CART_LIST_SUCCESS,
            payload: response.data.data.items,
        });
    } catch (error) {
        dispatch({ type: types.GET_CART_LIST_FAIL, payload: error.error });
        dispatch(commonUiActions.showToastMessage(error.error, "error"));
    }
};
const deleteCartItem = (id) => async (dispatch) => {
    try {
        dispatch({ type: types.DELETE_CART_ITEM_REQUEST });
        const response = await api.delete(`/${id}`);
        if (response.status !== 200) throw new Error(response.error);
        dispatch({ type: types.DELETE_CART_ITEM_SUCCESS });
        dispatch(
            commonUiActions.showToastMessage(
                "상품이 삭제 되었습니다.",
                "success"
            )
        );
        dispatch(getCartList());
    } catch (error) {
        dispatch({ type: types.DE, payload: error.error });
        dispatch(commonUiActions.showToastMessage(error.error, "error"));
    }
};

const updateQty = (id, value) => async (dispatch) => {};
const getCartQty = () => async (dispatch) => {};
export const cartActions = {
    addToCart,
    getCartList,
    deleteCartItem,
    updateQty,
    getCartQty,
};
