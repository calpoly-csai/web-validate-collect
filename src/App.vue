<template>
  <div id="app">
    <div
      v-if="showMenu"
      @mouseenter="menuOpen = true"
      @mouseleave="menuOpen = false"
      :class="{open: menuOpen}"
      class="menu"
    >
      <router-link tag="div" to="/dashboard" class="option">
        <img src="./assets/logo.svg" alt="img">
        <h3 v-show="menuOpen" class="menu-desc">Home</h3>
      </router-link>
      <router-link tag="div" to="/record" class="option">
        <img src="./assets/record.svg" alt="img">
        <h3 class="menu-desc" v-show="menuOpen">Record</h3>
      </router-link>
      <router-link tag="div" to="/validate" class="option">
        <img src="./assets/check.svg" alt="img">
        <h3 class="menu-desc" v-show="menuOpen">Validate</h3>
      </router-link>
      <router-link tag="div" to="/uploads" class="option">
        <img src="./assets/upload.svg" alt="img">
        <h3 class="menu-desc" v-show="menuOpen">Upload</h3>
      </router-link>
      <router-link tag="div" to="/phrases" class="option">
        <img src="./assets/question.svg" alt="img">
        <h3 class="menu-desc" v-show="menuOpen">Phrases</h3>
      </router-link>
      <router-link tag="div" class="option sign-out" to="/">
        <img src="./assets/arrow-back.svg" alt>
        <h3 class="menu-desc" v-show="menuOpen">Leave</h3>
      </router-link>
    </div>
    <router-view></router-view>

    <transition name="show">
      <div class="banner" v-if="banner.isVisible" :style="{backgroundColor: bannerColor}">
        <h4>{{banner.message}}</h4>
        <img @click="closeBanner" class="banner-X" src="./assets/whiteX.svg" alt="x">
      </div>
    </transition>
  </div>
</template>


<script>
export default {
  data() {
    return {
      showMenu: false,
      menuOpen: false,
      currentLocation: "Auth"
    };
  },
  computed: {
    banner() {
      return this.$store.state.banner;
    },

    bannerColor() {
      if (this.banner.type === "error") {
        //Red Color
        return "#eb3333";
      } else {
        //Accent Color
        return "#4dbaed";
      }
    }
  },
  watch: {
    $route(to, from) {
      this.currentLocation = to;
      this.showMenu = this.currentLocation.name !== "Auth";
    }
  },
  methods: {
    closeBanner() {
      this.$store.commit("setBanner", { isVisible: false });
    },
    signOut() {
      this.$store.dispatch("signOut");
    }
  }
};
</script>


<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  font-size: 25px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  --light-text: #f1f1f1;
  --background: #f1f1f1;
  --neutral: #e3e3e3;
  --accent: #4dbaed;
  --base: #5c8abd;
  --dark: #504e4e;
  display: flex;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

h1,
h2,
h3,
h4,
h5 {
  margin: 0;
}

button {
  display: block;
  font-family: inherit;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;
  border: 2px solid var(--dark);
  padding: 10px;
  background-color: transparent;
  border-radius: 10px;
  transition: background-color 0.5s, border-radius 0.5s;
  cursor: pointer;
  background-color: inherit;
}

button:hover {
  background-color: rgba(255, 255, 255, 0.26);
  border-radius: 15px;
}

h1 {
  color: var(--dark);
}

/* Menu */
.menu {
  z-index: 100;
  position: absolute;
  top: 0;
  left: 0;
  width: 90px;
  height: 100%;
  background: var(--dark);
  padding: 0 10px;
  transition: width 0.7s;
  overflow: hidden;
}

.open {
  width: 220px;
}

.option {
  display: flex;
  align-items: center;
  text-align: center;
  cursor: pointer;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid transparent;
  transition: opacity 0.7s, border 0.7s;
}

.option img {
  height: 50px;
  width: 50px;
  padding: 0 10px;
}
.option:hover {
  border-bottom: 1px solid var(--accent);
  border-top: 1px solid var(--accent);
}

.menu-desc {
  padding-left: 20px;
  font-size: 1.5rem;
  text-align: left;
  color: var(--light-text);
}

.banner {
  padding: 10px;
  position: fixed;
  bottom: 0;
  left: 0;
  font-size: 20px;
  width: 100vw;
  height: 30px;
  background: var(--accent);
  text-align: center;
  box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.219);
}

input {
  border: none;
  font-size: 25px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  border-bottom: 2px solid var(--dark);
  color: var(--dark);
  background: transparent;
}

.show-enter,
.show-leave-to {
  transform: translateY(100px);
}

.show-enter-active,
.show-leave-active {
  transition: transform 0.7s;
}

.banner-X {
  position: absolute;
  right: 0;
  top: 50%;
  opacity: 0.7;
  cursor: pointer;
  transform: translate(-100%, -50%);
}

.diagonal-background {
  background: url("./assets/background.svg");
  background-size: cover;
  background-position: bottom;
}

/* REMOVE INCOMPLETE STYLING ELEMENTS WHEN READY FOR PRODUCTION */
.incomplete-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 75%;
  height: 50%;
  text-align: center;
}
.incomplete-box h1 {
  width: 50%;
  padding-top: 30px;
  margin: auto;
  font-size: 1.5em;
  font-weight: 100;
}
</style>
