<template>
    <div class="schedule-wrapper">
      <button @click="goBack" class="back-button">Back</button>
      <button @click="openModalForCreate" class="add-schedule-btn">Add Schedule</button>
      <schedule-modal
        :show="showModal"
        :editSchedule="editSchedule"
        @update:show="value => showModal = value"
        @create="addOrUpdateSchedule"
        @update="addOrUpdateSchedule"
      ></schedule-modal>
  
      <div class="schedules-list">
        <div v-for="(schedule, index) in schedules" :key="index" class="schedule-item">
          <div class="schedule-days">
            <span v-for="(selected, day) in schedule.days" :key="day" class="schedule-day" :class="{ 'active': selected }">
              {{ day }}
            </span>
          </div>
          <div class="schedule-time">Time: {{ schedule.time }}</div>
          <div class="schedule-deck">Deck: {{ schedule.deck }}</div>
          <button @click="openModalForEdit(index)" class="edit-btn">Edit</button>
          <button @click="removeSchedule(index)" class="remove-btn">Remove</button>
        </div>
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
  <style>
  
  .back-btn {
    padding: 10px 15px;
    margin-bottom: 10px;
    background-color: #f7f7f7;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  
    /* Align the text to the left */
    text-align: left;
    /* Add some space between the icon and text */
    display: inline-flex;
    align-items: center;
  }
  
  .back-btn:hover {
    background-color: #e7e7e7;
  }
  .schedule-wrapper {
    margin: 0 auto;
    max-width: 800px;
    padding: 20px;
  }
  
  .add-schedule-btn {
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 4px;
  }
  
  .schedules-list {
    margin-top: 20px;
  }
  
  .schedule-item {
    background: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 10px 15px;
    margin-bottom: 10px;
  }
  
  .schedule-days {
    margin-bottom: 5px;
  }
  
  .schedule-day {
    display: inline-block;
    width: 22px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    margin-right: 5px;
    border-radius: 4px;
    background: #eee;
    color: #333;
  }
  
  .schedule-day.active {
    background: #4CAF50;
    color: white;
  }
  
  .schedule-time,
  .schedule-deck {
    font-size: 14px;
    color: #666;
  }
  .back-button {
  padding: 12px 12px; 
  font-size: 20px; 
  width: auto; 
  background-color: #4CAF50; 
  color: white;
  cursor: pointer;
  margin: 5px 10px;
  border: 1px solid #ccc; 
  border-radius: 4px; 
  width: auto; 
  font-size: 14px; 
  }
  .back-button:hover {
    background-color: #14df22;
  }
  </style>