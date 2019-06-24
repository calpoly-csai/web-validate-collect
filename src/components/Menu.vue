<template>
  <div class="sidebar">
    <div class="option">
      <div>
        <img src="../assets/logo.svg" alt="home">
      </div>
      <h3 class="menu-desc">Home</h3>
    </div>
    <div class="option">
      <img src="../assets/record.svg" alt="home">
      <h3 class="menu-desc">Record</h3>
    </div>
    <div class="option">
      <img src="../assets/check.svg" alt="home">
      <h3 class="menu-desc">Validate</h3>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.sidebar {
  position: absolute;
  top: 0;
  left: 0;
  width: 500px;
  height: 100vh;
  background: var(--dark);
  text-align: center;
  padding: 10px;
}

.option {
  display: flex;
  align-items: center;
  width: 100%;
  text-align: center;
  cursor: pointer;
  margin: 5px 0;
}

.option img {
  height: 50px;
  margin: auto;
}

.menu-desc {
  width: 50%;
  font-size: 1.5rem;
  text-align: center;
  color: var(--light-text);
}
</style>
