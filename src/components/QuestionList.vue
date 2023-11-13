<template>
    <div>
      <h2>Questions List</h2>
      <ul>
        <li v-for="(question, index) in questions" :key="index">
          <strong>Deck:</strong> {{ question.deck }} <br/>
          <strong>Q:</strong> {{ question.text }} <br/>
          <strong>A:</strong> {{ question.answer }} <br/>
          <strong>Hint:</strong> {{ question.hint }}
          <!-- Add more details or actions as needed -->
        </li>
      </ul>
    </div>
  </template>

<script>
export default {
  props: {
    questions: Array
  },
  // Any additional methods or data properties if needed
};
</script>