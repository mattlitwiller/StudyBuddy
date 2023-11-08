<template>
    <div>
      <div>
        <div class="back-button" @click="goBack">← Back</div>
        <input v-model="newQuestion.text" placeholder="Enter Question" />
        <textarea v-model="newQuestion.answer" placeholder="Enter Answer"></textarea>
        <input v-model="newQuestion.hint" placeholder="Enter Hint" />
        <button
@click="addQuestion"
    :disabled="!newQuestion.text || !newQuestion.answer || !newQuestion.hint">
    ADD QUESTION
  </button>
      </div>

      <button @click="goToMenu" class="menu-image-button">
      <img src="@/assets/buddy-icon.png" alt="Menu" />
    </button>
      
      <div v-if="questions.length > 0">
        <h2>Saved Questions</h2>
        <ul>
          <li v-for="(question, index) in questions" :key="index">
            <strong>Q:</strong> {{ question.text }} <br/>
            <strong>A:</strong> {{ question.answer }} <br/>
            <strong>Hint:</strong> {{ question.hint }}
            <button @click="removeQuestion(index)">Remove</button>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newQuestion: {
          text: '',
          answer: '',
          hint: ''
        },
        questions: []
      };
    },
    created() {
      this.loadQuestions();
    },
    methods: {
      goBack() {
      this.$router.go(-1);
    },
        goToMenu() {
      this.$router.push('/menu'); 
    },
    addQuestion() {
    if (this.newQuestion.text && this.newQuestion.answer && this.newQuestion.hint) {
      this.questions.push({ ...this.newQuestion });
      this.saveQuestions();
      this.newQuestion = { text: '', answer: '', hint: '' };
    } else {
      alert("Please fill in all fields before adding a question.");
    }
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

    button {
    margin: 10px 0;
    padding: 8px; 
    border: 1px solid #ccc; 
    border-radius: 4px; 
    width: 50%; 
  }
  
  button {
    background-color: #4CAF50; 
    color: white;
    cursor: pointer;
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
  </style>