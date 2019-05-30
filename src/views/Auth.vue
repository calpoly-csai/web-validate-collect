<template>
  <div class="auth">
    <div class="auth-box">
      <transition-group tag="div" name="fade-drop" mode="out-in">
        <h1 key="appName">Data Manager</h1>
        <h2 key="subtitle">{{title}}</h2>
        <form @submit.prevent key="form">
          <transition-group tag="div" name="fade-drop" mode="out-in">
            <input
              v-if="signupOpen"
              type="text"
              placeholder="Name"
              class="auth-input"
              key="signUpField"
              v-model="name"
            >
            <input
              type="email"
              placeholder="Email"
              class="auth-input"
              key="email"
              v-model.lazy="email"
            >

            <input
              type="password"
              placeholder="Password"
              class="auth-input"
              key="password"
              v-model.lazy="password"
            >

            <input
              v-if="signupOpen"
              type="password"
              placeholder="Confirm Password"
              class="auth-input"
              key="confirmPassword"
              v-model.lazy="confirmPassword"
            >

            <button v-if="!signupOpen" key="login" class="auth-button" @click="logIn">Go</button>
            <button v-if="signupOpen" key="addUser" class="auth-button" @click="signUp">Send</button>

            <button
              @click="signupOpen = !signupOpen"
              class="auth-button"
              key="signUpButton"
              v-if="!signupOpen"
            >Sign Up</button>

            <button
              v-if="signupOpen"
              @click="signupOpen = !signupOpen"
              class="auth-button"
              key="backToLogin"
            >Back</button>
          </transition-group>
        </form>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      signupOpen: false,
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  },
  computed: {
    title() {
      return this.signupOpen ? "Become a Member" : "Log In";
    }
  },
  methods: {
    sendForm() {
      if (this.signupOpen) {
        this.signUp();
      } else {
        this.logIn();
      }
    },

    logIn() {
      this.$store.dispatch("logIn", {
        email: this.email,
        password: this.password
      });
    },
    signUp() {
      const dataFilled =
        this.name && this.email && this.password && this.confirmPassword;
      const passwordsMatch = this.password === this.confirmPassword;
      const inputValid = dataFilled && passwordsMatch;

      if (inputValid) {
        this.$store.dispatch("signUp", {
          email: this.email,
          password: this.password
        });
      } else {
        let errorPackage = { type: "error", isVisible: true };
        if (!dataFilled) {
          errorPackage.message = "Fill out all of the fields";
        } else if (!passwordsMatch) {
          errorPackage.message = "Passwords don't match";
        }
        this.$store.commit("setBanner", errorPackage);
      }
    }
  }
};
</script>

<style>
.auth {
  width: 100%;
  height: 100vh;
  background-color: var(--background);
}

.auth-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  margin: auto;
}
.auth-input {
  display: block;
  padding: 20px;
  margin: auto;
}

.auth-button {
  margin: 20px auto;
}

.fade-drop-enter,
.fade-drop-leave-to {
  transform: scale(0);
  opacity: 0;
}

.fade-drop-enter-active,
.fade-drop-leave-active {
  transition: opacity 0.7s, transform 0.7s;
}

.fade-drop-leave-active {
  position: absolute;
}

.fade-drop-move {
  transition: transform 0.7s;
}
</style>

