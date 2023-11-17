<template>
  <div>
    <div class="container" style="width:600px; margin: auto;">
      <button class="btn btn-secondary" style="margin-bottom: 20px;" @click="goBack">Back</button>
    </div>
    <div class="card" style="width:600px; margin: auto;">
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

