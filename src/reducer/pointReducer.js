import * as types from "../constants/point.constants";

const initialState = {
	loading: false,
	error: "",
	totalPoint: "",
	pointHistory: "",
};

function pointReducer(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case types.ADD_POINT_REQUEST:
			return { ...state, loading: true };
		default:
			return state;
	}
}

export default pointReducer;
