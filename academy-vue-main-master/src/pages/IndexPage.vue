<template>
  <q-page class="q-py-md">
    <div class="row" style="width: 100%">
      <div class="offset-lg-2 offset-md-2 offset-sm-2 col-lg-9 col-md-9 col-sm-9 col-12 q-pa-sm">
        <div class="row" style="width: 100%">
          <div class="col-md-12 col-12">
            <div class="greet-box column items-center">
              <h4>Hey {{ LocalStorage.getItem("stu_name") }} !</h4>
              <p>Welcome to the hub of learning!</p>
              <img src="https://www.datatrained.com/images/414342-PDTRPC-987.png" alt="Continue Learning" />
            </div>
          </div>
          <div class="col-md-12 col-12 q-mt-lg">
            <div class="box">
              <div class="row">
                <!-- Start My Courses -->
                <!-- <div v-if="true" class="col-md-12">
                  <div class="widget">
                    <div class="widget-title">
                      <h6>My Courses</h6>
                    </div>
                    <div class="widget-container overflow-x" style="background-color: #ffdada">
                      <CourseBox />
                    </div>
                  </div>
                </div> -->
                <div v-if="student.courses && student.courses.length > 0" class="col-md-12 col-12"
                  style="position: relative">
                  <div class="widget course-scroll">
                    <div class="widget-title">
                      <h6>My Enrolled Program</h6>
                    </div>
                    <div class="widget-container overflow-x" id="course-box" style="background-color: #ffdada">
                      <CourseBox v-for="course in student.courses" :key="course.master_batch_id" v-bind="course" />
                    </div>
                    <div @click="scroll_right('course-box')" class="scroll">
                      <i class="fas fa-angle-right"></i>
                    </div>
                    <div @click="scroll_left('course-box')" class="scroll2">
                      <i class="fas fa-angle-left"></i>
                    </div>
                  </div>
                </div>
                <!-- End My Courses -->
                <!-- Start Explore Courses -->
                <div v-else class="col-md-12 col-12">
                  <div class="widget">
                    <div class="browse-course-banner">
                      <a href="https://learning.datatrained.com/courses" target="_blank">
                        <img src="https://datatrained.com/images/browse-courses-lms.jpg" alt="" />
                      </a>
                    </div>
                  </div>
                </div>
                <!-- End Explore Courses -->
                <!-- Start Notice Board -->
                <!-- <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                  <div class="widget notification">
                    <div class="widget-title">
                      <h6>Notifications</h6>
                    </div>
                    <div v-if='notifications' class="widget-container overflow-y notice-board-container"
                      style="background-color: #F5E8C7">
                      <NoticeBox v-for="notice in notifications" :key="notice.text" v-bind="notice" />
                    </div>
                    <div v-else class="widget-container overflow-y notice-board-container"
                      style="background-color: #F5E8C7">
                      <div class="no-deadline">
                        No New Notifications
                      </div>
                    </div>
                  </div>
                </div> -->
                <!-- End Notice Board -->
                <!-- Start Deadlines -->
                <!-- <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                  <div class="widget">
                    <div class="widget-title">
                      <h6>Upcoming Deadlines</h6>
                    </div>
                    <div v-if="deadlines" class="widget-container overflow-y notice-board-container"
                      style="background-color: #B2C8DF">
                      <DeadlineBox v-for="dead in deadlines" :key="dead.id" v-bind="dead" />
                    </div>
                    <div v-else class="widget-container overflow-y notice-board-container"
                      style="background-color: #B2C8DF">
                      <div class="no-deadline">
                        No Upcoming Deadlines
                      </div>
                    </div>
                  </div>
                </div> -->
                <!-- End Deadlines -->
                <!-- Start Projects -->
                <div class="col-md-12 col-12" style="position: relative">
                  <div v-if="!student.apiData.data || student.apiData.data.length > 0
                    " class="widget project-scroll">
                    <div class="widget-title">
                      <h6>Projects</h6>
                    </div>
                    <div class="row">
                      <div class="col-lg-3 col-md-3 col-sm-12 col-12">
                        <div class="widget-container" style="padding: 0">
                          <ul class="project-stats">
                            <li>
                              <span class="bg-new-project">{{
                                student.newProjectCount
                              }}</span>New
                            </li>
                            <li>
                              <span class="bg-pending-project">{{
                                student.pendingProjectCount
                              }}</span>Pending
                            </li>
                            <li>
                              <span class="bg-action-project">{{
                                student.actionRequiredProjectCount
                              }}</span>Action Required
                            </li>
                            <li>
                              <span class="bg-submitted-project">{{
                                student.submittedProjectCount
                              }}</span>Submitted
                            </li>
                            <li>
                              <span class="bg-evaluated-project">{{
                                student.evaluatedProjectCount
                              }}</span>Evaluated
                            </li>
                            <!-- <li><span class="bg-evaluated-project">{{ student. }}</span>Deadline Missed</li> -->
                          </ul>
                        </div>
                      </div>
                      <div class="col-lg-9 col-md-9 col-sm-12 col-12" style="position: relative">
                        <div class="widget-container overflow-x projects-container" id="project-box"
                          style="background-color: #cdf0ea">
                          <ProjectBox v-for="project in widget_data.projects" :key="parseInt(project.id)"
                            v-bind="project" />
                        </div>
                        <div @click="scroll_right('project-box')" class="scroll">
                          <i class="fas fa-angle-right"></i>
                        </div>
                        <div @click="scroll_left('project-box')" class="scroll2">
                          <i class="fas fa-angle-left"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- End Projects -->
                  <!-- Start Industry Webinars & Talks -->
                  <div class="col-md-12 col-12" style="position: relative">
                    <div class="widget webinar-scroll">
                      <div class="widget-title">
                        <h6>Industry Webinars &amp; Talks</h6>
                      </div>
                      <div class="widget-container overflow-x projects-container" id="widget-box"
                        style="background-color: #bfa2db">
                        <TalkBox v-for="webinar in widget_data.webinars" :key="webinar.id" v-bind="webinar" />
                      </div>
                      <div @click="scroll_right('widget-box')" class="scroll">
                        <i class="fas fa-angle-right"></i>
                      </div>
                      <div @click="scroll_left('widget-box')" class="scroll2">
                        <i class="fas fa-angle-left"></i>
                      </div>
                    </div>
                  </div>
                  <!-- End Industry Webinars & Talks -->
                  <!-- Start Wall of Fame -->
                  <!-- <div class="col-md-12 col-12" style="position:relative;">
                                 <div class="widget fame-scroll">
                                    <div class="widget-title">
                                       <h6>Wall of Fame</h6>
                                    </div>
                                    <div class="widget-container overflow-x projects-container" id="fame-box" style="background-color: #FAB7B7">
                                       <FameBox
                                          v-for="fame in widget_data.placements"
                                          :key="fame.id"
                                          v-bind="fame"
                                          />
                                    </div>
                                    <div @click="scroll_right('fame-box')" class="scroll"><i class="fas fa-angle-right"></i></div>
                                    <div @click="scroll_left('fame-box')" class="scroll2"><i class="fas fa-angle-left"></i></div>
                                 </div>
                              </div> -->
                  <!-- End Wall of Fame -->
                  <!-- Start Latest Articles -->
                  <!-- <div class="col-md-12">
                                 <div class="widget">
                                   <div class="widget-title">
                                     <h6>Latest Articles</h6>
                                   </div>
                                   <div class="widget-container overflow-x projects-container" style="background-color: #E1F2FB">
                                     <ArticleBox/>
                                     <ArticleBox/>
                                     <ArticleBox/>
                                     <ArticleBox/>
                                     <ArticleBox/>
                                     <ArticleBox/>
                                     <ArticleBox/>
                                     <ArticleBox/>
                                   </div>
                                 </div>
                                 </div> -->
                  <!-- End Latest Articles -->
                  <!-- Start Articles Categories -->
                  <div class="col-md-12 col-12" style="position: relative">
                    <div class="widget article-scroll">
                      <div class="widget-title">
                        <h6>Article Categories</h6>
                      </div>
                      <div class="widget-container overflow-x" id="article-box" style="
                          background-color: #fff;
                          padding-left: 0;
                          padding-right: 0;
                        ">
                        <!-- <NoticeBox
                                          v-for="course in student.courses"
                                          :key="course.package_id"
                                          v-bind="course"
                                          /> -->
                        <ArticleCategoryBox v-for="category in articleCategoryList" :key="category.title"
                          v-bind="category" />
                      </div>
                      <div @click="scroll_right('article-box')" class="scroll">
                        <i class="fas fa-angle-right"></i>
                      </div>
                      <div @click="scroll_left('article-box')" class="scroll2">
                        <i class="fas fa-angle-left"></i>
                      </div>
                    </div>
                  </div>
                  <!-- End Articles Categories -->
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
import CourseBox from "components/CourseBox.vue";
import NoticeBox from "components/NoticeBox.vue";
import DeadlineBox from "components/DeadlineBox.vue";
import ProjectBox from "components/ProjectBox.vue";
import TalkBox from "components/TalkBox.vue";
import FameBox from "components/FameBox.vue";
import ArticleBox from "components/ArticleBox.vue";
import ArticleCategoryBox from "components/ArticleCategoryBox.vue";
import { onBeforeMount, ref, reactive } from "vue";
import { api, api2, stuApi } from "boot/axios";
import { useStudentStore } from "stores/student";
import { LocalStorage } from "quasar";

const student_info = useStudentStore();

const articleCategoryList = [
  {
    title: "Success Stories",
    icon: "1535019.png",
    color: "#E2C2B9",
    link: "https://www.datatrained.com/post/category/success-stories/",
  },
  {
    title: "Data Science & Artificial Intelligence",
    icon: "8055576.png",
    color: "#D0B8A8",
    link: "https://www.datatrained.com/post/category/data-science-artificial-intelligence/",
  },
  {
    title: "Coding",
    icon: "6062646.png",
    color: "#B7D3DF",
    link: "https://www.datatrained.com/post/category/coding/",
  },
  {
    title: "Finance and Accounts",
    icon: "3655406.png",
    color: "#FFDBA4",
    link: "https://www.datatrained.com/post/category/finance-and-accounts/",
  },
  {
    title: "E-Commerce",
    icon: "3649531.png",
    color: "#9CB4CC",
    link: "https://www.datatrained.com/post/category/e-commerce/",
  },
  {
    title: "Digital Marketing",
    icon: "7630483.png",
    color: "#D9D7F1",
    link: "https://www.datatrained.com/post/category/digital-marketing/",
  },
  {
    title: "Human Resource Management",
    icon: "5516093.png",
    color: "#F0D9FF",
    link: "https://www.datatrained.com/post/category/human-resource-management/",
  },
  {
    title: "Management",
    icon: "2503707.png",
    color: "#9FD8DF",
    link: "https://www.datatrained.com/post/category/management/",
  },
  {
    title: "Cyber Security",
    icon: "2716652.png",
    color: "#C7CFB7",
    link: "https://www.datatrained.com/post/category/cyber-security/",
  },
  {
    title: "Blockchain",
    icon: "1171571.png",
    color: "#7E8A97",
    link: "https://www.datatrained.com/post/category/blockchain/",
  },
  {
    title: "Cloud Computing",
    icon: "3305673.png",
    color: "#D4B5B0",
    link: "https://www.datatrained.com/post/category/cloud-computing/",
  },
  {
    title: "Career Skills",
    icon: "3645345.png",
    color: "#F1D1D1",
    link: "https://www.datatrained.com/post/category/career-skills/",
  },
];

const notifications = [
  {
    type: "live-class",
    text: "Upcoming live class on 29 Nov 2022 17:00:00",
  },
  {
    type: "live-class",
    text: "Upcoming live class on 30 Nov 2022 17:00:00",
  },
  // {
  // 	type: 'assessment',
  // 	text: 'New Assessment assigned due on 25 Nov 2022',
  // },
  // {
  // 	type: 'ticket',
  // 	text: 'New ticket reply received',
  // },
  // {
  // 	type: 'assignment',
  // 	text: 'New assignment due on 10 Nov 2022',
  // },
];

const deadlines = [
  {
    id: 1,
    type: "project",
    title: "Netflix - OTT Platform",
    status: 2,
    due_date: "30 Nov 2022",
  },
];

const widget_data = reactive({
  webinars: null,
  placements: null,
  projects: [],
});

const student = reactive({
  name: "Learner",
  courses: null,
  newProjectCount: 0,
  pendingProjectCount: 0,
  actionRequiredProjectCount: 0,
  submittedProjectCount: 0,
  evaluatedProjectCount: 0,
  batchInfo: [],
  apiData: [],
});

function scroll_left(id) {
  let content = document.querySelector("#" + id);
  content.scrollLeft -= 550;
}

function scroll_right(id) {
  let content = document.querySelector("#" + id);
  content.scrollLeft += 550;
}

function countProjects() {
  widget_data.projects.filter(function (el) {
    if (el.status == 0) {
      student.newProjectCount++;
    } else if (el.status == 1) {
      student.pendingProjectCount++;
    } else if (el.status == 2) {
      student.actionRequiredProjectCount++;
    } else if (el.status == 3) {
      student.submittedProjectCount++;
    } else {
      student.evaluatedProjectCount++;
    }
  });
}

function studentCourse() {
  student.courses.filter(function (el) {
    if (el.master_batch_id == 55442) {
      // LocalStorage.set("hideCourseMenu", true)
    } else {
      // LocalStorage.set("hideCourseMenu", false)
    }
  });
}

onBeforeMount(() => {

  stuApi
    .get("student/masterbatches?tag_ids=9&search=", {
      headers: {
        'apikey': LocalStorage.getItem('stu_edkey'),
      }
    })
    .then((res) => {
      student.batchInfo = res.data.batches;
      student.courses = res.data.batches;
      studentCourse();
      api2
        .post("store-student-batches", {
          student_id: LocalStorage.getItem("student_user_id"),
          batches: student.batchInfo,
        })
        .then((res) => {
        });
    })
    .catch((err) => {
      console.log(err);
    });


  api
    .get("get-webinars")
    .then((res) => {
      widget_data.webinars = res.data.webinars;
    })
    .catch((err) => {
      console.log(err);
    });

  api2
    .get("project-students", {
      params: {
        student_id: LocalStorage.getItem("student_user_id"),
        type: 1,
      },
    })
    .then((res) => {
      student.apiData = res.data;
      for (let i = 0; i < res.data.data.length; i++) {
        if (res.data.data[i].type == 0 || res.data.data[i].type == 1) {
          widget_data.projects.push(res.data.data[i]);
        }
      }
      // if (!student_info.name) {
      //     student_info.name = LocalStorage.getItem("stu_name")
      //   // location.reload()
      // }
      countProjects();
    });

  api2.get("get-placements").then((res) => {
    widget_data.placements = res.data;
  });
});
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

.notice-board {
  background-color: #e9f0fa;

  .notices {
    height: 200px;
    overflow-y: auto;
  }

  a {
    text-decoration: none;
    color: #00000094;
  }

  .row {
    background-color: #fff;
  }

  p {
    padding-top: 0px;
    padding-bottom: 0px;
    font-size: 14px;
    line-height: auto;
    margin: 0px;
  }

  a:hover {
    box-shadow: 3px 3px 5px #00000094;
  }
}

.greet-box {
  background-image: linear-gradient(to bottom right, #0f0c3b, #4432a7);
  padding: 20px;
  border-radius: 8px;
  color: #fff;
  margin-top: 40px;
  position: relative;

  img {
    width: 200px;
    position: absolute;
    right: -30px;
    top: -55px;
  }

  a {
    color: #fff;
    text-decoration: none;
    padding: 10px 12px;
    border-radius: 5px;
    box-shadow: 2px 2px 8px #00000094;
    font-size: 30px;
  }

  h4 {
    margin: 0px;
  }

  .tw {
    color: #ffffff;
  }
}

.webinar-box {
  background-color: #fff;
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
    padding: 10px;
  }
}

.deadline-list {
  margin: 0px;
  list-style-type: none;
  padding-left: 0px;
  height: 300px;
  overflow-y: auto;

  li {
    background-color: #e9f0fa;
    padding: 10px 14px;

    .ud-heading {
      padding: 0px;
      margin: 0px;
      font-weight: 600;
      color: #6e6e6e;
      font-size: 120%;
    }

    .ud-sub-heading {
      padding: 0px;
      margin: 0px;
      color: #6e6e6e;
      font-size: 90%;

      span {
        color: #00ccf2;
        font-weight: 600;
      }
    }
  }
}

.more-videos {
  padding: 10px;

  a {
    text-decoration: none;
    color: #00000094;
  }

  .row {
    background-color: #fff;
  }

  h6 {
    padding-top: 0px;
    padding-bottom: 0px;
    font-size: 14px;
    line-height: auto;
  }

  a:hover {
    box-shadow: 3px 3px 5px #00000094;
  }
}

.overflow-x {
  overflow-y: hidden;
  overflow-x: auto;
  width: 100%;
}

.overflow-y {
  overflow-x: hidden;
  overflow-y: auto;
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
    height: 32px;
    border-radius: 100%;
    position: absolute;
    right: 0;
    top: 50%;
    color: #fff;
    z-index: 99;
    cursor: pointer;
  }

  .scroll2 {
    background-color: rgba(40, 36, 100);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 100%;
    position: absolute;
    left: 0;
    top: 50%;
    color: #fff;
    z-index: 99;
    cursor: pointer;
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

.notification {
  position: relative;

  .widget-container {
    white-space: normal;
  }
}

.browse-course-banner {
  overflow: hidden;

  img {
    width: 100%;
    border-radius: 8px;
  }
}

.notice-board-container {
  height: 320px;
}

.project-stats {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;

  li {
    margin-bottom: 5px;
  }

  span {
    width: 25px;
    height: 25px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    border-radius: 50%;
    color: #fff;
  }

  .bg-new-project {
    background-color: #00ccf2;
  }

  .bg-pending-project {
    background-color: #f2c600;
  }

  .bg-action-project {
    background-color: #f24d00;
  }

  .bg-submitted-project {
    background-color: #002cf2;
  }

  .bg-evaluated-project {
    background-color: #00aa69;
  }
}

.no-deadline {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  font-weight: 700;
}

.course-scroll {
  .scroll2 {
    left: 3px;
    top: 55%;
  }

  .scroll {
    right: 3px;
    top: 55%;
  }
}

.project-scroll {
  .scroll2 {
    left: -10px;
    top: 45%;
  }

  .scroll {
    right: -10px;
    top: 45%;
  }
}

.webinar-scroll {
  .scroll2 {
    left: 3px;
    top: 55%;
  }

  .scroll {
    right: 3px;
    top: 55%;
    z-index: 1;
  }
}

.fame-scroll {
  .scroll2 {
    left: 3px;
    top: 55%;
  }

  .scroll {
    right: 3px;
    top: 55%;
  }
}

.article-scroll {
  .scroll2 {
    left: 3px;
    top: 50%;
  }

  .scroll {
    right: 3px;
    top: 50%;
  }
}

@media (min-width: 768px) and (max-width: 992px) {
  .widget {
    .widget-container {
      padding: 20px;
    }
  }

  .greet-box {
    align-items: flex-start;

    img {
      width: 162px;
      right: 0;
      top: -40px;
    }

    a {
      color: #fff;
      text-decoration: none;
      padding: 10px 12px;
      border-radius: 5px;
      box-shadow: 2px 2px 8px #00000094;
      font-size: 30px;
    }

    h4 {
      font-size: 25px;
    }

    .tw {
      color: #ffffff;
    }

    p {
      font-size: 14px;
    }
  }
}

@media (max-width: 767px) {
  .row {
    display: block;
  }

  .greet-box {
    align-items: flex-start;
    margin-top: 0px;

    img {
      width: 115px;
      right: 0;
      top: -26px;
    }

    a {
      color: #fff;
      text-decoration: none;
      padding: 10px 12px;
      border-radius: 5px;
      box-shadow: 2px 2px 8px #00000094;
      font-size: 30px;
    }

    h4 {
      font-size: 18px;
      width: 75%;
      line-height: 26px;
    }

    .tw {
      color: #ffffff;
    }

    p {
      font-size: 10px;
    }
  }

  .widget {
    padding: 20px;

    .widget-title {
      h6 {
        font-weight: 700;
        font-size: 20px;
        color: #3f3f3f;
        letter-spacing: 0px;
      }
    }

    .widget-container {
      padding: 20px;
      margin-top: 20px;

      .scroll {
        display: none;
      }

      .scroll2 {
        display: none;
      }
    }
  }

  .box {
    margin-bottom: 60px;
  }
}
</style>
