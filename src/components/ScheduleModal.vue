<template>
  <div v-if="show" class="modal">
    <div class="modal-content">
      <h2>When do you want to train?</h2>
      <div class="schedule-options">
        <div class="day-checkboxes">
          <label v-for="day in daysOfWeek" :key="day" class="day-label">
            <input class="pointer" type="checkbox" v-model="schedule.days[day]">
            <pre> {{ day }}</pre> 
          </label>
        </div>

        <div class="time-input">
          <label for="time">At what time?</label>
          <input class="pointer" type="time" id="time" v-model="schedule.time" required>
        </div>

        <div class="deck-selection">
          <label for="deck">For which deck?</label>
          <select class="pointer" id="deck" v-model="schedule.deck" required>
  <option value="" disabled>Select your deck</option>
  <option v-for="deck in decks" :key="deck" :value="deck">{{ deck }}</option>
</select>
        </div>
      </div>
      <row>
        <button class="btn btn-primary" @click="confirmAction" :disabled="!isValid">{{ isEditMode ? 'Update' : 'Create'
        }}</button>
        <button class="btn btn-danger" @click="closeModal">Cancel</button>
      </row>
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
      decks: [],
      daysOfWeek: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
      schedule: this.getDefaultSchedule()
    };
  },
  created() {
    this.loadDecks(); // Load decks when the component is created
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
    loadDecks() {
      const storedDecks = localStorage.getItem('decks');
      if (storedDecks) {
        this.decks = JSON.parse(storedDecks);
      }
    },
    closeModal() {
      this.$emit('update:show', false);
    },
    getDefaultSchedule() {
      return {
        days: {
          'Mo': false,
          'Tu': false,
          'We': false,
          'Tu': false,
          'Fr': false,
          'Sa': false,
          'Su': false
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
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  max-width: 900px;
  max-height: 900px;
  width: 100%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-y: auto;
}

.pointer {
  cursor: pointer;
}
</style>