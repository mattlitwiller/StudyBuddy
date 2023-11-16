<template>
  <div class="container">
    <button class="btn btn-secondary" @click="goBack">Back</button>
    <h1>My Progress</h1>

    <div class="progress-container">
      <div class="progress-bar">
        <div class="progress-item">Trainings Done ......................54</div>
        <div class="progress-item">Questions Answered...................202</div>
        <div class="progress-item">Good answer of first try.............78</div>
        <div class="progress-item">Questions created....................78</div>
        <div class="progress-item">Average Grade........................77%</div>
        <div class="progress-item">Time spent on training...............5h 25</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  padding-top: 50px;
}

h1 {
  margin-bottom: 20px;
}

.progress-container {
  display: flex;
  justify-content: center;
}

.progress-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 2px solid #ccc;
  border-bottom: 2px solid #ccc;
  padding: 20px 0;
}

.progress-item {
  position: relative;
  display: inline-block;
  margin: 0 20px;
  font-size: 20px;
  line-height: 1;
}

.progress-item:not(:last-child):after {
  content: '';
  position: absolute;
  top: 50%;
  right: -40px;
  transform: translateY(-50%);
  width: 20px;
  height: 2px;
  background: #ccc;
}

.progress-item:not(:last-child):after {
  display: none;
}

.progress-bar {
  padding: 20px 0;
}

.progress-item {
  margin: 0 40px;
}
</style>
