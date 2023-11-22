<template>
  <div>
    <div class="container" style="width:600px; margin: auto;">
      <button class="btn btn-secondary" style="margin-bottom: 20px;" @click="goBack">Back</button>
    </div>
    <div class="card" style="width:600px; margin: auto">
      <div class="card-header">My Schedules</div>
      <div class="card-body">
        <div v-if="schedules.length <= 0">You have no schedule yet, create one now!</div>
        <div class="list-group list-group-flush">
          <div v-for="(schedule, index) in schedules" :key="index" class="list-group-item">
            <div class="schedule-days">
              <span v-for="(selected, day) in schedule.days" :key="day" class="schedule-day" v-if="selected">
              {{ day }}
              </span>
            </div>
            <div class="schedule-time">Time: {{ schedule.time }}</div>
            <div class="schedule-deck">Deck: {{ schedule.deck }}</div>
            <button class="btn btn-warning" @click="openModalForEdit(index)">Edit</button>
            <button class="btn btn-danger" @click="removeSchedule(index)">Remove</button>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <button class="btn btn-primary" @click="openModalForCreate">Add Schedule</button>
      </div>
    </div>
    <div class="schedule-wrapper">
      <schedule-modal :show="showModal" :editSchedule="editSchedule" @update:show="value => showModal = value"
        @create="addOrUpdateSchedule" @update="addOrUpdateSchedule"></schedule-modal>
    </div>
  </div>
</template>
  
<script>
import ScheduleModal from './ScheduleModal.vue';

export default {
  components: {
    ScheduleModal
  },
  data() {
    return {
      showModal: false,
      schedules: [],
      editSchedule: null,
      editIndex: -1
    };
  },
  mounted() {
    this.loadSchedules();
  },
  methods: {
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.loadSchedules();
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    openModalForCreate() {
      this.editIndex = -1;
      this.editSchedule = null;
      this.showModal = true;
    },
    openModalForEdit(index) {
      this.editIndex = index;
      this.editSchedule = this.schedules[index];
      this.showModal = true;
    },
    addOrUpdateSchedule(scheduleData) {
      if (this.editIndex !== -1) {
        // Update existing schedule
        this.schedules.splice(this.editIndex, 1, scheduleData);
      } else {
        // Add new schedule
        this.schedules.push(scheduleData);
      }
      this.saveSchedules();
      this.closeModal();
    },
    removeSchedule(index) {
      if (confirm('Are you sure you want to remove this schedule?')) {
        this.schedules.splice(index, 1);
        this.saveSchedules();
      }
    },
    saveSchedules() {
      localStorage.setItem('schedules', JSON.stringify(this.schedules));
    },
    
    loadSchedules() {
  const savedSchedules = localStorage.getItem('schedules');
  if (savedSchedules) {
    this.schedules = JSON.parse(savedSchedules);

    // Load the names of all decks from local storage
    this.loadDecks();

    // Associate each schedule with its corresponding deck name
    this.schedules.forEach(schedule => {
      const deckName = this.decks.find(deck => deck === schedule.deck);
      if (deckName) {
        schedule.deckName = deckName;
      } else {
        schedule.deckName = 'Unknown'; // or any default value
      }
    });
  }
},
loadDecks() {
  const storedDecks = localStorage.getItem('decks');
  if (storedDecks) {
    this.decks = JSON.parse(storedDecks);
  } else {
    this.decks = []; // Initialize with an empty array if no decks are stored
  }
},
    closeModal() {
      this.editIndex = -1;
      this.editSchedule = null;
      this.showModal = false;
    }
  }
};
</script>
