import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import commonUiReducer from "./commonUIReducer";
import orderReducer from "./orderReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import pointReducer from "./pointReducer";

// persist configuration for user reducer
const userPersistConfig = {
	key: "user",
	storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

const store = configureStore({
	reducer: {
		user: persistedUserReducer, // apply persistReducer to userReducer
		product: productReducer,
		cart: cartReducer,
		ui: commonUiReducer,
		order: orderReducer,
		point: pointReducer,
	},
});

export default store;
