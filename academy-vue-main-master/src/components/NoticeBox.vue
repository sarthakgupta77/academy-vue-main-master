<template>
    <div class="notice-box">
        <div class="row  items-center">
          <div class="col-md-2 col-2 text-center">
            <q-icon v-if="type=='live-class'" name="fas fa-satellite-dish" style="font-size: 1.4em;"/>
            <q-icon v-if="type=='assessment'" name="fas fa-file-signature" style="font-size: 1.4em;"/>
            <q-icon v-if="type=='ticket'" name="fas fa-ticket-alt" style="font-size: 1.4em;"/>
            <q-icon v-if="type=='assignment'" name="fas fa-file-alt" style="font-size: 1.4em;"/>
          </div>
          <div class="col-md-10 col-10">
            <p>{{ text }}</p>
          </div>
        </div>
    </div>
</template>

<script setup>
import { api } from 'boot/axios'
import { useStudentStore } from 'stores/student'
import { useRouter } from 'vue-router'

const props = defineProps({
    type: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
})

const student_info = useStudentStore()
const router = useRouter()

const redirect = (type) => {
  if(type == 'live-class') {
    api.post('generate-ed-jwt', {
      name: student_info.name,
      email: student_info.email
    })
    .then((res) => {
      // router.push('https://datatrained.edupanion.com/?jwt='+res.data.access_token)
      window.location.href = 'https://datatrained.edupanion.com/?jwt='+res.data.access_token
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>

<style lang="scss" scoped>
.notice-box {
  position: relative;
  background-color: #fff;
  padding: 12px 5px;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  p {
    margin: 0px;
    font-size: 13px;
  }
}
@media (max-width:767px){
.notice-box{
  padding: 12px 10px;
}

}
</style>
