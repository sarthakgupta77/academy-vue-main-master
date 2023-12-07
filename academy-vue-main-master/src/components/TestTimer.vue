<template>
  <div>
    <p style="color: white;">Total Duration: {{ formatTime(time) }}</p>
    <q-timer :time="time" format="HH:mm:ss" />
  </div>
</template>

<script>
import { LocalStorage } from 'quasar';

export default {
  data() {
    return {
      minutes: LocalStorage.getItem("total_et"), // input minutes
      time: 0, // initial timer value
      timerInterval: null, // variable to hold the interval ID
    };
  },
  mounted() {
    this.startTimer();
  },
  methods: {
    startTimer() {
      clearInterval(this.timerInterval); // clear the interval if it's already running
      this.time = this.minutes * 60; // set the initial timer value
      this.timerInterval = setInterval(this.updateTimer, 1000); // start the timer
    },
    updateTimer() {
      if (this.time > 0) {
        this.time--; // decrement the timer value
      } else {
        clearInterval(this.timerInterval); // clear the interval if the timer is done
      }
    },
    formatTime(time) {
      const hours = Math.floor(time / 3600); // calculate the number of hours
      const minutes = Math.floor((time % 3600) / 60); // calculate the remaining minutes
      const seconds = time % 60; // calculate the remaining seconds
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`; // format the time string
    },
  },
};
</script>
