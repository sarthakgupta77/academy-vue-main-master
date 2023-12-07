<template>
  <q-page class="q-py-md">
    <div class="row" style="width: 100%">
      <div class="offset-lg-2 offset-md-2 offset-sm-2 col-lg-8 col-md-8 col-sm-10 col-12 q-pa-sm">
        <div class="row" style="width: 100%">
          <div class="col-md-12">
            <div class="box">
              <div class="row">
                <div class="col-md-12">
                  <div class="q-pa-md">
                    <div class="widget">
                      <div class="widget-title">
                        <h6>Select Program</h6>
                      </div>
                    </div>
                    <q-card flat>
                      <q-separator />
                      <q-tab-panels v-model="tab" animated>
                        <q-tab-panel name="available">
                          <table class="table">
                            <thead>
                              <tr>
                                <th>S.No</th>
                                <th>Program Name</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="course in data.courses" :key="course.master_batch_name" v-bind="course">
                                <th>{{ count++ }}</th>
                                <td>{{ course.master_batch_name }}</td>
                                <td>
                                  <q-btn
                                    v-if="course.master_batch_name.includes('PG') || course.master_batch_name.includes('Elective') || course.master_batch_name.includes('Internship')"
                                    color="indigo-5" size="sm" @click="onViewRecordingClick(course.master_batch_id)">
                                    &nbsp; View Recordings
                                  </q-btn>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </q-tab-panel>
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
import { api2, edApi, stuApi } from "boot/axios";
import { LocalStorage } from "quasar";
import { useStudentStore } from "src/stores/student";

const router = useRouter();
const tab = ref("available");
const student_info = useStudentStore();

const data = reactive({
  courses: [],
  subjectCourses: [],
  classId: null,
  count: 1,
});

let count = 1

function openInNewTab(url) {
  var win = window.open(url, "_blank");
  win.focus();
}

const onViewRecordingClick = (masterBatchId) => {
  edApi.get("student/masterbatches/classes/" + masterBatchId, {
    params: {
      show_overview: 1
    }
  }).then((res) => {
    // console.log(res.data.courses)
    data.subjectCourses = res.data.courses
    checkClassNameType(data.subjectCourses)
    api2
      .post("generate-ed-jwt", {
        name: student_info.name,
        email: LocalStorage.getItem("email"),
      })
      .then((res) => {
        openInNewTab(
          "https://learning.datatrained.com/?" +
          "&jwt=" +
          res.data.access_token +
          "&edmingle_redirect_url=" +
          encodeURIComponent(
            "https://learning.datatrained.com/myaccount/#/course/" + masterBatchId + "?" + "subject=" + data.classId
          )
        )
      })
      .catch((err) => {
        console.log(err);
      });

  })
}

const checkClassNameType = (type) => {
  for (let i = 0; i < type.length; i++) {
    // if (type[i].class_name.includes("Elective") || type[i].class_name.includes("elective") || type[i].class_name.includes("PG Program") || type[i].class_name.includes(" pg program") || type[i].class_name.includes("Internship") || type[i].class_name.includes("internship")) {
    if (type[i].class_name.includes("[LIVE!]")) {
      data.classId = type[i].class_id
    }
  }
}

onBeforeMount(() => {

      stuApi.get('student/masterbatches?tag_ids=9&search=', {
        headers: {
          'apikey': LocalStorage.getItem('stu_edkey'),
        }
      })
        .then((res) => {
          data.courses = res.data.batches
        })
   
});

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

.score {
  display: flex;
  justify-content: center;
  align-items: center;
}

.total-marks {
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

.green {
  background-color: #25dd5ad4;
}

.red {
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
