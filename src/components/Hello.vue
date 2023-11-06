<!-- src/components/Home.vue -->
<template>
  <div class="container">
    <img src="@/assets/buddy-approval.png" alt="StudyBuddy Logo" class="logo"/>
    <h1>Welcome To StudyBuddy</h1>
    <router-link to="/menu"> <!-- Update this line -->
      <button class="continue-button">Continue</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style>
.container {
  text-align: center;
  margin-top: 100px;
}

.logo {
  width: 100px; /* or whatever size fits your design */
  margin-bottom: 20px;
}

h1 {
  margin-bottom: 20px;
}

.continue-button {
  padding: 10px 20px;
  background-color: #4CAF50;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.continue-button:hover {
  background-color: #45a049;
}
</style>