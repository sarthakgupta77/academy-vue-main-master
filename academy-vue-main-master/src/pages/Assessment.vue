<template>
  <div class="header">
    <h1>{{ data.apiData.title }}</h1>
    <div class="time">
      Total Duration: <span>{{ data.apiData.duration }} minutes</span>
    </div>
    <q-btn icon="" flat round dense color="white" />
  </div>
  <div class="big-box">
    <div class="question-box">
      <!-- <div class="box-detail">
            <div class="time">Total Duration: <span>00:00:00</span></div>
         </div> -->
      <div class="question-area-box">
        <div class="question-area">
          <!-- <p>{{ data.apiData.instructions }}</p> -->
          <p><span v-html="data.apiData.instructions"></span></p>
        </div>
      </div>
      <div class="declartaion">
        <span>Declartaion:</span>
        <q-checkbox
          size="xs"
          v-model="customModel"
          color="primary"
          label="I have read all the instructions carefully and have understood them. I agree not to cheat or use unfair means in this examination. I understand that using unfair means of any sort for my own or someone else's advantage will lead to my immediate disqualification. The decision of administrator will be final in these matters and cannot be appealed."
          true-value="yes"
          false-value="no"
          style="align-items: flex-start"
        />
        <q-btn
          @click="startTest"
          :disable="customModel == 'yes' ? false : true"
          color="green"
          class="q-mt-md"
          label="I am ready to begin"
          style="float: right"
          id="test-start-btn"
        />
      </div>
    </div>
    <div class="user-detail">
      <div class="box">
        <img src="https://datatrained.com/images/default.png" alt="" />
        <h2>{{ data.studentName }}</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import { LocalStorage } from "quasar";
import { api2 } from "src/boot/axios";
import { onBeforeMount, reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const customModel = ref("no");
const router = useRouter();
const route = useRoute();

const data = reactive({
  apiData: [],
  studentName: null,
});

// const chatBot = document.getElementById("zsiqchat");

// const startTestBtn = document.getElementById("test-start-btn");
//    startTestBtn.onclick(
//     () => {
//       chatBot.classList.add("disable")
//     }
//    )



const startTest = () => {
  router.push("/start-assessment/" + route.params.id);
};



onBeforeMount(() => {
  api2
    .get("assessment-details", {
      params: {
        student_id: LocalStorage.getItem("student_user_id"),
        assessment_id: route.params.id,
        declaration: 1,
      },
    })
    .then((res) => {
      data.apiData = res.data.data[0];
      data.studentName = res.data.data.name.name;
    });
});
</script>

<style lang="scss" scoped>
.header {
  background-color: #0f0c3b;
  width: 100%;
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  z-index: 999;
  height: 8%;

  h1 {
    margin: 0;
    text-align: center;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 1px;
    color: #fff;
    line-height: 20px;
  }

  .time {
    color: #fff;
    font-weight: 500;
    font-size: 14px;
  }
}

.question-area-box {
  height: 60%;
  overflow-y: auto;
  width: 100%;
  position: relative;

  .question-area {
    padding: 30px 25px;
    overflow-y: auto;

    h3 {
      font-size: 18px;
      line-height: 18px;
      margin-bottom: 18px;
      color: #000;
      font-weight: 600;
    }

    .options-box {
      display: grid;
      grid-template-columns: 2fr 1fr;
      row-gap: 14px;
      width: 60%;
      margin-top: 40px;
    }

    .text-box {
      width: 60%;
    }
  }
}

.big-box {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 8%;
  left: 0;
  bottom: 0;
  overflow-x: hidden;

  .question-box {
    position: fixed;
    left: 0;
    height: 100%;
    width: 70%;

    .box-detail {
      border-bottom: 1px solid #ccc;
      padding: 20px;

      h2 {
        font-size: 24px;
        line-height: 18px;
        margin: 0 0 10px 0;
        font-weight: 500;
        text-align: center;
      }

      // .time{
      //     color: #000;
      //     font-weight: 500;
      //     font-size: 14px;
      //     span{
      //         color: #4432a7;
      //     }
      // }
    }

    .declartaion {
      position: fixed;
      bottom: 0;
      border-top: 1px solid #ccc;
      width: 70%;
      padding: 20px;

      span {
        display: block;
        font-size: 15px;
        font-weight: 500;
        margin-bottom: 15px;
      }
    }
  }
  .disable{
    display: none;
  }

  .user-detail {
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    height: 95%;
    position: fixed;
    right: 0;
    width: 30%;

    .box {
      text-align: center;
      padding: 30px 0;

      img {
        height: 120px;
        width: 120px;
        border-radius: 100%;
        margin-bottom: 10px;
      }

      h2 {
        margin: 0;
        font-size: 20px;
        line-height: 20px;
        font-weight: 500;
      }
    }
  }
}
</style>
