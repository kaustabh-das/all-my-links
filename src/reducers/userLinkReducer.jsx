import React from "react";
import {
  GET_LINKS,
  // GET_USERINFO,
  // CREATE_POST,
  // UPDATE_POST,
  // DELETE_POST,
} from "../actions/types";

const initialState = {
  links: [],
  // post: null,
};
// const initialState = [];

const userLinkReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_LINKS:
      //   console.log(payload)
      return {
        ...state,
        links: payload,
      };
    default:
      return state;
  }
};

export default userLinkReducer;
