
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db, storage } from "../db";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [total, setTotal] = useState(0);
  const [initial, setInitial] = useState("");
  const [curve, setCurve] = useState("");
  const [file, setFile] = useState();
  const [uploadFileLink, setUploadFileLink] = useState("");
  const [id, setId] = useState("");

  async function handleCreateListing(e) {
    e.preventDefault();
    const data = {
      title,
      description,
      total,
      initial,
      curve,
      uploadFileLink,
    };
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setUploadFileLink(downloadURL);
        });
      }
    );
    await setDoc(doc(db, "users", title), data);
  }
  return (
    <div>
      <form onSubmit={(e) => handleCreateListing(e)}>
        <div className={styles.container}>
          {/* Form Section */}
          <div className={styles.collectionContainer}>
            <h1 className={styles.ourCollection}></h1>

            {/* Toggle between direct listing and auction listing */}
            <div className={styles.listingTypeContainer}></div>
            {/* NFT Contract Address Field */}
            <input
              type="text"
              name="title"
              className={styles.textInput}
              placeholder="Title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />

            {/* NFT Token ID Field */}
            <input
              type="textarea"
              name="tokenId"
              className={styles.textInput}
              placeholder="Description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <input
              type="number"
              name="Total to be minted"
              className={styles.textInput}
              placeholder="Total to be Minted"
              onChange={(e) => {
                setTotal(e.target.value);
              }}
            />
            <input
              type="string"
              min="0"
              name="Price"
              className={styles.textInput}
              placeholder="Initial Price"
              onChange={(e) => {
                setInitial(e.target.value);
              }}
            />

            <input
              type="number"
              name="Curve Bound %"
              className={styles.textInput}
              placeholder="Curve Bound"
              onChange={(e) => {
                setCurve(e.target.value);
              }}
            />
            <input
              type="file"
              className={styles.fileInput}
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
            <button
              type="submit"
              className={styles.mainButton}
              style={{ marginTop: 32, borderStyle: "none" }}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
