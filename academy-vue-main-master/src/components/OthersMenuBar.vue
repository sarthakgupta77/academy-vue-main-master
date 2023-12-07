<template>
  <li>
    <a @click="itemClick(link)" clickable
      ><i :class="icon"></i><span>{{ title }} </span></a
    >
  </li>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { api, api2 } from "boot/axios";
import { LocalStorage } from "quasar";
import { useStudentStore } from "stores/student";

const router = useRouter();
const route = useRoute();
const student_info = useStudentStore();

function openInNewTab(url) {
  var win = window.open(url, "_blank");
  win.focus();
}

const itemClick = (link) => {
  if (link == "/doubts") {
    router.push(link);
  } else if (link == "/assignments") {
    router.push(link);
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
  } else if (link == "/assessments") {
    router.push(link);
  } else if (link == "/projects") {
    router.push(link);
  } else if (link == "/certificates") {
    router.push(link);
  } else if (link == "/book-a-session") {
    router.push(link);
  } else if (link == "/resume") {
    api
      .post("auth/refresh", {
        token: LocalStorage.getItem("token"),
      })
      .then((res) => {
        LocalStorage.set("token", res.data.access_token);
        LocalStorage.set("hiration_token", res.data.access_token);

        api.post("hiration-token",{
          type: 0,
          stu_id: LocalStorage.getItem("student_user_id"),
          stu_email: LocalStorage.getItem("email"),
          hiration_token: res.data.access_token
        }).then((res) => {
          openInNewTab(
            "https://academy.datatrained.com/resume?user_token=" +
              LocalStorage.getItem("token")
          );
        });
      });
  } else if (link == "/live-class-recordings") {
    router.push(link);
  }
};

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
</script>

<style lang="scss" scoped>
li {
  padding: 0 11px 5px;
  text-align: center;
  list-style: none;
  width: 33%;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

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
