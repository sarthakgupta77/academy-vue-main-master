<template>
  <div class="auth-container">
    <div class="auth-box">
      <div class="logo-container">
        <img
          src="https://datatrained.com/images/dt-no-st.png"
          alt="DataTrained Education"
        />
      </div>
      <div class="form-container">
        <h1>Admin Login</h1>
        <q-input
          outlined
          v-model="email"
          label="Email Address"
          dense
          class="q-mb-sm"
        />
        <q-input
          outlined
          v-model="password"
          type="password"
          label="Password"
          dense
        />
        <div class="btn-container">
          <q-btn
            color="primary"
            @click="adminLogin"
            type="submit"
            label="Login"
            size="12px"
            class="q-px-xl"
          />
        </div>
      </div>
    </div>
    <!-- test commit -->
  </div>
  <q-dialog v-model="alert">
    <q-card>
      <q-card-section class="row items-center">
        <q-icon name="error" color="primary" size="32px" />

        <span class="q-ml-sm">Invalid Email or Password !!</span>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { api } from "src/boot/axios";
import { ref } from "vue";

const email = ref("");
const password = ref("");
const alert = ref(false);

function openInNewTab(url) {
  var win = window.open(url, "_top");
  win.focus();
}

const adminLogin = () => {
  api
    .post("admin-login", {
      email: email.value,
      password: password.value,
    })
    .then((res) => {
      if (res.data.access_token) {
        if (res.data.type == "dummy") {
          openInNewTab(
            "https://learning.datatrained.com/?jwt=" +
              res.data.access_token +
              "&edmingle_redirect_url=" +
              encodeURIComponent(
                "https://learning.datatrained.com/myaccount/#/"
              )
          );
        } else {
          openInNewTab(
            "https://learning.datatrained.com/?jwt=" +
              res.data.access_token +
              "&edmingle_redirect_url=" +
              encodeURIComponent(
                "https://learning.datatrained.com/app/#/organization/dashboard"
              )
          );
        }
      } else {
        // alert("Invalid Credentials!!")
        alert.value = true;
      }
    });
};
</script>

<style lang="scss" scoped>
.auth-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 600px) {
    justify-content: flex-start;
    align-items: flex-start;
  }

  .auth-box {
    width: 450px;
    box-shadow: 5px 5px 15px #0000002d;
    padding: 25px;
    border-radius: 10px;

    @media only screen and (max-width: 600px) {
      width: 100%;
      box-shadow: none;
    }

    .form-container {
      @media only screen and (max-width: 600px) {
        height: 70vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      p {
        font-size: 9px;
        color: red;
      }
    }

    .logo-container {
      text-align: center;

      @media only screen and (max-width: 600px) {
        text-align: left;
      }

      img {
        width: 25%;

        @media only screen and (max-width: 600px) {
          width: 150px;
        }
      }
    }

    h1 {
      margin: 20px 0 30px 0;
      padding: 0;
      font-size: 20px;
      line-height: 20px;
      text-align: center;
      font-weight: 400;

      @media only screen and (max-width: 600px) {
        text-align: left;
        font-size: 28px;
        margin-top: 30px;
      }
    }

    .btn-container {
      display: flex;
      justify-content: center;
      margin-top: 15px;

      @media only screen and (max-width: 600px) {
        justify-content: flex-start;
      }
    }
  }
}
</style>
