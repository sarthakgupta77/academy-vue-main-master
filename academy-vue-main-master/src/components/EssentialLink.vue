<template>
  <q-item
    clickable
    tag="a"
    target="_blank"
    @click="redirect(link)"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" :style="{ color: color }" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <!-- <q-item-label caption>{{ caption }}</q-item-label> -->
    </q-item-section>
  </q-item>
</template>

<script setup>
import { api } from 'boot/axios'
import { useStudentStore } from 'stores/student'
import { useRouter } from 'vue-router'
import { LocalStorage } from 'quasar'

const props = defineProps({
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    },

    color: {
      type: String,
      default: '#000'
    }
})

const student_info = useStudentStore()
const router = useRouter()

const redirect = (link) => {
  if(link == 'lms') {
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
  } else if(link == 'fee') {
    api.post('generate-ed-jwt', {
      name: student_info.name,
      email: student_info.email
    })
    .then((res) => {
      // router.push('https://datatrained.edupanion.com/?jwt='+res.data.access_token)
      window.location.href = 'https://datatrained.edupanion.com/myaccount/#/purchases/?jwt='+res.data.access_token
    }).catch((err) => {
      console.log(err)
    })
  } else if(link == 'tickets') {
    window.location.href = 'https://support.datatrained.com/client/panel/dashboard.html'
  } else if(link == 'projects') {
    window.location.href = 'https://support.datatrained.org/main/project'
  } else if(link == 'resume') {
    window.location.href = 'https://academy.datatrained.com/resume?user_token='+LocalStorage.getItem('token')
  } else {
    router.push(link)
  }
}

</script>
