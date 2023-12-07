<template>
  <div class="row">
    <div class="col-md-5 col-sm-12 col-12 width-box">
      <div class="form-box">
        <div class="logo-container">
          <img
            src="https://datatrained.com/images/NewFinalLogoE.png"
            alt="DataTrained Education"
          />
        </div>
        <div v-if="getEmail" class="login-form">
          <h1>Student Login</h1>
          <q-input
            outlined
            v-model="email"
            label="Email Address"
            @keydown.enter="btn1Submit"
            dense
            @keyup="validateEmail"
          />
          <p>{{ msg }}</p>
          <div class="btn-container">
            <q-btn
              color="primary"
              label="Continue"
              size="12px"
              :disable="disabledEmail"
              @click="btn1Submit"
            />
          </div>
        </div>
        <div v-else class="login-form">
          <h1>Verify OTP</h1>
          <q-input
            outlined
            v-model="otp"
            label="Enter OTP"
            @keydown.enter="btn2Submit"
            dense
            @keyup="validateOTP($event)"
          />
          <p>{{ msg }}</p>
          <div class="btn-container">
            <q-btn
              color="primary"
              label="Verify OTP"
              size="12px"
              class="q-mr-md"
              :loading="data.loading"
              :disable="disabledOtp"
              @click="btn2Submit"
            />
            <q-btn
              color="primary"
              outline
              label="Resend OTP"
              size="12px"
              :loading="data.loading"
              :disable="resendOTP"
              @click="resendOtp"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-7 col-sm-12 display-mobile">
      <div class="background-img">
        <div class="content">
          <div class="top-content">
            <ul>
              <li><strong>1,50,000+</strong> Happy Learners</li>
              <li><strong>1,000,000+</strong> Online Sessions</li>
              <li><strong>87%</strong> Careers Transition</li>
              <li><strong>500+</strong> Industry Mentors</li>
              <li><strong>400+</strong> Hiring Partners</li>
            </ul>
          </div>
          <div class="bottom-content">
            <h2>Be future ready with our Job oriented Professional Courses</h2>
            <h6>Learn Anything Anytime Anywhere</h6>
          </div>
        </div>
      </div>
    </div>
  </div>

  <q-dialog v-model="seamless">
    <q-card style="width: 270px">
      <q-linear-progress :value="1" color="violet" />

      <q-card-section class="row items-center">
        <q-icon name="verified" color="primary" size="32px" />

        <span class="q-ml-sm">{{ popup }}</span>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- </div> -->
</template>

<script setup>
import { ref, reactive } from "vue";
import { api, api2 } from "boot/axios";
import { LocalStorage } from "quasar";
import { useRouter } from "vue-router";
const data = reactive({
  loading: false,
});
const email = ref("");
const otp = ref("");
const msg = ref("");
const popup = ref("");
const disabledEmail = ref(true);
const disabledOtp = ref(true);
const resendOTP = ref(true);
const getEmail = ref(true);
const router = useRouter();
const seamless = ref(false);

function openInNewTab(url) {
  var win = window.open(url, "_blank");
  win.focus();}

const validateEmail = () => {
  if (
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(
      email.value
    )
  ) {
    msg.value = "";
    disabledEmail.value = false;
  } else {
    msg.value = "Please enter a valid email address";
    disabledEmail.value = true;
  }
};
const validateOTP = (evt) => {
  if (otp.value.length == 6) {
    disabledOtp.value = false;
    return true;
  } else if (otp.value.length > 6 || otp.value.length < 6) {
    disabledOtp.value = true;
    return true;
  }
};
const btn1Submit = () => {
  api
    .post("request-login-otp", {
      email: email.value,
    })
    .then((res) => {
      if (!res.data.message) {
        alert("Invalid Credentials!");
        disabledOtp.value = true;
      } else {
        getEmail.value = false;
        popup.value = "OTP sent Successfully !!";
        seamless.value = true;
        setTimeout(() => {
          resendOTP.value = false;
        }, 60000);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
const btn2Submit = () => {
  api
    .post("verify-login-otp", {
      email: email.value,
      otp: otp.value,
    })
    .then((res) => {
      if (res.data.message == "OTP Verified") {
        api
          .post("auth/login", {
            email: email.value,
            password: res.data.token,
          })
          .then((res) => {
            LocalStorage.set("token", res.data.access_token);
            LocalStorage.set("email", email.value);
            // api
            //   .post("auth/refresh", {
            //     token: LocalStorage.getItem("token"),
            //   })
            //   .then((res) => {
            //     LocalStorage.set("token", res.data.access_token);
            //   });
            api2
              .get("get-student-details", {
                params: {
                  email: LocalStorage.getItem("email"),
                },
              })
              .then((res) => {
                LocalStorage.set("student_user_id", res.data.data.id);
                if (
                  LocalStorage.getItem("checkout") == 1
                ) {
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
                            LocalStorage.getItem("lms_base") +
                              LocalStorage.getItem("course")
                          )
                      );
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                  // router.push("onboarding");
                } else if (
                  res.data.data.name == null ||
                  res.data.data.name == "" ||
                  res.data.data.name == "User" ||
                  res.data.data.name == "user"
                ) {
                  router.push("onboarding");
                } else {
                  student.updateStudent(res.data.data);
                }
              });
            router.push("/");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("Invalid OTP");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const resendOtp = () => {
  api
    .post("resend-login-otp", {
      email: email.value,
    })
    .then((res) => {
      if (!res.data.message) {
        alert("Invalid Credentials!");
        disabledOtp.value = true;
      } else {
        popup.value = "OTP Resend Successful !!";
        seamless.value = true;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<style lang="scss" scoped>
.form-box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  text-align: center;

  .logo-container {
    img {
      max-width: 160px;
    }
  }

  .login-form {
    margin: 30px 0;
    width: 60%;
    text-align: left;

    h1 {
      font-size: 20px;
      line-height: 1.5;
      font-weight: 600;
      text-align: center;
      margin-bottom: 30px;
    }
  }
}

.background-img {
  background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.8) 30%,
      rgba(0, 0, 0, 0.5) 70%
    ),
    url(https://datatrained.com/images/login-img.webp);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 20% center;
  height: 100vh;
  position: relative;

  .content {
    color: #fff;
    height: 100vh;
    padding: 20px 40px;

    .top-content {
      position: absolute;
      top: 20%;
    }

    .top-content {
      position: absolute;
      top: 8%;

      ul {
        padding-left: 0;

        li {
          font-size: 15px;
          margin-bottom: 8px;
        }
      }
    }

    .bottom-content {
      position: absolute;
      bottom: 12%;

      h2 {
        font-size: 30px;
        width: 65%;
        line-height: 1.3;
        font-weight: 600;
        margin: 0;
      }

      h6 {
        margin: 0;
        margin-top: 10px;
        font-weight: 300;
        font-size: 18px;
      }
    }
  }
}

@media (max-width: 1024px) {
  .width-box {
    width: 100%;
  }
  .display-mobile {
    display: none;
  }
}
@media (max-width: 767px) {
  .form-box {
    .login-form {
      width: 85%;
      margin: 20px 0;
    }
  }
}
</style>
