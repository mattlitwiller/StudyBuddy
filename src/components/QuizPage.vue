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
    <div v-if="feedbackModalVisible" class="modal">
    <div class="modal-content">
      <img src="@/assets/buddy-approval.png" alt="Approval Buddy" class="modal-logo"/>
      <h2>Answer</h2>
      <p>{{ questions[currentQuestionIndex].answer }}</p>
      <h3>How correct was your answer?</h3>
      <button @click="handleFeedback('wrong')">Wrong</button>
      <button @click="handleFeedback('meh')">Meh</button>
      <button @click="handleFeedback('perfect')">Perfect!</button>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedDeck: String,
    questions: Array, // Make sure this is passed from the parent component
  },
  watch: {
    selectedDeck(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.initializeQuestions();
      }
    }
  },

  data() {
    return {
      answerRevealed: [],
      currentScore: 0,
      currentQuestionIndex: 0,
      feedbackModalVisible: false,
    };
  },
  created() {
    this.initializeQuestions();
  },
  methods: {
    selectDeck(deck) {
      this.selectedDeck = deck;
      this.loadQuestions(); // Call loadQuestions after setting selectedDeck
    },
    initializeQuestions() {
      // Use a local copy of questions based on the prop
      this.localQuestions = this.questions.filter(question => question.deck === this.selectedDeck);
      this.answerRevealed = this.localQuestions.map(() => false);
    },
    loadQuestions() {
    try {
      const allQuestions = localStorage.getItem('questions');
      if (allQuestions) {
        // Convert the string back into an array
        const parsedQuestions = JSON.parse(allQuestions);
        // Filter the questions to only include those for the selected deck
        this.questions = parsedQuestions.filter(question => question.deck === this.selectedDeck);
        // Initialize the answerRevealed array based on the filtered questions
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
    handleFeedback(response) {
      if (response === 'perfect') {
        this.currentScore += 1; // Add 1 point for 'perfect'
      } else if (response === 'meh') {
        this.currentScore += 0.5; // Add 0.5 points for 'meh'
      }
      // No points are added for 'wrong', so no need for an else if or else statement
      this.feedbackModalVisible = false; // Hide the feedback modal after handling feedback
    },
    revealAnswer() {
      this.$set(this.answerRevealed, this.currentQuestionIndex, true);
      // Trigger the feedback modal to show
      this.feedbackModalVisible = true;
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
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.modal-logo {
  display: block;
  margin: 0 auto;
  max-width: 100px; /* Or the size you want */
  height: auto;
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