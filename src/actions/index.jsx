import {
  GET_LINKS,
  GET_USERINFO,
  LOADING_STATE,
  GET_POST,
  CREATE_LINKS,
  UPDATE_POST,
  DELETE_LINKS,
} from "./types";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
// import { result } from "lodash";

export const loadingState = (argument) => (dispatch) => {
  const loadingdata = argument;
  dispatch({
    type: LOADING_STATE,
    payload: loadingdata,
  });
};

// get all links
export const getLinks = (docId) => async (dispatch) => {
  // setLoading(true);
  loadingState(true);
  //   const result = await axios.get("https://jsonplaceholder.typicode.com/posts");

  const usersCollectionLinkRef = collection(db, "users", docId, "user-links");

  const data = await getDocs(usersCollectionLinkRef);
  loadingState(false);
  // setLoading(false);
  // let firebaseLinkData = [];
  //   let result = [];
  const result = data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  // console.log(result);
  //   if (result.status === 200) {
  dispatch({
    type: GET_LINKS,
    //   payload: firebaseLinkData.data,
    payload: result,
  });

  //   console.log(result.data);

  //   } else {
  //     console.log(
  //       data.docs.map((doc) => ({
  //         ...doc.data(),
  //         id: doc.id,
  //       }))
  //     );
  //     console.log(result.status);
  //     alert(data);
  //   }
};

export const createUserLink = (title, link, userEmail) => async (dispatch) => {
  const usersLinkCollectionInfoRef = collection(
    db,
    "users",
    userEmail,
    "user-links"
  );
  const result = await addDoc(usersLinkCollectionInfoRef, {
    title: title,
    link: link,
  });

  // dispatch({
  //   type: CREATE_LINKS,
  //   payload: result,
  // });
};

export const deleteUserLink = (id, userEmail) => async () => {
  const userDoc = doc(db, "users", userEmail, "user-links", id);
  await deleteDoc(userDoc);
  // dispatch({
  //   type: GET_USERINFO,
  //   payload: result,
  // });
};

export const getUserInfo = (docId) => async (dispatch) => {
  const usersCollectionInfoRef = collection(db, "users", docId, "user-info");

  const data = await getDocs(usersCollectionInfoRef);

  const result = data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  //   console.log(result);
  dispatch({
    type: GET_USERINFO,
    payload: result,
  });
};
