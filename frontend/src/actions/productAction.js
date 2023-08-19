import axios from "axios";

import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_REQUEST,
  CLEAR_ERRORS,
} from "../constants/productConstant";

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });
    const { data } = await axios.get("http://localhost:8000/api/v1/products");
    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear Errors and set it to null
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
