<template>
  <div>
    <button class="btn btn-secondary" style="margin-bottom: 20px;" @click="goBack">Back</button>
    <div class="card bg-primary text-white" style="width:400px; margin: auto;">
      <div class="card-header">My Progress</div>
      <div class="card-body">
        <ul class="list-group list-group-flush">
          <li class="list-group-item bg-transparent">Trainings Done ......................54</li>
          <li class="list-group-item bg-transparent">Questions Answered...................202</li>
          <li class="list-group-item bg-transparent">Good answer of first try.............78</li>
          <li class="list-group-item bg-transparent">Questions created....................78</li>
          <li class="list-group-item bg-transparent">Average Grade........................77%</li>
          <li class="list-group-item bg-transparent">Time spent on training...............5h25</li>
        </ul>
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
