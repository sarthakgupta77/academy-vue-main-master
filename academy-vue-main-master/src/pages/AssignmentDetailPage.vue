<template>
  <q-page class="q-py-md">
    <div class="row" style="width: 100%">
      <div class="offset-lg-2 offset-md-2 offset-sm-2 col-lg-9 col-md-9 col-sm-9 col-12 q-pa-sm">
        <div class="row" style="width: 100%">
          <div class="col-md-12 col-12">
            <div class="box">
              <div class="row">
                <div class="col-md-8 col-sm-12">
                  <div class="q-pa-md">
                    <div class="widget">
                      <div class="widget-title">
                        <h6>{{ data.projectTitle }}</h6>
                      </div>
                      <div class="widget-container">
                        <div>
                          <p>
                            <q-chip size="sm">{{ data.projectType }}</q-chip>
                            <q-chip v-if="data.status == 'New'" class="project-color1" text-color="white" size="sm">{{
                              data.status }}</q-chip>
                            <q-chip v-if="data.status == 'Pending'" class="project-color2" text-color="white" size="sm">
                              {{ data.status }}
                            </q-chip>
                            <q-chip v-if="data.status == 'Action Required'" class="project-color3" text-color="white"
                              size="sm">{{ data.status }}
                            </q-chip>
                            <q-chip v-if="data.status == 'Submitted'" class="project-color4" text-color="white"
                              size="sm">{{ data.status }}</q-chip>
                            <q-chip v-if="data.status == 'Evaluated'" class="project-color5" text-color="white"
                              size="sm">{{ data.status }}</q-chip>
                          </p>
                          <p>
                            <q-chip outline color="red" size="sm">Due Date:
                              {{ moment(data.due_date).format("DD MMM Y") }}
                            </q-chip>
                          </p>
                        </div>
                        <h4>App Description:</h4>
                        <p v-html="data.description"></p>
                        <div class="download-files">
                          <div class="tittle">Download Files</div>
                          <ul>
                            <!-- <li>
                                                            <a href="#">{{ data.downloadLink }}</a>
                                                        </li> -->
                            <li v-for="file in data.files" :key="file.id" v-bind="file">
                              <a :href="`https://datatrained.com/admin/public/` +
                                file.path
                                " target="_blank">{{ file.file_name }}</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 col-sm-12">
                  <div class="chat-box">
                    <div v-if="data.status == 'New'" class="status project-color1">
                      <div>
                        <i class="fas fa-angle-double-right"></i>
                        {{ data.status }}
                      </div>
                    </div>
                    <div v-if="data.status == 'Pending'" class="status project-color2">
                      <div>
                        <i class="fas fa-angle-double-right"></i>
                        {{ data.status }}
                      </div>
                    </div>
                    <div v-if="data.status == 'Action Required'" class="status project-color3">
                      <div>
                        <i class="fas fa-angle-double-right"></i>
                        {{ data.status }}
                      </div>
                    </div>
                    <div v-if="data.status == 'Submitted'" class="status project-color4">
                      <div>
                        <i class="fas fa-angle-double-right"></i>
                        {{ data.status }}
                      </div>
                    </div>
                    <div v-if="data.status == 'Evaluated'" class="status project-color5">
                      <div>
                        <i class="fas fa-angle-double-right"></i>
                        {{ data.status }}
                      </div>
                    </div>
                    <div v-if="data.evaluated == 1 && data.published == 1" class="score">
                      <div class="title-box">Score Card</div>
                      <div class="score-box">
                        <div class="marks">
                          <h3>{{ data.obtainedMarks }}</h3>
                          <span>Max Marks: {{ data.maxMarks }}</span>
                        </div>
                        <q-markup-table style="margin-bottom: 15px">
                          <thead>
                            <tr>
                              <th class="text-center" colspan="2">
                                Scoring Parameters
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="param in data.scoreData" :key="param.id" v-bind="param">
                              <td>{{ param.parameter }}</td>
                              <td>
                                {{ param.obtained_marks }}/{{ param.max_marks }}
                              </td>
                            </tr>
                          </tbody>
                        </q-markup-table>
                      </div>
                    </div>
                    <div class="chat">
                      <div class="title-box">Evaluator Connect</div>
                      <div class="row justify-center chatbox">
                        <div class="chat-scroll" id="myChatBox">
                          <div v-for="chat in data.chats" :key="chat.id" v-bind="chat" class="q-pa-md"
                            style="width: 100%">
                            <q-chat-message v-if="chat.evaluator_msg &&
                              chat.evaluator_msg.length > 0
                              " bg-color="cyan-2" style="font-size: 13px">
                              <div v-html="chat.evaluator_msg"></div>
                            </q-chat-message>
                            <q-chat-message v-else bg-color="grey-2" style="font-size: 13px" sent>
                              <div v-html="chat.student_msg"></div>
                            </q-chat-message>
                          </div>
                        </div>
                        <!-- <q-input v-model="text" label="Typing" :dense="dense" class="typing">
                                        <template v-slot:append>
                                            <q-icon v-if="text !== ''" name="close" @click="te  class="cursor-pointer" />
                                        </template>
                                         <template v-slot:after>
                                            <q-btn round dense flat icon="send" />
                                        </template>
                                        </q-input> -->
                        <div class="chat-input">
                          <div>
                            <input type="text" id="chat-input" placeholder="Send a message..." v-model="data.chatMsg" />
                            <q-fab class="chat-actions" padding="xs" color="info" glossy icon="keyboard_arrow_up"
                              direction="up">
                              <q-fab-action label-position="left" color="primary" @click="importData" icon="attach_file"
                                label="Upload File" />
                            </q-fab>
                            <q-btn :disable="data.chatMsg && data.chatMsg.length > 0
                                ? false
                                : true
                              " @click="sendMessage" class="chat-submit" round flat icon="send" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-if="data.evaluated == 0" class="manage">
                      <div class="title-box">Make Assignment Submission</div>
                      <div v-if="data.submission == 1">
                        <q-chip color="teal" text-color="white" icon="bookmark">
                          Assignment Submitted, Please Wait for Evaluation.
                        </q-chip>
                      </div>
                      <div class="manage-box full-width flex column items-center justify-center q-pa-md">
                        <q-form class="full-width">
                          <q-input v-model="data.finalMessage" outlined color="blue-10" type="textarea"
                            label="Enter Your Answer" dense class="q-mb-md" size="xs" />
                          <q-file outlined v-model="data.allFiles" multiple size="xs" dense color="blue-10"
                            class="q-mb-md" label="Select All Files">
                            <template v-slot:prepend>
                              <q-icon name="attach_file" color="blue-10" />
                            </template>
                          </q-file>
                          <q-btn color="blue-10" @click="makeSubmission" label="Submit Assignment" dense
                            class="q-px-lg full-width" />
                        </q-form>
                      </div>
                    </div>
                    <div v-else class="manage">
                      <div class="title-box">
                        <!-- <q-icon name="info" size="2em" color="blue-10" /> -->
                        Assignment Files Submitted And Evaluated Successfully,
                        Check Your Score From Score Card Above.
                      </div>
                    </div>
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
import { LocalStorage } from "quasar";
import { api2 } from "src/boot/axios";
import { onBeforeMount, reactive } from "vue";
import { useRoute } from "vue-router";
import moment from "moment";
const data = reactive({
  apiData: [],
  projectTitle: null,
  projectType: null,
  downloadLink: null,
  description: null,
  files: [],
  due_date: null,
  status: null,
  published: null,
  scoreData: null,
  maxMarks: 0,
  obtainedMarks: 0,
  chats: [],
  chatMsg: null,
  evaluatorId: null,
  evaluated: null,
  submission: null,
  courseType: null,
  studentId: null,
  submissionBox: false,
  allFiles: [],
  finalMessage: [],
});
const route = useRoute();

setTimeout(() => {
  const element = document.getElementById("myChatBox");
  element.scrollTop = element.scrollHeight;
}, 1000);

const makeSubmissionBox = () => {
  data.submissionBox = true;
};
const revokeSubmissionBox = () => {
  data.submissionBox = false;
};

const sendMessage = () => {
  api2
    .post("save-project-chat", {
      student_id: data.studentId,
      course: data.courseType,
      student_msg: data.chatMsg,
      type: 2,
      project_id: route.params.id,
    })
    .then(() => {
      api2
        .get("get-project-chat", {
          params: {
            student_id: LocalStorage.getItem("student_user_id"),
            project_id: route.params.id,
          },
        })
        .then((res) => {
          data.chats = res.data.data;
        });
      data.chatMsg = "";
    });
};

const makeSubmission = () => {
  let docFiles = data.allFiles;
  const formData = new FormData();
  for (let i = 0; i < docFiles.length; i++) {
    formData.append("file[]", docFiles[i]);
  }
  formData.append("student_id", data.studentId);
  formData.append("student_msg", data.finalMessage);
  formData.append("project_id", route.params.id);

  api2
    .post("make-submission", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(function (res) {
      (data.finalMessage = ""), (data.allFiles = "");
      location.reload();
      alert("Files Submitted Successfully");
    });
};

function importData() {
  let input = document.createElement("input");
  input.type = "file";
  input.onchange = (_) => {
    let files = Array.from(input.files);
    var formData = new FormData();
    var imagefile = files;
    formData.append("file", imagefile[0]);
    formData.append("id", data.studentId);

    api2
      .post("upload-student-file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (res) {
        if (res.data.msg == "File Uploaded") {
          confirm("Your File Uploaded & Sent Successfully !!");
          api2
            .post("save-project-chat", {
              student_id: data.studentId,
              course: data.courseType,
              type: 2,
              student_msg:
                '<a href="https://genesis.datatrained.com/' +
                res.data.path +
                '" target="_blank">' +
                res.data.name +
                "</a>",
              project_id: route.params.id,
            })
            .then(() => {
              api2
                .get("get-project-chat", {
                  params: {
                    student_id: LocalStorage.getItem("student_user_id"),
                    project_id: route.params.id,
                  },
                })
                .then((res) => {
                  data.chats = res.data.data;
                });
              data.chatMsg = "";
            });
        } else {
          confirm("An error occured, please try again");
        }
      });
  };
  input.click();
}
onBeforeMount(() => {
  api2
    .get("get-project-details", {
      params: {
        project_id: route.params.id,
        type: 0,
      },
    })
    .then((res) => {
      // console.log(res)
      data.apiData = res.data.data[0];
      data.courseType = res.data.data[0].course;
      data.projectTitle = data.apiData.title;
      if (data.apiData.type == 0) {
        data.projectType = "Practise";
      } else if (data.apiData.type == 1) {
        data.projectType = "Evaluation";
      } else {
        data.projectType = "Extra";
      }
      data.downloadLink = data.apiData.downloads;
      data.description = data.apiData.description;
      data.files = res.data.files;
    })
    .then(() => {
      api2
        .get("get-project-student", {
          params: {
            student_id: LocalStorage.getItem("student_user_id"),
            project_id: route.params.id,
          },
        })
        .then((res) => {
          data.evaluatorId = res.data.data.evaluator_id;
          data.course = res.data.data.course;
          data.studentId = res.data.data.student_id;
          data.due_date = res.data.data.due_date;
          data.published = res.data.data.published;
          data.evaluated = res.data.data.evaluated;
          data.submission = res.data.data.submission;

          if (res.data.data.status == 0) {
            data.status = "New";
          } else if (res.data.data.status == 1) {
            data.status = "Pending";
          } else if (res.data.data.status == 2) {
            data.status = "Action Required";
          } else if (res.data.data.status == 3) {
            data.status = "Submitted";
          } else {
            data.status = "Evaluated";
          }
        })
        .then(() => {
          api2
            .get("get-project-scores", {
              params: {
                student_id: LocalStorage.getItem("student_user_id"),
                project_id: route.params.id,
              },
            })
            .then((res) => {
              data.scoreData = res.data.data;
              for (let i = 0; i < data.scoreData.length; i++) {
                data.maxMarks =
                  data.maxMarks + parseFloat(data.scoreData[i].max_marks);
                data.obtainedMarks =
                  data.obtainedMarks +
                  parseFloat(data.scoreData[i].obtained_marks);
              }
            });
        });
    });
  api2
    .get("get-project-chat", {
      params: {
        student_id: LocalStorage.getItem("student_user_id"),
        project_id: route.params.id,
      },
    })
    .then((res) => {
      data.chats = res.data.data;
    });
});
</script>
<style lang="scss" scoped>
.box {
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;

  .title {
    background-color: #00ccf2;
    padding: 10px;
  }

  h6 {
    margin: 0px;
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

  .widget-container {
    padding: 20px 0;
    border-radius: 8px;
    width: 100%;
    white-space: nowrap;
    position: relative;

    p {
      margin-bottom: 5px;
      font-size: 14px;
      white-space: normal;
    }

    h4 {
      font-weight: 600;
      font-size: 20px;
      color: #3f3f3f;
      letter-spacing: 0px;
      margin-bottom: 10px;
    }

    h5 {
      font-weight: 600;
      font-size: 18px;
      color: #3f3f3f;
      letter-spacing: 0px;
      margin-bottom: 5px;
      margin-top: 20px;
    }
  }

  .download-files {
    padding: 20px 0;

    .tittle {
      font-weight: 600;
      font-size: 18px;
      color: #3f3f3f;
      letter-spacing: 0px;
      margin-bottom: 5px;
      margin-top: 20px;
    }

    ul {
      padding-left: 20px;

      li {
        color: $primary;
        white-space: normal;
        list-style-type: decimal;

        a {
          color: $primary;
          overflow-wrap: break-word;
        }
      }
    }
  }
}

.chat-box {
  padding: 15px;
  background-color: #f0f8ff;
  border-radius: 10px;
  height: 97%;
  margin: 15px;

  .status {
    padding: 10px 15px;
    border-radius: 10px;
    margin-bottom: 15px;
    background-color: #00ccf2;
    color: #fff;

    div {
      font-size: 16px;
      font-weight: 500;
      color: #fff;

      i {
        margin-right: 10px;
      }
    }
  }

  .score {
    background-color: #ffffff;
    padding: 10px 15px;
    border-radius: 10px;
    margin-bottom: 15px;

    div {
      font-size: 16px;
      font-weight: 500;
      color: #000;

      i {
        margin-right: 10px;
      }
    }

    .title-box {
      background-color: #384cc7;
      padding: 10px 15px;
      text-align: center;
      border-radius: 10px;
      color: #fff;
      font-size: 14px;
    }

    .score-box {
      .marks {
        text-align: center;
        margin-bottom: 15px;

        h3 {
          margin: 12px 0 2px 0;
          font-size: 38px;
          font-weight: 600;
          line-height: 1;
          color: #384cc7;
        }

        span {
          font-size: 12px;
          display: block;
        }
      }
    }
  }

  .chat {
    background-color: #ffffff;
    border-radius: 10px;

    .title-box {
      background-color: #384cc7;
      padding: 12px 15px;
      text-align: center;
      border-radius: 10px;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      color: #fff;
      font-size: 14px;
    }

    .chatbox {
      border: 1px solid rgba($color: #000000, $alpha: 0.2);
      border-top: 0;
      border-radius: 10px;
      border-top-left-radius: 0;
      border-top-right-radius: 0;

      .chat-scroll {
        overflow-y: scroll;
        height: 300px;
        width: 100%;
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

    .chat-input {
      margin-top: 15px;
      position: relative;
      width: 100%;
    }

    #chat-input {
      background: #f4f7f9;
      width: 100%;
      position: relative;
      padding: 10px 15px;
      border: none;
      resize: none;
      outline: none;
      border-top: 1px solid #ccc;
      color: #888;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }

    .chat-input>form {
      margin-bottom: 0;
    }

    .chat-actions {
      position: absolute;
      bottom: 5px;
      right: 40px;
    }

    .chat-submit {
      position: absolute;
      bottom: 0;
      right: 0;
      background: transparent;
      box-shadow: none;
      border: none;
      border-radius: 50%;
      color: #5a5eb9;
      width: 35px;
      height: 35px;
    }
  }
}

.manage {
  background-color: #fff;
  margin-top: 30px;

  .title-box {
    background-color: #00c853;
    padding: 12px 15px;
    text-align: center;
    border-radius: 10px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    color: #fff;
    font-size: 14px;
  }
}

.pro-box {
  background-color: rgb(205, 240, 234);
}

@media (max-width: 767px) {
  .row {
    display: block;
  }

  .widget {
    padding: 10px;

    .widget-title {
      h6 {
        font-size: 18px;
        line-height: 1.3;
      }
    }

    .widget-container {
      h4 {
        font-size: 18px;
        margin-bottom: 0;
      }

      div {
        p {
          display: flex;

          .q-chip {
            height: 2.5em;
          }
        }
      }
    }
  }

  .chat-box {
    margin: 15px 15px 100px;
  }
}
</style>
