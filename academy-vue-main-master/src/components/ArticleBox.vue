<template>
    <div class="article-box">
        <a href="#" target="_blank">
            <img class="thumbnail" src="https://www.datatrained.com/post/wp-content/uploads/2022/03/Grapevine-Communication-1140x570.png" alt="">
        </a>
    </div>
</template>

<script setup>
const props = defineProps({
    // package_name: {
    //   type: String,
    //   required: true
    // },
})
</script>

<style lang="scss" scoped>
.article-box {
  position: relative;
  display: inline-block;
  width: 250px;
  margin-right: 20px;
  a {
    display: inline-block;
    position: relative;
  }
  .thumbnail {
    border-radius: 8px;
    width: 100%;
  }
}
</style>