<template>
  <div class="wrapper">
    <div class="time-slot">
      <div class="form-container">
        <h2 class="text-center">Assessment Has Not Started Yet!</h2>
        <!-- <p class="mb-2 text-center">Time Remaining</p> -->
        <p class="mb-2 text-center">Check Timing in Assessments Tab</p>
        <!-- <h3 class="text-center">
          <span>01D</span> <span>10H</span> <span>39M</span> <span>01S</span>
        </h3> -->
        <p class="mt-4 text-center">
          This exam can only be attempted on start date
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
</script>
<style lang="scss" scoped>
.wrapper {
  padding: 15px;
  height: 100vh;
  display: flex;
  justify-content: center;

  .time-slot {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    .form-container {
      width: 40%;
      background-color:aliceblue;
      border-radius: 10px;
      box-shadow: 5px 7px 15px rgb(0 0 0 / 20%);
      padding: 30px 25px;
      height: max-content;
      text-align: center;


      h2 {
        font-size: 28px;
        line-height: 28px;
        font-weight: 500;
        text-align: center;
        text-transform: uppercase;
        margin: 0 0 20px;
      }

      h3 {
        margin: 20px 0;
        font-size: 25px;

        span {
          display: inline-block;
          background-color: #309db4;
          padding: 10px;
          border-radius: 5px;
          color: #fff;
        }
      }
    }
  }
}
@media (min-width: 768px) and (max-width: 1024px) {
  .wrapper {
    .time-slot {
      .form-container {
        width: 65%;
      }
    }
  }
}

@media (max-width: 767px) {
  .wrapper {
    .time-slot {
      .form-container {
        width: 100%;
        h2 {
          font-size: 22px;
          line-height: 22px;
        }
        h3 {
          font-size: 15px;
          span {
            padding: 2px 10px;
          }
        }
      }
    }
  }
}
</style>
