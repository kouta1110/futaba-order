// ============================================================
// Firebase 設定
// Firebase Console → プロジェクトの設定 → マイアプリ から
// 下の firebaseConfig の値をすべて書き換えてください
// ============================================================
const firebaseConfig = {
  apiKey:            "AIzaSyB9Vjt7th-28honNkzop54awYcgeXmXmfg",
  authDomain:        "order-736a7.firebaseapp.com",
  projectId:         "order-736a7",
  storageBucket:     "order-736a7.firebasestorage.app",
  messagingSenderId: "47166881264",
  appId:             "1:47166881264:web:bd128dbb5324a94fe73135",
};

firebase.initializeApp(firebaseConfig);

const db        = firebase.firestore();
const tablesRef = db.collection('tables');
const menusRef  = db.collection('menus');
const ordersRef = db.collection('orders');

const serverNow = () => firebase.firestore.FieldValue.serverTimestamp();

function fmtTime(val) {
  if (!val) return '--:--';
  const d = val.toDate ? val.toDate() : new Date(val);
  return d.getHours().toString().padStart(2,'0') + ':' + d.getMinutes().toString().padStart(2,'0');
}
