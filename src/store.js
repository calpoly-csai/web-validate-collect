import Vue from "vue";
import Vuex from "vuex";
import router from "./router";
const firebase = require("firebase");

var firebaseConfig = {
  apiKey: "AIzaSyDUefAc2fEMu1Uez0Cfo7tkkqvGqdLPL6Y",
  authDomain: "csai-b408c.firebaseapp.com",
  databaseURL: "https://csai-b408c.firebaseio.com",
  projectId: "csai-b408c",
  storageBucket: "csai-b408c.appspot.com",
  messagingSenderId: "389831924448",
  appId: "1:389831924448:web:b6387ec7e4375868"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("listener passes user", user);
  } else {
    router.push("/");
  }
});

const db = firebase.firestore();
const auth = firebase.auth();

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    unvalidatedData: [],
    validatedData: [],
    banner: {
      isVisible: false,
      message: "this is my banner",
      type: "default"
    }
  },
  mutations: {
    addUnvalidatedData(state, payload) {
      state.unvalidatedData = [...state.unvalidatedData, ...payload];
    },
    setUserInfo(state, payload) {
      state.user = payload;
    },
    setBanner(state, payload) {
      payload.message = payload.message || state.banner.message;
      payload.type = payload.type || state.banner.type;
      payload.isVisible = payload.isVisible || true;
      state.banner.type = payload.type;
      state.banner.message = payload.message;
      state.banner.isVisible = payload.isVisible;
    }
  },
  actions: {
    async logIn({ dispatch, commit }, payload) {
      const userData = await auth
        .signInWithEmailAndPassword(payload.email, payload.password)
        .catch(err => {
          console.warn("login failed");
          console.log(err);
          return;
        });
      dispatch("getProfile", userData.user.uid);
      dispatch("getUnvalidatedData");
      router.push("/dashboard");
      console.log("success");
    },

    async getProfile({ commit }, uid) {
      let data;
      const pointer = await db
        .collection("Users")
        .doc(uid)
        .get();
      if (pointer.exists) {
        data = pointer.data();
      } else {
        console.log("user not found");
        return;
      }
      commit("setUserInfo", data);
    },

    getUnvalidatedData({ commit }) {
      let data;
      const pointer = db
        .collection("UnvalidatedData")
        .orderBy("timestamp")
        .limit(5);
      if (pointer.exists) {
        data = pointer.data();
        console.log("data:", data);
        commit("addUnvalidatedData", data);
        console.log("success");
      } else {
        console.log("getUnvalidatedData failed");
      }
    },

    async signUp({ state }, payload) {
      await auth.createUserWithEmailAndPassword(payload.email, payload.password).catch(err => {
        console.log(err);
        return err;
      });
      console.log("success");
      return true;
    },

    showBanner({ commit }, payload) {
      commit("setBanner", payload);
      setTimeout(() => {
        console.log("fired");
        commit("setBanner", { isVisible: false });
      }, 5000);
    },
    //TODO:fix sign out
    signOut() {
      setTimeout(() => {
        firebase.auth().signOut();
        console.log("signed out");
      }, 1000);
    }
  }
});
