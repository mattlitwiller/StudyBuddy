<template>
  <div>
    <button class="back-button" @click="goBack">Back</button>
    <h2>Select a Deck</h2>
    <ul class="decks-list">
      <li v-for="deck in decks" :key="deck" @click="selectDeck(deck)">
        {{ deck }}
      </li>
    </ul>
    
    <div v-if="selectedDeck">
      <h3>Questions for {{ selectedDeck }}</h3>
      <!-- Quiz Button -->
      <button class="quiz-button" @click="startQuiz">Quiz</button>

      <!-- Quiz Component -->
      <quiz-page v-if="showQuiz" :selected-deck="selectedDeck"></quiz-page>
      <ul class="questions-list" v-if="!showQuiz">
        <li v-for="(question, index) in filteredQuestions" :key="index">
          <div class="question-title"><strong>Q:</strong> {{ question.text }}</div>
          <div><strong>A:</strong> {{ question.answer }}</div>
          <div><strong>Hint:</strong> {{ question.hint }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import QuizPage from './QuizPage.vue'; // Make sure the path is correct
export default {
  components: {
    QuizPage // Register the QuizComponent
  },
  data() {
    return {
      decks: ['COMP551', 'COMP421'],
      selectedDeck: null,
      questions: [],
      showQuiz: false,
    };
  },
  created() {
    this.loadQuestions();
  },
  computed: {
    filteredQuestions() {
      return this.questions.filter(q => q.deck === this.selectedDeck);
    }
  },
  methods: {
    loadQuestions() {
      const storedQuestions = localStorage.getItem('questions');
      if (storedQuestions) {
        this.questions = JSON.parse(storedQuestions);
      }
    },
    selectDeck(deck) {
      this.selectedDeck = deck;
    },
    goBack() {
      this.$router.go(-1);
    },
    startQuiz() {
      this.$router.push({ name: 'QuizPage', params: { deck: this.selectedDeck } });
    }
  }
};
</script>
<style scoped>
.quiz-button {
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
}

.quiz-button:hover {
  background-color: #45a049;
}
.decks-list {
  list-style-type: none;
  padding: 0;
}

.decks-list li {
  cursor: pointer;
  background-color: #f0f0f0;
  margin: 5px 0;
  padding: 10px;
  border-radius: 4px;
  transition: background-color 0.2s ease-in-out;
}

.decks-list li:hover {
  background-color: #e0e0e0;
}

.questions-list {
  list-style-type: none;
  padding: 0;
}

.questions-list li {
  background-color: #fff;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 4px;
}

.question-title {
  font-weight: bold;
}

.back-button {
  padding: 10px 20px;
  background-color: #17de5d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  margin-bottom: 20px;
}

.back-button:hover {
  background-color: #14df22;
}
</style>