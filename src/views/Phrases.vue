<script>
export default {
  data: function() {
    return {
      categories: ["{Building}", "{Office Hours}", "{Professor}", "{Other}"],
      phrase: "",
      buttonDataHasBeenAnnotated: false
    }
  },
  computed: { // return cached values until dependencies change
    tokens: function () {
      return this.tokenize(this.phrase)
    },
    buttonData: function() {
      return this.setupButtonData(this.tokens);
    }
  },
  methods: {
    tokenize: function(inputStr) { /// given a string, output an array of words
      let arr = inputStr.split(/[ ?]/);
      // remove the last one if it's the empty string
      arr[arr.length - 1] == '' ? arr.pop() : null;
      return arr;
    },
    setupButtonData: function(givenToks) { /// given tokens, setup button data obj for each token
      return givenToks.map((x) => x={token:x, isSelected:false});
    },
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
        if (done && tokenObj.isSelected) { // if already found a contiguous block
          let msg = "Please select a contiguous section of tokens";
          console.log(msg);
          alert(msg);
          console.log("done && tokenObj.isSelected....", "start", start, "end",end);
          return;
        } else if (tokenObj.isSelected) {
          start = (start != null) ? start : i; // set the start index
          end = i; // set the end index
          console.log("tokenObj.isSelected....", "start", start, "end",end);
        } else if (start && !done) {
          done = true;
          console.log("start && !done....", "start", start, "end",end);
        }
      }
      return {start, end};
    },
    annotateButtonData: function(cat) { /// given category, annotate selected button data
      let result = this.findStartEndOfSelection();
      let start = result.start;
      let end = result.end;
      if (start != null) {
        let numToSlice = end - start + 1;
        let replacement = {token: cat, isSelected: false};
        // slice and replace with category
        this.buttonData.splice(start, numToSlice, replacement);
        this.buttonDataHasBeenAnnotated = true;
        this.$forceUpdate();
      }
    }
  }
};
</script>


<template>
  <!-- TODO: change background -->
  <div class="page diagonal-background">
    <h1 class="page-title">Phrases</h1>

    <div class="phrase-input-category-box is-centered">
      <br>
      <div class="phrase-input-box">
        <br>
        <strong>Input Example:</strong>
        <br><br>
        <div>
          <img class="start-quote-img" align="left" src="../assets/start-quote.svg" alt="start-quote.svg">
        </div>
        <input
          type="text"
          placeholder="Phrase Example"
          class="phrase-input"
          v-model="phrase"
        >
        <br>
        <div>
          <img class="end-quote-img" align="right" src="../assets/end-quote.svg" alt="end-quote.svg">
        </div>
        <br>
        <br>
        <br>
      </div>

      <div v-if="this.phrase != ''" class="phrase-input-box">
        <br>
        <div><strong>Query:</strong></div>
        <div>
          <button v-for="(tokenObj, index) in this.buttonData"
                  v-bind:key="index"
                  v-bind:class="{ 'data-button':true,
                                  'round-outlined-button':true,
                                  'selected': tokenObj.isSelected
                  }"
                  v-on:click="toggleIsSelected(tokenObj)">
            {{ buttonData[index].token }}
          </button>
        </div>
      </div>

      <div v-if="this.buttonDataHasSelection()"
           class="phrase-category-box">
        <button v-for="(cat, index) in categories"
                v-bind:key="index"
                v-on:click="annotateButtonData(cat)"
                class="phrase-category-button">
          {{ cat }}
        </button>
      </div>

      <div v-if="this.buttonDataHasBeenAnnotated"
          style="margin-top:1em">
        <button class="round-outlined-button">
          Upload
        </button>
      </div>

    </div>
  </div>
</template>

<style>

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
  border-color: #2196F3;
  color: dodgerblue
}

.data-button {
  border-color: #2196F3;
  color: dodgerblue
}

.data-button:hover {
  background: #2196F3;
  color: white;
}

.data-button.selected {
  background: #2196F3;
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

  background-image:
    linear-gradient(135deg, green 50%, transparent 50%),
    linear-gradient(45deg, transparent 50%, green 50%),
    linear-gradient(to right, #ccc, #ccc);
  background-position:
    calc(100% - 15px) 1em,
    calc(100% - 20px) 1em,
    calc(100% - 2.5em) 0.5em;
  background-size:
    5px 5px,
    5px 5px,
    1px 1.5em;
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
  background-color: rgb(236,236,236);
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

