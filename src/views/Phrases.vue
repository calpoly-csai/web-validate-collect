<template>
  <!-- TODO: change background -->
  <div class="page diagonal-background">
    <h1 class="page-title">Validate</h1>
    <div class="dropdown-menu">
      <select>
        <option value="cat1">Cat1</option>
        <option value="cat2">Cat2</option>
        <option value="cat3">Cat3</option>
        <option value="cat4">Cat4</option>
      </select>
    </div>
    <div class="phrase-input-category-box is-centered">
      <div class="phrase-category-box">
        <button class="phrase-category-button">cat1</button>
        <button class="phrase-category-button">cat2</button>
        <button class="phrase-category-button">cat3</button>
        <button class="phrase-category-button">cat4</button>
      </div>
      <div class="phrase-input-box">
        <img src="../assets/start-quote.svg" alt="start-quote.svg">
        <input
          type="text"
          placeholder="Phrase"
          class="phrase-input"
        >
        <img src="../assets/end-quote.svg" alt="end-quote.svg">
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>

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

