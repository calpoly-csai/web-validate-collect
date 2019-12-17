<script>
export default {
  data: function() {
    return {
      categories: ["{Building}", "{Office Hours}", "{Professor}", "{Other}"],
      phrase: "",
      buttonDataHasBeenAnnotated: false
    };
  },
  computed: {
    // return cached values until dependencies change
    tokens: function() {
      // given a string, output an array of words
      let arr = this.phrase.split(/[ ?]/); // need to use regex to get rid of the question mark
      return arr;
    },
    buttonData: function() {
      /// given tokens, setup button data obj for each
      let tokens = this.tokens.filter(token => token != ""); // filters out spacess
      return tokens.map(token => ({
        token,
        category: null,
        isSelected: false
      }));
    }
  },
  methods: {
    toggleIsSelected: function(tokenObj) {
      tokenObj.isSelected = !tokenObj.isSelected;
      this.$forceUpdate();
    },
    buttonDataHasSelection: function() {
      return this.findStartEndOfSelection().start != null ? true : false;
    },
    findStartEndOfSelection: function() {
      let start = null;
      let end = null;
      let done = false;
      for (let i = 0; i < this.buttonData.length; i++) {
        const tokenObj = this.buttonData[i];
        if (done && tokenObj.isSelected) {
          // if already found a contiguous block
          let msg = "Please select a contiguous section of tokens";
          console.log(msg);
          // deselect it; need to deselect so this.buttonDataHasSelection() call does not loop infinitely
          tokenObj.isSelected = false;
          // need to update view so user knows the deselection occurred
          this.$forceUpdate();
          // tell the user that contiguous selections are required
          alert(msg);
          return;
        } else if (tokenObj.isSelected) {
          start = start != null ? start : i; // set the start index
          end = i; // set the end index
        } else if (start && !done) {
          done = true;
        }
      }
      return { start, end };
    },
    annotateButtonData: function(cat) {
      /// given category, annotate selected button data
      let result = this.findStartEndOfSelection();
      let start = result.start;
      let end = result.end;
      if (start != null) {
        let numToSlice = end - start + 1;
        let replacement = { token: cat, isSelected: false };
        // slice and replace with category
        this.buttonData.splice(start, numToSlice, replacement);
        this.buttonDataHasBeenAnnotated = true;
        this.$forceUpdate();
      }
    },
    forceReRender() {
      this.phrase += "a";
      this.phrase = this.phrase.slice(0, -1);
    }
  }
};
</script>


<template>
  <!-- TODO: change background -->
  <div class="page diagonal-background">
    <h1 class="page-title padding-small">Phrases</h1>

    <div class="phrase-input-category-box is-centered padding-small">
      <div class="phrase-input-box padding-small">
        <p class="padding-large">
          <b>Input Example:</b>
        </p>
        <div>
          <img
            class="start-quote-img"
            align="left"
            src="../assets/start-quote.svg"
            alt="start-quote.svg"
          />
        </div>
        <input type="text" placeholder="Phrase Example" class="phrase-input" v-model="phrase" />
        <div class="padding-large">
          <img
            class="end-quote-img"
            align="right"
            src="../assets/end-quote.svg"
            alt="end-quote.svg"
          />
        </div>
      </div>

      <div v-if="this.phrase != ''" class="phrase-input-box">
        <div>
          <strong>Query:</strong>
        </div>
        <div>
          <button
            class="data-button round-outlined-button"
            v-for="(tokenObj, index) in buttonData"
            v-bind:key="index"
            v-bind:class="{ 'selected': tokenObj.isSelected}"
            @click="toggleIsSelected(tokenObj)"
          >{{ buttonData[index].token }}</button>
        </div>
      </div>

      <div v-if="this.buttonDataHasSelection()" class="phrase-category-box">
        <button
          v-for="(cat, index) in categories"
          v-bind:key="index"
          @click="annotateButtonData(cat)"
          class="phrase-category-button"
        >{{ cat }}</button>
      </div>

      <div v-if="this.buttonDataHasBeenAnnotated" style="margin-top:1em">
        <button class="round-outlined-button">Upload</button>
        <button class="round-outlined-button" @click="forceReRender()">Reset Phrase</button>
      </div>
    </div>
  </div>
</template>

<style>
.padding-small {
  padding-bottom: 35px;
}

.padding-large {
  padding-bottom: 50px;
}

.round-outlined-button {
  border: 2px solid black;
  background-color: white;
  color: black;
  padding: 14px 28px;
  margin: 0.5em;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
}

.round-outlined-button:hover {
  border-color: #2196f3;
  color: dodgerblue;
}

.data-button {
  border-color: #2196f3;
  color: dodgerblue;
}

.data-button:hover {
  background: #2196f3;
  color: white;
}

.data-button.selected {
  background: #2196f3;
  color: white;
}

select {
  /* styling */
  background-color: white;
  border: thin solid blue;
  border-radius: 4px;
  display: inline-block;
  font: inherit;
  line-height: 1.5em;
  padding: 0.5em 3.5em 0.5em 1em;

  /* reset */

  margin: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;

  background-image: linear-gradient(135deg, green 50%, transparent 50%),
    linear-gradient(45deg, transparent 50%, green 50%),
    linear-gradient(to right, #ccc, #ccc);
  background-position: calc(100% - 15px) 1em, calc(100% - 20px) 1em,
    calc(100% - 2.5em) 0.5em;
  background-size: 5px 5px, 5px 5px, 1px 1.5em;
  background-repeat: no-repeat;
  border-color: green;
  outline: 0;
}

select:-moz-focusring {
  color: transparent;
  text-shadow: 0 0 0 #000;
}

.phrase-category-button {
  margin: auto;
  font-size: 100%;
  padding: 1em;
  border-radius: 10px;
  transition: background-color 0.5s, border-radius 0.5s;
  color: rgb(101, 138, 185);
  font-weight: 500; /* 400 is normal */
}

.phrase-category-button:hover {
  background-color: rgba(255, 255, 255, 0.26);
  border-radius: 15px;
}

.page-title {
  text-align: center;
  grid-area: header;
  margin-top: 30px;
}

.phrase-input-category-box {
  /* background-color: black; */
  text-align: center;
}

.phrase-input-box {
  background-color: rgb(236, 236, 236);
}

.phrase-input {
  width: 90%;
  text-align: center;
}

.phrase-category-box {
  background-color: rgb(226, 225, 225);
}

.phrase-category-button {
}

.is-centered {
  margin: auto;
  width: 50%;
  padding: 10px;
}
</style>

