import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBq3_ZyIerx589XOZtYXhakC2qDS97Br3Y",
  authDomain: "cloud-storage-app-9119a.firebaseapp.com",
  projectId: "cloud-storage-app-9119a",
  storageBucket: "cloud-storage-app-9119a.appspot.com",
  messagingSenderId: "306582005130",
  appId: "1:306582005130:web:374e0d7651db10606e5473",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, app };
