<template>
  <div>
    <div class="container" style="width:600px; margin: auto;">
      <button class="btn btn-secondary" @click="goBack">Back</button>
    </div>
    <br>
    <div class="card" style="width: 600px; margin: auto;">
      <div class="card-header">
        <label for="deck">Question for Deck:</label>
        <select class="pointer" v-model="newQuestion.deck" id="deck">

          <option v-for="deck in decks" :key="deck" :value="deck">{{ deck }}</option>
        </select>
      </div>
      <div class="card-body">
        <div>
          <input v-model="newQuestion.text" placeholder="Enter Question" style="width:500px;">
          <textarea v-model="newQuestion.answer" placeholder="Enter Answer" style="width:500px;"></textarea>
          <input v-model="newQuestion.hint" placeholder="Enter Hint" style="width:500px;" />
        </div>
      </div>
      <div class="card-footer">
        <button class="btn btn-primary" @click="addQuestion"
          :disabled="!newQuestion.text || !newQuestion.answer"
          @mouseover="handleMouseOver" @mouseleave="handleMouseLeave">Add Question</button>
        <div v-if="errorContent" class=errorContent> {{errorContent}} </div>
      </div>
    </div>
    <br>
    <div v-if="questions.length > 0">
      <div class="card" style="width:600px; margin: auto;">
        <div class="card-header">Created Questions</div>
        <div class="card-body">
          <ul class="list-group list-group-flush">
            <li class="list-group-item" v-for="(question, index) in questions" :key="index">
              <div class="row" style="padding:10px;">
                <div class="col-sm-10" style="text-align: left;">
                  <strong>Deck:</strong> {{ question.deck }} <br>
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
            </li>
          </ul>
        </div>
      </div>
      <div v-if="showCongratsModal" class="modal">
        <div class="modal-content">
          <span class="close" @click="closeModal">&times;</span>
          <img src="@/assets/buddy-icon.png" alt="Buddy Icon" class="congrats-logo" />
          <p>Congratulations! You've successfully created a new question.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errorContent: '',
      decks: [], // Initialize decks as an empty array
    newQuestion: {
      text: '',
      answer: '',
      hint: '',
      deck: '' // Initially, no default deck is selected
    },
    questions: [],
    showCongratsModal: false
  };
  },
  created() {
    this.loadDecks();
    this.loadQuestions();
  },
  methods: {
    goToMenu() {
      this.$router.push('/menu');
    },
    loadDecks() {
    const storedDecks = localStorage.getItem('decks');
    if (storedDecks) {
      this.decks = JSON.parse(storedDecks);
    }
    if (this.decks.length > 0) {
      this.newQuestion.deck = this.decks[0]; // Set the first deck as the default selected deck
    }
  },

    goBack() {
      this.$router.push('/menu');
    },
    addQuestion() {
  if (!this.newQuestion.deck) {
    alert("Please select a deck for the question.");
    return;
  }
  if (this.newQuestion.text && this.newQuestion.answer) {
    this.questions.push({ ...this.newQuestion });
    this.saveQuestions();
    this.newQuestion = { text: '', answer: '', hint: '',deck: this.newQuestion.deck }; // Reset with the first deck as default
    this.showCongratsModal = true;
  } else {
    alert("Please fill in question and answer fields before adding a question.");
  }
},
handleMouseOver() {
    if(!this.newQuestion.text || !this.newQuestion.answer){
      this.errorContent = "Question and answer fields are mandatory"
      console.log(this.errorContent)
    }
  },
  handleMouseLeave() {
    this.errorContent = ""
    console.log(this.errorContent)
  },

    closeModal() {
      this.showCongratsModal = false;
    },
    saveQuestions() {
      const parsed = JSON.stringify(this.questions);
      localStorage.setItem('questions', parsed);
    },
    loadQuestions() {
      if (localStorage.getItem('questions')) {
        try {
          this.questions = JSON.parse(localStorage.getItem('questions'));
        } catch (e) {
          localStorage.removeItem('questions');
        }
      }
    },
    removeQuestion(index) {
  if (confirm('Are you sure you want to delete this question?')) {
    this.questions.splice(index, 1);
    this.saveQuestions();
  }
}
  }
};
</script>
  
<style scoped>
.menu-image-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.menu-image-button img {
  width: 50px;
  height: auto;
}

/* div {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  width: 100%;
} */

input,
textarea {
  margin: 10px 0;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 50%;
}

ul {
  list-style: none;
  padding: 0;
  width: 100%;
}

li {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  padding: 10px;
  margin-top: 10px;
  border-radius: 4px;
}

h2 {
  text-align: center;
  margin: 20px 0;
}

.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 500px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.congrats-logo {
  display: block;
  margin: 0 auto;
  width: 100px;
  height: auto;
  padding-bottom: 20px;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.pointer {
  cursor: pointer;
}

.errorContent {
  padding: 20px;
  color: red;
}
</style>