import api from "../utils/api";
import * as types from "../constants/user.constants";
import { commonUiActions } from "./commonUiAction";
import * as commonTypes from "../constants/commonUI.constants";
const loginWithToken = () => async (dispatch) => {
    const token = sessionStorage.getItem("token");
    console.log(token);
    try {
        dispatch({ type: types.LOGIN_WITH_TOKEN_REQUEST });
        const response = await api.get("/user/me");
        console.log("success", response);
        if (response.status !== 200) {
            throw new Error(response.Error);
        }
        console.log(response.data.user);
        dispatch({
            type: types.LOGIN_WITH_TOKEN_SUCESS,
            payload: response.data.user,
        });
    } catch (error) {
        dispatch({ type: types.LOGIN_WITH_TOKEN_FAIL });
        dispatch(logout());
    }
};
const loginWithEmail =
    ({ email, password }) =>
    async (dispatch) => {
        try {
            dispatch({ type: types.LOGIN_REQUEST });
            const response = await api.post("/auth/login", { email, password });
            if (response.status !== 200) {
                throw new Error(response.error);
            }
            sessionStorage.setItem("token", response.data.token);
            dispatch({ type: types.LOGIN_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: types.LOGIN_FAIL, payload: error.error });
        }
    };
const logout = () => async (dispatch) => {
    sessionStorage.removeItem("token");
    dispatch({ type: types.LOGOUT });
};

const loginWithGoogle = (token) => async (dispatch) => {};

const registerUser =
    ({ email, name, password }, navigate) =>
    async (dispatch) => {
        try {
            dispatch({ type: types.REGISTER_USER_REQUEST });
            const response = await api.post("/user", { email, name, password });
            if (response.status !== 200) {
                throw new Error(response.error);
            }
            dispatch({ type: types.REGISTER_USER_SUCCESS });
            dispatch(
                commonUiActions.showToastMessage(
                    "회원가입을 완료했습니다.",
                    "success"
                )
            );
            navigate("/login");
        } catch (error) {
            dispatch({ type: types.REGISTER_USER_FAIL, payload: error.error });
            dispatch(commonUiActions.showToastMessage(error.error, "error"));
        }
    };
export const userActions = {
    loginWithToken,
    loginWithEmail,
    logout,
    loginWithGoogle,
    registerUser,
};
