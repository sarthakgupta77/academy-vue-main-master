<template>
  <div class="wrapper">
    <div class="congratulation-box">
      <div class="exam-end-box">
        <div class="success-icon">
          <div class="success-icon__tip"></div>
          <div class="success-icon__long"></div>
        </div>
        <h2>Congratulations !!</h2>
        <p>Your exam has been Completed</p>
        <div class="total-marks">
          <h5>Total Marks Obtained : <span>{{ data.marks.obt_marks }}</span><span>/{{ data.marks.max_marks }}</span></h5>
        </div>
        <q-btn v-if="data.marks.certificate == 1" label="View Certificate" type="submit" color="indigo" class="q-mr-md" />
        <q-btn @click="goHome" label="Go to Academy" type="submit" color="indigo" outline />
      </div>
    </div>
  </div>
</template>
<script setup>
import { LocalStorage } from 'quasar';
import { api2 } from 'src/boot/axios';
import { useRouter, useRoute } from 'vue-router';
import { onBeforeMount, reactive } from 'vue';

const route = useRoute()
const router = useRouter()

const data = reactive({
  marks: [],
})

const goHome = () => {
  router.push('/') 
}

onBeforeMount(() => {
  api2.get('get-assessment-score', {
    params: {
      submission_id: route.params.id,
    }
  }).then((res) => {
    // console.log(res.data)
    data.marks = res.data.marks
  })
})

</script>

<style lang="scss" scoped>
.wrapper {
  padding: 15px;
  height: 100vh;
  display: flex;
  justify-content: center;

  .congratulation-box {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    .exam-end-box {
      width: 50%;
      background-color: #FFF;
      border-radius: 10px;
      box-shadow: 5px 7px 15px rgb(0 0 0 / 20%);
      padding: 30px 25px;
      height: max-content;
      text-align: center;

      h2 {
        font-size: 22px;
        margin: 10px 0;
        line-height: 22px;
        font-weight: 500;
      }

      h5 {
        margin: 15px 0;
        font-size: 20px;
        font-weight: 500;

        span {
          color: #75c204;
        }
      }

      .success-icon {
        display: inline-block;
        width: 8em;
        height: 8em;
        font-size: 20px;
        border-radius: 50%;
        border: 4px solid #96df8f;
        background-color: #fff;
        position: relative;
        overflow: hidden;
        transform-origin: center;
        -webkit-animation: showSuccess 180ms ease-in-out;
        animation: showSuccess 180ms ease-in-out;
        transform: scale(1);
        margin-bottom: 20px;
      }

      .success-icon__tip,
      .success-icon__long {
        display: block;
        position: absolute;
        height: 4px;
        background-color: #96df8f;
        border-radius: 10px;
      }

      .success-icon__tip {
        width: 2.4em;
        top: 4.3em;
        left: 1.4em;
        transform: rotate(45deg);
        -webkit-animation: tipInPlace 300ms ease-in-out;
        animation: tipInPlace 300ms ease-in-out;
        -webkit-animation-fill-mode: forwards;
        animation-fill-mode: forwards;
        -webkit-animation-delay: 180ms;
        animation-delay: 180ms;
        visibility: hidden;
      }

      .success-icon__long {
        width: 4em;
        transform: rotate(-45deg);
        top: 3.7em;
        left: 2.75em;
        -webkit-animation: longInPlace 140ms ease-in-out;
        animation: longInPlace 140ms ease-in-out;
        -webkit-animation-fill-mode: forwards;
        animation-fill-mode: forwards;
        visibility: hidden;
        -webkit-animation-delay: 440ms;
        animation-delay: 440ms;
      }

      @-webkit-keyframes showSuccess {
        from {
          transform: scale(0);
        }

        to {
          transform: scale(1);
        }
      }

      @keyframes showSuccess {
        from {
          transform: scale(0);
        }

        to {
          transform: scale(1);
        }
      }

      @-webkit-keyframes tipInPlace {
        from {
          width: 0em;
          top: 0em;
          left: -1.6em;
        }

        to {
          width: 2.4em;
          top: 4.3em;
          left: 1.4em;
          visibility: visible;
        }
      }

      @keyframes tipInPlace {
        from {
          width: 0em;
          top: 0em;
          left: -1.6em;
        }

        to {
          width: 2.4em;
          top: 4.3em;
          left: 1.4em;
          visibility: visible;
        }
      }

      @-webkit-keyframes longInPlace {
        from {
          width: 0em;
          top: 5.1em;
          left: 3.2em;
        }

        to {
          width: 4em;
          top: 3.7em;
          left: 2.75em;
          visibility: visible;
        }
      }

      @keyframes longInPlace {
        from {
          width: 0em;
          top: 5.1em;
          left: 3.2em;
        }

        to {
          width: 4em;
          top: 3.7em;
          left: 2.75em;
          visibility: visible;
        }
      }
    }
  }

}
</style>
