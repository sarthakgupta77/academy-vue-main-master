<template>
  <q-page class="q-py-md">
    <div class="row" style="width: 100%;">
      <div class="offset-lg-2 offset-md-2 offset-sm-2 col-lg-9 col-md-9 col-sm-10 col-12 q-pa-sm">
        <div class="row" style="width: 100%;">
          <div class="col-md-12 col-12">
            <div class="box">
              <div class="row">
                <div class="col-md-12 col-12">
                  <div class="q-pa-md">
                    <div class="widget">
                      <div class="widget-title">
                        <h6>Track ID: {{ data.ticketDetail.ticket_track_id }}</h6>
                        <q-chip v-if="data.ticketDetail.status == 'N'" text-color="white" color="cyan-5">New</q-chip>
                        <q-chip v-if="data.ticketDetail.status == 'C'" text-color="white" color="green">Closed</q-chip>
                        <q-chip v-if="data.ticketDetail.status == 'P'" text-color="white" color="cyan-5">In Progress
                        </q-chip>
                        <q-chip v-if="data.ticketDetail.status == 'R'" text-color="white" color="cyan-5">Re-Open
                        </q-chip>
                        <q-chip v-if="data.ticketDetail.status == 'A'" text-color="white" color="red">Action Required
                        </q-chip>
                      </div>
                      <div class="widget-container overflow-y notice-board-container" style="background-color: #D2DAFF">
                        <div class="no-deadline">
                          <h6 class="q-my-xs">{{ data.ticketDetail.title }}</h6>
                        </div>
                        <div class="deadline-msg">
                          <div v-html="data.ticketDetail.ticket_body"></div>
                        </div>
                      </div>
                      <div class="widget-container overflow-y notice-board-container">
                        <div class="row">
                          <div class="col-md-7 col-sm-12 col-12">
                            <div>
                              <table>
                                <tr>
                                  <th colspan="2">Details</th>
                                </tr>
                                <tr>
                                  <th>Track ID</th>
                                  <td>{{ data.ticketDetail.ticket_track_id }}</td>
                                </tr>
                                <tr>
                                  <th>Priority</th>
                                  <td v-if="data.ticketDetail.priroty == 'L'">Low</td>
                                  <td v-if="data.ticketDetail.priroty == 'M'">Medium</td>
                                  <td v-if="data.ticketDetail.priroty == 'H'">High</td>
                                  <td v-if="data.ticketDetail.priroty == 'U'">Urgent</td>
                                </tr>
                                <!-- <tr>
                                  <th>Ticket Category</th>
                                  <td>Academics » Software Development</td>
                                </tr> -->
                                <!-- <tr>
                                  <th>Assigned On</th>
                                  <td>Farhad Khan</td>
                                </tr> -->
                                <tr>
                                  <th>Opened Time</th>
                                  <td>{{ data.ticketDetail.opened_time }}</td>
                                </tr>
                                <tr>
                                  <th>Last Replied Time</th>
                                  <td>{{ data.ticketDetail.last_reply_time }}</td>
                                </tr>
                                <tr>
                                  <th>Status</th>
                                  <td v-if="data.ticketDetail.status == 'N'">New</td>
                                  <td v-if="data.ticketDetail.status == 'C'">Closed</td>
                                  <td v-if="data.ticketDetail.status == 'P'">In Progress</td>
                                  <td v-if="data.ticketDetail.status == 'R'">Re-Open</td>
                                  <td v-if="data.ticketDetail.status == 'A'">Action Required</td>
                                </tr>
                              </table>
                              <div class="closeTicketBtn">
                                <q-btn v-if="data.ticketDetail.status == 'C'" @click="changeTicketStatus('R')"
                                  color="primary" label="Re-Open Doubt" class="full-width" />
                                <q-btn v-else @click="changeTicketStatus('C')" color="primary" class="full-width"
                                  label="Close Doubt" />
                              </div>
                            </div>
                          </div>
                          <div class="offset-md-1 col-md-4 col-sm-12 col-12">
                            <div class="chat">
                              <div class="title-box">Mentor Connect</div>
                              <div class="row justify-center chatbox">
                                <div class="chat-scroll" id="myChatBox">
                                  <div v-for="chat in data.ticketReply" :key="chat.id" v-bind="chat" class="q-pa-md"
                                    style="width: 100%; padding:5px 10px">
                                    <q-chat-message v-if="chat.replied_by_type == 'A'" bg-color="cyan-2"
                                      style="font-size:13px; white-space: normal; word-break: break-word;  height:32x">
                                      <div v-html="chat.reply_text"></div>
                                    </q-chat-message>
                                    <q-chat-message v-else bg-color="grey-2"
                                      style="font-size:13px; white-space: normal; word-break: break-word; height:32x" sent>
                                      <div v-html="chat.reply_text"></div>
                                    </q-chat-message>

                                    <!-- <q-input v-model="text" label="Typing" :dense="dense" class="typing">
                                              <template v-slot:append>
                                                  <q-icon v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer" />
                                              </template>
                                              <template v-slot:after>
                                                  <q-btn round dense flat icon="send" />
                                              </template>
                                          </q-input> -->
                                  </div>
                                </div>

                                <div v-if="data.ticketDetail.status !== 'C'" class="chat-input">
                                  <!-- <form> -->
                                    <input type="text" id="chat-input" placeholder="Send a message..."
                                      v-model="data.chatMsg" @keydown.enter="sendMessage" />
                                    <q-fab class="chat-actions" padding="xs" color="info" glossy
                                      icon="keyboard_arrow_up" direction="up">
                                      <q-fab-action label-position="left" color="primary" @click="importData"
                                        icon="attach_file" label="Upload File" />
                                      <!-- <input type="file" label-position="left" color="primary" icon="attach_file" label="Upload File" /> -->

                                      <!-- <q-fab-action label-position="left" color="secondary" @click="onClick" icon="link"
                                        label="Insert Link" /> -->
                                    </q-fab>
                                  <!-- </form> -->
                                    <q-btn class="chat-submit" @click="sendMessage"  @keydown.enter="sendMessage" round flat icon="send" />
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { onBeforeMount, reactive, ref } from 'vue'
import { api, api2, formApi } from 'boot/axios'
import { LocalStorage } from 'quasar';
import { useRoute } from 'vue-router';

const route = useRoute()

const data = reactive({
  tab: 'evaluation',
  projects: null,
  evaluation: [],
  practice: [],
  extra: [],
  studentID: null,
  ticketDetail: [],
  ticketReply: [],
  chatMsg: null,
})

setTimeout(() => {
  const element = document.getElementById('myChatBox');
  element.scrollTop = element.scrollHeight
}, 1000)

const changeTicketStatus = (status) => {
  formApi.post('change-ticket-status', {
    status: status,
    ticket_id: route.params.id,
    track_id : data.ticketDetail.ticket_track_id
  }).then(() => {
    formApi.get('get-ticket-detail', {
      params: {
        ticket_id: route.params.id
      }
    }).then((res) => {
      data.ticketDetail = res.data.details
      data.ticketReply = res.data.replies
    })
  })
}

const sendMessage = () => {
  formApi.post('save-ticket-reply', {
    ticket_id: route.params.id,
    assigned_by: data.ticketDetail.assigned_on,
    reply_text: data.chatMsg
  }).then(() => {
    formApi.get('get-ticket-detail', {
      params: {
        ticket_id: route.params.id
      }
    }).then((res) => {
      data.ticketDetail = res.data.details
      data.ticketReply = res.data.replies
    })
    data.chatMsg = ''
  })
}

var intervalId = window.setInterval(function(){
formApi.get('get-ticket-detail', {
      params: {
        ticket_id: route.params.id
      }
    }).then((res) => {
      data.ticketDetail = res.data.details
      data.ticketReply = res.data.replies
    })
}, 30000);

function importData() {
  let input = document.createElement('input');
  input.type = 'file';
  input.onchange = _ => {
    let files = Array.from(input.files);

    var formData = new FormData();
    var imagefile = files;
    formData.append("file", imagefile[0]);

    api2.post('upload-student-file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(function (res) {
      if (res.data.msg == 'File Uploaded') {
        confirm("File Sent For this Ticket Successfully!")
        formApi.post('save-ticket-reply', {
          ticket_id: route.params.id,
          assigned_by: data.ticketDetail.assigned_on,
          reply_text: '<a href="https://genesis.datatrained.com/' + res.data.path + '" target="_blank">File Attachment</a>'
        }).then(() => {
          formApi.get('get-ticket-detail', {
            params: {
              ticket_id: route.params.id
            }
          }).then((res) => {
            data.ticketDetail = res.data.details
            data.ticketReply = res.data.replies
          })
          data.chatMsg = ''
        })
      } else {
        confirm("An error occurred, please try again")
      }
    })
  };
  input.click();

}

onBeforeMount(() => {
  api2.get('project-students')
    .then((res) => {
      //  data.studentID = res.data.data[0].student_id
      data.projects = res.data.data
      data.evaluation = data.projects.filter(function (el) { return el.type == 1; })
      data.practice = data.projects.filter(function (el) { return el.type == 0; })
      data.extra = data.projects.filter(function (el) { return el.type == 2; })
    })

  formApi.get('get-ticket-detail', {
    params: {
      ticket_id: route.params.id
    }
  }).then((res) => {
    data.ticketDetail = res.data.details
    data.ticketReply = res.data.replies
  })
})

</script>

<style lang="scss" scoped>
table,
tr,
td,
th {
  border: 1px solid #afaeae;
  border-collapse: collapse;
  font-size: 10px;
}

table {
  width: 100%;
  margin-bottom: 18px;
}

.closeTicketBtn {
  margin: 10px 0;
  width: 100%;
}

td,
th {
  padding: 3px 8px;
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
    color: #5A5EB9;
    width: 35px;
    height: 35px;
  }
}

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
    padding: 12px;
    margin-top: 20px;
    border-radius: 8px;
    width: 100%;
    white-space: nowrap;
    position: relative;

    .no-deadline {
      padding: 11px 15px;
      border-bottom: 1px solid #ccc;

      h6 {
        font-size: 16px;
        line-height: 16px;
      }
    }

    .deadline-msg {
      padding: 11px 15px 1px;
      white-space: normal;

      div {
        p {
          margin-bottom: 0 !important;
        }
      }

    }
  }
}

.pro-box {
  background-color: rgb(205, 240, 234);
}

@media (max-width:767px) {
  .widget {
    padding: 5px;

    .widget-container {
      padding: 0px;
    }

    .widget-title {
      h6 {
        font-size: 15px;
        line-height: 18px;
        margin-bottom: 14px;
      }
    }
  }

  .chat {
    margin: 15px 0 35px;

  }

  .box {
    margin-bottom: 60px;
  }
}
</style>
