<!-- src/components/Menu.vue -->
<template>
    <div class="menu-container">
      <h1>What Would you Like to do?</h1>
      <router-link to="/create-questions" class="menu-button">Create Questions</router-link>
      <router-link to="/view-progress" class="menu-button">View Progress</router-link>
      <router-link to="/view-schedule" class="menu-button">View Schedule</router-link>
      <router-link to="/view-decks" class="menu-button">View Decks</router-link>
      <img src="@/assets/buddy-standing.png" alt="Buddy Icon" class="buddy-icon"/>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Menu',
  };
  </script>
  
  <style scoped>
  .menu-container {
    text-align: center;
    margin-top: 50px; 
  }
  
  .menu-button {
    display: block;
    margin: 10px auto; 
    padding: 15px 30px;
    background-color: #4CAF50;
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 16px;
    text-decoration: none; 
    cursor: pointer;
    width: 200px; 
  }
  
  .menu-button:hover {
    background-color: #45a049;
  }
  
  h1 {
    margin-bottom: 30px; 
  }
  
  .buddy-icon {
    width: 100px; 
    margin-top: 20px; 
  }
  </style>