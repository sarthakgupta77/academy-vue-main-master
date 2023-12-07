<template>
    <div class="talk-box">
        <a :href="link" target="_blank">
            <img class="thumbnail" :src="`https://datatrained.com`+banner" alt="">
            <img class="play-btn" src="https://www.datatrained.com/images/play-video.png" alt="">
        </a>
    </div>
</template>

<script setup>
const props = defineProps({
    banner: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    },
})
</script>

<style lang="scss" scoped>
.talk-box {
  position: relative;
  display: inline-block;
//   padding-left: 4%;
  width: 250px;
  margin-right: 20px;
  a {
    display: inline-block;
    position: relative;
  }
  .thumbnail {
    border-radius: 8px;
    width: 100%;
    height: 131px;
  }
  .play-btn {
    position: absolute;
    top: 45%;
    left: 40%;
    z-index: 1;
    width: 40px;
    transform: translateX(-50%);
    transform: translateY(-50%);
  }
}
</style>