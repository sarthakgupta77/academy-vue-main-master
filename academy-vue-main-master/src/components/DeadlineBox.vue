<template>
    <div @click="redirectHandler(type)" class="notice-box">
        <div class="row justify-between">
            <div class="col-md-10 flex column justify-center">
                <p><b>{{ title }}</b></p>
                <p>
                    <q-chip size="xs">{{ type }}</q-chip>
                    <!-- <q-chip v-if="status==1" size="xs">{{}}</q-chip> -->
                </p>
                <p>
                  <q-chip outline color="red" size="xs">Due Date: {{ due_date }}</q-chip>
                </p>
            </div>
            <div class="col-md-2 flex justify-center items-center">
                <q-icon v-if="type=='project'" name="fas fa-laptop"/>
                <q-icon v-if="type=='assignment'" name="fas fa-file-signature"/>
                <q-icon v-if="type=='assessment'" name="fas fa-file-alt"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
    type: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    status: {
      type: Number,
      required: true
    },
    due_date: {
      type: String,
      required: true
    },
})

const redirectHandler = (type) => {
  if (type == 'project') {
    router.push('project-details/1')
  } else if (type == 'assignment') {
    router.push('assignments')
  }
}

</script>

<style lang="scss" scoped>
.notice-box {
  cursor: pointer;
  position: relative;
  background-color: #fff;
  padding: 12px 18px;
  border-radius: 5px;
  margin-bottom: 10px;
.q-icon{
  font-size: 2.5em; 
  color:rgba(0, 0, 0, 0.3)
}
.q-chip{
      margin: 4px 4px 4px 0px;
}
  p {
    margin: 0px;
  }

  .course-image {
    position: absolute;
    left: 0px;
    top: 50%;
    transform: translateY(-45%);
    img {
      width: 50px;
      border-radius: 8px;
    }
  }
  .course-info {
    background-color: #fff;
    width: 90%;
    padding: 12px;
    padding-left: 35px;
    border-radius: 8px;
    div {
      font-size: 14px;
      font-weight: 500;
      overflow: hidden;
      height: 42px;
      label {
        white-space: pre-wrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>