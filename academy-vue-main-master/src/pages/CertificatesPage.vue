<template>
  <q-page class="q-py-md">
    <div class="row" style="width: 100%">
      <div class="offset-lg-2 offset-md-2 offset-sm-2 col-lg-9 col-md-9 col-sm-10 col-12 q-pa-sm">
        <div class="row" style="width: 100%">
          <div class="col-md-12 col-12">
            <div class="box">
              <div class="row">
                <div class="col-md-12 col-12">
                  <div class="q-pa-md">
                    <div class="widget">
                      <div class="widget-title">
                        <h6>Certificates</h6>
                      </div>

                      <q-card flat>
                        <q-tabs v-model="tab" dense class="text-grey" active-color="indigo-8" indicator-color="indigo-8"
                          narrow-indicator>
                          <q-tab name="certificate" label="Certificates" />
                          <q-tab name="reportCard" label="Report Card" />
                        </q-tabs>

                        <q-separator />

                        <q-tab-panels v-model="tab" animated>
                          <q-tab-panel name="certificate">
                            <div class="widget-container">
                              <div class="row justify-center">
                                <div v-if="data.certificates.length > 0" v-for="certificate in data.certificates" :key="certificate.certificate_id" v-bind="certificate" class="col-md-3 col-sm-6 col-12 q-pa-sm">
                                  <q-card class="my-card">
                                    <q-img src="https://datatrained.com/images/certificate-academy.png">
                                      <div class="absolute-bottom background-color">
                                        <h3>
                                          {{ certificate.course_name }}
                                        </h3>
                                        <!-- <div class="text-subtitle2">
                                        <q-icon name="arrow_right" />
                                        Project Completion
                                      </div> -->
                                      </div>
                                    </q-img>
                                    <q-card-actions class="btn-box justify-center">
                                      <q-btn @click="onViewClick(certificate_id=certificate.certificate_id, email=certificate.email)" icon="visibility" color="indigo-5" size="sm">&nbsp; View</q-btn>
                                      <!-- <q-btn @click="onDownloadClick()" icon="download" outline color="indigo-5" size="sm">&nbsp; Download</q-btn> -->
                                    </q-card-actions>
                                  </q-card>
                                </div>

                                <div v-else>
                                  <h4>No Certificates issued!</h4>
                                </div>
                              </div>
                            </div>
                          </q-tab-panel>

                          <q-tab-panel name="reportCard">
                            <div class="widget-container">
                              <div class="row justify-center">
                                <div v-if="data.reportCards.length > 0" v-for="card in data.reportCards" :key="card.certificate_id" v-bind="card" class="col-md-3 col-sm-6 col-12 q-pa-sm">
                                  <q-card class="my-card">
                                    <q-img src="https://datatrained.com/images/certificate-academy.png">
                                      <div class="absolute-bottom background-color">
                                        <h3>
                                          {{ card.course }}
                                        </h3>
                                        <!-- <div class="text-subtitle2">
                                        <q-icon name="arrow_right" />
                                        Project Completion
                                      </div> -->
                                      </div>
                                    </q-img>
                                    <q-card-actions class="btn-box justify-center">
                                      <q-btn @click="onCardViewClick(enrolment_id=card.enrolment_id)" icon="visibility" color="indigo-5" size="sm">&nbsp; View</q-btn>
                                      <!-- <q-btn icon="download" outline color="indigo-5" size="sm">&nbsp; Download</q-btn> -->
                                    </q-card-actions>
                                  </q-card>
                                </div>

                                <div v-else>
                                  <h4>No Report Card issued!</h4>
                                </div>
                              </div>
                            </div>
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
    </div>
  </q-page>
</template>

<script setup>
import { LocalStorage } from 'quasar';
import { api2 } from 'src/boot/axios';
import { ref, onBeforeMount, reactive } from 'vue';

const tab = ref("certificate");

const data = reactive({
  reportCards: [],
  certificates: [],
})

// function download(url) {
//   const a = document.createElement('a')
//   a.href = url
//   a.download = url.split('/').pop()
//   document.body.appendChild(a)
//   a.click()
//   document.body.removeChild(a)
// }

const onViewClick = (certificate_id, email) => {
  window.open("https://datatrained.com/api/view-certificate/"+certificate_id+'/'+email, '_blank').focus();
}

// const onDownloadClick = () => {
//   download("https://datatrained.com/certificates/CER5s9EnbZ.pdf")
// }

const onCardViewClick = (enrolment_id) => {
  window.open("https://datatrained.com/api/view-report-card/"+enrolment_id, '_blank').focus();
}

onBeforeMount(() => {
  api2.get('get-certificates', {
    params: {
      stu_email: LocalStorage.getItem("email")
    }
  }).then((res)=> {
    // console.log(res.data)
    data.reportCards = res.data.cards
    data.certificates = res.data.certificates
  })
})

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
    padding: 20px;
    margin-top: 20px;
    border-radius: 8px;
    width: 100%;
    position: relative;

    .my-card {
      img {
        width: 100%;
      }

      .background-color {
        background-color: rgba($color: #000, $alpha: 0.6);
        padding: 9px 12px;
      }

      h3 {
        font-size: 13px;
        font-weight: 500;
        line-height: 1.5;
        margin: 0 0 4px;
        color: #fff;
      }

      .text-subtitle2 {
        color: #fff;
        font-size: 12px;
      }

      .btn-box {
        padding: 14px 8px;
      }
    }
  }
}

@media (min-width: 1024px) and (max-width: 1200px) {
  .widget {
    .widget-container {
      .my-card {
        h3 {
          font-size: 10px;
          margin-bottom: 0;
        }

        .text-subtitle2 {
          font-size: 9px;
        }
      }
    }
  }
}

@media (max-width: 767px) {
  .box {
    margin-bottom: 50px;
  }

  .widget {
    padding: 5px;

    .widget-container {
      padding: 0px;

      .my-card {
        .background-color {
          background-color: rgba($color: #5c6bc0, $alpha: 0.8);
          padding: 7px 10px;
        }

        h3 {
          font-size: 12px;
        }

        .text-subtitle2 {
          font-size: 11px;
        }
      }
    }
  }
}
</style>
