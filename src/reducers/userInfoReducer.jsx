import React from "react";
import {
  GET_LINKS,
  GET_USERINFO,
  // CREATE_POST,
  // UPDATE_POST,
  // DELETE_POST,
} from "../actions/types";

const initialState = {
  info: [],
  // post: null,
};

const userInfoReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USERINFO:
      //   console.log(payload);
      return {
        ...state,
        info: payload,
      };
    default:
      return state;
  }
};

export default userInfoReducer;
