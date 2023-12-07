<template>
    <div class="project-box">
      <a :href="`project-details/`+project_id">
        <div class="project-image">
            <img src="https://datatrained.com/images/project.png" alt="">
        </div>
        <div class="project-info">
            <div class="label">
                <label>{{ title }}</label>
            </div>
            <div>
                <p>
                    <q-chip v-if="type==0" size="xs">Practice</q-chip>
                    <q-chip v-if="type==1" size="xs">Evaluation</q-chip>
                    <q-chip v-if="type==2" size="xs">Extra</q-chip>

                    <q-chip v-if="status==0" class="project-color1" text-color="white" size="xs">New</q-chip>
                    <q-chip v-if="status==1" class="project-color2" text-color="white" size="xs">Pending</q-chip>
                    <q-chip v-if="status==2" class="project-color3" text-color="white" size="xs">Action Required</q-chip>
                    <q-chip v-if="status==3" class="project-color4" text-color="white" size="xs">Submitted</q-chip>
                    <q-chip v-if="status==4" class="project-color5" text-color="white" size="xs">Evaluated</q-chip>
                </p>
                <p>
                  <q-chip v-if="moment(due_date).diff(moment(), 'days') <= 2" outline color="red" size="xs">Due Date: {{ moment(due_date).format("DD MMM Y") }}</q-chip>
                  <q-chip v-else-if="due_date==null" outline color="blue" size="xs">Due Date: N/A</q-chip>
                  <q-chip v-else outline color="green" size="xs">Due Date: {{ moment(due_date).format("DD MMM Y") }}</q-chip>
                </p>
            </div>
        </div>
      </a>
    </div>
</template>

<script setup>

import moment from 'moment'

const props = defineProps({
  project_id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  due_date: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }

})

</script>

<style lang="scss" scoped>
.project-box {
  position: relative;
  display: inline-block;
//   padding-left: 4%;
  width: 300px;
  margin-right: 20px;
  a {
    text-decoration: none;
    color: #000;
  }
  .project-image {
    position: absolute;
    left: 10px;
    top: 10%;
    img {
      width: 40px;
      border-radius: 8px;
    }
  }
  .project-info {
    background-color: #fff;
    width: 100%;
    padding: 12px;
    padding-left: 60px;
    border-radius: 8px;
    .label {
      font-size: 14px;
      font-weight: 500;
      overflow: hidden;
      height: 42px;
      label {
        white-space: pre-wrap;
        text-overflow: ellipsis;
      }
    }
    p {
        margin: 0;
    }
  }
}

.project-color1 {
  background-color: #00ccf2;
}
.project-color2 {
  background-color: #f2c600;
}
.project-color3 {
  background-color: #f24d00;
}
.project-color4 {
  background-color: #002cf2;
}
.project-color5 {
  background-color: #00aa69;
}

@media (max-width:767px){
  .project-box{
    width: 100%;
  }

}
</style>
