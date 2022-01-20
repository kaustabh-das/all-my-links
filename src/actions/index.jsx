import {
  GET_LINKS,
  GET_USERINFO,
  GET_POST,
  CREATE_POST,
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

// get all links
export const getLinks = (docId) => async (dispatch) => {
  //   const result = await axios.get("https://jsonplaceholder.typicode.com/posts");

  const usersCollectionLinkRef = collection(db, "users", docId, "user-links");

  const data = await getDocs(usersCollectionLinkRef);

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
