import * as types from "../constants/order.constants";

const initialState = {
	loading: false,
	error: "",
	orderNum: "",
	orderList: null,
	orders: null,
	totalPageNum: 1,
	selectedOrder: null,
};

function orderReducer(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case types.CREATE_ORDER_REQUEST:
		case types.GET_ORDER_LIST_REQUEST:
		case types.GET_ORDER_REQUEST:
		case types.UPDATE_ORDER_REQUEST:
			return { ...state, loading: true };
		case types.CREATE_ORDER_SUCCESS:
			return { ...state, loading: true, orderNum: payload };
		case types.GET_ORDER_LIST_SUCCESS:
			return { ...state, loading: true, orderList: payload };
		case types.GET_ORDER_SUCCESS:
			return {
				...state,
				loading: true,
				orders: payload.data,
				totalPageNum: payload.totalPageNum,
			};
		case types.UPDATE_ORDER_SUCCESS:
			return { ...state, loading: true };
		case types.SET_SELECTED_ORDER:
			return { ...state, loading: true, selectedOrder: payload };
		case types.CREATE_ORDER_FAIL:
		case types.GET_ORDER_LIST_FAIL:
		case types.GET_ORDER_FAIL:
		case types.UPDATE_ORDER_FAIL:
			return { ...state, loading: true, error: payload };
		default:
			return state;
	}
}
export default orderReducer;
