<template>
    <div class="category-box" :style="`background-color: `+color">
        <a :href="link" target="_blank">
            <div class="thumbnail">
                <img :src="`https://datatrained.com/images/`+icon" alt="">
            </div>
            <div class="category-title">
                {{ title }}
            </div>
            <!-- <div class="article-count">
                10 Articles
            </div> -->
        </a>
    </div>
</template>

<script setup>
const props = defineProps({
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    color: {
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
.category-box {
  position: relative;
  display: inline-block;
  flex-direction: column;
  align-items: center;
  width: 100px;
  margin-right: 10px;
  border-radius: 10px;
  padding: 30px 10px;
  height: 180px;
  a {
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    white-space: wrap;
  }
  .thumbnail {
    border-radius: 8px;
    width: 50px;
    height: 50px;
    background-color: #fff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        width: 30px;
        height: 30px;
    }
  }
  .category-title {
    font-size: 10px;
    text-decoration: none;
    padding-top: 15px;
    // height: 40px;
    // width: 100%;
    white-space: pre-wrap;
    color: #000;
    text-align: center;
  }
  .article-count {
    color: #fff;
    font-size: 8px;
    background-color: #000;
    padding: 1px 8px;
    margin-top: 10px;
    border-radius: 10px;
  }
}
@media (min-width:768px) and (max-width:992px){
  .category-box{
    width: 22%;
  }
}
</style>