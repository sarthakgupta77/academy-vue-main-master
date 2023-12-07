<template>
  <q-page class="q-py-md">
    <div class="row" style="width: 100%">
      <div   class="offset-lg-2 offset-md-2 offset-sm-2 col-lg-8 col-md-8 col-sm-10 col-12 q-pa-sm" >
        <div class="row" style="width: 100%">
          <div class="col-md-12">
            <div class="box">
              <div class="row">
                <div class="col-md-12">
                  <div class="q-pa-md">
                    <div class="widget">
                      <div class="widget-title">
                        <h6>My Assessments</h6>
                      </div>
                    </div>
                    <q-card flat>
                      <q-tabs    v-model="tab" dense class="text-grey"  active-color="indigo-8" indicator-color="indigo-8"    narrow-indicator>
                        <q-tab name="available" label="All Assigned Assessments  " />
                        <!-- <q-tab name="re-attempt" label="Re-Attempt" />
                        <q-tab name="attempted" label="Attempted" /> -->
                        <!--   <q-tab name="extra-assin" label="Evaluated" /> -->
                      </q-tabs>
                      <q-separator />
                      <q-tab-panels v-model="tab" animated>
                        <q-tab-panel name="available">
                          <table class="table">
                            <thead>
                              <tr>
                                <th>S.No</th>
                                <th>Title</th>
                                <!-- <th>Instructions</th> -->
                                <th>Duration</th>
                                <th>Timing</th>
                                <th>Attempts</th>
                                <th>Scores</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody v-if="data.assessments.length > 0">
                              <tr   v-for="assessment in data.assessments" :key="assessment.id" >
                                <th>{{ count++ }}</th>
                                <td>{{ assessment.title }}</td>
                                <!-- <td>{{ assessment.instructions }}</td> -->
                                <td>{{ assessment.duration }} minutes</td>
                                <td> Start Date : {{ assessment.avl_start_time.substr(0, 10) }} <br />
                                      End Date : {{ assessment.avl_end_time.substr(0, 10) }}
                                </td>
                                <td>{{ assessment.attempt_left }} / {{ assessment.attempt  }}</td>
                                <td v-if="assessment.attempted == 1">
                                  <!-- <a  @click="ViewScore((id = assessment.id),)" class="view-btn" ><i class="fas fa-poll"></i> View Score</a > -->
                                  <div class="score">
                                  <p class="total-marks green" style="font-size: small;"> {{ assessment.obt_marks }} / {{ assessment.max_marks  }} </p>
                                  </div>
                                </td>
                                <td v-else>Not-Attempted Yet</td>
                                <td class="p-0" style="padding:0px">
                                  <q-btn v-if="assessment.attempted == 0" @click="attemptAssessment( (id = assessment.id), (start = assessment.avl_start_time), (end = assessment.avl_end_time))" color="primary" glossy class="view-btn " label="start exam" />
                                  <q-btn v-else @click="reAttemptAssessment( (id = assessment.id))" color="amber" glossy class="view-btn " label="Re-Attempt" /><br />
                                  <!-- <q-btn v-if="assessment.certificate == 1"  @click="viewCertificate((id = assessment.id))" color="secondary" glossy class="view-btn btn-info" label="Certificate" /> -->
                                </td>
                              </tr>
                            </tbody>
                            <tbody v-else>
                              <tr>
                                No Assessment Assigned
                              </tr>
                            </tbody>
                          </table>
                        </q-tab-panel>
                        <!-- <q-tab-panel name="re-attempt">
                          <table class="table">
                            <thead>
                              <tr>
                                <th>S.No</th>
                                <th>Title</th>
                                <th>Instructions</th>
                                <th>Duration</th>
                                <th>Timing</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-if="data.reAttempt.length > 0"
                                v-for="assessment in data.reAttempt"
                                :key="assessment.id"
                              >
                                <th>{{ count++ }}</th>
                                <td>{{ assessment.title }}</td>
                                <td>{{ assessment.instructions }}</td>
                                <td>{{ assessment.duration }}</td>
                                <td>
                                  Start Date :
                                  {{ assessment.avl_start_time.substr(0, 10) }}
                                  <br />
                                  End Date :
                                  {{ assessment.avl_end_time.substr(0, 10) }}
                                </td>
                                <td>
                                  <a
                                    @click="
                                      redirectAssignmentDetail(
                                        (id = assessment.id),
                                        (start = assessment.avl_start_time),
                                        (end = assessment.avl_end_time)
                                      )
                                    "
                                    class="view-btn"
                                    ><i class="fas fa-check-double"></i>Re-Attempt</a
                                  >
                                </td>
                              </tr>
                              <tr v-else class="text-center">
                                No Assessment Assigned
                              </tr>
                            </tbody>
                          </table>
                        </q-tab-panel>  -->

                      </q-tab-panels>
                    </q-card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import { onBeforeMount, reactive } from "vue";
import { api2 } from "boot/axios";
import { LocalStorage } from "quasar";
import moment from "moment";
const router = useRouter();
const tab = ref("available");

const data = reactive({
  tab: "evaluation",
  assessments: [],
  attempted: [],
  available: [],
  extra: [],
  reAttempt: [],
});

// const scorePercent = ( 100 * assessment.obt_marks) / assessment.max_marks

let count = 1;

onBeforeMount(() => {
  api2.get("get-assessment-list", {
      params: {
        student_id: LocalStorage.getItem("student_user_id"),
        type:0
      },
    })
    .then((res) => {
      data.assessments = res.data.data;
      // console.log(res.data.data);
      data.available = data.assessments.filter(function (el) {
        return el.attempted == 0;
      });
      data.attempted = data.assessments.filter(function (el) {
        return el.attempted == 1;
      });
      data.reAttempt = data.assessments.filter(function (el) {
        return el.attempted > 0 && el.attempt_left >= 1;
      });
    });
});

const attemptAssessment = (id, start, end) => {
  let CurrentDT = moment(Date()).format("YYYY-MM-DD HH:mm:ss");
  if (start > CurrentDT) {
    window.open("assessment-starting", "_blank");
  } else if (start < CurrentDT) {
    window.open("assessment/" + id, "_blank");
  }
};

const reAttemptAssessment = (id) =>{
    api2.get("get-assessment-list", {
      params: {
        student_id: LocalStorage.getItem("student_user_id"),
        assessment : id,
        type:1
      },
    })
    .then((res) => {
      console.log(res.data)
      data.reAttempt = res.data.data
      if (res.data.data.attempt_left > 0) {
        window.open("assessment/" + id, "_blank");
      }else{
        alert("No More Attempts Left, Connect with Career Coach For more INfo !")
      }
    })
}
</script>

<style lang="scss" scoped>
.box {
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  h5 {
    margin: 0px;
    color: #fff;
    text-align: center;
  }
  .title {
    background-color: #00ccf2;
    padding: 10px;
  }
  h6 {
    margin: 0px;
  }
  table {
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    width: 100%;
    border-spacing: 0px;
    border-collapse: collapse;
    text-align: center;
    thead {
      tr {
        th {
          font-size: 14px;
          border: 1px solid rgba(0, 0, 0, 0.3);
          padding: 5px 10px;
        }
      }
    }
    tbody {
      tr {
        th {
          padding: 7px 10px;
          font-size: 13px;
          border: 1px solid rgba(0, 0, 0, 0.3);
        }
        td {
          padding: 7px 10px;
          font-size: 15px;
          color: #2e2e2e;
          border: 1px solid rgba(0, 0, 0, 0.3);
          .view-btn {
            cursor: pointer;
            text-decoration: none;
            border: 1px solid $primary;
            padding: 0px 20px;
            color: $primary;
            border-radius: 15px;
            font-size: 12px;
                margin: 5px 0 5px 0;


          }
        }
      }
    }
  }
}
.score{
  display: flex;
  justify-content: center;
  align-items: center;
}
.total-marks{
    margin: 0;
    height: 30px;
    border: 1px solid rgb(138, 149, 247);
    border-radius: 15px;
    width: 80%;
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    padding: 0px 25px 0px 25px;

}
.green{
      background-color: #25dd5ad4;
}
.red{
      background-color: #ff5151e0;

}
.widget {
  padding: 20px;
  .widget-title {
    h6 {
      font-weight: 700;
      font-size: 24px;
      color: #3f3f3f;
      letter-spacing: 0px;
    }
  }
  .scroll {
    background-color: rgba(40, 36, 100);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 100%;
    position: absolute;
    right: 0;
    top: 50%;
    color: #fff;
  }
  .scroll2 {
    background-color: rgba(40, 36, 100);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 100%;
    position: absolute;
    left: 0;
    top: 50%;
    color: #fff;
  }
  .widget-container {
    padding: 20px;
    margin-top: 20px;
    border-radius: 8px;
    width: 100%;
    white-space: nowrap;
    position: relative;
  }
}

.pro-box {
  background-color: rgb(205, 240, 234);
}

@media (max-width: 767px) {
  .widget {
    padding: 5px;
    .widget-container {
      padding: 0px;
    }
  }
  .row {
    display: block;
  }
}
</style>
