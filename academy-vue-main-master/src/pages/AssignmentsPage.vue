<template>
  <q-page class="q-py-md">
    <div class="row" style="width: 100%">
      <div class="offset-lg-2 offset-md-2 offset-sm-2 col-lg-8 col-md-8 col-sm-10 col-12 q-pa-sm" >
        <div class="row" style="width: 100%">
          <div class="col-md-12">
            <div class="box">
              <div class="row">
                <div class="col-md-12">
                  <div class="q-pa-md">
                    <div class="widget">
                      <div class="widget-title">
                        <h6>My Assignments</h6>
                      </div>
                    </div>
                    <q-card flat>
                      <q-tabs  v-model="tab" dense class="text-grey" active-color="indigo-8" indicator-color="indigo-8" narrow-indicator >
                        <q-tab name="evaluation-assin" label="All Assigned Assignments " />
                        <!-- <q-tab name="practice-assin" label="Practice" />
                        <q-tab name="extra-assin" label="Extra" /> -->
                      </q-tabs>
                      <q-separator />
                      <q-tab-panels v-model="tab" animated>
                        <q-tab-panel name="evaluation-assin">
                          <table class="table">
                            <thead>
                              <tr>
                                <th>S.No</th>
                                <th>Title</th>
                                <th>Assigned on</th>
                                <th>Due Date</th>
                                <th>Type</th>
                                <th>Attempt</th>
                                <th>View</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr  v-if="data.assignments.length> 0" v-for="assignment in data.assignments" :key="assignment.id">
                                <th>*</th>
                                <td>{{ assignment.title }}</td>
                                <td>{{ assignment.assigned_on }}</td>
                                <td>{{ assignment.due_date }}</td>
                                <td>
                                  <div v-if="assignment.type == 1" > 
                                    <q-btn  color="amber" glossy class="view-btn " label="Evaluation" /><br />
                                  </div>
                                  <div v-else-if="assignment.type == 0" > 
                                    <q-btn  color="primary" glossy class="view-btn " label="Practice" /><br />
                                  </div>
                                  <div v-else > 
                                    <q-btn  color="secondary" glossy class="view-btn " label="Extra" /><br />
                                  </div>

                                </td>
                                 <td v-if="assignment.evaluated == 1 && assignment.submission == 1">
                                  <!-- <a  @click="ViewScore((id = assessment.id),)" class="view-btn" ><i class="fas fa-poll"></i> View Score</a > -->
                                  <div class="score">
                                  <p> <b>Assignment Attempted</b> </p> 
                                  </div>
                                </td>
                                 <td v-else-if="assignment.submission == 1 && assignment.evaluated == 0">
                                  <!-- <a  @click="ViewScore((id = assessment.id),)" class="view-btn" ><i class="fas fa-poll"></i> View Score</a > -->
                                  <div class="score">
                                  <p>Submitted-Under Evaluation</p> 
                                  </div>
                                </td>
                                <td v-else>Not-Attempted Yet</td>
                                <td>
                                  <a @click="redirectAssignmentDetail( (id = assignment.id) )" class="view-btn" ><i class="fas fa-eye"></i> View Details</a>
                                </td>
                              </tr>
                              <tr v-else>
                                No Assignment Assigned
                              </tr>
                            </tbody>
                          </table>
                        </q-tab-panel>

                        <!-- <q-tab-panel name="practice-assin">
                          <table class="table">
                            <thead>
                              <tr>
                                <th>S.No</th>
                                <th>Title</th>
                                <th>Assigned on</th>
                                <th>Due Date</th>
                                <th>View</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-if="data.practice.length > 0" v-for="project in data.practice" :key="project.id">
                                <th>*</th>
                                <td>{{ project.title }}</td>
                                <td>{{ project.assigned_on }}</td>
                                <td>{{ project.due_date }}</td>
                                <td>
                                  <a @click="redirectAssignmentDetail( (id = project.id) ) " class="view-btn" ><i class="fas fa-eye"></i> View Details</a >
                                </td>
                              </tr>
                              <tr v-else>
                                No Assignment Assigned
                              </tr>
                            </tbody>
                          </table>
                        </q-tab-panel>

                        <q-tab-panel name="extra-assin">
                          <table class="table">
                            <thead>
                              <tr>
                                <th>S.No</th>
                                <th>Title</th>
                                <th>Assigned on</th>
                                <th>Due Date</th>
                                <th>View</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-if="data.extra.length > 0" v-for="project in data.extra" :key="project.id">
                                <th>*</th>
                                <td>{{ project.title }}</td>
                                <td>{{ project.assigned_on }}</td>
                                <td>{{ project.due_date }}</td>
                                <td>
                                  <a @click=" redirectAssignmentDetail((id = project.id)  )  "  class="view-btn"  ><i class="fas fa-eye"></i> View Details</a  >
                                </td>
                              </tr>
                              <tr v-else>
                                No Assignment Assigned
                              </tr>
                            </tbody>
                          </table>
                        </q-tab-panel> -->
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
import ProjectBox from "components/ProjectBox.vue";
import { api2 } from "boot/axios";
import { LocalStorage } from "quasar";

const data = reactive({
  tab: "evaluation",
  assignments: [],
  evaluation: [],
  practice: [],
  extra: [],
});

onBeforeMount(() => {
  api2
    .get("project-students", {
      params: {
        student_id: LocalStorage.getItem("student_user_id"),
        type: 0,
      },
    })
    .then((res) => {
      data.assignments = res.data.data;
      // console.log(res.data.data)
      // data.evaluation = data.assignments.filter(function (el) {
      //   return el.type == 1;
      // });
      // data.practice = data.assignments.filter(function (el) {
      //   return el.type == 0;
      // });
      // data.extra = data.assignments.filter(function (el) {
      //   return el.type == 2;
      // });
    });
});

const router = useRouter();
const tab = ref("evaluation-assin");

function redirectAssignmentDetail(id) {
  router.push("assignment-details/" + id);
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
          font-size: 13px;
          color: #2e2e2e;
          border: 1px solid rgba(0, 0, 0, 0.3);

          .view-btn {
            cursor: pointer;
            text-decoration: none;
            border: 1px solid $primary;
            padding: 2px 8px;
            color: $primary;
            border-radius: 15px;
            font-size: 10px;
          }
        }
      }
    }
  }
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
