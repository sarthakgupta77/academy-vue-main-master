<template>
  <q-layout view="hHh Lpr lFf">
    <q-header class="header">
      <!-- <q-toolbar>
            <q-btn
               flat
               dense
               round
               icon="menu"
               aria-label="Menu"
               @click="toggleLeftDrawer"
               /> -->
      <!-- <q-toolbar-title>
            <div class="header-logo">
               <img @click="router.push('/')" src="https://datatrained.com/images/dt-no-st.png" alt="DataTrained Education">
            </div>
         </q-toolbar-title>
          -->

      <!-- <div>Quasar v{{ $q.version }}</div> -->
      <!-- </q-toolbar> -->
    </q-header>
    <MenuBar />
    <q-page-container class="page-wrapper">
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script setup>
import { onBeforeMount, ref } from "vue";
import { useStudentStore } from "stores/student";
import EssentialLink from "components/EssentialLink.vue";
import { edApi, stuApi, api2 } from "boot/axios";
import { LocalStorage } from "quasar";
import MenuBar from "components/MenuBar.vue";
import { useRouter } from "vue-router";

const linksList = [
  {
    title: "Learn",
    caption: "Learn",
    icon: "fas fa-graduation-cap",
    color: "#ff7066",
    link: "lms",
  },
  {
    title: "Live Classes",
    caption: "Live Classes",
    icon: "fas fa-satellite-dish",
    color: "#ffb66e",
    link: "lms",
  },
  {
    title: "Fee",
    caption: "Fee",
    icon: "fas fa-rupee-sign",
    color: "#6eb2ff",
    link: "fee",
  },
  {
    title: "Tickets",
    caption: "Tickets",
    icon: "fas fa-ticket-alt",
    color: "#67f080",
    link: "tickets",
  },
  // {
  //   title: 'Assessments',
  //   caption: 'Assessments',
  //   icon: 'fas fa-file-signature',
  //   color: '#7672fc',
  //   link: 'https://support.datatrained.org'
  // },
  // {
  //   title: 'Certificates',
  //   caption: 'Certificates',
  //   icon: 'fas fa-certificate',
  //   color: '#fa70f1',
  //   link: 'https://support.datatrained.org'
  // },
  {
    title: "Projects",
    caption: "Projects",
    icon: "fas fa-laptop",
    color: "#ff7a7a",
    link: "projects",
  },
  {
    title: "Resume",
    caption: "Resume",
    icon: "fas fa-file-alt",
    color: "#7895B2",
    link: "resume",
  },
];

const essentialLinks = linksList;
const leftDrawerOpen = ref(false);
const student = useStudentStore();
const router = useRouter();

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
function openInNewTab(url) {
  var win = window.open(url, "_blank");
  win.focus();
}

onBeforeMount(() => {
  edApi
    .get(
      "student/search?institution_id=502&student_email=" +
        LocalStorage.getItem("email")
    )
    .then((res) => {
      student.updateStudent(res.data.user_details[0]);

      var data = new FormData();
      data.append(
        "JSONString",
        '{\n  "new_password": "12345678",\n  "confirm_password": "12345678"}'
      );

      edApi({
        method: "post",
        url: "user/" + student.lms_id + "/changepassword",
        data: data,
      })
        .then((res) => {
          data = new FormData();
          data.append(
            "JSONString",
            '{\n  "username": "' +
              LocalStorage.getItem("email") +
              '",\n  "password": "12345678",\n  "persistent_login": true}'
          );
          stuApi.post("tutor/login",data)
          .then((res) => {
            LocalStorage.set("stu_edkey", res.data.user.apikey);
            })
            .catch((err) => {
              console.log(err);
            });
          // stuApi({
          //   method: "post",
          //   url: "tutor/login",
          //   data: data,
          // })
          //   .then((res) => {
          //     LocalStorage.set("stu_key", res.data.user.apikey);
          //   })
          //   .catch((err) => {
          //     console.log(err);
          //   });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
  api2
    .get("get-student-details", {
      params: {
        email: LocalStorage.getItem("email"),
      },
    })
    .then((res) => {
      // console.log(res.data)
      LocalStorage.set("student_user_id", res.data.data.id);
      if (
        res.data.data.name == null ||
        res.data.data.name == "" ||
        res.data.data.name == "User" ||
        res.data.data.name == "user"
      ) {
        router.push("onboarding");
      } else {
        LocalStorage.set("stu_name", res.data.data.name);
        student.updateStudent(res.data.data, res.data.data.name);
      }
    });

  if (LocalStorage.getItem("checkout") == 1) {
    api2
      .post("generate-ed-jwt", {
        // name: LocalStorage.getItem("stu_name"),
        name: "user",
        email: LocalStorage.getItem("email"),
      })
      .then((res) => {
        openInNewTab(
          LocalStorage.getItem("lms_base") +
            "/?jwt=" +
            res.data.access_token +
            "&edmingle_redirect_url=" +
            encodeURIComponent(
              LocalStorage.getItem("lms_base") + LocalStorage.getItem("course")
            )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api2
      .get("get-student-profile", {
        params: {
          student_id: LocalStorage.getItem("student_user_id"),
        },
      })
      .then((res) => {
        if (res.data.data == null) {
          router.push("onboarding");
        } else {
          student.updateStudentProfile(res.data.data);
        }
      });
  }
});
</script>

<style lang="scss" scoped>
.header {
  background-color: #f5f5f5;
  color: #000;
  padding: 10px 0;

  .header-logo {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      cursor: pointer;
      max-width: 160px;
    }
  }
}

.page-wrapper {
  background-color: #f5f5f5;
}

@media (max-width: 767px) {
  .header .header-logo img {
    max-width: 130px;
  }
}
</style>
