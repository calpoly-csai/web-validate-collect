<template>
  <div class="page diagonal-background">
    <div class="loader white-border on-bottom" v-if="loadingData"></div>
    <h2
      class="validations-finished"
      v-if="!unvalidatedData.length"
    >Congratulations! You have validated all of the data in our server! Go out and collect more!</h2>
    <transition name="fade-in">
      <div class="validator" v-if="!loadingData && unvalidatedData.length">
        <div class="file-info">
          <button class="audio-button" @click="toggleAudio">
            <img :src="require(`@/assets/${audioSymbol}.svg`)" alt="toggle">
            <audio id="audioEl" ref="audio" @ended="handleAudioEnd" controls>
              <source :src="currentData.audioURL" type="audio/wav">
            </audio>
          </button>
          <ul class="file-fields">
            <li v-for="(value, key) in validationFields" :key="key">
              <span class="data-label">{{parseCamelCase(key)}}:</span>
              <span class="data-value">{{value}}</span>
            </li>
          </ul>
        </div>
        <img id="approve" src="../assets/like.svg" alt="approve" @click="validateData(true)">
        <img id="deny" src="../assets/dislike.svg" alt="deny" @click="validateData(false)">
        <button class="nav-button post-validations" @click="postValidations">Upload Validations</button>
      </div>
    </transition>
    <h3 class="validation-tally">{{numValidations}} Validations Queued</h3>
  </div>
</template>

<script>
import parser from "../mixins/parser.js";
export default {
  mixins: [parser],
  data() {
    return {
      audioSymbol: "play",
      loadingData: false,
      currentData: {}
    };
  },
  computed: {
    unvalidatedData() {
      return this.$store.state.unvalidatedData;
    },
    numValidations() {
      return this.$store.state.validatedData.length;
    },
    validationFields() {
      const fieldsToRemove = ["timestamp", "audioURL", "owner"];
      const validationFields = Object.assign({}, this.currentData);
      for (let prop of fieldsToRemove) {
        delete validationFields[prop];
      }
      return this.formatData(validationFields);
    }
  },
  methods: {
    setCurrentData(data) {
      const currentData = this.parseFileName(data.name);
      currentData.audioURL = URL.createObjectURL(this.unvalidatedData[0].file);
      this.currentData = currentData;
    },
    handleAudioEnd() {
      this.audioSymbol = "play";
    },
    postValidations() {
      //insert loader
      this.loadingData = true;
      this.$store
        .dispatch("uploadValidations")
        .then(res => {
          this.$store.commit("eraseValidatedData");
          this.loadingData = false;
          this.$store.commit("setBanner", {
            message: "validations posted",
            type: "success"
          });
        })
        .catch(err =>
          this.$store.commit("displayError", "Your post failed :(")
        );
    },
    validateData(isValid) {
      this.$store.commit("validateFirst", isValid);

      if (this.unvalidatedData.length) {
        this.setCurrentData(this.unvalidatedData[0]);
      } else {
        this.postValidations();
      }
    },
    toggleAudio() {
      const { audio } = this.$refs;
      if (audio.paused) {
        audio.play();
        this.audioSymbol = "pause";
      } else {
        audio.pause();
        this.audioSymbol = "play";
      }
    }
  },
  created() {
    this.loadingData = true;
    this.$store.dispatch("getUnvalidatedData").then(res => {
      if (this.unvalidatedData.length > 0) {
        console.log("unvalidated data:", this.unvalidatedData);
        this.setCurrentData(this.unvalidatedData[0]);
      } else {
        console.warn("couldn't find currentData");
      }
      this.loadingData = false;
    });
  }
};
</script>

<style>
.validator {
  display: grid;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 50%;

  grid-template-rows: 4fr 1fr 1fr;
  grid-template-columns: repeat(5, 1fr);
  grid-template-areas: "validation validation validation validation validation" "left approve center deny right" "left post post post right";
}
.file-info {
  background: #e3e3e3;
  height: auto;
  grid-area: validation;
  border-radius: 10px;
}

.audio-button {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: var(--accent);
  border: none;
  outline: none;
}

.audio-button img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#audioEl {
  display: none;
}
.file-fields {
  padding: 0 30px;
  padding-top: 100px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  list-style: none;
}
.file-fields li {
  display: flex;
  padding: 3px 0;
}

.data-label {
  display: block;
  width: 50%;
  text-align: right;
  word-wrap: none;
}

.data-value {
  width: 50%;
  padding: 0 10px;
  text-align: left;
  color: var(--base);
}

#approve,
#deny {
  margin: auto;
  padding: 20px;
  cursor: pointer;
}

#approve {
  grid-area: approve;
}

#deny {
  grid-area: deny;
}

.post-validations {
  grid-area: post;
  color: var(--light-text);
  font-size: 2rem;
  border-color: var(--light-text);
}

.validation-tally {
  position: absolute;
  bottom: 10px;
  right: 10px;
  text-align: right;
  color: var(--light-text);
}

.validations-finished {
  color: var(--base);
  width: 75%;
  margin: 20px auto;
}

.on-bottom {
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
}

.fade-in-enter,
.fade-in-leave-to {
  opacity: 0;
}

.fade-in-enter-active,
.fade-in-leave-active {
  transition: opacity;
}
</style>

