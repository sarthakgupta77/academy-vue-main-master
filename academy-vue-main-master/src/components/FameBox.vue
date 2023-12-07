<template>
    <div class="fame-box">
        <div class="fame-image">
            <img v-if="image" :src="`https://www.datatrained.com/`+image" :alt="name">
            <img v-else src="https://www.datatrained.com/images/default.png" :alt="name">
        </div>
        <div class="fame-info">
            <div class="label">
                <label>{{ name }}</label><br>
                <!-- <q-chip size="sm" color="black" text-color="white">Data Scientist</q-chip> -->
            </div>
            <q-chip v-if="hike" outline class="hike-chip" size="sm" icon="fas fa-chart-line" color="green" text-color="white">&nbsp;&nbsp;{{ hike }}% Hike</q-chip>
            <q-chip v-else outline class="hike-chip" size="sm" icon="fas fa-chart-line" color="green" text-color="white">&nbsp;&nbsp;60% Hike</q-chip>
            <div class="company">
                <span class="heading">Post DataTrained</span><br>
                <span class="designation">{{ job_profile }}</span><br>
                <img v-if="logo" :src="`https://www.datatrained.com/`+logo" :alt="job_profile">
            </div>
            <p>
              <a style="text-decoration: none" v-if="youtube_link" :href="youtube_link" target="_blank"><q-chip size="sm" icon="fab fa-youtube" color="red" text-color="white">&nbsp;&nbsp;Watch on Youtube</q-chip></a>
                <a style="text-decoration: none" v-if="link" :href="link" target="_blank"><q-chip size="sm" icon="fab fa-linkedin" color="blue-8" text-color="white" clickable>&nbsp;&nbsp;Connect on LinkedIn</q-chip></a>
                <a style="text-decoration: none" v-if="blog_link" :href="blog_link" target="_blank"><q-chip size="sm" icon="fab fa-blogger-b" color="orange" text-color="white">&nbsp;&nbsp;Read Success Story</q-chip></a>
            </p>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
  blog_link: {
    type: String,
    required: true
  },
  hike: {
    type: String,
    required: true
  },
  company_name: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  job_profile: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  youtube_link: {
    type: String,
    required: true
  },
})
</script>

<style lang="scss" scoped>
.fame-box {
  margin-top: 35px;
  position: relative;
  display: inline-grid;
  width: 350px;
  margin-right: 20px;
  .fame-image {
    position: absolute;
    left: 5%;
    top: -40px;
    width: 60px;
    height: 60px;
    border-radius:100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 3px solid #fff;
    img {
      width: 60px;
    height: 60px;
    }
  }
  .fame-info {
    background-color: #fff;
    padding: 12px;
    padding-left: 20px;
    border-radius: 8px;
    .label {
      padding-top: 10px;
      font-weight: 500;
      overflow: hidden;
      label {
        font-size: 16px;
      }
    }
    p {
        margin: 0;
        height: 28px;
    }
    .hike-chip {
        position: absolute;
        top: 5px;
        right: 5px;
        z-index: 1;
    }
    .company {
        margin-top: 15px;
        margin-bottom: 10px;
        position: relative;
        height: 70px;
        .heading {
            font-size: 10px;            
        }
        .designation {
            font-size: 15px;
            white-space: normal;
        }
        img {
            position: absolute;
            top: -10px;
            right: 0;
            width: 90px;
        }
    }
  }
}
@media (max-width:767px){
.fame-box{
  width: 100%;
}
.fame-info p{
    display: flex;
    flex-wrap: wrap;
}
}


</style>