import {
  initializeApp
}from"https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js"; import {
  getMessaging,
  isSupported,
  getToken,
  onMessage
}from"https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging.js"; const firebaseConfig = {
  apiKey: "AIzaSyA5z5FS7U50eI5S3-H9jRM6g1fYzG0S8Vk",
  authDomain: "smallseotools-1470394573010.firebaseapp.com",
  databaseURL: "https://smallseotools-1470394573010.firebaseio.com",
  projectId: "smallseotools-1470394573010",
  storageBucket: "smallseotools-1470394573010.appspot.com",
  messagingSenderId: "543959747848",
  appId: "1:543959747848:web:83f221c4a7b29c76c1f0bd"
}, app = initializeApp(firebaseConfig), messaging = getMessaging(); setTimeout((function() {
    function e(e) {
      window.localStorage.setItem("fcmTokenSST", e?1: 0)}isSupported() && 1 != window.localStorage.getItem("fcmTokenSST") && getToken(messaging, {
        vapidKey: "BD63BuwrjVY0fkIa646mXTNGt1JlZBvj_fgTpe2EwSWV3vvJr_XAzp98YjKVB3R-qm00ElKJS1vpGbQNXluKtQM"
      }).then((a=> {
          a?function(a) {
            $.ajax({
              url: base_url+"save-fcm-token/", type: "POST", data: {
                device_token: a
              }, dataType: "JSON", success: function(a) {
                "success" == a.status?e(!0): e(!1)}, error: function(a) {
                e(!1)}})}(a): console.log("No registration token available. Request permission to generate one.")})).catch((a=> {
          e(!1)})), onMessage(messaging, (e=> {
          var a = e.data.title, t = {
            body: e.data.body, tag: ""+e.data.tag, icon: e.data.icon, requireInteraction: !0
          }, o = new Notification(a, t); o.onclick = function(a) {
            a.preventDefault(); var t = e.data.link; t && window.open(t, "_blank"), o.close()}}))}), 5e3);