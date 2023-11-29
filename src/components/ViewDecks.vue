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
        <button class="btn btn-primary" @click="openCreateDeckDialog">Create Deck</button>
      </div>
    </div>
    <br>
    <div v-if="selectedDeck">
      <div v-if="quizError" class="alert alert-danger">
      {{ quizError }}
    </div>
      <div v-if="!showQuiz" class="card" style="width: 600px; margin:auto;">
        <div class="card-header"> Questions for {{ selectedDeck }}</div>
        <div class="card-body">
          <div class="list-group list-group-flush">
            <div v-if="filteredQuestions.length <= 0">No questions for this deck yet, go make some!</div>
            <button class="btn btn-success" @click="navigateToCreateQuestions">Create Questions</button>
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
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <button class="btn btn-primary" v-if="filteredQuestions.length > 0" @click="startQuiz">Start Quiz</button>
          <button class="btn btn-danger" @click="deleteDeck(selectedDeck)">Delete Deck</button>
        </div>
      </div>
    </div>
    <dialog id="createDeckDialog" class="dialog-custom">
      <form method="dialog" class="dialog-form">
        <div class="dialog-header">
          <h5 class="dialog-title">Create New Deck</h5>
          <button type="button" class="btn-close" @click="closeCreateDeckDialog">
           <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="dialog-body">
          <label for="newDeckName" class="form-label">Name:</label>
          <input type="text" id="newDeckName" class="form-control" v-model="newDeckName" required>
        </div>
        <div class="dialog-footer">
          <button type="submit" class="btn btn-primary" @click="createNewDeck">Create</button>
        </div>
      </form>
    </dialog>
  </div>
</template>

<script>
import QuizPage from './QuizPage.vue'; // Make sure the path is correct
export default {
  components: {
    QuizPage // Register the QuizComponent
  },
  props: {
  questions: Array, // Receiving the questions passed from the router
  deck: String
},
data() {
    return {
      decks: [], // Initialize as empty
      selectedDeck: null,
      questions: [],
      showQuiz: false,
      newDeckName: '',
      quizError: '' // Add this to handle error messages
    };
  },
  deleteDeck(deckToDelete) {
  if (confirm(`Are you sure you want to delete the deck "${deckToDelete}" and all its questions?`)) {
    // Remove the deck from the decks array
    this.decks = this.decks.filter(deck => deck !== deckToDelete);

    // Remove associated questions from the questions array
    this.questions = this.questions.filter(question => question.deck !== deckToDelete);

    // Update localStorage
    localStorage.setItem('decks', JSON.stringify(this.decks));
    localStorage.setItem('questions', JSON.stringify(this.questions));

    // Reset selectedDeck if it was the one deleted
    if (this.selectedDeck === deckToDelete) {
      this.selectedDeck = null;
    }
  }
},
  created() {
    this.loadDecks();
    this.loadQuestions();
  },
  computed: {
    filteredQuestions() {
      return this.questions.filter(q => q.deck === this.selectedDeck);
    }
  },
  methods: {
  removeQuestion(index) {
      if (confirm('Are you sure you want to delete this question?')) {
        this.questions.splice(index, 1);
        const updatedQuestions = this.questions.filter((_, i) => i !== index);
        localStorage.setItem('questions', JSON.stringify(updatedQuestions));
        if (!this.filteredQuestions.length) {
          this.selectedDeck = null;
        }
      }
    },
    navigateToCreateQuestions() {
      this.$router.push({ name: 'createquestions' }); // Adjust as per your routing setup
    },
    loadQuestions() {
      const storedQuestions = localStorage.getItem('questions');
      if (storedQuestions) {
        this.questions = JSON.parse(storedQuestions);
      }
    },
    loadDecks() {
    const storedDecks = localStorage.getItem('decks');
    if (storedDecks) {
      this.decks = JSON.parse(storedDecks);
    } else {
      this.decks = ['COMP551', 'COMP421']; // Default decks if none are stored
    }
  },
  deleteDeck(deckToDelete) {
    if (confirm('Are you sure you want to delete this deck and all its questions?')) {
      // Remove the deck from the decks array
      this.decks = this.decks.filter(deck => deck !== deckToDelete);

      // Remove associated questions from the questions array
      this.questions = this.questions.filter(question => question.deck !== deckToDelete);

      // Update localStorage
      localStorage.setItem('decks', JSON.stringify(this.decks));
      localStorage.setItem('questions', JSON.stringify(this.questions));

      // Reset selectedDeck if it was the one deleted
      if (this.selectedDeck === deckToDelete) {
        this.selectedDeck = null;
      }
    }
  },
    openCreateDeckDialog() {
      const dialog = document.getElementById('createDeckDialog');
      if (dialog.showModal) {
        dialog.showModal();
      } else {
        alert("The <dialog> API is not supported by this browser");
      }
    },
    createNewDeck() {
    if (this.newDeckName) {
      this.decks.push(this.newDeckName);
      localStorage.setItem('decks', JSON.stringify(this.decks)); // Save updated decks list
      this.newDeckName = ''; // Reset the input after adding the deck
      document.getElementById('createDeckDialog').close();
    }
  },

    selectDeck(deck) {
      this.selectedDeck = deck;
    },
    closeCreateDeckDialog() {
      document.getElementById('createDeckDialog').close();
    },
    goBack() {
      this.$router.go(-1);
    },
    startQuiz() {
    if (this.filteredQuestions.length === 0) {
      // No questions for the selected deck
      this.quizError = `No questions available for the deck "${this.selectedDeck}". Please create questions for this deck.`;
    } else {
      // Questions available, proceed with starting the quiz
      this.quizError = ''; // Clear any previous error message
      this.$router.push({
        name: 'QuizPage',
        params: {
          deck: this.selectedDeck,
          questions: this.filteredQuestions // Only the questions for the selected deck
        }
      });
    }
  },

  }
};
</script>

<style scoped>
.dialog-custom {
  border-radius: .3rem;
  padding: 1rem;
  width: auto;
  max-width: 500px; /* Adjust as needed */
  border: 1px solid #dee2e6;
  box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .15);
  margin: 10vh auto; /* Centered Vertically */
}

.dialog-form {
  display: flex;
  flex-direction: column;
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
}

.dialog-title {
  margin-top: 0;
  margin-bottom: 0;
}

.dialog-body {
  margin-bottom: 1rem;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: .5rem;
}
</style>

