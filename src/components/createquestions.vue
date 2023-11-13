<template>
  <div>
    <!-- Back Button -->
    <button class="back-button" @click="goBack">Back</button>

    <!-- Input Fields and Add Button -->
    <div>
      <div>
        <label for="deck">Select Deck:</label>
        <select v-model="newQuestion.deck" id="deck">
          <option value="COMP551">COMP551</option>
          <option value="COMP421">COMP421</option>
          <!-- Add more options as needed -->
        </select>
      </div>
      <div>
        <input v-model="newQuestion.text" placeholder="Enter Question" />
        <textarea v-model="newQuestion.answer" placeholder="Enter Answer"></textarea>
        <input v-model="newQuestion.hint" placeholder="Enter Hint" />
        <button @click="addQuestion" :disabled="!newQuestion.text || !newQuestion.answer || !newQuestion.hint">
          ADD QUESTION
        </button>
      </div>
    </div>


    <!-- Questions List -->
    <div v-if="questions.length > 0">
      <h2>Saved Questions</h2>
      <ul>
        <li v-for="(question, index) in questions" :key="index">
          <strong>Deck:</strong> {{ question.deck }} <br/>
          <strong>Q:</strong> {{ question.text }} <br/>
          <strong>A:</strong> {{ question.answer }} <br/>
          <strong>Hint:</strong> {{ question.hint }}
          <button @click="removeQuestion(index)">Remove</button>
        </li>
      </ul>
    </div>

    <!-- Modal for Congratulations -->
    <div v-if="showCongratsModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <!-- Logo Image -->
        <img src="@/assets/buddy-icon.png" alt="Buddy Icon" class="congrats-logo"/>
        <p>Congratulations! You've successfully created a new question.</p>
      </div>
    </div>
  </div>
</template>
Explanation
  
  <script>
  export default {
    data() {
    return {
      newQuestion: {
        text: '',
        answer: '',
        hint: '',
        deck: 'COMP551' // Default deck selection
      },
      questions: [],
      showCongratsModal: false
    };
  },
    created() {
      this.loadQuestions();
    },
    methods: {
        goToMenu() {
      this.$router.push('/menu'); 
    },
    goBack() {
      this.$router.go(-1);
    },
    addQuestion() {
    if (this.newQuestion.text && this.newQuestion.answer && this.newQuestion.hint) {
      this.questions.push({ ...this.newQuestion });
      this.saveQuestions();
      this.newQuestion = { text: '', answer: '', hint: '' };
    } else {
      alert("Please fill in all fields before adding a question.");
    }
    this.showCongratsModal = true;
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
          } catch(e) {
            localStorage.removeItem('questions');
          }
        }
      },
      removeQuestion(index) {
        this.questions.splice(index, 1);
        this.saveQuestions();
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
button {
  background-color: #4CAF50; 
  color: white;
  cursor: pointer;
  margin: 5px 10px;
  padding: 5px 10px; /* Smaller padding */
  border: 1px solid #ccc; 
  border-radius: 4px; 
  width: auto; /* Adjust width as needed, or remove for content-width */
  font-size: 14px; /* Smaller font size */
}

/* Add a specific class for the back button if it's not the same as other buttons */
.back-button {
  padding: 12px 12px; /* Even smaller padding */
  font-size: 20px; /* Even smaller font size */
  width: auto; /* Only as wide as necessary */
}
.menu-image-button img {
  width: 50px; 
  height: auto; 
}

div {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  width: 100%; /* Ensure the parent container takes the full width */
}

input, textarea {
  margin: 10px 0;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 50%; /* This will now take up 100% of the div's width */
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
  margin: 0 auto; /* Center the logo */
  width: 100px; /* Adjust the width as needed */
  height: auto; /* Maintain aspect ratio */
  padding-bottom: 20px; /* Space below the logo */
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
  </style>