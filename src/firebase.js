import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, onSnapshot } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// ==========================================
// ⚠️ 請填寫您的 Firebase 設定 (Firebase Console -> 專案設定)
// 為了實現 "跨裝置儲存"，請填寫您的資料庫設定。
// 若未填寫，系統會自動降級為 "本地端存儲 (LocalForage)"
// ==========================================
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

let db = null;
let storage = null;

export const initFirebase = () => {
  if (firebaseConfig.apiKey !== "YOUR_API_KEY" && firebaseConfig.apiKey !== "") {
    try {
      const app = initializeApp(firebaseConfig);
      db = getFirestore(app);
      storage = getStorage(app);
      console.log("🔥 Firebase 跨裝置雲端儲存與檔案庫已啟動");
      return true;
    } catch (e) {
      console.error("❌ Firebase 初始化失敗:", e);
      return false;
    }
  } else {
    console.warn("⚠️ 尚未設定 Firebase Config，目前處於離線/本地端儲存模式。請至 src/firebase.js 填寫。");
    return false;
  }
};

export const saveProjectsToDB = async (projectsData) => {
  if (!db) return false;
  try {
    await setDoc(doc(db, "designSync", "projectsData"), { projects: projectsData });
    return true;
  } catch (error) {
    console.error("儲存至 Firebase 失敗:", error);
    return false;
  }
};

export const loadProjectsFromDB = async () => {
  if (!db) return null;
  try {
    const docSnap = await getDoc(doc(db, "designSync", "projectsData"));
    if (docSnap.exists()) {
      return docSnap.data().projects;
    }
  } catch (error) {
    console.error("從 Firebase 讀取失敗:", error);
  }
  return null;
};

export const subscribeToProjects = (callback) => {
  if (!db) return () => { };
  return onSnapshot(doc(db, "designSync", "projectsData"), (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data().projects);
    }
  });
};

export const uploadFileToStorage = async (file, path = 'uploads') => {
  if (!storage) {
    console.warn("⚠️ 尚未初始化 Firebase Storage，略過雲端上傳！");
    return null;
  }
  try {
    const fileRef = ref(storage, `${path}/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytesResumable(fileRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Firebase 檔案上傳失敗:", error);
    return null;
  }
};
