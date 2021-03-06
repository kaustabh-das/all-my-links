import React, { useRef, useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../contexts/AuthContext";
import { db, storage } from "../../firebase";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import "./app.appearancepage.scss";
import LoadingComp from "../../components/LoadingComp/LoadingComp";
import Mypic from "../../assets/kd.jpeg";
import Avatar from "../../assets/avatar.png";

const Appearance = () => {
  const { currentUser, logout } = useAuth();
  const docId = "LO77RLzKIcdhEXNA1oer";

  const usernameRef = useRef();
  const bioRef = useRef();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState();

  const [imageName, setImageName] = useState();

  const [profilePic, setProfilePic] = useState();
  const [usersInfo, setUsersInfo] = useState([]);

  const [dbUsername, setDBUsername] = useState();
  const [dbBio, setDBBio] = useState();

  const [username, setUsername] = useState();
  const [bio, setBio] = useState();

  const [searchUsername, setSearchUsername] = useState([]);
  // let dbUsername = "";

  useEffect(() => {
    const getUsersInfo = () => {
      onSnapshot(
        collection(db, "users", currentUser.email, "user-info"),
        (querySnapshot) => {
          const items = [];
          querySnapshot.forEach((doc) => {
            items.push(doc.data());
          });
          setUsersInfo(
            items.sort((a, b) => {
              return a.row_no - b.row_no;
            })
          );
          // setProfilePic(items[0].profilePicLink);
          setUsername(items[0].username);
          setBio(items[0].bio);
          setProfilePic(items[0].profilePicLink);
          // console.log(items);
          setDBUsername(items[0].username);
          setDBBio(items[0].bio);
          // console.log(profilePic);
        }
        // (error) => {
        //   // ...
        // }
      );
    };

    getUsersInfo();

    // onSnapshot(collection(db, "usernameDB"), (querySnapshot) => {
    //   const items = [];
    //   querySnapshot.forEach((doc) => {
    //     items.push(doc.data());
    //     setSearchUsername(items);
    //   });
    //   console.log(items);
    // });
  }, []);

  // useEffect(() => {
  //   console.log(dbUsername);
  // }, [username]);

  const cancelUpdate = () => {
    setUsername(dbUsername);
    setBio(dbBio);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInfoDoc = "LO77RLzKIcdhEXNA1oer";
    // const searchresult = searchUsername.find(
    //   (x) => x.username === usernameRef.current.value
    // );
    // if (searchresult) {
    //   setUsernameError("This username is not avaliable");
    // } else {
    try {
      setLoading(true);
      const userDoc = doc(
        db,
        "users",
        currentUser.email,
        "user-info",
        userInfoDoc
      );
      const newUserInfoDB = { username: username, bio: bio };
      await updateDoc(userDoc, newUserInfoDB);

      const userDBDoc = doc(db, "usernameDB", currentUser.email);
      const newUserDB = { username: username };
      await updateDoc(userDBDoc, newUserDB);
    } catch {
      setError("Something is went wrong....");
      console.log("Something is went wrong....");
    }
    // }
    setDBUsername(username);
    setDBBio(bio);
    setLoading(false);
  };

  const changeTheme = async (themeval) => {
    setLoading(true);
    try {
      const userDoc = doc(db, "users", currentUser.email, "user-info", docId);
      const newUserTheme = { theme: themeval };
      await updateDoc(userDoc, newUserTheme);
    } catch {
      setError("Something is went wrong....");
      console.log("Something is went wrong....");
    }

    setLoading(false);
  };

  // const handelImageChange = (e) => {
  //   if (e.target.files[0]) {
  //     setProfilePic(e.target.files[0]);
  //   }
  // };

  // const uploadPic = () => {
  //   const imageRef = ref(storage, "myProfilepic");
  //   uploadBytes(imageRef, profilePic)
  //     .then(() => {
  //       getDownloadURL(imageRef)
  //         .then((url) => {
  //           // setUrl(url);
  //           setProfilePic(url);
  //         })
  //         .catch((error) => {
  //           console.log(error.message, "error getting the image url");
  //         });
  //       setProfilePic(Mypic);
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // };

  const handelImageChange = (e) => {
    e.preventDefault();
    // console.log(profilePic);
    const file = e.target[0].files[0];
    uploadFiles(file);
  };

  const uploadFiles = (file) => {
    const userInfoDoc = "LO77RLzKIcdhEXNA1oer";
    if (!file) return;
    setLoading(true);
    if (profilePic) {
      const desertRef = ref(storage, `profilepic/${imageName}`);

      // Delete the file
      deleteObject(desertRef)
        .then(async () => {
          // File deleted successfully
          try {
            // setLoading(true);
            const userDoc = doc(
              db,
              "users",
              currentUser.email,
              "user-info",
              userInfoDoc
            );
            const newUserProfilePic = { profilePicLink: "" };
            await updateDoc(userDoc, newUserProfilePic);
            console.log("image deleted sucessfully...");
          } catch {
            // setError("Something is went wrong....");
            console.log("Something is went wrong....");
          }
          // setLoading(false);
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
          // console.log(imageName);
          console.log("Something is went wrong....");
        });
      // deleteFile();
      // console.log("There is a profilelink in db");
    }
    setImageName(file.name);
    const sotrageRef = ref(storage, `profilepic/${file.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        // setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          try {
            // setLoading(true);
            const userDoc = doc(
              db,
              "users",
              currentUser.email,
              "user-info",
              userInfoDoc
            );
            const newUserProfilePic = { profilePicLink: downloadURL };
            await updateDoc(userDoc, newUserProfilePic);
          } catch {
            // setError("Something is went wrong....");
            console.log("Something is went wrong....");
          }
          setLoading(false);
          console.log("File available at", downloadURL);
        });
      }
    );
    // setLoading(false);
  };

  const deleteFile = () => {
    const userInfoDoc = "LO77RLzKIcdhEXNA1oer";
    // Create a reference to the file to delete
    const desertRef = ref(storage, `profilepic/${imageName}`);

    // Delete the file
    deleteObject(desertRef)
      .then(async () => {
        // File deleted successfully
        try {
          setLoading(true);
          const userDoc = doc(
            db,
            "users",
            currentUser.email,
            "user-info",
            userInfoDoc
          );
          const newUserProfilePic = { profilePicLink: "" };
          await updateDoc(userDoc, newUserProfilePic);
          console.log("image deleted sucessfully...");
        } catch {
          // setError("Something is went wrong....");
          console.log("Something is went wrong....");
        }
        setLoading(false);
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log(imageName);
        console.log("Something is went wrong....");
      });
  };

  return (
    <Layout>
      {loading && <LoadingComp style={"loading-comp-profile"} />}
      <div className="appearance_page">
        <div className="profile-section">
          <div className="profile-header">
            <p>Profile</p>
          </div>
          <div className="profile-inputs">
            <div className="profile-image">
              {usersInfo.map((user, index) => {
                return (
                  <>
                    {/* <img className="profile-pic" src={profilePic} /> */}
                    {user.profilePicLink ? (
                      <img
                        key={index}
                        className="profile-pic"
                        src={user.profilePicLink}
                      />
                    ) : (
                      <img key={index} className="profile-pic" src={Avatar} />
                    )}
                  </>
                );
              })}

              <form onSubmit={handelImageChange}>
                <input
                  // className="profile-pic-btn"
                  type="file"
                  // onChange={handelImageChange}
                  accept="image/*"
                />
                {/* <div className="profile-pic-btn" onClick={uploadPic}>
                <p>Upload Picture</p>
              </div> */}
                <button className="profile-pic-btn" type="submit">
                  Upload pic
                </button>
              </form>
              {usersInfo.map((user, index) => {
                return (
                  <>
                    {user.profilePicLink && (
                      <button onClick={deleteFile}>Remove Pic</button>
                    )}
                  </>
                );
              })}
            </div>
            {/* {usersInfo &&
              usersInfo.map((user, index) => {
                return ( */}
            <div className="profile-data">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  {searchUsername && <p>{searchUsername}</p>}
                  <label for="exampleFormControlInput1" className="form-label">
                    Username(username should be permanent) :
                  </label>
                  <input
                    type="text"
                    value={username}
                    className="form-control"
                    id="exampleFormControlInput1"
                    // placeholder="facebook"
                    onChange={(e) => setUsername(e.target.value)}
                    ref={usernameRef}
                  />
                </div>

                <label for="floatingTextarea2">Bio:</label>
                <div class="form-floating">
                  <textarea
                    class="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    ref={bioRef}
                    style={{ height: "8rem" }}
                  ></textarea>
                </div>
                {/* <p>{dbUsername}</p> */}
                {(username !== dbUsername || bio !== dbBio) && (
                  <div>
                    <button type="submit">Save</button>
                    <button
                      onClick={() => {
                        cancelUpdate();
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </form>
            </div>
            {/* );
              })} */}
          </div>
        </div>
        <div className="theme-section">
          <div className="theme-section-header">
            <p>Theme</p>
          </div>
          <div className="theme-cards">
            <div
              className="default"
              onClick={() => changeTheme("default")}
            ></div>
            <div className="pink" onClick={() => changeTheme("pink")}></div>
            <div className="green"></div>
            <div className="blue"></div>
            {/* <div className="blue"></div>
            <div className="blue"></div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Appearance;
