<template>
  <div>
    <div class="container" style="width: 600px; margin: auto;">
      <button class="btn btn-secondary" @click="goBack" style="margin-bottom: 20px;">Back</button>
    </div>
    <div class="card" style="width: 600px; margin: auto;">
      <div class="card-header">My Decks</div>
      <div class="card-body">
        <div v-if="decks.length <= 0"> You have no decks yet, create one now!</div>
        <div class="list-group list-group-flush">
          <div v-for="deck in decks" :key="deck" class="list-group-item">
            <button class="btn btn-light" @click="selectDeck(deck)" style="width: 500px; margin: auto;">{{ deck }}</button>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <button class="btn btn-primary">Create Deck</button>
      </div>
    </div>
    <br>
    <div v-if="selectedDeck">
      <div v-if="!showQuiz" class="card" style="width: 600px; margin:auto;">
        <div class="card-header"> Questions for {{ selectedDeck }}</div>
        <div class="card-body">
          <div class="list-group list-group-flush">
            <div v-if="filteredQuestions.length <= 0">No questions for this deck yet, go make some!</div>
            <div v-for="(question, index) in filteredQuestions" :key="index">
              <div class="row" style="padding:10px;">
                <div class="col-sm-10" style="text-align: left;">
                  <strong>Question:</strong>
                  <div>{{ question.text }}</div>
                  <strong>Answer:</strong>
                  <div> {{ question.answer }}</div>
                  <strong>Hint:</strong>
                  <div> {{ question.hint }}</div>
                </div>
                <div class="col-sm-2" style="display: grid; align-content: center;">
                  <button class="btn btn-outline-danger float-end" @click="removeQuestion(index)">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <button class="btn btn-primary" @click="startQuiz">Start Quiz</button>
          <button class="btn btn-danger"> Delete Deck</button>
        </div>
      </div>
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
