import { storage } from "./Firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

//firebase image uploader
//it takes the file and returns the file as a url
const firebaseFileUpload = ({
  file,
  setLoading,
  uploadFile,
  setProgress,
  setUrl,
  type,
  userId,
}) => {
  setLoading(true);
  const storageRef = ref(
    storage,
    type === "profile"
      ? `profilePic/${userId}/${file.name}`
      : `file/${userId}/${file.name}`
  );
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(progress);
    },
    (err) => {
      console.log(err);
      setLoading(false);
      setProgress(0);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        if (type === "newfile") {
          uploadFile(file.name, url, uploadTask.snapshot.bytesTransferred);
        } else {
          setUrl(url);
        }
        setProgress(0);
        setLoading(false);
      });
    }
  );
};

export default firebaseFileUpload;
