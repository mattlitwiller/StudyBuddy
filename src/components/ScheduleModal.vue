<template>
    <div v-if="show" class="modal">
      <div class="modal-content">
        <h2>When do you want to train?</h2>
        <div class="schedule-options">
          <!-- Day selection using checkboxes -->
          <div class="day-checkboxes">
            <label v-for="day in daysOfWeek" :key="day" class="day-label">
              <input type="checkbox" v-model="schedule.days[day]"> {{ day }}
            </label>
          </div>
  
          <!-- Time input field -->
          <div class="time-input">
            <label for="time">At what time?</label>
            <input type="time" id="time" v-model="schedule.time" required>
          </div>
  
          <!-- Deck selection dropdown -->
          <div class="deck-selection">
            <label for="deck">For which deck?</label>
            <select id="deck" v-model="schedule.deck" required>
              <option value="" disabled>Select your deck</option>
              <option value="COMP551">COMP551</option>
              <option value="COMP521">COMP521</option>
              <option value="COMP542">COMP542</option>
            </select>
          </div>
        </div>
        <button @click="confirmAction" :disabled="!isValid">{{ isEditMode ? 'Update' : 'Create' }}</button>
        <button @click="closeModal">Cancel</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      show: Boolean,
      editSchedule: Object
    },
    data() {
      return {
        daysOfWeek: ['M', 'T', 'W', 'TR', 'F', 'S', 'D'],
        schedule: this.getDefaultSchedule()
      };
    },
    computed: {
      isEditMode() {
        return !!this.editSchedule;
      },
      isValid() {
        const isDaySelected = Object.values(this.schedule.days).some(day => day);
        const isTimeSelected = this.schedule.time !== '';
        const isDeckSelected = this.schedule.deck !== '';
        return isDaySelected && isTimeSelected && isDeckSelected;
      }
    },
    watch: {
      editSchedule: {
        immediate: true,
        handler(newValue) {
          if (newValue) {
            this.schedule = JSON.parse(JSON.stringify(newValue));
          } else {
            this.schedule = this.getDefaultSchedule();
          }
        }
      }
    },
    methods: {
      confirmAction() {
        if (this.isValid) {
          if (this.isEditMode) {
            this.$emit('update', this.schedule);
          } else {
            this.$emit('create', this.schedule);
          }
          this.closeModal();
        }
      },
      closeModal() {
        this.$emit('update:show', false);
      },
      getDefaultSchedule() {
        return {
          days: {
            'M': false,
            'T': false,
            'W': false,
            'TR': false,
            'F': false,
            'S': false,
            'D': false
          },
          time: '',
          deck: ''
        };
      }
    }
  };
  </script>
  
  
  <style scoped>
  .modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
    padding: 20px; /* Add some padding around the modal content */
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    max-width: 900px; /* You can adjust this as needed */
    max-height: 900px;
    width: 100%; /* For responsiveness */
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    display: flex;
    flex-direction: column;
    justify-content: center; /* This will center the content vertically */
    overflow-y: auto; /* In case the content is longer than the screen */
  }
  </style>