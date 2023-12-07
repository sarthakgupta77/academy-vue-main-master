<template >
  <div class="header">
    <h1>Assessment : {{ data.getAssessment.title }}</h1>
    <div class="time">
      <!-- Total Duration: <span>{{ data.timer.hours }}</span>: <span>{{ data.timer.minutes }}</span>:
      <span>{{ data.timer.seconds }}</span> -->
      <TestTimer />
    </div>

    <!-- <q-btn icon="close" flat round dense color="white"/> -->
  </div>

  <div class="big-box">
    <div class="question-box">
      <div class="box-detail">
        <h2 class="flex items-center">Sections: <span>Part A</span></h2>
        <!-- <q-btn icon="refresh" flat round dense color="black" /> -->
      </div>
      <div class="question-area-box">
        <div class="question-area">
          <h3>
            {{ data.ques_no + "." }}
            {{ data.question[data.count].question }}
          </h3>
          <q-form action="" method="" class="q-gutter-md">
            <div class="options-box">
              <q-radio v-if="data.question[data.count].question_type == 1"
                v-for="opt in data.question[data.count].options" dense v-model="data.question[data.count].marked_answer"
                color="indigo" :val="opt">{{ opt }}</q-radio>
              <q-radio v-if="data.question[data.count].question_type == 2"
                v-for="opt in data.question[data.count].options" dense v-model="data.question[data.count].marked_answer"
                color="indigo" :val="opt">{{ opt }}</q-radio>
              <q-radio v-if="data.question[data.count].question_type == 3"
                v-for="opt in data.question[data.count].options" dense v-model="data.question[data.count].marked_answer"
                color="indigo" :val="opt">{{ opt }}</q-radio>
              <q-input v-if="data.question[data.count].question_type == 4" outlined
                v-model="data.question[data.count].marked_answer" label="Answer" />
              <q-input v-if="data.question[data.count].question_type == 5"
                v-model="data.question[data.count].marked_answer" outlined type="textarea" label="Answer" />
              <q-input v-if="data.question[data.count].question_type == 6"
                v-model="data.question[data.count].marked_answer" outlined type="file" />
            </div>

            <!-- <div class="q-mb-md q-mt-lg text-box">
              <q-input outlined v-model="text" label="Answer" />
            </div>
            <div class="q-mb-md q-mt-lg text-box">
              <q-input v-model="text" outlined type="textarea" label="Answer" />
            </div> -->
          </q-form>
        </div>
      </div>
      <div class="tool-box">
        <div class="prev">
          <q-btn @click="changeQuestion(data.count - 1, data.ques_no - 1)" label="Previous" type="button"
            icon="chevron_left" color="indigo-10" />
        </div>
        <div class="skip">
          <!-- <q-btn label="Mark for Review & Next" type="button" color="indigo" /> -->
          <q-btn @click="clearRes" label="Clear Response" type="button" color="indigo" />
        </div>
        <div class="next">
          <q-btn @click="changeQuestion(data.count + 1, data.ques_no + 1)" label="Save &amp; Next" type="button"
            icon-right="chevron_right" color="indigo-10" />
        </div>
      </div>
    </div>
    <div class="user-detail">
      <div class="stats-box">
        <ul>
          <li><span class="ansr"></span>Answered</li>
          <!-- <li><span class="not-ansr">3</span>Not Answered</li> -->
          <li><span class="remain"></span>Remaining Questions</li>
          <!-- <li><span class="mark">0</span>Mark for Review</li> -->
          <!-- <li><span class="mark-ansr">0</span>Mark for Review & Answered</li> -->
        </ul>
      </div>
      <div class="question-list-box">
        <ul>
          <li v-for="(idx, index) in data.question" :key="idx" v-bind="idx">
            <a v-if="idx.marked_answer == null" @click="changeQuestion(index)" class="remain">{{ index + 1 }}</a>
            <a v-else @click="changeQuestion(index)" class="ansr">{{
              index + 1
            }}</a>
          </li>
          <!-- < li > <a href="#" class="ansr">2</a></ >
          <li><a href="#" class="not-ansr">4</a></li>
          <li><a href="#" class="not-ansr">5</a></li>
          <li><a href="#" class="not-ansr">6</a></li>
          <li><a href="#" class="ansr">7</a></li>
          <li><a href="#" class="not-ansr">8</a></li>
          <li><a href="#" class="ansr">9</a></li>
          <li><a href="#" class="ansr">10</a></li>
          <li><a href="#" class="ansr">11</a></li>
          <li><a href="#" class="remain">12</a></li> -->
        </ul>
      </div>
      <div class="submit-box">
        <q-btn @click="onSubmit" label="Submit" type="submit" color="green" />
      </div>
    </div>
  </div>

  <q-dialog v-model="seamless">
    <q-card style="width: 350px">
      <q-linear-progress :value="1" color="violet" />

      <q-card-section class="row items-center">
        <span class="text-h6">{{ popup1 }}</span>
      </q-card-section>
      <q-separator />

      <q-card-section class="row items-center">
        <q-icon name="verified" color="primary" size="32px" />

        <span class="q-ml-sm">{{ popup2 }}</span>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { LocalStorage } from "quasar";
import { api2 } from "src/boot/axios";
import TestTimer from "src/components/TestTimer.vue";
import { onBeforeMount, reactive, ref } from "vue";
import { watchEffect, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useTimer } from "vue-timer-hook";
const route = useRoute();

const popup1 = ref("");
const popup2 = ref("");
const seamless = ref(false);

const data = reactive({
  count: 0,
  question: [],
  obtMarks: null,
  maxMarks: null,
  assessmentCourse: null,
  getAssessment: [],
  answeredQuestionCount: 0,
  remainingQuestionCount: 0,
  time: 0,
  timer: 0,
  ques_no: 1,
});
const router = useRouter();

document.addEventListener('contextmenu', event => event.preventDefault());

const changeQuestion = (next, ques) => {
  if (next >= 0 && next < data.question.length) {
    data.count = next;
    data.ques_no = ques
  }
  // else if(data.question[next].marked_answer != null) {
  //   data.answeredQuestionCount += 1
  // } else if( data.question[next].marked_answer == null) {
  //   data.remainingQuestionCount += 1
  // }
};
const clearRes = () => {
  data.question[data.count].marked_answer = null;
};
const onSubmit = () => {
  for (let i = 0; i < data.question.length; i++) {
    if (data.question[i].correct_answer == data.question[i].marked_answer) {
      data.obtMarks = data.obtMarks + data.question[i].max_marks;
    } else {
      data.obtMarks = data.obtMarks - data.question[i].negative_marks;
    }
    data.maxMarks = data.maxMarks + data.question[i].max_marks;
  }
  if (confirm("Are you sure, you want to submit!") == true) {
    api2
      .post("save-assessment-marks", {
        student_id: LocalStorage.getItem("student_user_id"),
        assessment_id: data.getAssessment.assessment_id,
        content_ans: JSON.stringify(data.question),
        obt_marks: data.obtMarks,
        max_marks: data.maxMarks,
        final_instructions: data.getAssessment.instructions,
        assessmentCourse: data.assessmentCourse,
      })
      .then((res) => {
        router.push("/assessment-result/" + res.data.submission_id);
      });
  }
};

const exam_time = LocalStorage.getItem("total_et")
const reaming_time = exam_time - 10

setTimeout(() => {
  popup1.value = "Exam Over!";
  popup2.value = "Your exam has been submitted"
  seamless.value = true;
  onSubmit()
}, exam_time * 60 * 1000);

setTimeout(() => {
  popup1.value = "Warning!";
  popup2.value = "10 Minutes Remaining!";
  seamless.value = true;
}, reaming_time * 60 * 1000);

window.onbeforeunload = function () {
  return "Data will be lost if you leave the page, are you sure?";
};

onBeforeMount(() => {
  api2.get("get-assessment", {
    params: {
      student_id: LocalStorage.getItem("student_user_id"),
      assessment_id: route.params.id,
      start: 1
    },
  })
    .then((res) => {
      console.log(res.data.data);
      data.question = JSON.parse(res.data.data.content_ques);
      data.getAssessment = res.data.data;
      data.assessmentCourse = res.data.data.course;
      data.time = new Date();
      LocalStorage.set('total_et', parseInt(data.getAssessment.duration))
      // console.log(parseInt(data.getAssessment.duration))
      data.timer = useTimer(data.time);
      // console.log(data.question)
    });
});
onMounted(() => {
  watchEffect(async () => {
    if (data.timer.isExpired.value) {
      console.warn("IsExpired");
    }
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
      padding: 8px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #f5f5f5;

      h2 {
        font-size: 15px;
        text-transform: uppercase;
        line-height: 18px;
        margin: 0;
        font-weight: 500;
        text-align: center;

        span {
          padding: 6px 15px;
          border-radius: 4px;
          margin-left: 5px;
          font-size: 14px;
          color: #fff;
          background-color: #4432a7;
        }
      }
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

  .user-detail {
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    height: 95%;
    position: fixed;
    right: 0;
    width: 30%;

    .stats-box {
      padding: 15px 22px;
      height: 40%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      overflow-y: auto;
      border-bottom: 1px solid #dddddd;

      ul {
        padding-left: 0;
        margin: 0;

        li {
          margin-bottom: 5px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          column-gap: 25px;
          font-size: 12px;

          span {
            height: 32px;
            width: 32px;
            line-height: 32px;
            border-radius: 100%;
            text-align: center;
            color: #fff;
            font-size: 12px;
          }
        }
      }
    }

    .question-list-box {
      padding: 22px;
      height: 45%;
      overflow-y: auto;
      border-bottom: 1px solid #dddddd;

      ul {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
        column-gap: 15px;
        row-gap: 15px;
        padding-left: 0;

        li {
          list-style: none;

          a {
            cursor: pointer;
            height: 40px;
            width: 40px;
            line-height: 40px;
            border-radius: 100%;
            text-align: center;
            color: #fff;
            display: block;
            text-decoration: none;

            &:hover {
              box-shadow: 0px 0px 6px rgb(48 157 180 / 59%);
            }
          }
        }
      }
    }

    .ansr {
      background-color: #75c204;
    }

    .not-ansr {
      background-color: #b70000;
    }

    .remain {
      background-color: #ddd;
      color: #353535 !important;
    }

    .mark {
      background-color: #6bceed;
    }

    .mark-ansr {
      background-color: #f87a82;
    }
  }

  .submit-box {
    height: 12%;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
  }

  .tool-box {
    padding: 0 25px;
    height: 11.5%;
    border-top: 1px solid #dddddd;
    width: 70%;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    bottom: 0;

    .skip {
      display: flex;
      column-gap: 10px;
    }
  }

  .question-area-box {
    height: 60%;
    overflow-y: auto;
    width: 100%;
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;

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

  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(90, 94, 185, 0.5);
    border-radius: 10px;
  }
}
</style>
