<template>
<div class="wrapper">
  <div class="boarding-box">
    <div class="stepper-box">
      <q-stepper v-model="step" ref="stepper" alternative-labels color="positive" active-color="positive"
          done-color="positive" animated>
          <q-step :name="1" title="Basic Details" prefix="1" :done="step > 1">
            <q-input outlined dense v-model="name" label="Full Name (Required*)"  class="q-mb-sm imp" @change="validateValues" :rules="[val => !!val || 'Field is required']" />
            <q-input outlined dense v-model="phone" label="Phone Number (Required*)" @change="validateValues" class="q-mb-sm imp" :rules="[val => !!val || 'Field is required']" />
            <hr style="margin-bottom:19px;">
            <q-input use-input fill-input outlined dense v-model="degree"
              label="Enter Your Current/Latest Degree" class="q-mb-md" />
            <q-input outlined dense v-model="graduated_in" label="Graduation Year" class="q-mb-md" />
            <q-input outlined dense v-model="college_name" label="College Name" class="q-mb-md" />
                        <hr style="margin-bottom:17px;">

            <q-input outlined dense v-model="current_company" label="Enter Your Current/Latest Company" class="q-my-md q-mt-3" />
            <!-- <q-select use-input fill-input outlined dense v-model="current_role" label="Current Role"
              class="q-mb-md" options="sde" /> -->
            <q-input use-input fill-input outlined dense v-model="current_role" label="Current role"
              class="q-mb-md" />
            

            <!-- <q-select
                        filled
                        v-model="model"
                        use-input
                        use-chips
                        multiple
                        input-debounce="0"
                        @new-value="createValue"
                        :options="filterOptions"
                        @filter="filterFn"
                        style="width: 250px"
                     /> -->

            <!-- <q-toggle class="q-mb-md"
                        v-model="value"
                        label="I wish to receive further updates and confirmation via Whatsapp and Email"
                        color="blue"
                    /> -->
          </q-step>
          <q-step :name="2" prefix="2" title="Aspiration" :done="step > 2">
            <div class="q-mb-sm">
              <strong>1. What are you more inclined towards learning?</strong>
            </div>
            <div class="q-gutter-sm">
              <q-checkbox dense v-model="add_info" val="Data Science and AI" label="Data Science and AI" color="indigo" /><br />
              <q-checkbox dense v-model="add_info" val="Full Stack Web Development" label="Full Stack Web Development" color="indigo" /><br />
              <q-checkbox dense v-model="add_info" val="Data Analytics" label="Data Analytics" color="indigo" /><br />
              <q-checkbox dense v-model="add_info" val="Investment Banking and Capital Market" label="Investment Banking and Capital Market" color="indigo" /><br />
              <q-checkbox dense v-model="add_info" val="Data Structures and Algorithms" label="Data Structures and Algorithms" color="indigo" /><br />
            </div>
            <!-- <div v-for="info in add_info" :key="info.id" class="q-gutter-sm">
              <q-checkbox dense v-model="info.text" :label="info.text" color="teal" /><br />
            </div> -->
            <div class="q-my-md">
              <strong>2. What is your long term career goal?</strong>
            </div>
            <div class="q-gutter-sm">
              <q-checkbox v-model="career_goal" dense val="Start Building Products" label="Start Building Products" color="indigo" /><br />
              <q-checkbox v-model="career_goal" dense val="Move to startup Ecosystem" label="Move to startup Ecosystem" color="indigo" /><br />
              <q-checkbox v-model="career_goal" dense val="Move to MNC" label="Move to MNC" color="indigo" /><br />
              <q-checkbox v-model="career_goal" dense val="Change in my industry" label="Change in my industry" color="indigo" /><br />
              <q-checkbox v-model="career_goal" dense val="Change in area of my experties" label="Change in area of my experties" color="indigo" /><br />
              <q-checkbox v-model="career_goal" dense val="Grow into leadership roles in my current organization" label="Grow into leadership roles in my current organization"
                color="indigo" />
            </div>

          </q-step>
          <q-step :name="3" title="Guidance" prefix="3">
            <div class="q-my-md">
              <strong>1. What additional information are you interested in ?</strong>
            </div>
            <div class="q-gutter-sm">
              <q-checkbox v-model="interests" val="Companies & roles" dense label="Companies & roles" color="indigo" /><br />
              <q-checkbox v-model="interests" val="Experience of people" dense label="Experience of people" color="indigo" /><br />
              <q-checkbox v-model="interests" val="DataTrained" dense label="DataTrained" color="indigo" /><br />
              <q-checkbox v-model="interests" val="Enrollment & Payment" dense label="Enrollment & Payment" color="indigo" /><br />
              <q-checkbox v-model="interests" val="Nothing, just exploring" dense label="Nothing, just exploring" color="indigo" />
            </div>
            <div class="q-my-md">
              <strong>2. What type of guidance are you seeking?</strong>
            </div>
            <div class="q-gutter-sm">
              <q-checkbox v-model="guidance" val="Industry Expert" dense label="Industry Expert" color="indigo" /><br />
              <q-checkbox v-model="guidance" val="Skill Expert" dense label="Skill Expert" color="indigo" /><br />
              <q-checkbox v-model="guidance" val="Startups Experience" dense label="Startups Experience" color="indigo" />
            </div>

          </q-step>
          <template v-slot:navigation>
            <q-stepper-navigation>
              <!-- <q-btn @click="$refs.stepper.next()" color="purple" :label="step === 3 ? 'Finish' : 'Continue'" /> -->
              <q-btn v-if="step > 1" color="primary" @click="$refs.stepper.previous()" label="Back" outline class="q-mr-md" />
              <q-btn v-if="step < 3" @click="$refs.stepper.next()"  :disable="disabledButton" color="primary" :label="'Continue'" id="button" class="q-mr-md" />
              <!-- <q-btn v-if="step < 3" @click="$refs.stepper.next()"  :disable="(customModel == 'yes') ? false : true" color="primary" :label="'Continue'" id="button" class="q-mr-md" /> -->
              <!-- <q-btn v-if="step < 3" @click="validateValues"  color="primary" :label="'dfghjk'" id="button" class="q-mr-md" /> -->
              <q-btn v-if="step == 2" @click="$refs.stepper.next()" color="primary" :label="'Skip & Continue'" id="button" />
              <q-btn v-if="step === 3" @click="onFinishClick" color="primary" :label="'Submit'" class="q-mr-md" />
              <q-btn v-if="step === 3" @click="onFinishClick" color="primary" :label="'Skip & Submit'" />
            </q-stepper-navigation>
          </template>
      </q-stepper>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref } from 'vue'
import { onBeforeMount } from 'vue'
import { api2 } from 'boot/axios'
import { LocalStorage } from 'quasar';
import { useRouter } from 'vue-router';
import { useStudentStore } from 'stores/student'
const step = ref(1)
const router = useRouter()
const student = useStudentStore()
const name = ref('')
const phone = ref('')
const college_name = ref('')
const current_company = ref()
const current_role = ref('')
const degree = ref('')
const graduated_in = ref()
const add_info = ref([])
const career_goal = ref([])
const interests = ref([])
const guidance = ref([])
const disabledButton = ref(true);
const customModel = ref('no')

const validateValues = () =>{
  if (name.value == '' || phone.value =='') {
    disabledButton.value = true  
  }else{
    disabledButton.value = false  
  }
}

const onFinishClick = () => {
  
  api2.post('save-student-profile', {
      student_id: LocalStorage.getItem("student_user_id"),
      name: name.value,
      phone: phone.value,
      college_name: college_name.value,
      current_company: current_company.value,
      designation: current_role.value,
      degree: degree.value,
      graduation_year: graduated_in.value,
      additional_info: JSON.stringify(add_info.value),
      career_goal: JSON.stringify(career_goal.value),
      interests: JSON.stringify(interests.value),
      seeking_guidance: JSON.stringify(guidance.value)
  }).then((res) => {
    if(res.status == 200) {
      router.push('/')
    }
  })
}
   // const filterOptions = ref(stringOptions)
   // createValue = (val, done) => {
   //    if (val.length > 0) {
   //       if (!stringOptions.includes(val)) {
   //          stringOptions.push(val)
   //       }
   //       done(val, 'toggle')
   //    }
   // }
   // filterFn = (val, update) => {
   //    update(() => {
   //       if (val === '') {
   //          filterOptions.value = stringOptions
   //       }
   //       else {
   //          const needle = val.toLowerCase()
   //          filterOptions.value = stringOptions.filter(
   //             v => v.toLowerCase().indexOf(needle) > -1
   //          )
   //       }
   //    })
   // }
</script>

<style lang="scss" scoped>
.wrapper{
    padding: 15px;
    height: 100vh;
    display: flex;
    justify-content: center;
      .boarding-box{
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        .stepper-box{
          width: 60%;
          height: max-content;
      }
    }
  }
@media (min-width: 768px) and (max-width:1200px){
  .wrapper{
    .boarding-box{
      .stepper-box{
        width: 80%;
      }
    }
  }
}
@media (max-width:767px){
  .wrapper{
    height: auto;
    .boarding-box{
      .stepper-box{
        width: 100%;
      }
    }
  }
}
</style>
