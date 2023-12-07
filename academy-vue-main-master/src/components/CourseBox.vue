<template>
    <div class="course-box">
        <div class="course-image">
            <img src="https://datatrained.com/images/grad-cap.png" alt="">
        </div>
        <div class="course-info">
            <div>
                <label>{{ master_batch_name }}</label>
            </div>
            <q-btn size="sm" @click="courseRedirect(master_batch_id)" style="color: #fff; background-color: #282464; margin-top: 12px;">Continue Learning</q-btn>
        </div>
    </div>
</template>

<script setup> 
import { api, api2 } from 'boot/axios'
import { useStudentStore } from 'stores/student'
import { useRouter } from 'vue-router'
import { LocalStorage } from "quasar"

const props = defineProps({
    master_batch_name: {
      type: String,
      required: true
    },
    master_batch_id: {
      type: Number,
      required: true
    },
})

const student_info = useStudentStore()
const router = useRouter()

function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}

const courseRedirect = (master_batch_id) => {
  api2.post('generate-ed-jwt', {
    name: student_info.name,
    email: student_info.email
  })
  .then((res) => {
      openInNewTab(LocalStorage.getItem('lms_base')+'/?jwt='+res.data.access_token+'&edmingle_redirect_url='+encodeURIComponent(LocalStorage.getItem('lms_base')+'/myaccount/#/course/'+master_batch_id))
  }).catch((err) => {
      console.log(err)
  })
}

// const redirect = (type) => {
//   if(type == 'course') {
//     api.post('generate-ed-jwt', {
//       name: student_info.name,
//       email: student_info.email
//     })
//     .then((res) => {
//       console.log(res)
//       // router.push('https://datatrained.edupanion.com/?jwt='+res.data.access_token)
//       window.location.href = 'https://datatrained.edupanion.com/myaccount/#/course/1355/?jwt='+res.data.access_token
//     }).catch((err) => {
//       console.log(err)
//     })
//   }
// }
</script>

<style lang="scss" scoped>
.course-box {
  position: relative;
  display: inline-flex;
  padding-left: 4%;
  width: 300px;
  flex-grow: 1;
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
@media (max-width:767px){
.course-box {
  padding-left: 5%;
  .course-image {
    left: -4px;
    img {
      width: 40px;
    }
  }
  }
}
@media (min-width:768px) and (max-width:992px){
  .course-box {
  padding-left: 4%;
  width: 52%;
  .course-image {
    left: -4px;
    img {
      width: 40px;
    }
  }
    .course-info {
    padding-left: 20px;
    }
}
}

</style>
