<template>
    <div class="course-box">
        <div class="course-image">
            <img src="https://datatrained.com/images/grad-cap.png" alt="">
        </div>
        <div class="course-info">
            <div>
                <label>{{ master_batch_name }}</label>
            </div>
            <q-btn size="sm" :href="`https://learning.datatrained.com/myaccount/#/course/`+master_batch_id" style="color: #fff; background-color: #282464; margin-top: 12px;">Continue Learning</q-btn>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    master_batch_name: {
      type: String,
      required: true
    },
    master_batch_id: {
      type: Number,
      required: true
    },
})
</script>

<style lang="scss" scoped>
.course-box {
  position: relative;
  display: inline-flex;
  padding-left: 4%;
  width: 300px;
  flex-grow: 1;
  .course-image {
    position: absolute;
    left: 0px;
    top: 50%;
    transform: translateY(-45%);
    img {
      width: 50px;
      border-radius: 8px;
    }
  }
  .course-info {
    background-color: #fff;
    width: 90%;
    padding: 12px;
    padding-left: 35px;
    border-radius: 8px;
    div {
      font-size: 14px;
      font-weight: 500;
      overflow: hidden;
      height: 42px;
      label {
        white-space: pre-wrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>