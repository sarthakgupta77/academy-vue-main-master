<template>
   <div class="jobs-box q-my-lg">
      <div class="job-head flex justify-between items-center q-mb-md">
         <div class="comp">
            <div>
               <h3>Data Analyst</h3>
               <span>The Times of India</span>
            </div>
         </div>
         <!-- <q-btn flat color="indigo" icon="bookmark" /> -->
      </div>
      <div class="locations-box flex justify-between items-center q-mb-md">
         <div class="loc">
            <i class="fas fa-map-marker-alt q-mr-sm"></i> Mumbai, India
         </div>
      </div>
      <div class="experience-box flex items-center justify-between">
         <div class="exp flex justify-between">
            <span><i class="fas fa-briefcase q-mr-sm"></i> 3-6 years</span>
            <span><i class="fas fa-money-bill"></i> &#8377;12-18 LPA</span>
         </div>
         <div>
            <span><i class="fas fa-users"></i> 117 Applied</span> 
         </div>
      </div>
   </div>
   <div class="jobs-box q-my-lg">
      <div class="job-head flex justify-between items-center q-mb-md">
         <div class="comp">
            <div>
               <h3>Data Analyst</h3>
               <span>The Times of India</span>
            </div>
         </div>
         <!-- <q-btn flat bg-color="transp" color="indigo" icon="bookmark" /> -->
      </div>
      <div class="locations-box flex justify-between items-center q-mb-md">
         <div class="loc">
            <i class="fas fa-map-marker-alt q-mr-sm"></i> Mumbai, India
         </div>
      </div>
      <div class="experience-box flex items-center justify-between">
         <div class="exp flex justify-between">
            <span><i class="fas fa-briefcase q-mr-sm"></i> 3-6 years</span>
            <span><i class="fas fa-money-bill"></i> &#8377; 12-18 LPA</span>
         </div>
         <div>
            <span><i class="fas fa-users"></i> 117 Applied</span> 
         </div>
      </div>
   </div>
</template>

<script setup>
 
</script>

<style lang="scss" scoped>
  .jobs-box{
    box-shadow: 0 0 6px 0.2rem rgb(178 178 178 / 16%);
    padding: 20px;
    border-radius: 10px;
    .job-head{
      .comp{
        column-gap: 12px;
        h3{
          margin: 0 0 2px;
          font-size: 16px;
          line-height: 18px;
          font-weight: 600;
          color: $primary;
        }
        span{
          font-size: 13px;
        }
      }
    }
    .locations-box{
      .loc{
        color: #3e3e3e;
         font-size: 13px;
         i{
          color: #3f51b5;
         }
      }
    }
    .experience-box{
      .exp{
        width: 55%;
        i{
          color: #3f51b5;
        }
      }
      span{
          color: #3e3e3e;
          font-size: 13px;
          i{
            color: #3f51b5;
          }
      }
    }
  }
</style>