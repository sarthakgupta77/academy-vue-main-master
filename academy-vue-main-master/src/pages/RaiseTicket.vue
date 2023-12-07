<template>
  <q-page class="q-py-md">
    <div class="row" style="width: 100%">
      <div class="offset-lg-2 offset-md-2 offset-sm-2 col-lg-8 col-md-8 col-sm-10 col-12 q-pa-sm" >
        <div class="row" style="width: 100%">
          <div class="col-md-12 col-12">
            <div class="box">
              <div class="row">
                <div class="col-md-12 col-12">
                  <div class="q-pa-md">
                    <div class="widget">
                      <div   class="widget-title flex align-center justify-between" >
                        <h6>Ask Academic Doubt</h6>
                        <q-btn @click="backButton" color="primary" label="Back" />
                      </div>
                    </div>
                    <q-form action="" method="" class="q-px-md">
                      <q-input  outlined dense v-model="data.ticketSubject" label="Subject" class="q-mb-md" />
                      <q-select fill-input outlined dense v-model="data.priority" :options="role" label="Priority" class="q-mb-md" />
                      <!-- <q-select
                        fill-input
                        outlined
                        dense
                        v-model="data.batch_id"
                        :options="data.batch.map(getBatch)"
                        label="Batch"
                        class="q-mb-md"
                      /> -->
                      <q-select  fill-input outlined dense v-model="data.ticketCategory" :options="data.categories" label="Query Type" class="q-mb-md" />
                      <q-editor class="q-mb-md" style="width: 100%" v-model="data.ticketBody" :dense="$q.screen.lt.md"
                        :toolbar="[
                          [
                            {
                              label: $q.lang.editor.align,
                              icon: $q.iconSet.editor.align,
                              fixedLabel: true,
                              list: 'only-icons',
                              options: ['left', 'center', 'right', 'justify'],
                            },
                          ],
                          [
                            'bold',
                            'italic',
                            'strike',
                            'underline',
                            'subscript',
                            'superscript',
                          ],
                          ['token', 'hr', 'link', 'custom_btn'],
                          ['print', 'fullscreen'],
                          [
                            {
                              label: $q.lang.editor.formatting,
                              icon: $q.iconSet.editor.formatting,
                              list: 'no-icons',
                              options: [
                                'p',
                                'h1',
                                'h2',
                                'h3',
                                'h4',
                                'h5',
                                'h6',
                                'code',
                              ],
                            },
                            {
                              label: $q.lang.editor.fontSize,
                              icon: $q.iconSet.editor.fontSize,
                              fixedLabel: true,
                              fixedIcon: true,
                              list: 'no-icons',
                              options: [
                                'size-1',
                                'size-2',
                                'size-3',
                                'size-4',
                                'size-5',
                                'size-6',
                                'size-7',
                              ],
                            },
                            {
                              label: $q.lang.editor.defaultFont,
                              icon: $q.iconSet.editor.font,
                              fixedIcon: true,
                              list: 'no-icons',
                              options: [
                                'default_font',
                                'arial',
                                'arial_black',
                                'comic_sans',
                                'courier_new',
                                'impact',
                                'lucida_grande',
                                'times_new_roman',
                                'verdana',
                              ],
                            },
                            'removeFormat',
                          ],
                          [
                            'quote',
                            'unordered',
                            'ordered',
                            'outdent',
                            'indent',
                          ],
                          ['undo', 'redo'],
                          ['viewsource'],
                        ]"
                        :fonts="{
                          arial: 'Arial',
                          arial_black: 'Arial Black',
                          comic_sans: 'Comic Sans MS',
                          courier_new: 'Courier New',
                          impact: 'Impact',
                          lucida_grande: 'Lucida Grande',
                          times_new_roman: 'Times New Roman',
                          verdana: 'Verdana',
                        }"
                      />
                      <!-- <q-file v-model="files" max-files="10" counter dense label="Pick files" outlined use-chips multiple class="q-mb-md" /> -->
                      <!-- <q-uploader class="q-mb-md" url="" label="Attach File" multiple square flat bordered
                        color="indigo" /> -->
                      <div v-html="data.attachments"></div>
                      <q-file  label="Upload Attachment" outlined  v-model="data.file"  @update:model-value="uploadFile" >
                        <template v-slot:prepend>
                          <q-icon name="attach_file" />
                        </template>
                      </q-file>
                      <div class="text-center">
                        <q-btn  @click="raiseTicket" :loading="data.disable"  size="16px"  class="q-mt-md" label="Submit Query" type="button" color="teal" />
                      </div>
                    </q-form>
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
import { formApi, api2,stuApi } from "src/boot/axios";
import { onBeforeMount, reactive, ref } from "vue";
import { useRouter } from "vue-router";

const role = [
  {
    value: "L",
    label: "Low",
  },
  {
    value: "M",
    label: "Medium",
  },
  {
    value: "H",
    label: "High",
  },
  {
    value: "U",
    label: "Urgent",
  },
];

const qeditor = ref(
  "<pre>Check out the two different types of dropdowns" +
    ' in each of the "Align" buttons.</pre> '
);
const files = ref(null);

const data = reactive({
  categories: [],
  batches: [],
  batch_id: null,
  ticketCategory: null,
  ticketCategory: null,
  ticketSubject: null,
  priority: null,
  ticketBody: "",
  file: null,
  attachments: "",
  disable: false,
  FormData: null,
});

const router = useRouter();

const backButton = () => {
  router.push("doubts");
};

const uploadFile = () => {
  data.disable = true;
  data.FormData = new FormData();
  data.FormData.append("file", data.file);
  api2
    .post("upload-student-file", data.FormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      // console.log(res)
      data.attachments += '<br><a href="https://genesis.datatrained.com/' + res.data.path +  '" target="_blank">File Attachment</a>';
      data.file = null;
      data.disable = false;
    });
};

const raiseTicket = () => {
  var batch = data.batches.map(function(item) {
  return item['actual_master_batch_name'];
});
  formApi
    .post("raise-ticket", {
      batch:batch.toString(),
      cat_id: data.ticketCategory.value,
      title: data.ticketSubject,
      ticket_body: data.ticketBody + data.attachments,
      user_id: LocalStorage.getItem("student_user_id"),
      priority: data.priority.value,
      user_email: LocalStorage.getItem("email"),
    })
    .then((res) => {
      router.push("query-details/" + res.data.ticket_id);
    });
};

onBeforeMount(() => {
  formApi.get("get-ticket-category").then((res) => {
    data.categories = res.data.category;
  });
  stuApi
    .get("student/masterbatches?tag_ids=9&search=")
    .then((res) => {
      data.batches = res.data.batches;
    })
    .catch((err) => {
      console.log(err);
    });
});

// const getBatch = (item)=>{
// return item.actual_master_batch_name
// }
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

  .q-uploader {
    width: 100%;
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
    white-space: nowrap;
    position: relative;
  }
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
  .box {
    margin-bottom: 60px;
  }
}
</style>
