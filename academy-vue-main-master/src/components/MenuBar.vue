<template>
  <div class="side-bar">
    <div class="left-sidebar">
      <ul id="downArrow">
        <MenuBarItem v-for="item in menuList" :key="item.title" v-bind="item" />
        <li>
          <a @click="expandMenu" clickable>
            <i class="fas fa-th"></i><span>More</span>
          </a>
        </li>
      </ul>
      <!-- <div v-if="menuList.length > 9" @click="scrollDown" class="arrow-gif">
        <img src="https://datatrained.com/images/arrow.gif" alt="" />
        <span>Scroll Down</span>
      </div> -->
      <div class="logout" title="Logout">
        <!-- <a @click="onLogoutClick" clickable><i class="fas fa-sign-out-alt"></i></a> -->
        <q-btn size="sm" square @click="onLogoutClick" flat><i class="fas fa-sign-out-alt"></i>
        </q-btn>
      </div>

      <div v-if="toggle.more" class="floating-menu">
        <ul class="link-container">
          <OthersMenuBar @click="expandMenu" v-for="item in otherMenuList" :key="item.title" v-bind="item" />
        </ul>
      </div>
    </div>

  </div>
</template>

<script setup>
import MenuBarItem from "components/MenuBarItem.vue";
import { LocalStorage } from "quasar";
import { api2, edApi } from "src/boot/axios";
import { onBeforeMount, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import OthersMenuBar from "components/OthersMenuBar.vue";

const toggle = reactive({
  more: false
})

const logoPath = reactive({
  data: null,
});

const menuList = [
  {
    title: "Home",
    icon: "fas fa-home",
    link: "/",
  },
  {
    title: "Learn",
    icon: "fas fa-graduation-cap",
    link: "/learn",
  },
  {
    title: "Live Classes",
    icon: "fas fa-satellite-dish",
    link: "/liveclasses",
  },
  {
    title: "Live Class Chat",
    icon: "fas fa-comments",
    link: "/liveclasschat",
  },
  // {
  //   title: "Assignments",
  //   icon: "fas fa-file-alt",
  //   link: "/assignments",
  // },
  // {
  //   title: "Assessments",
  //   icon: "fas fa-paste",
  //   link: "/assessments",
  // },
  // {
  //   title: "Projects",
  //   icon: "fas fa-laptop",
  //   link: "/projects",
  // },
  // {
  //   title: "Resume",
  //   icon: "fas fa-id-badge",
  //   link: "/resume",
  // },
  // // {
  // //   title: "Book a Session",
  // //   icon: "fas fa-user-friends",
  // //   link: "/book-a-session",
  // // },
  // {
  //   title: "Certificates",
  //   icon: "fas fa-certificate",
  //   link: "/certificates",
  // },
  // {
  //   title: "Ask Doubts",
  //   icon: "fas fa-question-circle",
  //   link: "/doubts",
  // },
];

const otherMenuList = [
  {
    title: "Live Class Recordings",
    icon: "fas fa-play-circle",
    link: "/live-class-recordings",
  },
  {
    title: "Fee",
    icon: "fas fa-rupee-sign",
    link: "/fee",
  },
  {
    title: "Assignments",
    icon: "fas fa-file-alt",
    link: "/assignments",
  },
  {
    title: "Assessments",
    icon: "fas fa-paste",
    link: "/assessments",
  },
  {
    title: "Projects",
    icon: "fas fa-laptop",
    link: "/projects",
  },
  {
    title: "Resume",
    icon: "fas fa-id-badge",
    link: "/resume",
  },

  // {
  //   title: "Book a Session",
  //   icon: "fas fa-user-friends",
  //   link: "/book-a-session",
  // },
  {
    title: "Certificates",
    icon: "fas fa-certificate",
    link: "/certificates",
  },
  {
    title: "Ask Doubts",
    icon: "fas fa-question-circle",
    link: "/doubts",
  },
]

const expandMenu = () => {
  toggle.more = !toggle.more
  // if(toggle.more == 'none') {
  //   toggle.more = 'block'
  // } else {
  //   toggle.more = 'none'
  // }
  // console.log(toggle.more)
}

// const scrollDown = () => {
//   const content = document.getElementById("downArrow");
//   content.scrollTop = content.scrollHeight;
// };

const onLogoutClick = () => {
  api2
    .get("auth/logout")
    .then((res) => {
      LocalStorage.remove("token");
      location.reload();
      // localStorage.clear()
    })
    .catch((err) => {
      console.log(err);
    });
  LocalStorage.remove("token");
  location.reload();
  // window.location("http://localhost:8080/login");
};

onBeforeMount(() => {
  edApi
    .get("/user/details", {
      params: {
        // user_id: LocalStorage.getItem("student_user_id")
        user_id: 68800728,
      },
    })
    .then((res) => {
      for (let i = 0; i < 2; i++) {
        api2
          .post("fetch-logo", {
            org_id: res.data.user.organization_ids[i],
          })
          .then((res) => {
            // console.log(res);
            if (res.data.logo == null) {
            } else {
              LocalStorage.set("logo", res.data.logo);
            }
          });
      }
    });
  LocalStorage.set("showOtherMenu", false)
});
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

.floating-menu {
  border-radius: 8px;
  position: absolute;
  top: 33%;
  left: 110%;
  width: 275px;
  background-color: #384cc7;

  .link-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    flex-wrap: wrap;
  }
}

.side-bar {
  position: fixed;
  left: 1%;
  border-radius: 8px;
  height: calc(100% - (1.5rem + 1px));
  background-color: #384cc7;
  z-index: 9999;
  margin-top: 12px;
}

.left-sidebar {
  height: 100%;
  position: relative;

  ul {
    padding-left: 0;
    height: 80%;
    overflow-y: auto;
  }

  ::-webkit-scrollbar {
    width: 4px;
    height: 6px;
  }

  ::-webkit-scrollbar-thumb {
    background: #fff;
    border: 1px solid #384cc7;
    border-radius: 10px;
  }

  .logout {
    display: block;
    position: absolute;
    bottom: 6%;
    width: 100%;
    text-align: center;
    cursor: pointer;

    i {
      color: #fff;
      font-size: 20px;
    }
  }

  .arrow-gif {
    position: absolute;
    bottom: 12%;
    width: 100%;
    text-align: center;

    span {
      color: #fff;
      font-size: 6px;
      display: block;
      text-align: center;
    }

    img {
      max-width: 25px;
    }
  }
}
@media (min-width: 993px) and (max-width: 1024px){
  li{
    margin-bottom: 15px;
  }
  .floating-menu{
    top: 24%;
  }
}
@media (min-width: 768px) and (max-width: 992px){
  li{
    margin-bottom: 15px;
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

  .floating-menu {
    top: -185%;
    left: 0;
    width: 100%;

    .link-container {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      flex-wrap: wrap;

      li {
        width: 20%;
      }
    }
  }

  .side-bar {
    border-radius: 0;
    height: fit-content;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 0 5px;
  }

  .left-sidebar {
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    // width: 90%;
    // margin: auto;

    ul {
      padding-left: 0 5px;
      display: flex;
      justify-content: flex-start;
      column-gap: 10px;
      margin: 0;
      padding: 8px 0;
    }

    .logout {
      position: relative;
      width: 20%;
    }
  }

  .header .header-logo img {
    max-width: 130px;
  }

  .box {
    margin-bottom: 60px;
  }

  .arrow-gif {
    display: none;
  }
}

@media (max-width: 320px){
  .floating-menu{
    top: -165%;
  }
}
</style>
