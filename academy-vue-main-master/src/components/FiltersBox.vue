<template>
   <div class="filter-box">
      <q-list bordered>
         <div class="filter-text flex justify-between align-center q-pa-md">
            <span class="text-weight-bold">Filter Jobs</span>
            <q-btn outline dense color="indigo" size="sm" label="Clear All" />
         </div>
         <q-expansion-item
            group="somegroup"
            label="Easy Apply Only"
            default-opened
            class="text-weight-bold"
            header-class="text-blue-grey-9"
            >
            <q-card>
               <q-card-section>
                  <q-item tag="label" v-ripple>
                     <q-item-section>
                        <q-item-label>Fresher Jobs Only</q-item-label>
                     </q-item-section>
                     <q-item-section avatar>
                        <q-toggle color="indigo" v-model="fresher" val="" />
                     </q-item-section>
                  </q-item>
                  <q-item tag="label" v-ripple>
                     <q-item-section>
                        <q-item-label>Internship Only</q-item-label>
                     </q-item-section>
                     <q-item-section avatar>
                        <q-toggle color="indigo" v-model="internship" val="" />
                     </q-item-section>
                  </q-item>
               </q-card-section>
            </q-card>
         </q-expansion-item>
         <q-separator />
         <q-expansion-item
            group="somegroup"
            label="Domain"
            class="text-weight-bold"
            header-class="text-blue-grey-9"
            >
            <q-card>
               <q-card-section>
                  <div class="options-box">
                     <q-checkbox dense v-model="option1" class="text-weight-regular" label="Software Development" color="indigo" />
                     <q-checkbox dense v-model="option2" class="text-weight-regular" label="Big Data" color="indigo" />
                     <q-checkbox dense v-model="option3" class="text-weight-regular" label="Machine Learning" color="indigo" />
                     <q-checkbox dense v-model="option4" class="text-weight-regular" label="Data Science" color="indigo" />
                  </div>
               </q-card-section>
            </q-card>
         </q-expansion-item>
         <q-separator />
         <q-expansion-item 
            group="somegroup"
            label="Experience" 
            class="text-weight-bold"
            header-class="text-blue-grey-9">
            <q-card>
               <q-card-section>
                  <div class="range-box q-mb-xl q-px-sm">
                     <h4>Total Experience (in years)</h4>
                     <q-range
                        name="price_range"
                        v-model="range"
                        label-always
                        switch-marker-labels-side
                        switch-label-side
                        color="indigo"
                        />
                  </div>
                  <div class="range-box q-mb-lg q-px-sm">
                     <h4>Relevant Experience (in years)</h4>
                     <q-range
                        name="price_range"
                        v-model="range2"
                        label-always
                        switch-marker-labels-side
                        switch-label-side
                        color="indigo"
                        />
                  </div>
               </q-card-section>
            </q-card>
         </q-expansion-item>
         <q-separator />
         <q-expansion-item 
            group="somegroup"
            label="Location" 
            class="text-weight-bold"
            header-class="text-blue-grey-9">
            <q-card>
               <q-card-section>
                  <div class="options-box">
                     <q-checkbox dense v-model="loc1" class="text-weight-regular" label="Delhi" color="indigo" />
                     <q-checkbox dense v-model="loc2" class="text-weight-regular" label="Noida" color="indigo" />
                     <q-checkbox dense v-model="loc3" class="text-weight-regular" label="Machine Learning" color="indigo" />
                     <q-checkbox dense v-model="loc4" class="text-weight-regular" label="Data Science" color="indigo" />
                  </div>
               </q-card-section>
            </q-card>
         </q-expansion-item>
         <q-separator />
         <q-expansion-item
            group="somegroup"
            label="Salary"
            class="text-weight-bold"
            header-class="text-blue-grey-9"
            >
            <q-card>
               <q-card-section>
                  <div class="range-box q-mb-lg q-px-sm">
                     <h4>Salary Range (Per annum)</h4>
                     <q-range
                        name="price_range"
                        v-model="salary"
                        label-always
                        switch-marker-labels-side
                        switch-label-side
                        color="indigo"
                        />
                  </div>
               </q-card-section>
            </q-card>
         </q-expansion-item>
      </q-list>
      <div class="resume-box q-pa-md">
         <h3>Effortlessly Build a Modern Resume</h3>
         <q-btn color="indigo" label="Explore Profile Builder" class="full-width" />
      </div>
   </div>
</template>

<script setup>
import { ref } from 'vue'
const option1 = ref(false)
const option2 = ref(false)
const option3 = ref(false)
const option4 = ref(false)
const fresher = ref(false)
const internship = ref(false)
const range = ref({
    min: 0,
    max: 100
})
const range2 = ref({
    min: 0,
    max: 100
})
const salary = ref({
    min: 0,
    max: 100
})

const loc1 = ref(false)
const loc2 = ref(false)
const loc3 = ref(false)
const loc4 = ref(false)
</script>

<style lang="scss" scoped>

  .filter-box{
    height: 100%;
    position: sticky;
    top: 0;
    width: 100%;
    .options-box{
      display: grid;
      row-gap: 8px;
    }
    h4{
      margin: 0 0 15px;
      font-size: 13px;
      line-height: 18px;
      font-weight: 500;
    }
  }
  .filter-text{
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  }
  .resume-box{
    background-color: #ffffff;
    border:1px solid rgba(0, 0, 0, 0.12);
    margin-top: 15px;
    h3{
        font-size: 14px;
        margin: 0 0 15px;
        line-height: 22px;
        font-weight: 500;
        text-align: center;
    }
  }
</style>