<template>
  <li>
    <a v-if="link == '/'" @click="itemClick(link)" clickable>
      <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="150.000000pt" height="160.000000pt"
        viewBox="0 0 150.000000 160.000000" preserveAspectRatio="xMidYMid meet">
        <g transform="translate(0.000000,160.000000) scale(0.100000,-0.100000)" stroke="none">
          <path d="M0 800 l0 -800 750 0 750 0 0 800 0 800 -750 0 -750 0 0 -800z m903
                      455 c213 -56 327 -209 327 -440 -1 -230 -108 -394 -300 -457 -57 -19 -94 -22
                      -307 -26 l-243 -4 0 471 0 471 233 0 c174 0 247 -4 290 -15z" />
          <path d="M600 800 l0 -303 108 5 c118 6 164 22 214 75 96 101 105 338 16 439
                      -53 61 -98 77 -225 82 l-113 5 0 -303z" />
        </g>
      </svg>
      <!-- <img style="width: 33px;" :src='LocalStorage.getItem("logo")' alt="logo"> -->
      <span>{{ title }} </span>
    </a>
    <a v-else-if="title == 'More'" @click="expandMenu" clickable>
      <i :class="icon"></i><span>{{ title }} </span>
    </a>
    <a v-else @click="itemClick(link)" clickable><i :class="icon"></i><span>{{ title }} </span></a>

  </li>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { api, api2, chatApi } from "boot/axios";
import { useStudentStore } from "stores/student";
import { LocalStorage } from "quasar";

const router = useRouter();
const route = useRoute();
const student_info = useStudentStore();

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    default: "#",
  },
  icon: {
    type: String,
    default: "",
  },
});

function openInNewTab(url) {
  var win = window.open(url, "_blank");
  win.focus();
}

const itemClick = (link) => {

  if (link == "/") {
    router.push(link);
  } else if (link == "/learn") {
    api2
      .post("generate-ed-jwt", {
        name: student_info.name,
        email: LocalStorage.getItem("email"),
      })
      .then((res) => {
        // openInNewTab(LocalStorage.getItem('lms_base')+'?jwt='+res.data.access_token)
        openInNewTab(
          LocalStorage.getItem("lms_base") +
          "/?jwt=" +
          res.data.access_token +
          "&edmingle_redirect_url=" +
          encodeURIComponent(
            LocalStorage.getItem("lms_base") + "/myaccount/#/classes"
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (link == "/liveclasses") {
    api2
      .post("generate-ed-jwt", {
        name: student_info.name,
        email: LocalStorage.getItem("email"),
      })
      .then((res) => {
        // openInNewTab(LocalStorage.getItem('lms_base')+'/myaccount/#/calendar/?jwt='+res.data.access_token)
        openInNewTab(
          LocalStorage.getItem("lms_base") +
          "/?jwt=" +
          res.data.access_token +
          "&edmingle_redirect_url=" +
          encodeURIComponent(
            LocalStorage.getItem("lms_base") + "/myaccount/#/calendar/"
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (link == "/liveclasschat") {
    chatApi
      .post("student/generateJWT", {
        name: student_info.name,
        email: LocalStorage.getItem("email"),
        merchant_id: "OW8evwBLm9Y9WVs73cjkFwiqSoguIWaHkBSk7XMPk",
      })
      .then((res) => {
        openInNewTab("https://livechat.datatrained.com/?jwt=" + res.data.token);
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (link == "/fee") {
    api2
      .post("generate-ed-jwt", {
        name: student_info.name,
        email: LocalStorage.getItem("email"),
      })
      .then((res) => {
        // openInNewTab(LocalStorage.getItem('lms_base')+'/myaccount/#/purchases/4691/?jwt='+res.data.access_token)
        openInNewTab(
          LocalStorage.getItem("lms_base") +
          "/?jwt=" +
          res.data.access_token +
          "&edmingle_redirect_url=" +
          encodeURIComponent(
            LocalStorage.getItem("lms_base") + "/myaccount/#/purchases"
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (link == "/doubts") {
    router.push(link);
  } else if (link == "/assignments") {
    router.push(link);
  } else if (link == "/assessments") {
    router.push(link)
  } else if (link == "/projects") {
    router.push(link);
  } else if (link == "/certificates") {
    router.push(link);
  } else if (link == "/book-a-session") {
    router.push(link);
  } else if (link == "/resume") {
    // api
    //   .post("auth/refresh2", {
    //     token: LocalStorage.getItem("token"),
    //   })
    //   .then((res) => {
    //     LocalStorage.set("hiration_token", res.data.access_token);
    //     openInNewTab(
    //       "https://academy.datatrained.com/resume?user_token=" +
    //       LocalStorage.getItem("hiration_token")
    //     );
    //   });
  }
};

</script>
<style lang="scss" scoped>
li {
  padding: 0 11px 5px;
  text-align: center;
  list-style: none;

  .active {
    background-color: #fff;
    color: #384cc7;
  }

  a {
    color: #fff;
    text-decoration: none;
    width: 70px;
    height: 60px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin: auto;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #fff;
      color: #384cc7;
    }

    i {
      font-size: 20px;
      margin-bottom: 7px;
    }

    span {
      font-size: 10px;
    }

    svg {
      width: 30px;
      height: 32px;
      background: #fff;

      g {
        fill: #cc1db9;
      }
    }
  }

  i {
    font-size: 20px;
    margin-bottom: 7px;
  }

  span {
    font-size: 10px;
  }
}

@media (max-width: 767px) {
  li {
    padding: 0;
    text-align: center;
    list-style: none;

    .active {
      background-color: #fff;
      color: #384cc7;
      border-radius: 0;
    }

    a {
      width: 54px;
      height: 40px;

      i {
        margin-bottom: 2px;
        font-size: 15px;
        width: 30px;
        height: 20px;
      }

      span {
        font-size: 8px;
        line-height: 12px;
      }

      svg {
        width: 17px;
        height: 18px;
        margin-bottom: 5px;
      }
    }
  }
.floating-menu{
  .link-container {
    li{
      a{
        width: 54px;
        height: 40px;
        i{
          width: 30px;
          height: 20px;
        }
      }
    }
  }
}
  .box {
    margin-bottom: 60px;
  }
}

// @media (max-width: 320px) {
//   li {
//     a {
//       width: 54px;
//       height: 48px;
//       span {
//         font-size: 10px;
//       }
//     }
//   }
// }
</style>
