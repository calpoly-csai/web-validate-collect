import Vue from "vue";
import Vuex from "vuex";
import router from "./router";
const firebase = require("firebase");
const axios = require("axios");

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
const storage = firebase.storage();

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: { uid: "Apnwimh8YBNz2yNdX2DQ9mbqAUD3" },
    unvalidatedData: [],
    validatedData: [],
    banner: {
      isVisible: false,
      message: "this is my banner",
      //Types include error, success, and default
      type: "default"
    }
  },
  mutations: {
    setUnvalidatedData(state, payload) {
      state.unvalidatedData = [...state.unvalidatedData, ...payload];
    },
    setUserInfo(state, payload) {
      state.user = payload;
    },
    setBanner(state, payload) {
      payload.message = payload.message || state.banner.message;
      payload.type = payload.type || "default";
      //specifically check for false to weed out undefined values
      payload.isVisible = payload.isVisible == false ? false : true;
      state.banner.type = payload.type;
      state.banner.message = payload.message;
      state.banner.isVisible = payload.isVisible;
    },
    displayError(state, message) {
      state.banner.type = "error";
      state.banner.message = message;
      state.banner.isVisible = true;
    },
    validateFirst(state, isValid) {
      const validated = state.unvalidatedData.shift();
      validated.isValid = isValid;
      state.validatedData.push(validated);
    },
    eraseValidatedData(state) {
      state.validatedData = [];
    },
    eraseSessionData(state) {
      state.user = {};
      state.unvalidatedData = [];
      state.validatedData = [];
    }
  },
  actions: {
    //TODO: return a promise
    async logIn({ dispatch, commit }, payload) {
      const userData = await auth
        .signInWithEmailAndPassword(payload.email, payload.password)
        .catch(err => {
          console.warn("login failed");
          console.log(err);
          return;
        });
      await dispatch("getProfile", userData.user.uid);
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
      commit("setUserInfo", { ...data, uid });
    },
    async getUnvalidatedData({ state, commit, dispatch }) {
      const docPointers = await db
        .collection("UnvalidatedData")
        .orderBy("timestamp")
        .limit(5)
        .get();
      let entryMetadata = docPointers.docs.map(pointer => {
        if (pointer.exists) {
          const data = pointer.data();
          console.log("Have I validated this? ", !data.validators.includes(state.user.uid));
          if (!data.validators.includes(state.user.uid)) {
            return { name: data.name, path: data.path, id: pointer.id };
          }
        }
      });
      const hasRealValuedElements = entryMetadata.length && entryMetadata.every(val => !!val);
      console.log("hasrealvalues: ", hasRealValuedElements, entryMetadata);
      if (hasRealValuedElements) {
        console.log("entryMetadata:", entryMetadata);
        const unvalidatedData = await dispatch("fetchUnvalidatedFiles", entryMetadata);
        commit("setUnvalidatedData", unvalidatedData);
      } else {
        console.warn("no unvalidated file metadata found in database");
      }
    },
    async fetchUnvalidatedFiles({ state }, metadata) {
      return Promise.all(
        metadata.map(async data => {
          console.log(data);
          const url = await storage
            .ref()
            .child(data.path)
            .getDownloadURL();
          const fileBundle = await axios.get(url, { responseType: "blob" });
          return { file: fileBundle.data, id: data.id, name: data.name };
        })
      );
    },
    //TODO: return a promise
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
    signOut({ commit }) {
      setTimeout(() => {
        firebase.auth().signOut();
        commit("eraseSessionData");
        console.log("signed out");
      }, 100);
    },

    uploadFiles({ dispatch }, files) {
      return Promise.all(
        files.map(file => {
          return storage
            .ref()
            .child("UnvalidatedData")
            .child(file.contents.name)
            .put(file.contents)
            .then(res => {
              const { name } = file.contents;
              const { timestamp } = file.metadata;
              console.log(res.metadata);
              const { fullPath } = res.metadata;
              db.collection("UnvalidatedData").add({
                name,
                path: fullPath,
                timestamp,
                validators: [],
                validationScore: 0
              });
            })
            .catch(err => {
              console.error(err);
            });
        })
      ).catch(err => console.error(err));
    },

    uploadValidations({ state, commit }) {
      if (!state.validatedData.length) {
        commit("displayError", "You don't have any unvalidated data.");
        return;
      }
      return Promise.all([
        state.validatedData.map(async data => {
          let updateScore;
          if (data.isValid) {
            updateScore = firebase.firestore.FieldValue.increment(1);
          } else {
            updateScore = firebase.firestore.FieldValue.increment(-1);
          }
          //Update score
          await db
            .collection("UnvalidatedData")
            .doc(data.id)
            .update({ validationScore: updateScore });
          //Update list of people who have validated data
          const updateUserList = firebase.firestore.FieldValue.arrayUnion(state.user.uid);
          await db
            .collection("UnvalidatedData")
            .doc(data.id)
            .update({ validators: updateUserList });
        })
      ]);
    }
  }
});
