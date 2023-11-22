<template>
  <div class="quiz-container">
    <div v-if="questions.length === 0" class="no-questions">
      There are no questions to quiz.
      <button class="create-questions-button" @click="redirectToCreateQuestions">
        Create Questions
      </button>
    </div>
    <div v-else>
      <div class="score-section">
        SCORE ----------------- {{ currentScore }}/{{ questions.length }}
      </div>
      <div class="question-section">
        <h1>Question {{ currentQuestionIndex + 1 }}</h1>
        <p>{{ questions[currentQuestionIndex].text }}</p>
        <button class="reveal-button" @click="revealAnswer" v-if="!answerRevealed[currentQuestionIndex]">Reveal</button>
        <div v-if="answerRevealed[currentQuestionIndex]" class="answer-section">
          {{ questions[currentQuestionIndex].answer }}
        </div>
      </div>
      <button class="back-button" @click="goBack">Back to Previous Page</button>
      <button v-if="currentQuestionIndex < questions.length - 1" @click="nextQuestion">Next</button>
    </div>
  </div>
</template>
  
<script>
export default {
  props: {
    selectedDeck: String,
  },
  data() {
    return {
      questions: [],
      answerRevealed: [],
      currentScore: 0,
      currentQuestionIndex: 0
    };
  },
  created() {
    this.loadQuestions();
  },
  methods: {
    loadQuestions() {
      try {
        const questions = localStorage.getItem('questions');
        if (questions) {
          this.questions = JSON.parse(questions);
          this.answerRevealed = this.questions.map(() => false);
        } else {
          console.error("No questions found in localStorage.");
        }
      } catch (e) {
        console.error("Error parsing questions from localStorage: ", e.message);
      }
    },
    redirectToCreateQuestions() {
      this.$router.push('/create-questions'); // Update this path as per your route configuration
    },

    revealAnswer() {
      this.$set(this.answerRevealed, this.currentQuestionIndex, true);
      this.currentScore++;
    },
    nextQuestion() {
  if (this.currentQuestionIndex < this.questions.length - 1) {
    this.currentQuestionIndex++;
    this.$set(this.answerRevealed, this.currentQuestionIndex, false); // Reset reveal state for the next question
    }
  },
    goBack() {
      window.history.back();
    }
  }
};
</script>


<style scoped>
.quiz-container {
  text-align: center;
}

.score-section {
  font-size: 18px;
  margin-bottom: 20px;
}

.question-section h1 {
  font-size: 24px;
}

.reveal-button {
  padding: 10px 15px;
  background-color: #d3d3d3; /* Light gray */
  border: none;
  border-radius: 20px;
  cursor: pointer;
  margin-top: 20px;
}

.reveal-button:hover {
  background-color: #c0c0c0; /* Slightly darker gray */
}

.answer-section {
  margin-top: 20px;
  background-color: #f8f8f8;
  padding: 10px;
  border-radius: 5px;
}

.helper-section {
  /* Your styles for the helper character and question mark */
}
.no-questions {
    margin-top: 20px;
    font-size: 18px;
    color: #333;
  }

/* Modal Styles */
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.back-button {
    padding: 10px 15px;
    background-color: #f0f0f0; /* Lighter gray for differentiation */
    border: 1px solid #d3d3d3; /* Slightly darker border */
    border-radius: 20px;
    cursor: pointer;
    margin-top: 20px;
    margin-right: 10px; /* Spacing between this and other buttons */
  }

  .back-button:hover {
    background-color: #e0e0e0; /* Slightly darker on hover */
  }

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  text-align: center;
}

.modal-content button {
  padding: 10px 20px;
  margin: 0 10px;
}
</style>