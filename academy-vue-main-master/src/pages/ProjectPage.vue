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
                                    <h6>My Projects</h6>
                                 </div>
                                 <div v-if="true" class="widget-container overflow-y notice-board-container">
                                    <q-card flat>
                                       <q-tabs
                                          v-model="data.tab"
                                          dense
                                          class="text-grey"
                                          active-color="indigo-8"
                                          indicator-color="indigo-8"
                                          align="justify"
                                          narrow-indicator
                                          >
                                          <q-tab name="evaluation" label="Evaluation" />
                                          <q-tab name="practice" label="Practice" />
                                          <q-tab name="extra" label="Extra" />
                                       </q-tabs>
                                       <q-tab-panels v-model="data.tab" animated class="pro-box">
                                          <q-tab-panel name="evaluation">
                                            <div class="row">
                                                <div v-if="data.evaluation.length > 0" v-for="project in data.evaluation" :key='project.id' class="col-md-6 col-sm-6 col-12 flex flex-center q-py-md">
                                                    <ProjectBox v-bind="project"/>
                                                </div>
                                                <div v-else class="col-md-12 flex justify-center">
                                                   No Project Assigned
                                                </div>
                                            </div>
                                          </q-tab-panel>
                                          <q-tab-panel name="practice">
                                             <div class="row">
                                                <div v-if="data.practice.length > 0" v-for="project in data.practice" :key='project.id' class="col-md-6 col-sm-6 col-12 flex flex-center q-py-md">
                                                    <ProjectBox v-bind="project"/>
                                                </div>
                                                <div v-else class="col-md-12 flex justify-center">
                                                   No Project Assigned
                                                </div>
                                            </div>
                                          </q-tab-panel>
                                          <q-tab-panel name="extra">
                                             <div class="row">
                                                <div v-if="data.extra.length > 0" v-for="project in data.extra" :key='project.id' class="col-md-6 col-sm-6 col-12 flex flex-center q-py-md">
                                                    <ProjectBox v-bind="project"/>
                                                </div>
                                                <div v-else class="col-md-12 flex justify-center">
                                                   No Project Assigned
                                                </div>
                                            </div>
                                          </q-tab-panel>
                                       </q-tab-panels>
                                    </q-card>
                                 </div>
                                 <div v-else class="widget-container overflow-y notice-board-container" style="background-color: #B2C8DF">
                                    <div class="no-deadline">
                                       No Projects Assign
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
import { onBeforeMount, reactive } from 'vue'
import ProjectBox from 'components/ProjectBox.vue'
import { api2 } from 'boot/axios'
import { LocalStorage } from 'quasar';


const data = reactive ({
    tab: 'evaluation',
    projects: null,
    evaluation: [],
    practice: [],
    extra: []
})

onBeforeMount(() => {
   api2.get('project-students', {
      params: {
      student_id: LocalStorage.getItem("student_user_id"),
      type : 1,
    }
   })
   .then((res) => {
      data.projects = res.data.data
      data.evaluation = data.projects.filter(function(el) { return el.type == 1; })
      data.practice = data.projects.filter(function(el) { return el.type == 0; })
      data.extra = data.projects.filter(function(el) { return el.type == 2; })
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

		.scroll {
			background-color: rgba(40, 36, 100);
			display: flex;
			align-items: center;
			justify-content: center;
			width: 32px;
			height:32px;
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
			height:32px;
			border-radius: 100%;
			position: absolute;
			left: 0;
			top: 50%;
			color: #fff;
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
.pro-box{
    background-color: rgb(205, 240, 234);
}
@media (max-width:767px){
   .widget{
      padding: 5px;
      .widget-container{
         padding: 0px;
      }
   }
   .row{
   display: block;
}
  .q-tab{
    padding: 0 11px;
  }
}
</style>
